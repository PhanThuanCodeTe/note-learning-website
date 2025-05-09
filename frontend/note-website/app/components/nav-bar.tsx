"use client"

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TextField, InputAdornment, Avatar, Menu, MenuItem, Popover, Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ROUTES from "../common/constants/routes";
import ENDPOINTS from "../common/constants/endpoints";
import apiClient from "../common/utils/apiClient";
import { getCookie, deleteCookie, hasCookie } from "../common/utils/cookieUtils";

interface UserInfo {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  age_in_days: number;
  created_at: string;
}

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in and fetch user info
    const fetchUserInfo = async () => {
      setLoading(true);
      
      try {
        // Check if there is an access token
        if (!hasCookie('accessToken')) {
          setLoading(false);
          return;
        }
        
        // Add token to headers for the request
        const token = getCookie('accessToken');
        const response = await apiClient.endpoint(ENDPOINTS.USER.INFO, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.success) {
          setUser(response.response as UserInfo);
        } else {
          // If token is invalid, clear it
          deleteCookie('accessToken');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [pathname]); // Refresh user info when route changes

  const handleLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleHome = () => {
    router.push(ROUTES.HOME);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deleteCookie('accessToken');
    setUser(null);
    handleMenuClose();
    router.push(ROUTES.HOME);
  };

  const handleUserDetails = () => {
    handleMenuClose();
    // Can add link to user profile page here
    // router.push(ROUTES.PROFILE);
  };

  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300 px-6 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Logo/Brand */}
      <div
        className="text-xl font-semibold text-gray-800 cursor-pointer hover:opacity-80 transition duration-200"
        onClick={handleHome}
      >
        Home
      </div>

      {/* Search bar */}
      <div className="flex-1 mx-4 max-w-lg">
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-500" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "999px",
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              paddingRight: "4px",
              "&:hover": {
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              },
            },
            "& input": {
              paddingY: "10px",
              fontSize: "0.95rem",
              color: "#333",
            },
          }}
        />
      </div>

      {/* Login button or Avatar */}
      <div className="w-[100px] flex justify-end">
        {loading ? (
          <div className="w-10 h-10"></div> // Placeholder with same dimensions
        ) : user ? (
          <div ref={avatarRef}>
            <Avatar
              src={user.avatar_url}
              alt={user.full_name}
              onClick={handleAvatarClick}
              sx={{ 
                width: 40, 
                height: 40, 
                cursor: 'pointer',
                border: '2px solid #e0e0e0',
                '&:hover': {
                  boxShadow: '0 0 8px rgba(0,0,0,0.2)'
                }
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {user.full_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </Box>
              <MenuItem onClick={handleUserDetails}>Profile Details</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : pathname !== ROUTES.LOGIN && (
          <button
            onClick={handleLogin}
            className="bg-white text-gray-700 font-medium px-4 py-1.5 rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:text-blue-600 transition duration-200"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;