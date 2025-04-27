import express from "express";
import { createClient } from "redis";

const client=createClient();
const app=express();

app.use(express.json());
app.post("/submit",async (req,res)=>{
    const {problemId,userId,code,language}=req.body;

    await client.lPush("submissions",JSON.stringify({problemId,userId,code,language}));
    res.json({
        message:"Submitted received"
    })
    
})

async function startServer(){
    try {
        await client.connect();
        console.log("Connected to redis");

        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        })
        
    } catch (error) {
        console.log("Failed to connect to redis",error);
    }
}

startServer();