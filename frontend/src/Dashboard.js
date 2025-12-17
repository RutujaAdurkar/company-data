import React, { useState } from "react";
import { Box, Button, CssBaseline } from "@mui/material";
import MenuDrawer from "./MenuDrawer";
import ItemForm from "./pages/ItemForm";
//import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 80; // ⭐ collapsed drawer width
//const navigate = useNavigate();

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* LEFT DRAWER */}
      <MenuDrawer open={drawerOpen} setOpen={setDrawerOpen} />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          transition: "all 0.3s ease",

          // ⭐ Move content (when drawer opens/closes)
          marginLeft: drawerOpen ? `${DRAWER_WIDTH}px` : `${COLLAPSED_WIDTH}px`,
          width: drawerOpen
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : `calc(100% - ${COLLAPSED_WIDTH}px)`,

          bgcolor: 'background.default',
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {/* TOGGLE BUTTON */}
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{ mb: 2 }}
        >
          {drawerOpen ? "Close Drawer" : "Open Drawer"}
        </Button>

        {/* PUT YOUR FORM */}
        <ItemForm />
      </Box>
    </Box>
  );
};

export default Dashboard;

