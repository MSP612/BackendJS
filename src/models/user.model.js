import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true   
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, //cloudinary url
        required: true
    },
    coverimage:{
        type: String, //cloudinary url
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type: String
    }

},{timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password",)) return next()

    this.password = bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

User.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

User.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = new mongoose.model("User",userSchema)