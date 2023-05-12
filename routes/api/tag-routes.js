const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll(); // Retrieve all tags from the database
    res.status(200).json(tags); // Send the tags as JSON
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  // Retrieve the ID from the request parameter
  try {
    const tag = await Tag.findByPk(req.params.id); // Retrieve the tag with the specified ID from the database
    if (!tag) { // If tag is not found, send a 404 response
      res.status(404).json({ message: `Tag with ID not found` });
    } else {
      res.json(tag); // Send the tag as JSON
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update tag name by id
  Tag.update(
    { tag_name: req.body.tag_name },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedTag) => {
      // check if any rows were affected
      if (updatedTag[0] === 0) {
        return res.status(404).json({ message: 'No tag found with this id' });
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.delete('/:id', (req, res) => {
  // delete tag by id
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((deletedTag) => {
      // check if any rows were affected
      if (deletedTag === 0) {
        return res.status(404).json({ message: 'No tag found with this id' });
      }
      res.status(200).json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
