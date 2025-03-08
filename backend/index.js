require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { Signup, Login } = require("./controllers/AuthController"); // Import AuthController
const { userVerification } = require("./middlewares/AuthMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Authentication routes
app.post("/signup", Signup);
app.post("/login", Login);
app.post("/", userVerification);


// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching holdings", details: error });
  }
});

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching positions", details: error });
  }
});

// Get all orders
app.get("/allOrders", async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders", details: error });
  }
});

// Create a new order
app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved !");
  } catch (error) {
    res.status(500).json({ error: "Error saving order", details: error });
  }
});

// Update a holding
app.put("/updateHolding", async (req, res) => {
  const { name, qty } = req.body;

  try {
    let holding = await HoldingsModel.findOne({ name });
    if (!holding) {
      return res.status(404).json({ error: "Holding not found" });
    }

    holding.qty += qty;
    await holding.save();
    res.json({ message: "Holding updated successfully", holding });
  } catch (error) {
    res.status(500).json({ error: "Error updating holding", details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
