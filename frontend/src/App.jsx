import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setCertificateData(null);
    setShowCertificate(false);

    try {
      const response = await axios.post('/api/certificates/generate', {
        email,
        amount: parseFloat(amount)
      });

      if (response.data.success) {
        setSuccess('Certificate generated and sent successfully!');
        setCertificateData(response.data);
        setShowCertificate(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while generating the certificate');
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setEmail('');
    setAmount('');
    setError('');
    setSuccess('');
    setCertificateData(null);
    setShowCertificate(false);
  };

  return (
    <div className="container">
      <h1 className="main-title">
        Certificate Generator
      </h1>

      {!showCertificate ? (
        <div className="card">
          <h2 className="card-title">
            Generate Certificate
          </h2>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="Enter the amount"
                step="0.01"
                min="0"
                className="form-input"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading && <span className="loading"></span>}
              {loading ? 'Generating Certificate...' : 'Create Certificate'}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      ) : (
        <div>
          {certificateData && (
            <div className="user-info">
              <h3>User Information</h3>
              <p><strong>Name:</strong> {certificateData.userData.name}</p>
              <p><strong>Email:</strong> {certificateData.userData.email}</p>
              <p><strong>Business Name:</strong> {certificateData.userData.business_name}</p>
              <p><strong>GST Number:</strong> {certificateData.userData.gst_number}</p>
              <p><strong>Business Address:</strong> {certificateData.userData.business_address}</p>
              <p><strong>Amount:</strong> ₹{certificateData.userData.amount}</p>
            </div>
          )}

          <div className="card">
            <h2 className="card-title">
              Certificate Generated Successfully!
            </h2>
            
            <p className="success-text">
              Your certificate has been generated and sent to your email address.
            </p>

            <div className="reset-section">
              <button 
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Generate Another Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
