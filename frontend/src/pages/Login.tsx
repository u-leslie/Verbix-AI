import React, { useEffect } from 'react'
import { BiLogIn } from "react-icons/bi";
// import robot from '../assets/airobot.png'
import {toast} from 'react-hot-toast'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Logo from '../components/shared/Logo';


const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  
  return (
    <div>
      <div className='w-[100%] h-[100%]'>
        {/* <div className='p-8 mt-4 hidden lg:flex sm:hidden xs:hidden'>
          <img src={robot} alt="" className='w-[300px]' />
        </div> */}
        <div className='flex justify-center p-2 ml-24 lg:ml-auto mt-10 items-center'>
         <div className='lg:mr-0 mr-20  p-4 shadow-lg shadow-black border-none'>
         <div className='ml-20'>
            <Logo/>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
            <h1 className='text-center text-xl p-4 font-bold'>Login</h1>
            <input type="email" name="email" id="" placeholder='Email' className='w-[300px] text-black bg-none text-md p-2 m-2 rounded-sm' />
            <input type="password" name="password" id="" placeholder='Password' className='w-[300px] text-black bg-none text-md rounded-sm p-2 m-2'/>
            <button className='py-2 flex items-center justify-center w-[300px] bg-[#004d56] rounded m-2' type='submit'>
              Login
              <BiLogIn className="mt-[2px]"/>
              </button>
            </form>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Login
