const Category = require("../models/category.model");
const { handleError } = require("../utilis/handleError");



// get all categories
async function getAllCategories(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const categories = await Category.find({})
    .skip(skip)
    .limit(limit)
    .populate("parentCategory");
  if (!categories) {
    handleError("Error fetching categories", 404);
  }
  const totalCategories = await Category.countDocuments();

  return {
    categories,
    total: totalCategories,
    page,
    limit,
    totalPages: Math.ceil(totalCategories / limit),
  };
}
// get category by id
async function getCategoryById(id) {
  return await Category.findById(id).populate("parentCategory"); // ✅ Fetch category by _id
}
// create new category
async function createCategoryService(data) {
  try {
    const category = new Category(data);
    await category.save();
    console.log("Category created:", category);
    return category;
  } catch (error) {
    console.error("Error saving category:", error.message);
    throw new Error("Error creating category: " + error.message);
  }
}
// update category
async function updateCategory(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }); 
}

// delete category
async function deleteCategory(id) {
  return await Category.findByIdAndDelete(id);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategoryService,
  updateCategory,
  deleteCategory,
};
