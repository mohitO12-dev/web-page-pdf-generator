
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generatePdf } from "@/services/api";
import { Download } from "lucide-react";

const PdfGenerator = () => {
  const [url, setUrl] = useState("");
  const [browserlessToken, setBrowserlessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    if (!browserlessToken) {
      toast.error("Please enter your Browserless token");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL (including https://)");
      return;
    }

    setIsLoading(true);
    setPdfUrl(null);

    try {
      const result = await generatePdf({ url, browserlessToken });
      
      if (result.success && result.pdfUrl) {
        setPdfUrl(result.pdfUrl);
        toast.success("PDF generated successfully!");
      }
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="p-6 shadow-lg border-t-4 border-t-brand-blue">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="url" 
              className="block text-sm font-medium mb-1"
            >
              Website URL
            </label>
            <Input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="token" 
              className="block text-sm font-medium mb-1"
            >
              Browserless Token
            </label>
            <Input
              id="token"
              type="password"
              placeholder="Your Browserless token"
              value={browserlessToken}
              onChange={(e) => setBrowserlessToken(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-brand-darkBlue" 
            disabled={isLoading}
          >
            {isLoading ? "Generating PDF..." : "Generate PDF"}
          </Button>
        </form>

        {isLoading && (
          <div className="mt-6 text-center">
            <div className="inline-block animate-pulse-slow">
              <p className="text-sm text-gray-500">
                Capturing webpage and generating PDF...
              </p>
              <p className="text-xs text-gray-400 mt-1">
                This may take a few moments
              </p>
            </div>
          </div>
        )}

        {pdfUrl && (
          <div className="mt-6 flex flex-col items-center">
            <p className="text-sm font-medium mb-3">Your PDF is ready!</p>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => window.open(pdfUrl, '_blank')}
                variant="outline"
                className="flex items-center gap-2"
              >
                Preview PDF
              </Button>
              
              <Button 
                asChild
                className="bg-brand-blue hover:bg-brand-darkBlue flex items-center gap-2"
              >
                <a href={pdfUrl} download="webpage.pdf">
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>
          Generate a PDF of any webpage instantly with high-quality formatting
        </p>
      </div>
    </div>
  );
};

export default PdfGenerator;
