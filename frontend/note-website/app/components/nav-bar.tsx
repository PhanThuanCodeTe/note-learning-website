"use client"

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ROUTES from "../common/constants/routes";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleHome = () => {
    router.push(ROUTES.HOME);
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

      {/* Login button or empty div with same size */}
      <div className="w-[100px] flex justify-end">
        {pathname !== ROUTES.LOGIN && (
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
