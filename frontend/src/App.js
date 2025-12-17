// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// import DashboardLayout from "./layout/DashboardLayout";
// import ItemForm from "./pages/ItemForm";
// import ItemMasterList from "./pages/ItemMasterList";   // ✅ ADD THIS

// const theme = createTheme();

// function App() {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       <Router>
//         {/* TOP NAVIGATION BAR */}
//         <AppBar position="fixed">
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               onClick={() => setDrawerOpen(true)}
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>

//             <Typography variant="h6">Dashboard</Typography>
//           </Toolbar>
//         </AppBar>

//         {/* MAIN LAYOUT (Drawer + Page Content) */}
//         <DashboardLayout drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
//           <Routes>
//             {/* HOME PAGE */}
//             <Route
//               path="/"
//               element={<Typography variant="h4">Welcome</Typography>}
//             />

//             <Route path="/" element={<Typography variant="h4">Welcome</Typography>} />

//              {/* Show table first */}
//             <Route path="/item-master" element={<ItemMasterList />} />

//             {/* 🔹 ADD NEW ITEM */}
//             <Route path="/itemform" element={<ItemForm />} />

//             {/* 🔹 EDIT ITEM (Load item by ID) */}
//             <Route path="/itemform/:id" element={<ItemForm />} />
//           </Routes>
//         </DashboardLayout>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;



import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import DashboardLayout from "./layout/DashboardLayout";
import ItemForm from "./pages/ItemForm";
import ItemMasterList from "./pages/ItemMasterList";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('appTheme') || 'light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
              }),
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
              }),
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
              }),
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
              }),
            },
          },
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((m) => {
      const nm = m === 'light' ? 'dark' : 'light';
      localStorage.setItem('appTheme', nm);
      return nm;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        {/* 🔹 TOP APP BAR */}
        <AppBar position="fixed" color="primary">
          <Toolbar sx={{ minHeight: 64 }}>
            <IconButton
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
              Dashboard
            </Typography>

            <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleMode}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* 🔹 MAIN LAYOUT */}
        <DashboardLayout
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        >
          {/* ✅ CONTENT WRAPPER (UI ONLY) */}
          <Box
            sx={{
              minHeight: "100vh",
              bgcolor: 'background.default',
              paddingTop: "80px",   // space for AppBar
              px: 3
            }}
          >
            <Routes>
              {/* HOME */}
              <Route
                path="/"
                element={<Typography variant="h4">Welcome</Typography>}
              />

              {/* ITEM MASTER TABLE */}
              <Route path="/item-master" element={<ItemMasterList />} />

              {/* ADD ITEM */}
              <Route path="/itemform" element={<ItemForm />} />

              {/* EDIT ITEM */}
              <Route path="/itemform/:id" element={<ItemForm />} />
            </Routes>
          </Box>
        </DashboardLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;