const express = require('express');
const router = express.Router();
const pool = require('../database/connection');
const { generateCertificate } = require('../utils/certificateGenerator');
const EmailService = require('../utils/emailService');

// Generate certificate for user
router.post('/generate', async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ error: 'Email and amount are required' });
    }

   
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userResult.rows[0];

    userData.amount = parseFloat(amount);
    userData.issue_date = new Date().toLocaleDateString();


    const certificateResult = await generateCertificate(userData);

    if (!certificateResult.success) {
      return res.status(500).json({ error: 'Failed to generate certificate' });
    }

  
    const emailService = new EmailService();
    const emailResult = await emailService.sendCertificate(
      userData,
      certificateResult.jpgPath,
      certificateResult.pdfPath
    );

   
    await pool.query(
      'INSERT INTO certificates (user_id, amount, issue_date, certificate_path, email_sent) VALUES ($1, $2, $3, $4, $5)',
      [userData.id, userData.amount, userData.issue_date, certificateResult.jpgPath, emailResult.success]
    );

    res.json({
      success: true,
      message: 'Certificate generated and sent successfully',
      userData: {
        name: userData.name,
        email: userData.email,
        business_name: userData.business_name,
        gst_number: userData.gst_number,
        business_address: userData.business_address,
        amount: userData.amount
      },
      certificatePaths: {
        jpg: certificateResult.jpgPath,
        pdf: certificateResult.pdfPath
      },
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
