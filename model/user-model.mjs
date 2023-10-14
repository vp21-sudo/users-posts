import mongoose from "mongoose";

/**
 * A user schema
 * @typedef User
 * @property {string} name
 * @property {string} email
 * @property {Date} registeredOn
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    registeredOn: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model('user', userSchema)

const createUser = async (name, email) => {
    if(!name || !email){
        return "INVALID_INPUT"
    }
    try{
        await User.create({
            name:name,
            email:email
        })
    }catch(error){
        if(error.code === 11000){
            return "DUB_EMAIL"
        }
        console.log(error)
    }
}

const getUser = async (email) => {
    if(!email){
        return "INVALID_INPUT"
    }
    try{
        const res = await User.findOne({email:email})
        if(res){
            return {
                name:res.name,
                email:res.email
            }
        }
        return "USER_NOT_FOUND"
    }catch(error){
        console.log(error)
    }
}

const getUserId = async (email) => {
    if(!email){
        return "INVALID_INPUT"
    }
    try{
        const res = await User.findOne({email:email})
        if(res){
            return res._id
        }
        return "USER_NOT_FOUND"
    }catch(error){
        console.log(error)
    }
}
const updateUser = async (name, email) => {
    if(!name || !email){
        return "INVALID_INPUT"
    }
    try{
        const res = await User.updateOne({email:email}, {name:name})
        if(res.modifiedCount === 0){
            return "USER_NOT_FOUND"
        }
        if(res.matchedCount === 1){
            return "USER_UPDATED"            
        }
    }catch(error){
        console.log(error)
    }
}

const deleteUser = async (email) => {
    if(!email){
        return "INVALID_INPUT"
    }
    try{
        const res = await User.deleteOne({email:email})
        if(res.deletedCount === 0){
            return "USER_NOT_FOUND"
        }
        if(res.deletedCount === 1){
            return "USER_DELETED"            
        }
    }catch(error){
        console.log(error)
    }
}


export { createUser, updateUser, getUser, deleteUser, getUserId }
