
import { toast } from "sonner";

const API_ENDPOINT = "/api/generate-pdf";

export type GeneratePdfParams = {
  url: string;
  browserlessToken: string;
};

export type GeneratePdfResult = {
  success: boolean;
  error?: string;
  pdfUrl?: string;
};

export async function generatePdf({ url, browserlessToken }: GeneratePdfParams): Promise<GeneratePdfResult> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, browserlessToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate PDF");
    }

    // The response will be a PDF stream
    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);
    return { success: true, pdfUrl };
  } catch (error) {
    let errorMessage = "Failed to generate PDF";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
}
