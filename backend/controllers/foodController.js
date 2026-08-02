import foodModel from "../models/FoodModel.js";
import cloudinary from "../config/cloudinary.js";

// Add Food
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "Please upload an image",
      });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path, // Cloudinary URL
    });

    await food.save();

    res.json({
      success: true,
      message: "Food Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error Adding Food",
    });
  }
};

// List Food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error Fetching Foods",
    });
  }
};

// Remove Food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({
        success: false,
        message: "Food Not Found",
      });
    }

    // Delete image from Cloudinary
    if (food.image) {
      const publicId = req.body.public_id || null;

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food Removed Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error Removing Food",
    });
  }
};

export { addFood, listFood, removeFood };