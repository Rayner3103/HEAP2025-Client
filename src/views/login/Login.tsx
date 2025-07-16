import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/context/AuthContext";
import PasswordInput from "@/components/password-input";
import { authService } from "@/services/authService";
import * as GeneralUtils from "@/utils/general";
import { useAlertDialog } from "@/context/AlertDialogContext";
import { useLoading } from "@/context/OverlayContext";

export default function Login() {
  const navigate = useNavigate();
  const { token, setToken, setUserId, setUserEmail, setRole } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  const { showAlert, showConfirm } = useAlertDialog();
  const [email, setEmail] = useState("raynersimzhiheng@gmail.com");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!GeneralUtils.validateEmail(email)) {
      showAlert({
        title: "Alert",
        message: "Invalid Email Format",
        onConfirm: () => {},
      });
      return;
    }
    showLoading();

    try {
      const res = await authService.login(email, password);
      hideLoading();
      if (res && res.status) {
        setToken(res.data.token);
        setUserId(res.data.id);
        setUserEmail(res.data.email);
        setRole(res.data.role);
        showConfirm({
          title: "Success",
          message: "You are signed in.",
          okText: "Go to home page",
          cancelText: 'Go to my profile',
          onConfirm: () => navigate("/"),
          onCancel: () => navigate('/profile'),
        });
      }
    } catch (e: any) {
      hideLoading();
      showAlert({
        title: "Error",
        message: e.message,
        onConfirm: () => {},
      });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const routeToCreateAccount = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (token !== '') {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-full flex justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text mb-6 text-center">
          Login
        </h1>

        {/* Email Input */}
        <div className="flex flex-col">
          <Label className="mb-2 text-sm font-semibold text-gray-800">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <Label className="mb-2 text-sm font-semibold text-gray-800">
            Password
          </Label>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm text-indigo-600 mt-1">
          <button
            type="button"
            onClick={() => console.log("Forgot Password")}
            className="hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded"
          >
            Forgot Password
          </button>
          <button
            type="button"
            onClick={routeToCreateAccount}
            className="hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded"
          >
            Create Account
          </button>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleLogin}
          disabled={email.length < 1 || password.length < 1}
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-extrabold py-3 rounded-full shadow-lg hover:from-pink-500 hover:to-indigo-500 disabled:opacity-50 transition"
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
