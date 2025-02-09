const express = require("express");
const app = express();
const categoryService = require("../services/categoryService");
const { errorResponse } = require("../utilis/responseError");
// get all categories
async function getAllCategories(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await categoryService.getAllCategories(page, limit);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    errorResponse(res, error);
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
// get category by id
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await categoryService.getCategoryById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// create new category
async function createCategory(req, res) {
  try {
    console.log("Request Body:", req.body);

    const { _id, name, slug, description, image, parentCategory, status } =
      req.body;

    if (!name || !slug || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, slug, description, or image.",
      });
    }

    const categoryData = {
      name,
      slug,
      description,
      image,
      parentCategory: parentCategory || null,
      status: status || "active",
    };

    if (_id) {
      categoryData._id = _id;
    }

    const category = await categoryService.createCategoryService(categoryData);

    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
// update category
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCategory = await categoryService.updateCategory(
      id,
      updateData
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// delete category
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryService.deleteCategory(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
