import React from 'react'
import openAi from '../../assets/openai.png'
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message:string){
if(message.includes("```")){
  const blocks=message.split("```");
  return blocks
}
}

function isCodeBlock(str: string) {
  if (
    str.includes(">") ||
    str.includes("<") ||
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({content,role}:{content:string,role:"user"|"assistant" }) => {
const messageBlocks = extractCodeFromString(content)
  const auth =  useAuth();

  return role==="assistant"?(
  <div className="w-full flex p-4 bg-[#004d5612]">
  <div className='avatar border text-center h-10 w-10 py-1 rounded-[50%] text-black bg-white font-bold'>
    <img src={openAi} alt="openAi" width={"30px"} className='ml-1' />
   </div>
   <div className='ml-4 w-[80%]'>
   {!messageBlocks && (
          <h2 className='text-[20px]'>{content}</h2>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={ oneDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <h2 className='text-[20px]'>{block}</h2>
            )
          )}


   </div>
  </div>
  ):(
    <div className="flex p-4 bg-[#004d56] ">
    <div className='avatar text-center h-10 w-10 py-1 rounded-[50%] text-white bg-black font-bold'>
    {auth?.user?.name[0]}
    {auth?.user?.name.split(" ")[1][0]}
     </div>
     <div>
      <h2 className='text-white ml-2 text-[20px]'>{content}</h2>
     </div>
    </div>
  );
}

export default ChatItem
