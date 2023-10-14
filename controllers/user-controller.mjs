import { createUser, deleteUser, getUserId } from "../model/user-model.mjs"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { getUserPosts } from "../model/post-model.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = process.cwd()
const handleUserCreate = async (req, res) => {
    console.log("user create request received")
    const {userName, userEmail} = req.body
    console.log(userName, userEmail)
    try{
        const dbRes = await createUser(userName, userEmail)
        if(dbRes === "INVALID_INPUT"){
            return res.status(400).sendFile(path.join(projectRoot, "./public/errors/invalid.html"))
        }
        const userId = await getUserId(userEmail)
        const userPosts = await getUserPosts(userId)
        return res.render("home", {posts:userPosts, email: userEmail})
    }catch(error){
        console.log(error)
        return res.status(500).sendFile(path.join(projectRoot, "./public/error.html"))
    }
}

const handleDeleteUser = async (req, res) => {
    console.log("delete user called")
    const {userEmail} = req.body
    if(!userEmail){
        return res.status(400).sendFile(path.join(projectRoot, "./public/errors/invalid.html"))
    }
    try{
        const dbRes = await deleteUser(userEmail)
        if(dbRes === "INVALID_INPUT" || dbRes === "USER_NOT_FOUND"){
            return res.status(400).sendFile(path.join(projectRoot, "./public/errors/invalid.html"))
        }
        return res.redirect("/")
    }catch(error){
        console.log(error)
        return res.status(500).sendFile(path.join(projectRoot, "./public/error/error.html"))
    }
}


export {handleUserCreate, handleDeleteUser}