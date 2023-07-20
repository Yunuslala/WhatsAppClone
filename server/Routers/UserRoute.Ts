import express, {Request,Response} from 'express'
const UserRouter=express.Router();
import { PrismaClient, relations } from '@prisma/client';
import {generateCompletion} from "../helper/gpt"
const prisma = new PrismaClient();
import multer from 'multer';
import cloudinary from '../helper/cloudinaryConfig';
import {User,Relation,Conversation} from "../types/interfaces"       
import { Types } from '@prisma/client/runtime/library';
// const upload = multer({ dest: 'uploads/' });

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error:any, result:any) {console.log(result); });





UserRouter.post('/addUser',async(req:Request,res:Response)=>{
    try {
        const {name,email,picture,About}=req.body;
        const userFindCheck=await prisma.user.findUnique({where:{
            email:email
        }})
        console.log(userFindCheck)
        if(userFindCheck){
            const users=userFindCheck
            return res.status(201).send({"msg":"user already exist",users})
        }
        const userData={
            name,
            email,
            picture,
            About
        }
        const users:User=await prisma.user.create({
            data:userData,
        })
        res.status(201).send({"msg":"user has been created",users})
    } catch (error) {
        console.log("something went wrong",error)
        res.status(500).send({"msg":"something went wrong",error})
    }
})

UserRouter.get('/getUser',async(req:Request,res:Response)=>{
    try {
       
       const Alluser=await prisma.user.findMany()
        res.status(200).send({"msg":"all user has been fetched",Alluser})
    } catch (error) {
        console.log("something went wrong",error)
        res.status(500).send({"msg":"something went wrong",error})
    }
})


UserRouter.post('/chatWithGPT',async(req:Request,res:Response)=>{
    try {
       const {input}=req.body
        const response = await generateCompletion(`${input}`);
        console.log(response)
        res.status(201).send({response})
    } catch (error) {
        console.log("something went wrong",error)
        res.status(500).send({"msg":"something went wrong",error})
    }
})


UserRouter.post("/createRelations", async (req: Request, res: Response) => {
    try {
        const { reciverId, senderId } = req.body;

        const availabelRealtions=await prisma.relations.findFirst({
            where:{
             reciverId:reciverId,
             senderId:senderId
            }
        })
        if(availabelRealtions){
         console.log(reciverId,typeof(reciverId),senderId,typeof(reciverId))

            let relations=availabelRealtions
            return res.status(200).send({'msg':"relations already exist",relations})
        }


        const CheckAgainavailabelRealtions=await prisma.relations.findFirst({
            where:{
             reciverId:senderId,
             senderId:reciverId
            }
        })
        if(CheckAgainavailabelRealtions){
            let relations={
                id:CheckAgainavailabelRealtions.id,
                senderId:CheckAgainavailabelRealtions.reciverId,
                reciverId:CheckAgainavailabelRealtions.senderId,
                conversations:CheckAgainavailabelRealtions.conversations
            }
            console.log("checkagain",senderId,reciverId)
            return res.status(200).send({'msg':"relations already exist",relations})
        }


        const postData = {
            reciverId: reciverId,
            senderId: senderId,
            conversations:[],
        };

        const relations = await prisma.relations.create({
            data: postData
        });
        console.log("relations",relations)
        // Handle the response or send a success message back to the client
        res.status(200).json({ message: "Relation created successfully",  relations });
    } catch (error) {
        // Handle errors appropriately
        console.log(error)
        res.status(500).json({ msg: "An error occurred while creating the relation",error });
    }
});


UserRouter.post("/createConversations", async (req: Request, res: Response) => {
    try {
        const { text, textId, conversationsID, date, type, time } = req.body;
        console.log(text, textId, conversationsID, date, type, time);

        // Fetch the existing conversation relation
        const existingRelation  = await prisma.relations.findFirst({
            where: {
                id: conversationsID
            }
        });
        if(existingRelation==null){
            return res.status(404).send({msg:"relation does not exist check once conversation id"})
        }

        interface MyResponse {
            set: Array<{
              date: string;
              text: string;
              time: string;
              type: string;
              textId: number;
            }> | [];
          }

         
          
          // Access the "set" property and use it as needed
          tput: [{ date: '2023-07-20', text: 'hello', time: '19:18:03', type: 'text', textId: 3 }]          
          
          
          
          
          
          
        // Extract the existing conversations array or initialize it to an empty array if it doesn't exist
        const existingConversations:MyResponse | []= existingRelation?.conversations ?? [];
        console.log("existconversations", existingConversations);
        const response: MyResponse = existingConversations
       console.log(ans)
       const mySet = response.set;
       console.log(mySet); // Ou
        // Append the new conversation data to the existing array
        // const updatedConversations = [
        //     ...existingConversations,
        //     {
        //         text,
        //         textId,
        //         date,
        //         type,
        //         time
        //     }
        // ];
        // console.log(updatedConversations);

        // Update the conversation relation with the new conversations array
        // const conversationRelation = await prisma.relations.update({
        //     where: {
        //         id: conversationsID
        //     },
        //     data: {
        //         conversations: updatedConversations
            
        //     }
        // });

        // console.log(conversationRelation);
        // res.status(200).json({ message: "Conversation created successfully", conversationRelation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while creating the conversation" });
    }
});


UserRouter.get("/particularConversations/:id",async(req:Request,res:Response)=>{
    try {
        let paramsid=req.params.id;
       const id=+paramsid
        let conversationObj=await prisma.relations.findFirst({
            where:{
                id:id
            }
        })
        const conversation=conversationObj?.conversations
        res.status(200).send(conversation)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the conversation" }); 
    }
})


export default UserRouter