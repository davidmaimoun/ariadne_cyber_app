// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import { FormBox } from './CustomBox';

interface LoginFormProps {
  onLogin: (username: string, password: string, data: any) => void;
  onResetPwd: (username: string) => void;
  isKeepLogin?: boolean;
  isResetPwd?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isKeepLogin, isResetPwd, onLogin, onResetPwd }) => {
  const [username, setUsername] = useState('aragorn');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, { isKeepLogin, isResetPwd });
  };

  const addError = (msg: string) => {
    setError(prev => (prev.includes(msg) ? prev : [...prev, msg]));
  };

  return (
    <FormBox>
      <Typography variant="h5" mb={2}>Login page</Typography>

      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

      <TextField 
        label="Password" 
        type="password" 
        value={password} 
        disabled={isResetPwd}
        onChange={(e) => setPassword(e.target.value)} required />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        {isKeepLogin && (
          <FormControlLabel control={<Checkbox checked={true} />} label="Remember me" />
        )}

        {isResetPwd && (
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", cursor: "pointer" }}
            color="primary"
            onClick={() => username ? onResetPwd(username) :  
              addError("The username is required")}
          >
            Password forgotten? Reset
          </Typography>
        )}
      </Box>

      <Button type="submit" variant="contained" color="primary" disabled={isResetPwd}>
        Login
      </Button>

      {error && (
        <Typography variant="caption" color="error">
          {error.map(e => e)}
        </Typography>
      )}
    </FormBox>
  );
};

export default LoginForm;