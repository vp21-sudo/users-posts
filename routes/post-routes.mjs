import express from "express"
import { handleCreatePost, handleGetAllPosts, handlePostDelete, handlePostSearch } from "../controllers/post-controller.mjs"
import path from 'path'
const postRouter = express.Router()

postRouter.post("/delete-post", handlePostDelete)
postRouter.get("/create-post", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "./public/posts/createPost.html"))
})
postRouter.get("/search-post", (req, res) => {
    res.render("search", { posts: [], email: "" })
})
postRouter.post("/search-post", handlePostSearch)
postRouter.post("/create-post", handleCreatePost)
postRouter.get("/edit-post", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "./public/posts/createPost.html"))
})


postRouter.get("/get-all-posts", handleGetAllPosts)

export default postRouter