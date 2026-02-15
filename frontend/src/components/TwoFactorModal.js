import React, { useState } from 'react';
import './TwoFactorModal.css';

const TwoFactorModal = ({ onVerify, onCancel, userId }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      await onVerify(code);
    } catch (err) {
      setError(err.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content two-factor-modal">
        <div className="modal-header">
          <h2>🔐 Two-Factor Authentication</h2>
          <p>Enter the 6-digit code from your authenticator app</p>
        </div>

        <form onSubmit={handleSubmit} className="two-factor-form">
          <div className="code-input-container">
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="000000"
              className="code-input"
              autoFocus
              maxLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || code.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>

          <div className="backup-code-hint">
            <small>Lost your device? Use a backup code instead</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorModal;