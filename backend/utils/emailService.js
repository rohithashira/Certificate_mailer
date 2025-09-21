const nodemailer = require('nodemailer');
const fs = require('fs');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendCertificate(userData, jpgPath, pdfPath) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userData.email,
        subject: 'Your Certificate of Completion',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Certificate of Completion</h2>
            <p>Dear ${userData.name},</p>
            <p>Congratulations! Your certificate has been generated successfully.</p>
            <p><strong>Business:</strong> ${userData.business_name}</p>
            <p><strong>GST Number:</strong> ${userData.gst_number}</p>
            <p><strong>Amount:</strong> ₹${userData.amount}</p>
            <p>Please find your certificate attached in both JPG and PDF formats.</p>
            <p>Best regards,<br>Certificate Generation System</p>
          </div>
        `,
        attachments: [
          {
            filename: `certificate_${userData.name.replace(' ', '_')}.jpg`,
            path: jpgPath,
            contentType: 'image/jpeg'
          },
          {
            filename: `certificate_${userData.name.replace(' ', '_')}.pdf`,
            path: pdfPath,
            contentType: 'application/pdf'
          }
        ]
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('Email service is ready');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

module.exports = EmailService;
