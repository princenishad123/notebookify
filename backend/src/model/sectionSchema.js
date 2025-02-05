import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required:true
    },
    topics: [
        
    ],
   
    
});


const Section = mongoose.model("Section", sectionSchema);

export default Section