
import PdfGenerator from "@/components/PdfGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Web to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert any webpage into a beautifully formatted PDF document with our advanced web to PDF generator.
          </p>
        </div>

        <PdfGenerator />
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-brand-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-blue font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Enter URL</h3>
              <p className="text-sm text-gray-500">Paste the website URL you want to convert to PDF</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-brand-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-blue font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Add Token</h3>
              <p className="text-sm text-gray-500">Enter your Browserless API token</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-brand-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-blue font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Your PDF</h3>
              <p className="text-sm text-gray-500">Download or preview your generated PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
