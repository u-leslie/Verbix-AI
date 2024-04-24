import { Link } from "react-router-dom"
type Props ={
    to:string;
    bg:string;
    text:string;
    textColor:string;
    onClick?:()=>Promise<void>;
}

const NavLink = (props:Props) => {
  return <Link className="font-bold mx-2 space-x-1 p-2 text-sm rounded uppercase " onClick={props.onClick} to={props.to} style={{background:props.bg, color:props.textColor}}>{props.text}</Link>
}

export default NavLink
