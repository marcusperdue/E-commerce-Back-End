const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tagData = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) { 
      res.status(404).json({ message: 'Tag not found' });
      return;
    } 
    res.status(200).json(tagData);
  } catch (err) { 
    console.error(err);
    res.status(500).json(err);
  }
});


router.post('/',  async (req, res) => {
  try { 
    const newTagData = await Tag.create(req.body); 
    res.status(201).json(newTagData);
  } catch (err) { 
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try { 
    const tagId = req.params.id;
    const updatedTagData = await Tag.update(req.body, {
      where: { id: tagId },
    });

    if (updatedTagData[0] === 0) { 
      res.status(404).json({ message: 'Tag not found' });
      return;
    } 
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) { 
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try { 
    const tagId = req.params.id;
    const deletedTagData = await Tag.destroy({
      where: { id: tagId },
    });

    if (deletedTagData === 0) { 
      res.status(404).json({ message: 'Tag not found' });
      return;
    } 
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) { 
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
