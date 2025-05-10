"use client";

import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

export default function RightDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="relative flex">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        className={`absolute top-4 z-20 transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-[calc(-25%_+_32px)]" : "translate-x-0"
        }`}
        sx={{
          bgcolor: "white",
          border: "1px solid #e5e7eb", // Tailwind gray-200 border
          borderRadius: "8px 0 0 8px", // Rounded on left side
          boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)", // Shadow to match drawer
          "&:hover": { bgcolor: "gray.100" },
          padding: "8px",
        }}
      >
        <GroupIcon className="text-gray-800" />
      </IconButton>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          "& .MuiDrawer-paper": {
            width: "25%",
            // top: '64px', // Adjust based on NavBar height
            // height: 'calc(100% - 64px)', // Start below NavBar
            boxSizing: "border-box",
            bgcolor: "white",
            zIndex: 10,
            boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.15)", // Shadow for depth
          },
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Right Drawer Content</h2>
          <p>Place your right drawer content here.</p>
          {/* Add custom drawer content here */}
        </div>
      </Drawer>
    </div>
  );
}
