import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";
import AuthContext from "@/context/AuthContext";

import * as GeneralUtils from "@/utils/general";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords does not match!");
      return;
    }
    setErrorMessage('');  
  }, [password, confirmPassword])

  useEffect(() => {
    if (GeneralUtils.validateEmail(email)) {
      setErrorMessage('');
    } else {
      setErrorMessage("Invalid Email");
    }
  }, [email])

  const handleSignUp = () => {
    if (GeneralUtils.validateEmail(email)) {
      setErrorMessage("Invalid Email");
    }
    console.log('handle signup here!')
  }
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  return (
    <div>
      <Label>Create Account</Label>
      <Label className="text-red-400">{errorMessage}</Label>
      <Input placeholder="Email" onChange={handleEmailChange} value={email} type='email'/>
      <PasswordInput placeholder="Password" onChange={handlePasswordChange} value={password}/>
      <PasswordInput placeholder="Confirm Password" onChange={handleConfirmPasswordChange} value={confirmPassword}/>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  )
}