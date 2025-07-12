import { ChangeEvent, useContext, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/password-input";

import * as UserInterface from "@/interface/user";
import AuthContext from "@/context/AuthContext";
import * as GeneralUtils from "@/utils/general";
import { userService } from "@/services/userService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState(UserInterface.Gender.MALE);
  const [nationality, setNationality] = useState(UserInterface.Nationality.CITIZEN);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords does not match!");
      return;
    }
    setErrorMessage("");
  }, [password, confirmPassword]);

  const handleSignUp = async () => {
    if (!GeneralUtils.validateEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password length should be more than 6 characters");
      return;
    }
    const user = {
      email,
      password,
      nationality,
      gender,
      role: UserInterface.Role.USER,
    };
    try {
      const res = await userService.createUser(user);
      if (res && res.status) {
        navigate('/login');
        return;
      }
    } catch (e: any) {

    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <Label>Create Account</Label>
      <Label className="text-red-400">{errorMessage}</Label>
      <Input
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        type="email"
      />
      <PasswordInput
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
      <PasswordInput
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
      />
      <div className="flex flex-row items-center mb-2">
        <Label className="mr-2">Gender: </Label>
        <Select value={gender} onValueChange={(value) => setGender(value as UserInterface.Gender)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(UserInterface.Gender).map(([key, value]) => (
              <SelectItem value={value} key={key}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center mb-2">
        <Label className="mr-2">Nationality: </Label>
        <Select
          value={nationality}
          onValueChange={(value) => setNationality(value as UserInterface.Nationality)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select nationality" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(UserInterface.Nationality).map(([key, value]) => (
              <SelectItem value={value} key={key}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleSignUp}
        disabled={
          password === "" ||
          email === "" ||
          password !== confirmPassword
        }
      >
        Sign Up
      </Button>
    </div>
  );
}
