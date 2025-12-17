import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SUBMENU_DIVIDERS = {
  1: [9, 14],
  2: [17],
  3: [8],
  4: [3],
  5: [3],
  6: [9, 14, 22],
  10: [1, 7],
  194: [6, 8, 10],
};

const MenuDrawer = ({ open, setOpen }) => {
  const [menuData, setMenuData] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/emp")
      .then((res) => setMenuData(buildTree(res.data)))
      .catch((err) => console.log("Error:", err));
  }, []);

  const toggle = (id) => setOpenItems({ ...openItems, [id]: !openItems[id] });

  const buildTree = (list) => {
    const map = {};
    const roots = [];
    list.forEach((item) => (map[item.MenuID] = { ...item, children: [] }));
    list.forEach((item) =>
      item.ParentID === null
        ? roots.push(map[item.MenuID])
        : map[item.ParentID]?.children.push(map[item.MenuID])
    );
    return roots;
  };
  
  const handleNavigation = (menuName) => {
    if (menuName === "Item Master Entry") navigate("/item-master");
    
    // ✅ EXIT MENU HANDLING
  else if (menuName === "Exit") {
    navigate("/");          // go to dashboard
  }

  setOpen(false);           // close drawer};
 };
  const renderMenu = (items, isSubMenu = false, parentMenuId = null) =>
    items.map((item, index) => (
      <div key={item.MenuID}>
        {isSubMenu && SUBMENU_DIVIDERS[parentMenuId]?.includes(index) && (
          <Divider sx={{ my: 1, backgroundColor: (theme) => theme.palette.divider }} />
        )}

        <ListItemButton
          onClick={() => (item.children.length ? toggle(item.MenuID) : handleNavigation(item.MenuName))}
          sx={{ pl: isSubMenu ? 4 : 2 }}
        >
          {/* <ListItemText primary={item.MenuName} sx={{ color: "white" }} /> */}
         <ListItemText primary={item.MenuName} />

         {item.children.length > 0 &&
            (openItems[item.MenuID] ? <ExpandLess sx={{ color: 'text.secondary' }} /> : <ExpandMore sx={{ color: 'text.secondary' }} />)}
        </ListItemButton>

        {item.children.length > 0 && (
          <Collapse in={openItems[item.MenuID]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenu(item.children, true, item.MenuID)}
            </List>
          </Collapse>
        )}
      </div>
    ));

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      // PaperProps={{
      //   sx: { width: 280, backgroundColor: "#1e293b", color: "white" },
      // }}
     PaperProps={{
  sx: (theme) => ({
    width: 280,
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  }),
}}


    >
      <List>{renderMenu(menuData)}</List>
    </Drawer>
  );
};

export default MenuDrawer;
