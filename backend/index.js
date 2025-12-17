require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// SQL CONFIG
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: { encrypt: false, trustServerCertificate: true }
};

// Attach config to req object for routes
app.use((req, res, next) => {
    req.dbConfig = config;
    next();
});

// ROUTES IMPORT
const itemRoutes = require("./routes/itemRoutes");
const dropdownRoutes = require("./routes/dropdownRoutes");

// TEST API
app.get("/", (req, res) => {
    res.send("Backend working 🚀");
});

// MENU API (your ORIGINAL code)
app.get("/api/emp", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT 
                MenuID,
                MenuName,
                ParentID,
                LevelNo,
                Visible
            FROM Emp
            WHERE Visible = 1
            ORDER BY ParentID, MenuID;
        `);

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Menu API Error:", err);
        res.status(500).json({ error: "Failed to load menu" });
    }
});

// ITEMMASTER API
app.use("/api", itemRoutes);
app.use("/api/dropdowns", dropdownRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});



