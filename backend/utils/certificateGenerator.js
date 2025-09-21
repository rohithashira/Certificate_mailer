const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const jsPDF = require('jspdf').jsPDF;

// Ensure certificates directory exists
const certificatesDir = path.join(__dirname, '../certificates');
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}


const CERTIFICATE_WIDTH = 800;
const CERTIFICATE_HEIGHT = 600;

const generateCertificate = async (userData) => {
  try {
   
    const jpgPath = await generateJPG(userData);
    const pdfPath = await generatePDF(userData);
    return {
      jpgPath,
      pdfPath,
      success: true
    };
  } catch (error) {
    console.error('Error generating certificate:', error);
    return {
      success: false,
      error: error.message
    };
  }
};


const generateJPG = async (userData) => {
  const canvas = createCanvas(CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT);

  // Border
  ctx.strokeStyle = '#2c3e50';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, CERTIFICATE_WIDTH - 40, CERTIFICATE_HEIGHT - 40);


  // Title
  ctx.fillStyle = '#2c3e50';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE ', CERTIFICATE_WIDTH / 2, 100);

  // Subtitle
  ctx.font = '20px Arial';
  ctx.fillStyle = '#7f8c8d';
  ctx.fillText('This is to certify payment completion', CERTIFICATE_WIDTH / 2, 140);

  // Name
  ctx.font = 'bold 32px Arial';
  ctx.fillStyle = '#2c3e50';
  ctx.fillText(userData.name, CERTIFICATE_WIDTH / 2, 200);

  // Business details
  ctx.font = '18px Arial';
  ctx.fillStyle = '#34495e';
  ctx.fillText(`Business: ${userData.business_name}`, CERTIFICATE_WIDTH / 2, 250);
  ctx.fillText(`GST: ${userData.gst_number}`, CERTIFICATE_WIDTH / 2, 280);
  ctx.fillText(`Address: ${userData.business_address}`, CERTIFICATE_WIDTH / 2, 310);

  // Amount
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#27ae60';
  ctx.fillText(`Amount: ₹${userData.amount}`, CERTIFICATE_WIDTH / 2, 360);

  // Issue Date
  ctx.font = '16px Arial';
  ctx.fillStyle = '#7f8c8d';
  const issueDate = userData.issue_date || new Date().toLocaleDateString();
  ctx.fillText(`Issue Date: ${issueDate}`, CERTIFICATE_WIDTH / 2, 450);

  

  // Save as JPG
  const filename = `certificate_${userData.email.replace('@', '_').replace('.', '_')}_${Date.now()}.jpg`;
  const filepath = path.join(certificatesDir, filename);
  
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(filepath, buffer);
  
  return filepath;
};


const generatePDF = async (userData) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(248, 249, 250);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border
  doc.setDrawColor(44, 62, 80);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

 

  // Title
  doc.setFontSize(24);
  doc.setTextColor(44, 62, 80);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE ', pageWidth / 2, 40, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(127, 140, 141);
  doc.setFont('helvetica', 'normal');
  doc.text('This is to certify payment completion', pageWidth / 2, 60, { align: 'center' });

  // Name
  doc.setFontSize(20);
  doc.setTextColor(44, 62, 80);
  doc.setFont('helvetica', 'bold');
  doc.text(userData.name, pageWidth / 2, 90, { align: 'center' });

  // Business details
  doc.setFontSize(12);
  doc.setTextColor(52, 73, 94);
  doc.setFont('helvetica', 'normal');
  doc.text(`Business: ${userData.business_name}`, pageWidth / 2, 120, { align: 'center' });
  doc.text(`GST: ${userData.gst_number}`, pageWidth / 2, 135, { align: 'center' });
  doc.text(`Address: ${userData.business_address}`, pageWidth / 2, 150, { align: 'center' });

  // Amount
  doc.setFontSize(16);
  doc.setTextColor(39, 174, 96);
  doc.setFont('helvetica', 'bold');
  doc.text(`Amount:  ${userData.amount}`, pageWidth / 2, 180, { align: 'center' });

  // Issue Date
  doc.setFontSize(14);
  doc.setTextColor(44, 62, 80);
  doc.setFont('helvetica', 'bold');
  const issueDate = userData.issue_date || new Date().toLocaleDateString();
  console.log('PDF Issue Date:', issueDate, 'Page Height:', pageHeight);
  doc.text(`Issue Date: ${issueDate}`, pageWidth / 2, 170, { align: 'center' });

  

  // Save PDF
  const filename = `certificate_${userData.email.replace('@', '_').replace('.', '_')}_${Date.now()}.pdf`;
  const filepath = path.join(certificatesDir, filename);
  
  doc.save(filepath);
  
  return filepath;
};


const generateFilename = (email, format) => {
  const sanitizedEmail = email.replace('@', '_').replace('.', '_');
  const timestamp = Date.now();
  return `certificate_${sanitizedEmail}_${timestamp}.${format}`;
};


// Export functions
module.exports = {
  generateCertificate,
  generateJPG,
  generatePDF,
  generateFilename
};