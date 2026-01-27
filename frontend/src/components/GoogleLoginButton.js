import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = ({ role = 'customer', text = 'Sign in with Google' }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      await googleLogin(
        decoded.sub,
        decoded.name,
        decoded.email,
        decoded.picture
      );
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => console.log('Login failed')}
        text="signin_with"
        width="400"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
