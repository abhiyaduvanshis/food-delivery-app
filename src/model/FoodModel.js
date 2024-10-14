import mongoose,{Schema} from "mongoose";

const FoodSchema = new Schema({

    restaurant:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    foodCat:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    name:{
        type:String,
        require:[true,'Food name is required'], 
    },
    description:{
        type:String,
        require:[true,'Food description is required'], 
    },
    image:{
        type:String,
    },
    price:{
        type:String,
        require:[true,'Food price is required'], 
    },
    offerPrice:{
        type:String,
    },
    available:{
        type:Boolean
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

export default mongoose.models.Food || mongoose.model('Food',FoodSchema)