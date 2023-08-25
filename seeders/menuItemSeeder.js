const mongoose = require('mongoose');
const MenuItem = require('../models/menuItem');
require('dotenv').config()


const menuItemData = [
  {
    "name": "Uthappizza",
    "image": "https://i.imgur.com/tDnjTXf.jpg",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza"
  },
  {
    "name": "Zucchipakoda",
    "image": "https://i.imgur.com/xkUElXq.jpg",
    "category": "appetizer",
    "label": "",
    "price": "1.99",
    "description": "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce"
  },
  {
    "name": "Vadonut",
    "image": "https://i.imgur.com/anUAlqF.jpg",
    "category": "appetizer",
    "label": "New",
    "price": "1.99",
    "description": "A quintessential ConFusion experience, is it a vada or is it a donut?"
  },
  {
    "name": "ElaiCheese Cake",
    "image": "https://i.imgur.com/c5hBTEW.jpg",
    "category": "dessert",
    "label": "",
    "price": "2.99",
    "description": "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms"
  },
  {
    "name": "Guntur chillies",
    "image": "https://i.imgur.com/Vc9JIXP.jpg",
    "category": "appetizer",
    "label": "Spicy",
    "price": "0.99",
    "description": "Assorted chillies from Guntur"
  },
  {
    "name": "Buffalo Paneer",
    "image": "https://i.imgur.com/pH2tkgk.jpg",
    "category": "appetizer",
    "label": "",
    "price": "5.99",
    "description": "A special type of Paneer made from Buffalo milk"
  },
  {
    "name": "Cherry Tomatoes",
    "image": "https://i.imgur.com/fRy8hjE.jpg",
    "category": "clone",
    "label": "clone",
    "price": "9.99",
    "description": "clone of cherry and tomato"
  },
  {
    "name": "Goat Milk",
    "image": "https://i.imgur.com/zFGPhrI.jpg",
    "category": "weird",
    "label": "weird",
    "price": "1.99",
    "description": "Medicinal Goat Milk"
  },
  {
    "name": "Rose breasted Grosbeak chicken",
    "image": "https://i.imgur.com/RYsqgoo.jpg",
    "category": "appetizer",
    "label": "New",
    "price": "7.99",
    "description": "Roasted rare bird"
  },
  {
    "name": "Toenail Zingy",
    "image": "https://i.imgur.com/IpG3YOT.jpg",
    "category": "appetizer",
    "label": "weird",
    "price": "0.99",
    "description": "Cooked Toenails of various animals"
  }
];

// Connect to the MongoDB database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed the database
const seedDatabase = async () => {
  try {
    for (const item of menuItemData) {
      item.original_price = item.price;
    }
    await MenuItem.insertMany(menuItemData)
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
