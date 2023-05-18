import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bookSchema = new Schema(
    {
      /*  userId: {
            type: String,
            required: false
        },*/
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: false
          },
        title: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        offre: {
            type: String, 
            enum: ['Free', 'Trade'],
            default: 'Free'
        }
    }
   
);

export default model("book", bookSchema);