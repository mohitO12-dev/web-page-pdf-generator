
import express from 'express';
import { generatePdf, PdfRequestBody } from '../../api/generate-pdf';

// This is a placeholder since we're not actually using Next.js
// In a real Next.js app, this would be in pages/api/generate-pdf.ts
const router = express.Router();

router.post('/api/generate-pdf', async (req, res) => {
  try {
    const requestBody = req.body as PdfRequestBody;
    const result = await generatePdf(requestBody);
    
    if ('error' in result) {
      return res.status(400).json({ error: result.error });
    }
    
    // Stream the PDF back to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="webpage.pdf"');
    
    // Write the PDF data as a stream
    res.write(Buffer.from(result));
    res.end();
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    });
  }
});

export default router;
