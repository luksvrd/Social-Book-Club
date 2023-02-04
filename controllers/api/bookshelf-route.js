const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Bookshelf, Book } = require("../../models");

// ****************** Bookshelf Routes ******************
// route to get bookshelf by user id
router.get("/:user_id", withAuth, async (req, res) => {
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

// Add a route to get all the user's bookshelves
// route will be /api/bookshelf
// router.get("/", withAuth, async (req, res) => {
//   try {
//     const bookshelfData = await Bookshelf.findAll({
//       where: {
//         id: req.params.id,
//         // user_id: req.session.user_id will be the id of the user that is logged in
//         user_id: req.session.user_id,
//       },
//     });

//     res.status(200).json(bookshelfData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Add a route to get a single bookshelf
// router.get("/:id", withAuth, async (req, res) => {
//   try {
//     const bookshelfData = await Bookshelf.findOne({
//       where: {
//         id: req.params.id,
//         // user_id: req.session.user_id will be the id of the user that is logged in
//         user_id: req.session.user_id,
//       },
//     });

//     if (bookshelfData) {
//       res.status(200).json(bookshelfData);
//     } else {
//       res.status(404).end({ message: "No bookshelf found with this id!" });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Add a route to create a new bookshelf
// router.post("/", withAuth, async (req, res) => {
//   try {
//     const newBookshelf = await Bookshelf.create({
//       ...req.body,
//       // uesr_id: req.session.user_id will be the id of the user that is logged in so that the bookshelf is associated with the user
//       user_id: req.session.user_id,
//       // bookshelf_name: req.body.bookshelf_name will be the name of the bookshelf that the user wants to create
//       bookshelf_name: req.body.bookshelf_name,
//     });

//     res.status(200).json(newBookshelf);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Way to update booksh contents on front end
// Add a route to update a bookshelf
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [bookshelfData] = await Bookshelf.update(req.params.id, {
      where: {
        // id: req.params.id will be the id of the bookshelf that the user wants to update
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
