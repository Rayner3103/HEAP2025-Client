import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/context/AuthContext";
import PasswordInput from "@/components/ui/password-input";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    console.log('handle login here!');
    navigate('/');
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
      <Button onClick={handleLogin}>Log In</Button>
    </div>
  )
}