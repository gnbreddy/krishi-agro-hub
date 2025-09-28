import fs from 'fs';
import pdfParse from 'pdf-parse';

// Extract crop names and prices from PDF
export async function extractCropsAndPrices(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  const text = data.text;

  // Simple regex to extract crop names and prices (customize as needed)
  // Example: Wheat 2200
  const cropPriceRegex = /(\w+)\s+(\d{3,5})/g;
  let match;
  const crops = [];
  while ((match = cropPriceRegex.exec(text)) !== null) {
    crops.push({ crop: match[1], price: parseInt(match[2], 10) });
  }
  return crops;
}
