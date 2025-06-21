import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export function SignIn() {
  const tokencheck = localStorage.getItem('authtoken')
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tokencheck) {
      navigate('/dashboard/home')
    }
  }, [tokencheck]);

const validationSchema = Yup.object().shape
({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters long.").required("Password is required"),
});

  const authenticator = async (event) => {
     event.preventDefault()

   
    try{
       setLoader(true)
     await validationSchema.validate({ email, password: pass } );
    const response = await fetch("https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: email, password: pass }),
    })
    const validate = await response.json();
    console.log(validate)
    console.log(validate)
    if (validate.success === true) {
       navigate('/dashboard/area')
      const token = validate.result.token;
      localStorage.setItem('authtoken', token)
     
      setError('')
      setLoader(false)
    }
    else {
      setLoader(false)
      if (validate.errors?.password) {
        setError(validate.errors.password[0]);
      } else if (validate.errors?.email) {
        setError(validate.errors.email[0]);
      } else {
        setError("Login failed. Please try again.");
      }
      
    }
  
    
  
  }
  catch(validationError){
     setLoader(false)
setError(validationError.message);
 console.log(validationError.password)
  }
    console.log(error)
  }
  
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              value={email}
              onChange={(event) => { setEmail(event.target.value) }}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              value={pass}
              type="password"
              onChange={(event) => { setPass(event.target.value) }}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
              {/* <p className="text-red-700">{validate.errors.password}</p> */}

            <p className="text-red-700">{error}</p>
          </div>
          <Button className='mt-6 ' onClick={authenticator} fullWidth disabled={loader}>

            {loader ? "Signing in..." : "Sign In"}
            {loader && (
              <svg
                className="animate-spin h-3 w-3 ml-2 mb-1 inline-block text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
          </Button>
        </form>
      </div>
      <div>
        <img src="/img/pattern.png" className="rounded rounded-lg sm:block hidden" alt="" />
      </div>
    </section>
  );
}

export default SignIn;    