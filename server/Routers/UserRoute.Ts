import express, {Request,Response} from 'express'
const UserRouter=express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


UserRouter.post('/addUser',async(req:Request,res:Response)=>{

    try {
        const {name,email,picture}=req.body;
        const userData={
            name,
            email,
            picture
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

export default UserRouter