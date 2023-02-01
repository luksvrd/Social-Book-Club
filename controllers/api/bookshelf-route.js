// const router = Router();
// const withAuth = require('../../utils/auth');
// const { Bookshelf, User } = require('../../models');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newBookshelf = await Bookshelf.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newBookshelf);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.get('/user/bookshelf/:id', async (req, res) => {
//   try {
//     const bookshelfData = await Bookshelf.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const bookshelf = bookshelfData.get({ plain: true });

//     res.render('bookshelf', {
//       ...bookshelf,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const bookshelfData = await Bookshelf.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!bookshlefData) {
//       res.status(404).json({ message: 'No bookshelf found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;