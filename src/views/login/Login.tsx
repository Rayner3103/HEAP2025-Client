// [Library Imports]
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// [Modules imports]
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/context/AuthContext";
import PasswordInput from "@/components/password-input";
import { authService } from "@/services/authService";
import * as GeneralUtils from '@/utils/general';

// [Exports]
export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUserId, setUserEmail } = useContext(AuthContext);
  // TODO: remove the default values
  const [email, setEmail] = useState('raynersimzhiheng@gmail.com');
  const [password, setPassword] = useState('Password');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // console.log('handle login here!');
    if (!GeneralUtils.validateEmail(email)) {
      setErrorMessage("Invalid Email Format");
      return;
    }

    try {
      const res = await authService.login(email, password);
      if (res && res.status) {
        setToken(res.data.token);
        setUserId(res.data.id);
        setUserEmail(res.data.email);
        navigate('/');
      }
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const routeToCreateAcount = () => {
    navigate('/signup')
  }

  return (
    <div className="">
      <Label>Login</Label>
      <Label className="text-red-400">{errorMessage}</Label>
      <Input placeholder="Email" onChange={handleEmailChange} value={email} type='email'/>
      <PasswordInput placeholder="Password" onChange={handlePasswordChange} value={password}/>
      <Label>Forgot Password</Label>
      <Label onClick={routeToCreateAcount}>Create Account</Label>
      <Button onClick={handleLogin} disabled={email.length<1 || password.length<1}>Log In</Button>
    </div>
  )
}