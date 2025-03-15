import React, { JSX } from "react";
import { Modal, Backdrop, Fade, Button, Box, Typography } from "@mui/material";
import "./SignInModel.css";
import { Close, MailOutline } from '@mui/icons-material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useState, useRef } from "react";
import { auth } from "../../firbase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useQuery } from "@apollo/client";
import { GOOGLE_AUTH } from "../../queries/googleAuth";
import { ISignInModalProps } from "../../type";
/**
 * SignInModal Component
 * 
 * A modal dialog that allows users to sign in via Google, email, or phone number.
 * It includes options for signing in with Google, continuing with email, or entering a mobile number 
 * to receive an OTP for phone number authentication. The modal also displays terms and privacy links.
 *
 * @param {ISignInModalProps} props - The properties for the SignInModal component.
 * @param {boolean} props.open - A boolean flag to control the visibility of the modal.
 * @param {Function} props.onClose - A function to close the modal when triggered.
 * 
 * @returns {JSX.Element} The SignInModal component.
 */
const SignInModal: React.FC<ISignInModalProps> = ({ open, onClose }: ISignInModalProps): JSX.Element => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [googleAuth, setGoogleAuth] = useState<string>('')
  /**
   * Redirects the user to the login page when they opt to sign in with email.
   */
  const handleSignInWithMail = () => {
    window.location.href = "/#login"
  }
 /**
   * Sends an OTP to the mobile number entered by the user for phone number authentication.
   */
  const handleSendOtp = async () => {
    try {
      const phone = "+91" + mobileNumber
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible"
      })
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    } catch (err) {
      console.error(err)
    }
  }
 /**
   * Handles the success of Google authentication and sets the credential received.
   * 
   * @param {CredentialResponse} credentialResponse - The response containing the Google authentication credential.
   */
  const handleSuccess = (credentialResponse: CredentialResponse): void => {
    const authorizationCode = credentialResponse.credential;
    setGoogleAuth(authorizationCode!)
  }
 /**
   * Handles the error if Google login fails.
   */
  const handleError = () => {
    console.error('Google login failed');
  };

  const { data, loading, error } = useQuery(GOOGLE_AUTH, {
    variables: {
      "creadential": googleAuth
    },
    skip: !googleAuth,
  });

  if (data?.googleAuth) {
    sessionStorage.setItem('token', data.googleAuth);
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box className="popup-container">
          <Box className="popup-header">
            <Box className="popup-title">Get Started</Box>
            <Box className="popup-close-button" onClick={onClose}>
              <Close />
            </Box>
          </Box>

          <Box className="popup-body">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
            <Button onClick={handleSignInWithMail} className="popup-option" variant="outlined" startIcon={<MailOutline />}>
              Continue with Email
            </Button>
            <Box className="or-divider">OR</Box>

            <form className="popup-form">
              <Box className="popup-form-field">
                <Box className="input-container">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg" alt="India Flag" className="india-flag" />
                  <Typography variant="body1" sx={{ color: '#666666' }}>
                    +91
                  </Typography>
                  <input
                    type="tel"
                    minLength={10}
                    maxLength={10}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Continue with mobile number"
                    className="popup-input"
                  />
                </Box>
                <div id="recaptcha"></div>
                <Button onClick={() => handleSendOtp()}>Continue</Button>
              </Box>
            </form>


            <Box className="popup-terms">
              I agree to the Terms & Conditions & Privacy Policy
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignInModal;
