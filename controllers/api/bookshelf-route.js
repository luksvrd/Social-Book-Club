const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Bookshelf, Book } = require("../../models");

// ****************** Bookshelf Routes ******************
// route to get bookshelf by user id
router.get("/user/:user_id", async (req, res) => {
  try {
    const bookshelfData = await Bookshelf.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.status(200).json(bookshelfData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to to update a bookshelf using user id
router.put("/user/:user_id", async (req, res) => {
  try {
    const [bookshelfData] = await Bookshelf.update(req.body, {
      where: {
        user_id: req.params.user_id,
      },
    });

    if (bookshelfData) {
      res.status(200).json(bookshelfData);
    } else {
      res.status(404).end({ message: "No bookshelf found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a route to delete a book from your bookshelf and render the updated bookshelf
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const bookshelfData = Bookshelf.destroy({
      where: {
        // id: req.params.id will be the id of the bookshelf that the user wants to delete
        id: req.params.id,
      },
    });

    if (bookshelfData) {
      res.status(200).json(bookshelfData);
    } else {
      res.status(404).end({ message: "No bookshelf found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
