// [Library Imports]
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// [Modules imports]
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/context/AuthContext";
import PasswordInput from "@/components/password-input";
import { authService } from "@/services/authService";
import * as GeneralUtils from "@/utils/general";
import { useAlertDialog } from "@/context/AlertDialogContext";

// [Exports]
export default function Login() {
  const navigate = useNavigate();
  const { token, setToken, setUserId, setUserEmail, setRole } = useContext(AuthContext);
  // TODO: remove the default values
  const [email, setEmail] = useState("raynersimzhiheng@gmail.com");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { showAlert, showConfirm } = useAlertDialog();

  const handleLogin = async () => {
    // console.log('handle login here!');
    if (!GeneralUtils.validateEmail(email)) {
      showAlert({
        title: "Alert",
        message: "Invalid Email Format",
        onConfirm: () => {},
      });
      return;
    }

    try {
      const res = await authService.login(email, password);
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
          onConfirm: () => {
            navigate("/");
          },
          onCancel: () => {
            navigate('/profile');
          }
        });
      }
    } catch (e: any) {
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

  const routeToCreateAcount = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (token !== '') {
      navigate('/');
    }
  }, [])

  return (
    <div className="bg-[#FAF9E6] min-h-screen flex justify-center p-6">
      <div className="w-full max-w-md bg-[#FAF9E6] p-6 rounded-md space-y-4">
        <h1 className="text-2xl font-bold mb-2">Login</h1>

        {/* Error message */}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        {/* Email Input */}
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-medium text-gray-800">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="rounded-md border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-medium text-gray-800">
            Password
          </Label>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="rounded-md border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm text-blue-600 mt-2">
          <button
            type="button"
            onClick={() => console.log("Forgot Password")}
            className="hover:underline"
          >
            Forgot Password
          </button>
          <button
            type="button"
            onClick={routeToCreateAcount}
            className="hover:underline"
          >
            Create Account
          </button>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleLogin}
          disabled={email.length < 1 || password.length < 1}
          className="w-full mt-4 bg-black text-white font-medium px-4 py-2 rounded-md disabled:opacity-50"
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
