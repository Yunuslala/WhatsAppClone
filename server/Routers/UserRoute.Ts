import express, {Request,Response} from 'express'
const UserRouter=express.Router();
import { PrismaClient } from '@prisma/client';
import {generateCompletion} from "../helper/gpt"
const prisma = new PrismaClient();



UserRouter.post('/addUser',async(req:Request,res:Response)=>{
    try {
        const {name,email,picture,About}=req.body;
        const userFindCheck=await prisma.user.findUnique({where:{
            email
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


// UserRouter.post("/createRelations",async(req:Request,res:Response)=>{
//     try {
//          const {reciverId,senderID}=req.body;
//          const postData={
//             reciverId,
//             senderID
//          }
//          const relations=await prisma.relations.create({
//             data:postData
//          })
//     } catch (error) {
        
//     }
// })





export default UserRouter