import Message from "../models/MessagesModel.js";
import {mkdirSync, renameSync} from "fs";

export const getMessages = async (req, res) => {
    try{
        const user1 = req.userId;
        const user2 = req.body.id;
        
        if(!user1 || !user2){
            return res.status(400).send("Both user ID's are required")
        }

        const messages = await Message.find({
            $or:[
                {sender:user1, recipient:user2},{sender:user2, recipient:user1}
            ]
        }).sort({timestamp: 1})

        if(messages.length > 0){
            return res.status(200).json({messages})
        }

        return res.status(200)

       

    } catch(err){
        console.log("error while logout", err);
        return res.status(500).send("Internal Server error");
    }
}


export const uploadFile = async (req, res) => {
    try{
        
        if(!req.file){
            return res.stauts(400).send("File is required")
        }

        const date = Date.now();

        let fileDir = `uploads/files/${date}`;
        // console.log(fileDir);
        let fileName = `${fileDir}/${req.file.originalname}`;
        // console.log(fileName)

        mkdirSync(fileDir,{recursive: true});

        renameSync(req.file.path, fileName);

        return res.status(200).json({filePath: fileName})
        

    } catch(err){
        console.log("error while logout", err);
        return res.status(500).send("Internal Server error");
    }
}