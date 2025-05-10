"use client";

import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

export default function CustomDrawer({
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
      {/* Drawer */}
      <Drawer
        anchor="left"
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
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)", // Add shadow for depth
          },
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Drawer Content</h2>
          <p>Place your drawer content here.</p>
          {/* Add custom drawer content here */}
        </div>
      </Drawer>

      {/* Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        className={`absolute top-4 z-20 transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-[calc(25%_-_32px)]" : "translate-x-0"
        }`}
        sx={{
          bgcolor: "white",
          border: "1px solid #e5e7eb", // Tailwind gray-200 border
          borderRadius: "0 8px 8px 0", // Rounded on right side
          boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)", // Shadow to match drawer
          "&:hover": { bgcolor: "gray.100" },
          padding: "8px",
        }}
      >
        <FolderIcon className="text-gray-800" />
      </IconButton>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
