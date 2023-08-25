// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MenuItem = require('./models/menuItem');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL).then(conn => console.log("Mongo db connection established"));


app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/menuItems/:id', async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/menuItems', async (req, res) => {
  const { name, category, price } = req.body;

  try {
    const newItem = new MenuItem({
      name,
      category,
      price
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/menuItems/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await MenuItem.findByIdAndDelete(id);
    res.json("Success");
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
