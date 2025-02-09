"use client";

import React, { useState } from "react";
import { Box, Button, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Toggle the mobile drawer
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <header>
      <Box
        sx={{
          backgroundColor: "#2b2d42",
          color: "#F4F1DE",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", color: "#F4F1DE", fontSize: "24px", fontWeight: "bold" }}>
          HasABrewery
        </Link>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            gap: "20px",
          }}
        >
          <Link href="/dashboard">
            <Button variant="text" sx={{ color: "#F4F1DE" }}>
              Dashboard
            </Button>
          </Link>
          <Link href="/logs">
            <Button variant="text" sx={{ color: "#F4F1DE" }}>
              Logs
            </Button>
          </Link>
          <Link href="/my-brewery">
            <Button variant="text" sx={{ color: "#F4F1DE" }}>
              My Brewery
            </Button>
          </Link>
          <Link href="/manage-connections">
            <Button variant="text" sx={{ color: "#F4F1DE" }}>
              Manage Connections
            </Button>
          </Link>
          <Link href="/recipes">
            <Button variant="text" sx={{ color: "#F4F1DE" }}>
              Recipes
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="text" sx={{ color: "#F4F1DE" }}>
              Settings
            </Button>
          </Link>
        </Box>

        {/* Mobile Burger Menu */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
          }}
        >
          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ alignSelf: "flex-end" }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Link href="/dashboard">
            <Button
              variant="text"
              sx={{ color: "#2b2d42" }}
              onClick={toggleDrawer(false)}
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/logs">
            <Button
              variant="text"
              sx={{ color: "#2b2d42" }}
              onClick={toggleDrawer(false)}
            >
              Logs
            </Button>
          </Link>
          <Link href="/my-brewery">
            <Button
              variant="text"
              sx={{ color: "#2b2d42" }}
              onClick={toggleDrawer(false)}
            >
              My Brewery
            </Button>
          </Link>
          <Link href="/manage-connections">
            <Button
              variant="text"
              sx={{ color: "#2b2d42" }}
              onClick={toggleDrawer(false)}
            >
              Manage Connections
            </Button>
          </Link>
          <Link href="/recipes">
            <Button
              variant="text"
              sx={{ color: "#2b2d42" }}
              onClick={toggleDrawer(false)}
            >
              Recipes
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant="text"
              sx={{ color: "#2b2d42" }}
              onClick={toggleDrawer(false)}
            >
              Settings
            </Button>
          </Link>
        </Box>
      </Drawer>
    </header>
  );
};

export default Header;
