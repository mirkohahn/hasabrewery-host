"use client";

import React from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import packageJson from "../../package.json";

const Footer = () => {
  const isDesktop = useMediaQuery("(min-width:800px)"); // Media query

  return (
    <footer style={{ padding: "20px", backgroundColor: "#2b2d42" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Responsive layout
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 }, // Padding adjustments
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#F4F1DE",
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 2, md: 0 },
          }}
        >
          © 2024-2025 Has A Brewery. All rights reserved.<br />
          Version: {packageJson.version}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#F4F1DE",
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 2, md: 0 },
          }}
        >
          Made with ❤️ & many 🍺 by{" "}
          <a
            href="https://mh-flyhigh.com"
            style={{ color: "#FABC18", textDecoration: "none" }}
          >
            Mirko
          </a>{" "}
          & other Homebrewers
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <IconButton
            component="a"
            href="https://github.com/mirkohahn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon sx={{ color: "#F4F1DE" }} />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.linkedin.com/in/mirkohahn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon sx={{ color: "#F4F1DE" }} />
          </IconButton>

          <IconButton
            component="a"
            href="https://instagram.com/mh_flyhigh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon sx={{ color: "#F4F1DE" }} />
          </IconButton>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
