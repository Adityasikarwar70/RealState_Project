import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from "../firebase";
import {useDispatch} from 'react-redux'
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogle= async ()=>{
    
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider)
            // console.log(result);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({name:result.user.displayName, email:result.user.email, photo:result.user.photoURL})
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

            
        } catch (error) {
            console.log("Could not signIn with google",error);
        }
    }


  return (
    <button onClick={handleGoogle} type="button" className=" w-[25vw] md:w-[10vw] bg-zinc-300 hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex  items-center justify-center gap-2">
       Continue <FcGoogle className=" text-lg"/> 
    </button>
  )
}

export default OAuth
