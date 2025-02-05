import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Section"
    },
    code: {
        type: String,
        trime:true
    },

    topicName: {
         type: String,
        trime:true
    }
   
    
});


const Topic = mongoose.model("Topic", topicSchema);

export default Topic