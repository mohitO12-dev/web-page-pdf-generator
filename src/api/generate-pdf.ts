
import puppeteer from "puppeteer";

export type PdfRequestBody = {
  url: string;
  browserlessToken: string;
};

export async function generatePdf(reqBody: PdfRequestBody): Promise<ArrayBuffer | { error: string }> {
  // Validate request body
  const { url, browserlessToken } = reqBody;
  
  if (!url) {
    return { error: "Missing required property: url" };
  }
  
  // Check for any unexpected properties
  const allowedProps = ["url", "browserlessToken"];
  const unexpectedProps = Object.keys(reqBody).filter(
    (key) => !allowedProps.includes(key)
  );
  
  if (unexpectedProps.length > 0) {
    return { 
      error: `Unexpected ${unexpectedProps.length > 1 ? "properties" : "property"}: ${unexpectedProps.join(", ")}` 
    };
  }

  try {
    // Connect to browserless
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://production-sfo.browserless.io?token=${browserlessToken}`,
    });

    // Create a new page
    const page = await browser.newPage();
    
    // Navigate to URL
    await page.goto(url, { waitUntil: "domcontentloaded" });
    
    // Custom solution to wait for images to load
    await page.evaluate(async () => {
      // Wait for DOM to be ready
      if (document.readyState !== "complete") {
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }
      
      const imgElements = Array.from(document.querySelectorAll("img"));
      
      // Filter for images that are not loaded yet and visible
      const visibleImagesLoading = imgElements.filter((img) => {
        const rect = img.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        return isVisible && !img.complete;
      });
      
      // Wait for all visible images to load or fail
      if (visibleImagesLoading.length > 0) {
        await Promise.all(
          visibleImagesLoading.map(
            (img) =>
              new Promise((resolve) => {
                img.addEventListener("load", resolve);
                img.addEventListener("error", resolve); // Also handle image errors
              })
          )
        );
      }
      
      // Add a small delay to ensure any final rendering is complete
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Close browser
    await browser.close();
    
    return pdfBuffer;
  } catch (error) {
    console.error("PDF generation error:", error);
    return { error: error instanceof Error ? error.message : "Failed to generate PDF" };
  }
}
