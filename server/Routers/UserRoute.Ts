import express, {Request,Response} from 'express'
const UserRouter=express.Router();
import { PrismaClient } from '@prisma/client';
import {generateCompletion} from "../helper/gpt"
const prisma = new PrismaClient();



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
        const users=await prisma.user.create({
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
         // Correct variable names here
         console.log(req.body)
         console.log(reciverId,typeof(reciverId),senderId,typeof(reciverId))
        const availabelRealtions=await prisma.relations.findFirst({
            where:{
             reciverId:reciverId,
             senderId:senderId
            }
        })
        if(availabelRealtions){
            let relations=availabelRealtions
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
        const { text, textId, conversationsID,date } = req.body;

        const conversationRelation = await prisma.relations.update({
            where: {
                id:conversationsID
              },
              data: {
                conversations:[text,textId,date]
              },

        });
        res.status(200).json({ message: "Conversation created successfully", conversationRelation });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the conversation" });
    }
});

UserRouter.get("/particularConversations/:id",async(req:Request,res:Response)=>{
    try {
        let {paramsid}=req.params;
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