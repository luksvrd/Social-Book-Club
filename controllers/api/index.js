import express from "express";
import bookshelfRoutes from "./bookshelf-routes";
import commentRoutes from "./comment-routes";
import userRoutes from "./user-routes";


const router = express.Router();

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/bookshelves", bookshelfRoutes);

export default router;

