import mongoose,{Schema} from "mongoose";

const BrandSchema =  new Schema({
    name:{
        type:String,
        require:[true,'Brand name is required'], 
    },
    description:{
        type:String,
        require:[true,'Brand description is required'], 
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

export default mongoose.models.Brand || mongoose.model('Brand',BrandSchema)