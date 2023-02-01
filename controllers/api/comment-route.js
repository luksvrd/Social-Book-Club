// const router = require("express").Router();
// const withAuth = require("../../utils/auth");
// const { Comment } = require("../../models");

// router.post("/", withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     res.json(newComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const [affectedRows] = await Comment.destroy({
//       where: { id: req.params.id },
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
