import Section from "../model/sectionSchema.js";
import Topic from "../model/topicSchema.js";

export const sectionController = async (req,res) => {
    try {
        const { language, name, topic } = req.body;



        if(!language) return res.status(400).json({message:"Please Enter Language"})
        if(!name) return res.status(400).json({message:"Please select section name"})
       
        
        const sectionRef = new Section({ language, name });

        const result = await sectionRef.save();

        return res.status(201).json({
            message: "section added",
            result
        })
        
    } catch (error) {
        console.log(`error in post ctrl ${error.message}`)
        return res.status(400).json({message:"server error"})
    }
}

export const topicController = async (req,res) => {
    try {
        const { topicName, code, id, language } = req.body;
  
        const sectionName = await Section.findOne({ language, _id: id });

        sectionName.topics.push(topicName);

        await sectionName.save();

        const topicRef = new Topic({ language, section: sectionName._id, code,topicName });

        await topicRef.save();

        return res.status(200).json({message:"Topic added",topicRef})

        


     
        
    } catch (error) {
        console.log(`error in post ctrl ${error.message}`)
        return res.status(400).json({message:"server error"})
    }
}


export const getPostByLanguage = async (req,res) => {
    try {
        const { limit } = req.body;
        const { language } = req.params;
  
        const posts = await Section.find({ language }).limit(10)
        
    


      if(!posts) return res.status(400).json({message:"No posts"})
        return res.status(200).json(posts)
        
    } catch (error) {
        console.log(`error in post ctrl ${error.message}`)
        return res.status(400).json({message:"server error"})
    }
}

export const getTopicsByTopicName = async (req, res) => {
    try {
        let { topicName, language } = req.params;
        
 
        topicName = topicName.replaceAll("-", " ").toLowerCase();


        if (!topicName) return res.status(400).json({ message: "give us topic name" });

        const topicData = await Topic.findOne({ language, topicName });

        if (!topicData) return res.status(400).json({ message: "Oops not a topic" });
   
        return res.status(200).json(topicData)


        
    } catch (error) {
         console.log(`error in topic  ctrl ${error.message}`)
        return res.status(400).json({message:"server error"})
    }
}