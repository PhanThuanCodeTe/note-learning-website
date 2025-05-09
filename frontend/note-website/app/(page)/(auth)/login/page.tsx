"use client"

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import styles from '@/app/styles/style.module.scss';
import ROUTES from '@/app/common/constants/routes';
import ENDPOINTS from '@/app/common/constants/endpoints';
import apiClient from '@/app/common/utils/apiClient';
import { setCookie } from '@/app/common/utils/cookieUtils';
import Message from '@/app/components/Message';
import { ApiResponse } from '@/app/common/utils/apiClient';

function SignInForm({ onForgotPassword, onSubmit, isLoading }: { 
  onForgotPassword: () => void, 
  onSubmit: (email: string, password: string) => void,
  isLoading: boolean
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        placeholder="you@example.com"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        placeholder="••••••••"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox 
              color="primary" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
          }
          label="Remember me"
        />
        <a 
          onClick={!isLoading ? onForgotPassword : undefined} 
          className={`text-sm text-blue-600 hover:underline ${isLoading ? 'opacity-50' : 'cursor-pointer'}`}
        >
          Forgot password?
        </a>
      </Box>

      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Signing in...
          </Box>
        ) : (
          'Sign In'
        )}
      </Button>
    </Box>
  );
}

function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleRegister = () => {
    router.push(ROUTES.REGISTER);
  };

  const handleForgotPassword = () => {
    router.push(ROUTES.FORGOT_PASSWORD);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setApiResponse(null);
  
    try {
      const response = await apiClient.post(ENDPOINTS.USER.LOGIN, {
        email,
        password,
      }) as ApiResponse<{ accessToken: string }>; // Ép kiểu với ApiResponse
  
      if (response.success) {
        setCookie('accessToken', response.response.accessToken, 7);
        setApiResponse({
          success: true,
          message: response.message || 'Login successful!',
        });
        setTimeout(() => {
          router.push(ROUTES.HOME);
        }, 1000);
      } else {
        setApiResponse({
          success: false,
          message: response.message || 'Login failed. Please try again.',
        });
      }
    } catch (error: any) {
      setApiResponse({
        success: false,
        message: error.message || 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {apiResponse && (
        <Message 
          apiResponse={apiResponse}
          onClose={() => setApiResponse(null)}
        />
      )}
      
      <Paper elevation={8} sx={{ width: '100%', maxWidth: 400, p: 4, borderRadius: 2 }} className={styles.formAnimation}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Sign in
        </Typography>
        <SignInForm 
          onForgotPassword={handleForgotPassword} 
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <a 
            onClick={!isLoading ? handleRegister : undefined} 
            className={`text-blue-600 hover:underline font-medium ${isLoading ? 'opacity-50' : 'cursor-pointer'}`}
          >
            Sign up
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignInPage;