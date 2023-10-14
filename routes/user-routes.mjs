import express from "express"
import path from 'path'
import { handleDeleteUser, handleUserCreate } from "../controllers/user-controller.mjs"

const projectRoot = process.cwd()
const userRouter = express.Router()

userRouter.post("/create-account", handleUserCreate)
userRouter.get("/delete-account-page", (req, res) => {
    res.status(200).sendFile(path.join(projectRoot, "./public/deleteAccount.html"))
})
userRouter.post("/delete-account", handleDeleteUser)

export default userRouter