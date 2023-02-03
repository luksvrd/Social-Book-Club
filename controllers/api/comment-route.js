const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Comment } = require("../../models");

// Add a route to post a comment on a book and associate it with the user who posted it and the book it was posted on
// route: /api/comments
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // Adding a comment requires the user's id, the book's id, and the comment's text
      id: req.session.user_id,
      book_id: req.body.book_id,
      comment_text: req.body.comment_text,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add route to delete a comment and remove it from the database
// route: /api/comments/:id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
