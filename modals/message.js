import mongoose from "mongoose";
const {Schema , model} = mongoose;

const MessageSchema = new Schema(
  {
    description: { type: String },
    date: { type: Date, default: Date.now },
    senderConversation : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    },
    receiverConversation : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

export default model ("Message", MessageSchema);