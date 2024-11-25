import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        match:[/.+\@.+\..+/,'Please enter vaild email Id']
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
    },
    phone:{
        type:String,
    },
    city:{
        type:String,
    },
    address:{
        type:String,
    },
    createdDate:{
        type:Date,
    },
    modefiedDate:{
        type:Date,
    },  
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    userRole:{
        type:Number,
    }
})

export default mongoose.models.User || mongoose.model('User',UserSchema)