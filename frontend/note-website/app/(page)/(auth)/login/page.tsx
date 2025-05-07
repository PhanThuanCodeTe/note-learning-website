"use client"

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { useRouter } from "next/navigation";
import styles from '@/app/styles/style.module.scss';
import ROUTES from '@/app/common/constants/routes';

function SignInForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        placeholder="you@example.com"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        placeholder="••••••••"
        variant="outlined"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
        />
        <a onClick={onForgotPassword} className="text-sm text-blue-600 hover:underline" style={{ cursor: 'pointer' }}>
          Forgot password?
        </a>
      </Box>

      <Button type="submit" fullWidth variant="contained" color="primary">
        Sign In
      </Button>
    </Box>
  );
}

function SignInPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push(ROUTES.REGISTER);
  };

  const handleForgotPassword = () => {
    router.push(ROUTES.FORGOT_PASSWORD);
  };


  return (
    <Box
      // className="bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper elevation={8} sx={{ width: '100%', maxWidth: 400, p: 4, borderRadius: 2 }} className={styles.formAnimation}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Sign in
        </Typography>
        <SignInForm onForgotPassword={handleForgotPassword} />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{' '}
          <a onClick={handleRegister} className="text-blue-600 hover:underline font-medium" style={{ cursor: 'pointer' }}>
            Sign up
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignInPage;
