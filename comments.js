// Create web server
// 1. Get all comments
// 2. Get comments by id
// 3. Create new comment
// 4. Update comment by id
// 5. Delete comment by id

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// 1. Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
});

// 2. Get comments by id
router.get('/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
});

// 3. Create new comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    postId: req.body.postId,
  });
  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// 4. Update comment by id
router.patch('/:commentId', async (req, res) => {
  try {
    const updatedComment = await Comment.updateOne(
      { _id: req.params.commentId },
      {
        $set: {
          comment: req.body.comment,
        },
      }
    );
    res.json(updatedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// 5. Delete comment by id
router.delete('/:commentId', async (req, res) => {
  try {
    const removedComment = await Comment.remove({
      _id: req.params.commentId,
    });
    res.json(removedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;