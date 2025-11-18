"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const navigate = (path: string) => {
    router.push(path);
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar className="flex justify-between">
        
        {/* -------- Logo + Title -------- */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/dashboard")}>
          <img src="/logo.png" alt="Logo" width={35} height={35} />
          <Typography variant="h6" component="div">
            Financial Anomaly Detector
          </Typography>
        </div>

        {/* -------- Menu Desktop -------- */}
        <div className="hidden md:flex gap-6 items-center">
          <Typography onClick={() => navigate("/dashboard")} className="cursor-pointer hover:opacity-70">
            Dashboard
          </Typography>

          <Typography onClick={() => navigate("/transactions")} className="cursor-pointer hover:opacity-70">
            Transactions
          </Typography>

          <Typography onClick={() => navigate("/anomalies")} className="cursor-pointer hover:opacity-70">
            Anomalies
          </Typography>

          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
        </div>

        {/* -------- Menu Mobile -------- */}
        <div className="md:hidden flex items-center">
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
        </div>

      </Toolbar>

      {/* Dropdown menu mobile + profile */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/transactions")}>Transactions</MenuItem>
        <MenuItem onClick={() => navigate("/anomalies")}>Anomalies</MenuItem>
        <MenuItem onClick={handleClose}>Profil</MenuItem>
        <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
      </Menu>
    </AppBar>
  );
}
