import express, {Request,Response} from 'express'
const UserRouter=express.Router();
import { PrismaClient } from '@prisma/client';
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

export default UserRouter