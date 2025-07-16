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
import { useLoading } from "@/context/OverlayContext";
import { useAlertDialog } from "@/context/AlertDialogContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState(UserInterface.Gender.MALE);
  const [nationality, setNationality] = useState(
    UserInterface.Nationality.CITIZEN
  );
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { showAlert, showConfirm } = useAlertDialog();

  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
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
    showLoading();
    const user = {
      email,
      password,
      nationality,
      gender,
      role: UserInterface.Role.USER,
    };
    try {
      const res = await userService.createUser(user);
      hideLoading();
      if (res && res.status) {
        showConfirm({
          title: "Success",
          message: "Signed up successfully.",
          okText: "Go to log in page",
          cancelText: 'Go to home page',
          onConfirm: () => navigate("/login"),
          onCancel: () => navigate('/home'),
        });
        return;
      }
    } catch (e: any) {
      hideLoading();
      setErrorMessage(e.message || "An error occurred");
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
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text text-center">
          Create Account
        </h1>

        {errorMessage && (
          <p className="text-center text-red-500 font-semibold">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col space-y-4">
          <div>
            <Label className="mb-1 text-sm font-semibold text-gray-800">
              Email
            </Label>
            <Input
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
              type="email"
              className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <Label className="mb-1 text-sm font-semibold text-gray-800">
              Password
            </Label>
            <PasswordInput
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
              className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <Label className="mb-1 text-sm font-semibold text-gray-800">
              Confirm Password
            </Label>
            <PasswordInput
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Label className="mr-4 text-gray-800 font-semibold">
                Gender:
              </Label>
              <Select
                value={gender}
                onValueChange={(value) =>
                  setGender(value as UserInterface.Gender)
                }
              >
                <SelectTrigger className="w-[180px] rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 transition">
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

            <div className="flex items-center">
              <Label className="mr-4 text-gray-800 font-semibold">
                Nationality:
              </Label>
              <Select
                value={nationality}
                onValueChange={(value) =>
                  setNationality(value as UserInterface.Nationality)
                }
              >
                <SelectTrigger className="w-[180px] rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 transition">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UserInterface.Nationality).map(
                    ([key, value]) => (
                      <SelectItem value={value} key={key}>
                        {key.charAt(0) + key.slice(1).toLowerCase()}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSignUp}
            disabled={
              password === "" || email === "" || password !== confirmPassword
            }
            className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-extrabold py-3 rounded-full shadow-lg hover:from-pink-500 hover:to-indigo-500 disabled:opacity-50 transition"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
