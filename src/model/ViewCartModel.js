import mongoose,{Schema} from "mongoose";

const ViewCartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    restId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    cartData:{
        type:String
    },
    price:{
        type:String
    },
    address:{
        type:String
    },
    transactionId:{
        type:String
    },
    status:{
        type:String
    },
    createdDate:{
        type:Date
    }
})

export default mongoose.models.ViewCart || mongoose.model('ViewCart',ViewCartSchema)