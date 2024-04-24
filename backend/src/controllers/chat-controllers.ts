import {Request,Response,NextFunction, response} from 'express'
import User from '../models/User.js';
import { configureOpenAI } from '../config/openai-config.js';
import { OpenAIApi ,ChatCompletionRequestMessage } from 'openai';

export const generateChatCompletion = async (req:Request,res:Response,next:NextFunction)=>{
const { message } = req.body;
try {
    const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res.status(401).json({message:"User not registered or token malfunction"});
    //get user chats
    
    const chats =user.chats.map(({role,content})=>({role,content})) as ChatCompletionRequestMessage[];
    chats.push({content:message,role:"user"})
    user.chats.push({content:message,role:"user"})
    
    //send all chats to verbix ai
    
   
const config = configureOpenAI();
const openai = new OpenAIApi(config);

const chatResponse = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chats});
    // console.log("Chat Response:", chatResponse.data);
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({chats:user.chats});
    
    
} catch (error) {
    console.log(error);
 return res.status(500).json({message :"Something went wrong"})  
}
}

export const sendChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res
        .status(200)
        .json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  

