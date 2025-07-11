const express = require('express');
const Product = require('./models/Product');
const connectDB = require('./db');
const dotenv = require('dotenv');
const app = express();
const PORT = 3000;

dotenv.config();
connectDB();
app.use(express.json());


app.post("/scan", async (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(400).json({ error: "Barcode is required" });
    }

    try {
        const product = await Product.findOne({ barcode });

        if (!product) {
            return res.status(404).json({ error: "Product not found in DB" });
        }

        res.json({ success: true, product });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while fetching product" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});