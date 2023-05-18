import mongoose from "mongoose";
 
const {Schema , model} = mongoose;
const userSchema = new Schema(
    {
     firstName: {
            type: String,
            required : true
        },

    lastName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    date:{
        type:Date,
        default:Date.now
    },
    verified:{
        type: String,
        default: "false"
    },

    activationCode:{
        type:String,
    } ,
    profilPic:{
        type: String,
        default: "",
        required: false
    }

});
export default model ("user",userSchema);