const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Bookshelf, User } = require("../../models");

router.post("/", withAuth, async (req, res) => {
  try {
    const newBookshelf = await Bookshelf.create({
      ...req.body,
      // uesr_id: req.session.user_id will be the id of the user that is logged in so that the bookshelf is associated with the user
      user_id: req.session.user_id,
      // bookshelf_name: req.body.bookshelf_name will be the name of the bookshelf that the user wants to create
      bookshelf_constent: req.body.bookshelf_content,
    });

    res.status(200).json(newBookshelf);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [bookshelfData] = await Bookshelf.update(req.params.id, {
      where: {
        // id: req.params.id will be the id of the bookshelf that the user wants to update
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (bookshelfData > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const [bookshelfData] = await Bookshelf.destroy({
      where: {
        // id: req.params.id will be the id of the bookshelf that the user wants to delete
        id: req.params.id,
      },
    });

    if (bookshelfData > 0) {
      res.status(200).json(bookshelfData);
    } else {
      res.status(404).end({ message: "No bookshelf found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
