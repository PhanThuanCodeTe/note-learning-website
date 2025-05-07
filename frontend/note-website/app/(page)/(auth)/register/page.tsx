"use client";

import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setAvatarFile(file);
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);
      }
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('full_name', formData.full_name);
    if (avatarFile) {
      data.append('avatar', avatarFile);
    }

    console.log('Form submitted:', formData, avatarFile);
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box className="min-h-screen flex items-center justify-center p-4">
      <Paper
        elevation={6}
        className={`p-6 rounded-xl w-full max-w-md relative ${
          avatarFile ? 'mt-16' : ''
        } shadow-lg`}
      >
        {avatarFile && avatarPreview && (
          <Box className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </Box>
        )}
        <Typography
          variant="h5"
          className="text-center font-bold"
        >
          Đăng ký
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          <TextField
            required
            label="Full name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <div className="col-span-full">
            <label
              htmlFor="avatar-upload"
              className="block text-sm font-medium text-gray-900"
            >
              Avatar
            </label>
            <div
              className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-8 w-8 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-2 flex text-sm text-gray-600">
                  <label
                    htmlFor="avatar-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload file</span>
                    <input
                      id="avatar-upload"
                      name="avatar-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  <p className="pl-1">or Drag file</p>
                </div>
                <p className="text-xs text-gray-600">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
          {avatarFile && (
            <Box className="flex justify-center items-center gap-2">
              <Typography variant="body2" className="text-center text-gray-500">
                Selected: {avatarFile.name}
              </Typography>
              <Typography
                variant="body2"
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={handleDeleteAvatar}
              >
                Delete
              </Typography>
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sign up
          </Button>
        </Box>
        <Typography variant="body2" className="mt-4 text-center pt-3">
          Have an account?{' '}
          <a
            onClick={handleLogin}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Sign in
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}