import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';
import toast from 'react-hot-toast';
import './TwoFactorSetup.css';

const TwoFactorSetup = () => {
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      const response = await api.post('/2fa/setup');
      setQrCode(response.data.qrCode);
      setSecret(response.data.secret);
      toast.success('QR code generated successfully');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error(error.response?.data?.message || 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/2fa/verify', {
        token: verificationCode
      });
      
      setBackupCodes(response.data.backupCodes);
      setStep(3);
      toast.success('2FA enabled successfully!');
    } catch (error) {
      console.error('Error verifying code:', error);
      toast.error(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
  };

  const copyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    toast.success('Backup codes copied to clipboard');
  };

  const downloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    a.click();
    toast.success('Backup codes downloaded');
  };

  const handleFinish = () => {
    navigate('/profile');
  };

  return (
    <div className="two-factor-setup-container">
      <div className="setup-card">
        <div className="setup-header">
          <h1>🔐 Enable Two-Factor Authentication</h1>
          <p>Add an extra layer of security to your account</p>
        </div>

        <div className="setup-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Step 1: Scan QR Code */}
        {step === 1 && (
          <div className="setup-content">
            <h2>Step 1: Scan QR Code</h2>
            <p>Use Google Authenticator, Authy, or any TOTP app to scan this QR code:</p>
            
            {loading ? (
              <div className="loading-spinner"></div>
            ) : qrCode ? (
              <div className="qr-code-container">
                <img src={qrCode} alt="QR Code" className="qr-code" />
              </div>
            ) : null}

            {secret && (
              <div className="manual-entry">
                <p><strong>Can't scan?</strong> Enter this code manually:</p>
                <div className="secret-code">{secret}</div>
              </div>
            )}

            <button
              className="btn btn-primary"
              onClick={() => setStep(2)}
              disabled={!qrCode}
            >
              Next: Verify Code
            </button>
          </div>
        )}

        {/* Step 2: Verify Code */}
        {step === 2 && (
          <div className="setup-content">
            <h2>Step 2: Verify Code</h2>
            <p>Enter the 6-digit code from your authenticator app:</p>

            <form onSubmit={handleVerify} className="verification-form">
              <input
                type="text"
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="000000"
                className="code-input"
                autoFocus
                maxLength={6}
              />

              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? 'Verifying...' : 'Verify & Enable'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Backup Codes */}
        {step === 3 && (
          <div className="setup-content">
            <h2>Step 3: Save Backup Codes</h2>
            <div className="warning-box">
              <strong>⚠️ Important:</strong> Save these backup codes in a safe place. 
              You can use them to access your account if you lose your authenticator device.
            </div>

            <div className="backup-codes-container">
              {backupCodes.map((code, index) => (
                <div key={index} className="backup-code">
                  {code}
                </div>
              ))}
            </div>

            <div className="button-group">
              <button
                className="btn btn-outline"
                onClick={copyBackupCodes}
              >
                📋 Copy Codes
              </button>
              <button
                className="btn btn-outline"
                onClick={downloadBackupCodes}
              >
                💾 Download Codes
              </button>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleFinish}
            >
              Finish Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorSetup;