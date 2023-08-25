const mongoose = require('mongoose');

const validCategories = ['mains', 'appetizer', 'dessert', 'clone', 'weird']

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  category: {
    type: String,
    required: true,
    enum: validCategories,
  },
  label: String,
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return Number.isFinite(value);
      },
      message: props => `${props.value} is not a valid price.`,
    },
  },
  original_price: Number,
  description: String,
});

menuItemSchema.pre('save', function (next) {
  if (this.isNew) {
    this.original_price = this.price;
  }
  next();
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
