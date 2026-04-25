# Two-Factor Authentication (2FA) - Setup Guide

## Overview

The application implements TOTP-based Two-Factor Authentication using the Speakeasy library. This adds a second layer of security beyond the password.

## How It Works

After enabling 2FA, users must enter a 6-digit time-based code from an authenticator app every time they log in. The code changes every 30 seconds and is generated using the TOTP (Time-based One-Time Password) algorithm.

## Enabling 2FA

1. Log in to your account
2. Go to Profile and select the Privacy & Security tab
3. Click "Enable 2FA"
4. Scan the QR code with an authenticator app
5. Enter the 6-digit code shown in the app to verify
6. Save the backup codes in a secure location
7. 2FA is now active on your account

## Logging In With 2FA

1. Enter your email and password as usual
2. A verification modal will appear
3. Open your authenticator app and enter the current 6-digit code
4. If you do not have access to your phone, use one of your backup codes
5. You will be logged in successfully

## Disabling 2FA

1. Go to Profile and select the Privacy & Security tab
2. Click "Disable 2FA"
3. Enter your password to confirm
4. 2FA will be removed from your account

## Compatible Authenticator Apps

- Google Authenticator (iOS/Android)
- Microsoft Authenticator (iOS/Android)
- Authy (iOS/Android/Desktop)
- 1Password
- LastPass Authenticator
- Any TOTP-compatible app

## Technical Details

### Algorithm
- TOTP (Time-based One-Time Password) per RFC 6238
- 30-second time window
- 6-digit codes
- SHA-1 hashing

### Security
- Secrets stored in the database
- Backup codes are single-use and removed after use
- Password required to disable 2FA
- Time window tolerance of plus or minus 2 steps for clock skew

### API Endpoints
```
POST /api/2fa/setup       - Generate QR code and secret
POST /api/2fa/verify      - Verify code and enable 2FA
POST /api/2fa/validate    - Validate code during login
POST /api/2fa/disable     - Disable 2FA
GET  /api/2fa/status      - Get current 2FA status
```

### Database Fields
```
twoFactorSecret: String        - TOTP secret key
twoFactorEnabled: Boolean      - Whether 2FA is active
twoFactorBackupCodes: [String] - Array of one-time backup codes
```

## UI Components

- TwoFactorSetup.js: 3-step setup wizard with QR code display and backup codes
- TwoFactorModal.js: Login verification modal with 6-digit code input
- Profile.js: 2FA status display with enable/disable controls

## Security Score

Without 2FA: 7/10 (password hashing + JWT)
With 2FA: 9/10 (adds TOTP verification and backup codes)
