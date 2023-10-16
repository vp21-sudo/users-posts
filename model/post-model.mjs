import mongoose, { Mongoose } from "mongoose";

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postContent: {
        type: String,
        required: true,
    },
    postType:{
        type: String,
        required: true,
    },
    postAuthor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true,
    },
    postDate: {
        type: Date,
        default: Date.now,
    }
})

const Post = mongoose.model('posts', postSchema)



const createPost = async (postTitle, postContent, postType, postAuthor) => {
    if(!postTitle || !postContent || !postType || !postAuthor){
        return "INVALID_INPUT"
    }
    try{
        const res = await Post.create({
            postTitle:postTitle,
            postContent:postContent,
            postType:postType,
            postAuthor:postAuthor
        })
    }catch(error){
        
        if(error._message === "posts validation failed" && error.errors.postAuthor.kind === "ObjectId"){
            return "INVALID_USER"
        }
        console.log(error)
    }
}

const getAllPosts = async () => {
    try{
        const res = await Post.find().populate("postAuthor").exec()
        return res
    } catch(error){
        console.log(error)
    }

}
const getUserPosts = async (userId) => {
    try{
        const res = await Post.find({postAuthor:userId})
        return res
    } catch(error){
        console.log(error)
        throw error
    }
}

const updatePosts = async(postId, postTitle, postContent, postType, postAuthor) =>{
    if(!postId){
        return "INVALID_INPUT"
    }
    try{
        const res = await Post.updateOne({_id:postId}, {postTitle:postTitle, postContent:postContent, postType:postType, postAuthor:postAuthor})
        if(res.modifiedCount === 0){
            return "POST_NOT_FOUND"
        }
        if(res.matchedCount === 1){
            return "POST_UPDATED"
        }
    }catch(error){
        console.log(error)
    }
}

const deletePost = async (postId) => {
    if(!postId){
        return "INVALID_INPUT"
    }
    try{
        const res = await Post.deleteOne({_id:postId})
        if(res.deletedCount === 0){
            return "POST_NOT_FOUND"
        }
        if(res.deletedCount === 1){
            return "POST_DELETED"
        }
    }catch(error){
        console.log(error)
    }
}

const searchUserPost = async (useEmail) => {
    if(!useEmail){
        return "INVALID_INPUT"
    }
    try{
        const res = await Post.find({postAuthor:useEmail})
        return res
    }catch(error){
        console.log(error)
        return "INVALID_INPUT"
    }
}


export {createPost, getAllPosts, getUserPosts, updatePosts, searchUserPost, deletePost}