// [Library Imports]
import { Button } from "@/components/ui/button";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// [Module Imports]
import AuthContext from "@/context/AuthContext";
import * as UserInterface from "@/interface/user";
import { userService } from "@/services/userService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChipInput from "@/components/ChipInput";
import { useAlertDialog } from "@/context/AlertDialogContext";
import { useLoading } from "@/context/OverlayContext";

// [Globals]
const textFields = ["name", "organisation", "teleUsername"];
const numberFields = ["age"];
const readOnlyText = ["email"];

// [Exports]
export default function Profile() {
  const { userId, token, clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useAlertDialog();
  const { showLoading, hideLoading } = useLoading();
  const [user, setUser] = useState<UserInterface.User | null>(null);
  const [updateUser, setUpdateUser] = useState<UserInterface._User>({});

  const handleSignOut = () => {
    clearAuth();
    showConfirm({
      title: "Success",
      message: "You are signed out.",
      okText: "Go to home page",
      cancelText: "Go to log in page",
      onConfirm: () => {
        navigate("/");
      },
      onCancel: () => {
        navigate("/Login");
      },
    });
  };

  const fetchUser = async (id: string, token: string) => {
    try {
      const res = await userService.getUserById(id, token);
      if (res && res.status) {
        setUser(res.data);
        hideLoading();
        return;
      }
    } catch (e: any) {
      showAlert({
        title: "Failure",
        message: e.message,
        onConfirm: () => {},
      });
    }
  };

  const handleFieldChange = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setUpdateUser((prev) => {
      return {
        ...prev,
        [key]: key === 'age' ? Math.min(Math.max(0, Number(e.target.value)), 150) : e.target.value,
      };
    });
  };

  const handleEnumChange = (key: string, value: string) => {
    setUpdateUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (Object.keys(updateUser).length < 1) {
      showAlert({
        title: "Reminder",
        message: "No changes made",
        onConfirm: () => {},
      });
      return;
    }
    showLoading();
    try {
      const res = await userService.updateUser(userId, updateUser, token);
      hideLoading();
      if (res && res.status) {
        showAlert({
          title: "Success",
          message: "Update successful",
          onConfirm: () => {},
        });
        await fetchUser(userId, token);
        setUpdateUser({});
        return;
      }
      showAlert({
        title: "Failure",
        message: "Update failed. Please try again later",
        onConfirm: () => {},
      });
    } catch (e: any) {
      showAlert({
        title: "Failure",
        message: e.message,
        onConfirm: () => {},
      });
    }
  };

  useEffect(() => {
    showLoading();
    if (userId && token) {
      fetchUser(userId, token);
      return;
    }
    navigate("/login");
    return () => {
      hideLoading();
    };
  }, []);

  return (
    <div className="bg-[#FAF9E6] min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-[#91ABFF] mb-8 text-center">
          Your Profile
        </h1>

        {user && (
          <form className="space-y-6">
            {/* Read-only fields */}
            {readOnlyText.map((key, i) => (
              <div className="flex flex-col" key={i}>
                <Label className="mb-1 text-sm font-semibold text-gray-800 capitalize">
                  {key}
                </Label>
                <Input
                  value={user[key as keyof UserInterface.User] ?? ""}
                  readOnly
                  className="mt-1 rounded-xl border border-gray-300 px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
            ))}

            {/* Editable text fields */}
            {textFields.map((key, i) => (
              <div className="flex flex-col" key={i}>
                <Label className="mb-1 text-sm font-semibold text-gray-800 capitalize">
                  {key}
                </Label>
                <Input
                  value={
                    updateUser[key as keyof UserInterface.User] ??
                    user[key as keyof UserInterface.User]
                  }
                  onChange={(e) => handleFieldChange(e, key)}
                  className="mt-1 rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#91ABFF]"
                  placeholder={`Enter your ${key}`}
                />
              </div>
            ))}

            {/* Number fields */}
            {numberFields.map((key, i) => (
              <div className="flex flex-col" key={i}>
                <Label className="mb-1 text-sm font-semibold text-gray-800 capitalize">
                  {key}
                </Label>
                <Input
                  type="number"
                  value={
                    updateUser[key as keyof UserInterface.User] ??
                    user[key as keyof UserInterface.User]
                  }
                  onChange={(e) => handleFieldChange(e, key)}
                  className="mt-1 rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#91ABFF]"
                  placeholder={`Enter your ${key}`}
                />
              </div>
            ))}

            {/* Interests */}
            <div className="flex flex-col">
              <Label className="mb-1 text-sm font-semibold text-gray-800">
                Interests
              </Label>
              <ChipInput
                setStateFunction={setUpdateUser}
                field="interests"
                initialList={user.interests}
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <Label className="mb-1 text-sm font-semibold text-gray-800">
                Gender
              </Label>
              <Select
                value={updateUser.gender ?? user.gender ?? ""}
                onValueChange={(value) => handleEnumChange("gender", value)}
              >
                <SelectTrigger className="w-[200px] mt-1 rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#91ABFF]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UserInterface.Gender).map(([key, value]) => (
                    <SelectItem value={value} key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nationality */}
            <div className="flex flex-col">
              <Label className="mb-1 text-sm font-semibold text-gray-800">
                Nationality
              </Label>
              <Select
                value={updateUser.nationality ?? user.nationality ?? ""}
                onValueChange={(value) =>
                  handleEnumChange("nationality", value)
                }
              >
                <SelectTrigger className="w-[200px] mt-1 rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#91ABFF]">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UserInterface.Nationality).map(
                    ([key, value]) => (
                      <SelectItem value={value} key={key}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).toLowerCase()}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={handleUpdateProfile}
                className="flex-grow bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 rounded-full shadow-lg hover:from-pink-500 hover:to-indigo-500 transition"
              >
                Update Profile
              </Button>
              <Button
                type="button"
                onClick={handleSignOut}
                className="flex-grow bg-gray-600 text-white font-bold py-3 rounded-full shadow-lg hover:bg-gray-700 transition"
              >
                Sign Out
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
