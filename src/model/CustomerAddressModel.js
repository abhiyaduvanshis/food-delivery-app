import mongoose,{Schema} from "mongoose";

const CustomerAddressSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    address:{
        type:String,
        require:true
    },
    addressType:{
        type:String,
        require:true
    }
})


export default mongoose.models.CustomerAddress || mongoose.model('CustomerAddress',CustomerAddressSchema)