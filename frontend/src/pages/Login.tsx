import React, { useState, FormEvent } from 'react';
import { TextField, Button, Typography, Box, Paper, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/login';
import { SIGNUP } from '../queries/signUp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import Toaster from '../component/signInModel/Toaster';
import { IFormData, IFormErrors, ILoginResponse, ISignupResponse } from '../type';
/**
 * Login Component
 * 
 * This component provides a user interface for both logging and signing up users. It includes form fields for 
 * email, password, and an optional username (for sign up), and handles validation, submission, and state management.
 * It also supports toggling between the login and sign-up modes, as well as displaying errors and loading indicators.
 *
 * @component
 * @returns {JSX.Element} The Login component that handles both login and sign-up functionality.
 */
const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<IFormData>({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<IFormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [login, { loading: loginLoading }] = useMutation<ILoginResponse>(LOGIN, {
    onError: (err) => setErrors({ general: err.message }),
    onCompleted: (data) => {
      sessionStorage.setItem('token', data.login.token);
      setShowToast(true); // Show toast after successful login
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
  });

  const [signup, { loading: signupLoading }] = useMutation<ISignupResponse>(SIGNUP, {
    onError: (err) => setErrors({ general: err.message }),
    onCompleted: (data) => {
      sessionStorage.setItem('token', data.signup.token);
      setShowToast(true); // Show toast after successful signup
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Redirect after 2 seconds
    },
  });

 /**
   * Validates the form fields based on the current form mode (login/signup).
   * @returns {boolean} Returns true if the form is valid, otherwise false.
   */
  const validateForm = (): boolean => {
    const newErrors: IFormErrors = {};
    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    } else if (!isLogin && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 /**
   * Handles form submission (login or signup) based on the current mode.
   * @param {FormEvent<HTMLFormElement>} e The form submission event.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateForm()) return;
    const variables = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };
    isLogin ? login({ variables }) : signup({ variables });
  };

  /**
   * Handles input field changes for the form fields (email, password, username).
   * @param {keyof IFormData} field The field to update in the form data.
   * @returns {function} A function to update the field in the form data.
   */
  const handleChange = (field: keyof IFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData({ ...formData, [field]: e.target.value });
      setErrors({ ...errors, [field]: undefined });
    };
 /**
   * Toggles between the login and signup modes.
   */
  const toggleAuthMode = (): void => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ username: '', email: '', password: '' });
  };

  const loading: boolean = loginLoading || signupLoading;

  return (
    <Box className="auth-container">
      <Paper elevation={3} className="auth-box">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#f84464', fontWeight: 600 }}
        >
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Typography>

        {errors.general && (
          <Typography className="error-message" color="error">
            {errors.general}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange('username')}
              error={!!errors.username}
              helperText={errors.username}
              margin="normal"
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              background: '#f84464',
              '&:hover': { background: '#b53149' }
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </Button>

          <Typography align="center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="auth-toggle" onClick={toggleAuthMode}>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </Typography>
        </form>
      </Paper>

      {showToast && (
        <Toaster message={"Login Successful"} color={"success"} />
      )}
    </Box>
  );
};

export default Login;
