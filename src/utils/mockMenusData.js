// mockMenusData.js
const mockMenus = [
  {
    restaurantId: "1066605",
    name: "Haldiram's Restaurant",
    cuisines: ["North Indian","Chaat","Chinese","South Indian","Fast Food","Snacks","Sandwich","Burger","Pizza","Pasta"],
    rating: 4.1,
    costForTwo: 40000,
    deliveryTime: 53,
    items: [
      { id: "1", name: "Paneer Butter Masala", price: 200 },
      { id: "2", name: "Veg Biryani", price: 250 },
      { id: "3", name: "Gulab Jamun", price: 80 },
      { id: "4", name: "Aloo Tikki Chaat", price: 120 },
      { id: "5", name: "Masala Dosa", price: 150 },
      { id: "6", name: "Pav Bhaji", price: 180 },
      { id: "7", name: "Paneer Tikka", price: 220 },
      { id: "8", name: "Veg Pulao", price: 200 },
      { id: "9", name: "Rasgulla", price: 90 },
      { id: "10", name: "Samosa", price: 50 }
    ]
  },
  {
    restaurantId: "61790",
    name: "Sardarji Londonwaley",
    cuisines: ["Indian","North Indian","Punjabi","Chinese","Biryani"],
    rating: 4.1,
    costForTwo: 35000,
    deliveryTime: 25,
    items: [
      { id: "1", name: "Chicken Biryani", price: 300 },
      { id: "2", name: "Butter Chicken", price: 350 },
      { id: "3", name: "Tandoori Roti", price: 50 },
      { id: "4", name: "Paneer Tikka", price: 200 },
      { id: "5", name: "Veg Pulao", price: 180 },
      { id: "6", name: "Dal Makhani", price: 180 },
      { id: "7", name: "Jeera Rice", price: 120 },
      { id: "8", name: "Matar Paneer", price: 220 },
      { id: "9", name: "Gulab Jamun", price: 80 },
      { id: "10", name: "Kadhai Chicken", price: 300 }
    ]
  },
  {
    restaurantId: "811220",
    name: "Mom's Dabba",
    cuisines: ["North Indian"],
    rating: 4.4,
    costForTwo: 40000,
    deliveryTime: 60,
    items: [
      { id: "1", name: "Dal Makhani", price: 180 },
      { id: "2", name: "Jeera Rice", price: 120 },
      { id: "3", name: "Paneer Butter Masala", price: 200 },
      { id: "4", name: "Gajar Halwa", price: 90 },
      { id: "5", name: "Chapati", price: 20 },
      { id: "6", name: "Aloo Gobi", price: 150 },
      { id: "7", name: "Veg Pakora", price: 100 },
      { id: "8", name: "Raita", price: 60 },
      { id: "9", name: "Mix Veg Curry", price: 180 },
      { id: "10", name: "Masala Chai", price: 50 }
    ]
  },
  {
    restaurantId: "577800",
    name: "ITC Aashirvaad Soul Creations",
    cuisines: ["Indian","Pure Veg","Healthy Food","Home Food","South Indian","North Indian","Sweets"],
    rating: 4.4,
    costForTwo: 50000,
    deliveryTime: 20,
    items: [
      { id: "1", name: "Vegetable Stew", price: 250 },
      { id: "2", name: "Idli Sambhar", price: 150 },
      { id: "3", name: "Rava Dosa", price: 180 },
      { id: "4", name: "Gulab Jamun", price: 80 },
      { id: "5", name: "Pongal", price: 200 },
      { id: "6", name: "Veg Cutlet", price: 120 },
      { id: "7", name: "Tomato Rasam", price: 100 },
      { id: "8", name: "Upma", price: 150 },
      { id: "9", name: "Chapati", price: 20 },
      { id: "10", name: "Masala Tea", price: 50 }
    ]
  },
  {
    restaurantId: "902453",
    name: "Moms Dabba",
    cuisines: ["North Indian"],
    rating: 4.2,
    costForTwo: 40000,
    deliveryTime: 44,
    items: [
      { id: "1", name: "Paneer Masala", price: 220 },
      { id: "2", name: "Veg Biryani", price: 250 },
      { id: "3", name: "Chole Bhature", price: 180 },
      { id: "4", name: "Dal Fry", price: 150 },
      { id: "5", name: "Lassi", price: 70 },
      { id: "6", name: "Aloo Paratha", price: 180 },
      { id: "7", name: "Veg Sandwich", price: 120 },
      { id: "8", name: "Mixed Veg Curry", price: 200 },
      { id: "9", name: "Raita", price: 60 },
      { id: "10", name: "Jalebi", price: 90 }
    ]
  },
  {
    restaurantId: "129538",
    name: "Rang De Basanti Dhaba",
    cuisines: ["North Indian","Kebabs","Indian","Tandoor"],
    rating: 4.2,
    costForTwo: 30000,
    deliveryTime: 56,
    items: [
      { id: "1", name: "Tandoori Chicken", price: 300 },
      { id: "2", name: "Veg Biryani", price: 220 },
      { id: "3", name: "Paneer Tikka", price: 200 },
      { id: "4", name: "Dal Makhani", price: 180 },
      { id: "5", name: "Roti", price: 20 },
      { id: "6", name: "Kebabs", price: 250 },
      { id: "7", name: "Gulab Jamun", price: 80 },
      { id: "8", name: "Veg Pulao", price: 180 },
      { id: "9", name: "Masala Papad", price: 50 },
      { id: "10", name: "Chai", price: 50 }
    ]
  },
  {
    restaurantId: "213592",
    name: "Khannas",
    cuisines: ["North Indian","Tandoor","Punjabi"],
    rating: 4.3,
    costForTwo: 30000,
    deliveryTime: 51,
    items: [
      { id: "1", name: "Paneer Butter Masala", price: 200 },
      { id: "2", name: "Veg Biryani", price: 250 },
      { id: "3", name: "Roti", price: 20 },
      { id: "4", name: "Dal Fry", price: 150 },
      { id: "5", name: "Butter Chicken", price: 300 },
      { id: "6", name: "Tandoori Roti", price: 50 },
      { id: "7", name: "Paneer Tikka", price: 220 },
      { id: "8", name: "Veg Pulao", price: 180 },
      { id: "9", name: "Gulab Jamun", price: 80 },
      { id: "10", name: "Masala Chai", price: 50 }
    ]
  },
  {
    restaurantId: "619503",
    name: "Litti Heist",
    cuisines: ["North Indian","Bihari"],
    rating: 4.3,
    costForTwo: 20000,
    deliveryTime: 29,
    items: [
      { id: "1", name: "Litti Chokha", price: 150 },
      { id: "2", name: "Sattu Paratha", price: 120 },
      { id: "3", name: "Dal Fry", price: 150 },
      { id: "4", name: "Paneer Butter Masala", price: 200 },
      { id: "5", name: "Jeera Rice", price: 120 },
      { id: "6", name: "Gajar Halwa", price: 90 },
      { id: "7", name: "Chapati", price: 20 },
      { id: "8", name: "Mixed Veg Curry", price: 180 },
      { id: "9", name: "Masala Chai", price: 50 },
      { id: "10", name: "Samosa", price: 50 }
    ]
  },
  {
    restaurantId: "18973",
    name: "Nandhana Palace",
    cuisines: ["Biryani","Andhra","South Indian","North Indian"],
    rating: 4.4,
    costForTwo: 50000,
    deliveryTime: 16,
    items: [
      { id: "1", name: "Chicken Biryani", price: 300 },
      { id: "2", name: "Mutton Biryani", price: 350 },
      { id: "3", name: "Veg Biryani", price: 220 },
      { id: "4", name: "Paneer Butter Masala", price: 200 },
      { id: "5", name: "Raita", price: 60 },
      { id: "6", name: "Tandoori Roti", price: 50 },
      { id: "7", name: "Dal Fry", price: 150 },
      { id: "8", name: "Chicken Curry", price: 300 },
      { id: "9", name: "Gulab Jamun", price: 80 },
      { id: "10", name: "Masala Tea", price: 50 }
    ]
  },
  {
    restaurantId: "382537",
    name: "Ambersar by Enoki",
    cuisines: ["North Indian","Mughlai","Biryani"],
    rating: 4.3,
    costForTwo: 70000,
    deliveryTime: 58,
    items: [
      { id: "1", name: "Paneer Butter Masala", price: 200 },
      { id: "2", name: "Chicken Biryani", price: 300 },
      { id: "3", name: "Mutton Korma", price: 350 },
      { id: "4", name: "Tandoori Chicken", price: 300 },
      { id: "5", name: "Dal Makhani", price: 180 },
      { id: "6", name: "Naan", price: 40 },
      { id: "7", name: "Veg Pulao", price: 180 },
      { id: "8", name: "Paneer Tikka", price: 220 },
      { id: "9", name: "Gulab Jamun", price: 80 },
      { id: "10", name: "Masala Chai", price: 50 }
    ]
  }
];

export default mockMenus;
