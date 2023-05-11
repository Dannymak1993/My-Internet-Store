const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll(); // Retrieve all categories from the database
    res.json(categories); // Send the categories as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id; // Get the category ID from the request parameter
    const category = await Category.findByPk(categoryId); // Find the category by ID in the database
    if (category) {
      res.json(category); // Send the category as JSON
    } else {
      res.status(404).json({ message: 'Category not found' }); // Return a 404 error if the category was not found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { category_name } = req.body; // Retrieve the category_name from the request body
  try {
    const category = await Category.create({ category_name }); // Create a new category in the database
    res.status(201).json(category); // Send the newly created category as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params; // Retrieve the id from the request parameters
  const { category_name } = req.body; // Retrieve the updated category_name from the request body
  try {
    const category = await Category.findByPk(id); // Find the category to update by its primary key (id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' }); // If the category doesn't exist, return a 404 error
    }
    await category.update({ category_name }); // Update the category in the database with the new category_name
    res.json(category); // Send the updated category as JSON in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Retrieve the id from the request parameters
  try {
    const category = await Category.findByPk(id); // Find the category to delete by its primary key (id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' }); // If the category doesn't exist, return a 404 error
    }
    await category.destroy(); // Delete the category from the database
    res.json({ message: 'Category deleted successfully' }); // Send a success message as JSON in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
