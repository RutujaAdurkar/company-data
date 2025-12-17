import React from "react";
import { Box } from "@mui/material";
import MenuDrawer from "../MenuDrawer";

const DRAWER_WIDTH = 280;

const DashboardLayout = ({ drawerOpen, setDrawerOpen, children }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* Drawer */}
      <MenuDrawer open={drawerOpen} setOpen={setDrawerOpen} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "0.3s",
          marginLeft: drawerOpen ? `${DRAWER_WIDTH}px` : "0px",
          width: drawerOpen
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : "100%",
          minHeight: "100vh",
          bgcolor: 'background.default'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
