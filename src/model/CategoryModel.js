import mongoose,{Schema} from "mongoose";

const CategorySchema = new Schema({

    name:{
        type:String,
        require:[true,'Category name is required'], 
    },
    description:{
        type:String,
        require:[true,'Category description is required'], 
    },
    image:{
        type:String,
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    modefiedDate:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    modefiedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})

export default mongoose.models.Category || mongoose.model('Category',CategorySchema)