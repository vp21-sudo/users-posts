import express from "express"
import dotenv from "dotenv"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { mongoConnect } from "./utils/mongo-connect.mjs";
import { createUser, deleteUser, getUser, getUserId, updateUser } from "./model/user-model.mjs";
import { createPost, deletePost, getAllPosts, getUserPosts, updatePosts } from "./model/post-model.mjs";
import userRouter from "./routes/user-routes.mjs";
import postRouter from "./routes/post-routes.mjs";
dotenv.config();
const app = express()

const port = process.env.PORT || 4000
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use('/public', express.static(__dirname + '/public', { extensions: ['css'] }));
app.use(express.urlencoded({ extended: true })); 
app.use(userRouter)
app.use(postRouter)
//await the MongoDB Connection
await mongoConnect()
// await createUser("test user", "vishwa1@gmail.com")
// await getUserId("vishwa1@gmail.com")
// await updateUser("test user new", "vishwa@gmail.com")

// await getUser("vishwa@gmail.com")

// await deleteUser("vishwa@gmail.com")

// const user_id = await getUserId("vishwa@gmail.com")
// await createPost("test post", "test content", "test type", user_id)

// await getAllPosts()

// await getUserPosts(user_id)

// const post_id = new Object("652aae83e877f79e80c1ab53")
// await updatePosts(post_id, "test post update 2", "test content update 2",)

// await deletePost(post_id)
app.listen(port, ()=>{
    console.log("Server running on port " + port)
})