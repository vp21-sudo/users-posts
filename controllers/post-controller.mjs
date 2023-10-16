import { createPost, deletePost, getAllPosts, getUserPosts, updatePosts } from "../model/post-model.mjs"
import path, { dirname } from 'path'
import { getUserId } from "../model/user-model.mjs"
const projectRoot = process.cwd()
const handlePostDelete = async (req, res) => {
    const {postId, userId, userEmail} = req.body
    const dbRes = await deletePost(postId)
    if(dbRes === "POST_NOT_FOUND"){
        return res.status(400).sendFile(path.join(projectRoot, "./public/errors/postNotFound.html"))
    }
    if(dbRes === "INVALID_INPUT"){
        return res.status(400).sendFile(path.join(projectRoot, "./public/errors/invalid.html"))
    }
    const userPosts = await getUserPosts(userId)
    return res.render("home", {posts:userPosts, email:userEmail})
}

const handleCreatePost = async (req, res) => {
    console.log("handle create post called")
    const {postName, postType, postContent, userEmail} = req.body
    try{
        const userId = await getUserId(userEmail)
        if(userId === "INVALID_INPUT" || userId === "USER_NOT_FOUND"){
            return res.status(400).sendFile(path.join(projectRoot, "./public/errors/invalid.html"))
        }
        await createPost(postName, postContent, postType, userId)   
        const userPosts = await getUserPosts(userId)
        return res.render("home", {posts:userPosts, email: userEmail||""})
    } catch(err){
        console.log(err)
        return res.status(500).sendFile(path.join(projectRoot, "./public/error/error.html"))
    }
}

const handlePostSearch = async (req, res) => {
    const {searchEmail} = req.body
    try{
        const userId = await getUserId(searchEmail)
        const userPosts = await getUserPosts(userId)
        console.log(userPosts)
        return res.render("search", {posts:userPosts, email:searchEmail||""})
    } catch(err){
        console.log(err)
        return res.status(500).sendFile(path.join(projectRoot, "./public/error/error.html"))
    }
}

const handleEditPost = async (req, res) => {
    const {postId, userId, userEmail, postTitle, postContent, postType} = req.body
    const dbRes = await updatePosts(postId, postTitle, postContent, postType, userId)
    if(dbRes === "POST_NOT_FOUND"){
        return res.status(400).sendFile(path.join(projectRoot, "./public/errors/postNotFound.html"))
    }
    if(dbRes === "INVALID_INPUT"){
        return res.status(400).sendFile(path.join(projectRoot, "./public/errors/invalid.html"))
    }
    const userPosts = await getUserPosts(userId)
    return res.render("home", {posts:userPosts, email:userEmail||""})
}

const handleGetAllPosts = async (req, res )=> {
    try{
        const dbRes = await getAllPosts()
        return res.render('allposts', {allPosts: dbRes})
    } catch(err){
        console.log(err)
        res.status(500).sendFile(path.join(projectRoot, "./public/error/error.html"))
    }
}
export {handlePostDelete, handleCreatePost, handlePostSearch, handleEditPost, handleGetAllPosts}