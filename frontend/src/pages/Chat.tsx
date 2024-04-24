import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAuth} from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import {IoMdSend} from 'react-icons/io'
import { deleteChats, getChats, sendChatRequest } from '../helpers/api-communicators';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message ={
  role:"user"|"assistant";
  content:string;
}
const Chat = () => {
 
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    //
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete chats", { id: "deletechats" });
    }
  }


  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getChats()
      .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  
  return (
    <div className='flex flex-1 w-[100%] mt-3 gap-3'>
      <div className='lg:flex md:hidden lg:flex-[0.2] flex-col'>
        <div className='hidden lg:flex w-[100%] h-[80vh] items-center rounded-md bg-[rgb(17,29,39)] flex-col mx-3'>
          <div className='avatar  border text-center h-10 w-10 my-2 py-1 rounded-[50%] text-black bg-white font-bold'>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </div>
          <h2 className='mx:auto'>Ask VerbiX</h2>
          <h2 className='mx-4 mt-10'>"Hey! Great to have you here! Ask away – no question is too big or too small. I'm here to help with anything you need. Fire away!"</h2>
          <button className='w-[200px] mt-32 text-white p-2 rounded-md font-bold border-3 mx-auto bg-[#004d56]' onClick={handleDeleteChats} type='submit'>Clear conversation</button>
        </div>
      </div>
      <div className='flex flex-1 flex-col lg:mx-4'>
        <h2 className='text-center text-[30px] mx-auto text-white mb-3'>Model-GPT 3.5 Turbo</h2>
        <div className='sx:w-[100%] h-[60vh] sx:mx-auto sx:flex sx:flex-col overflow-scroll overflow-x-hidden overflow-y-auto scroll-smooth'>
         {chatMessages.map((chat,index)=>
          <div>
            <ChatItem content={chat.content} role={chat.role} key={index}/>
            </div>
         )}
        </div>
        <div className='w-[100%] p-[9px] rounded bg-[rgb(17,27,39)] flex m-auto'>
          {" "}
        <input type="text" ref={inputRef} name="" id="" className='w-[100%] bg-transparent p-[10px] border-none outline-none text-[20px]'/>
        <button type="submit" onClick={handleSubmit} className='mr-4 text-white'>
          <IoMdSend/>
        </button>
        </div>
      </div>
    </div>
  )
}

export default Chat

