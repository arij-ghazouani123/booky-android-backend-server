import mongoose from "mongoose";
const {Schema , model} = mongoose;

const ConversationSchema = new Schema(
  {
    lastMessage : {type: String}, 
    lastMessageDate : {type: Date}, 
    sender : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    receiver : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

export default model ("Conversation", ConversationSchema);