import mongoose,{Schema} from "mongoose";

const RestaurantSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        require:[true,'Name is required']
    },
    description:{
        type:String,
        require:[true,'Description is required'] 
    },
    image:{
        type:String
    },
    city:{
        type:String
    },
    location:{
        type:String
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    modifiedDate:{
        type:Date,
        default:Date.now
    },
    updatedBy:{
        type:String,
    }
    
})

export default mongoose.models.Restaurant || mongoose.model('Restaurant',RestaurantSchema)