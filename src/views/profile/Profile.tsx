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
  const { userId, token, clearAuth} =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useAlertDialog();
  const [user, setUser] = useState<UserInterface.User | null>(null);
  const [updateUser, setUpdateUser] = useState<UserInterface._User>({});
  const { showLoading, hideLoading } = useLoading();

  const handleSignOut = () => {
    clearAuth();
    showConfirm({
      title: "Success",
      message: "You are signed out.",
      okText: "Go to home page",
      cancelText: 'Go to log in page',
      onConfirm: () => {
        navigate("/");
      },
      onCancel: () => {
        navigate('/Login');
      }
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
    const newValue = Math.min(Math.max(0, Number(e.target.value)), 150);
    setUpdateUser((prev) => {
      return {
        ...prev,
        [key]: newValue,
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
    <div className="bg-[#FAF9E6] min-h-screen p-8">
      {user && (
        <form className="max-w-4xl mx-auto space-y-4">
          {/* Read-only fields */}
          {readOnlyText.map((key, i) => (
            <div className="flex flex-col" key={i}>
              <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
                {key}:
              </Label>
              <Input
                value={user[key as keyof UserInterface.User] ?? ""}
                readOnly
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </div>
          ))}

          {/* Editable text fields */}
          {textFields.map((key, i) => (
            <div className="flex flex-col" key={i}>
              <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
                {key}:
              </Label>
              <Input
                value={
                  updateUser[key as keyof UserInterface.User] ??
                  user[key as keyof UserInterface.User]
                }
                onChange={(e) => handleFieldChange(e, key)}
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </div>
          ))}

          {/* Number fields */}
          {numberFields.map((key, i) => (
            <div className="flex flex-col" key={i}>
              <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
                {key}:
              </Label>
              <Input
                type="number"
                value={
                  updateUser[key as keyof UserInterface.User] ??
                  user[key as keyof UserInterface.User]
                }
                onChange={(e) => handleFieldChange(e, key)}
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </div>
          ))}

          {/* Interests */}
          <div className="flex flex-col">
            <Label className="mb-1 text-sm font-medium text-gray-800">
              Interests:
            </Label>
            <ChipInput
              setStateFunction={setUpdateUser}
              field="interests"
              initialList={user.interests}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <Label className="mb-1 text-sm font-medium text-gray-800">
              Gender:
            </Label>
            <Select
              value={updateUser.gender ?? user.gender ?? ""}
              onValueChange={(value) => handleEnumChange("gender", value)}
            >
              <SelectTrigger className="w-[200px] rounded-md border border-gray-300 px-4 py-2">
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

          {/* Nationality */}
          <div className="flex flex-col">
            <Label className="mb-1 text-sm font-medium text-gray-800">
              Nationality:
            </Label>
            <Select
              value={updateUser.nationality ?? user.nationality ?? ""}
              onValueChange={(value) => handleEnumChange("nationality", value)}
            >
              <SelectTrigger className="w-[200px] rounded-md border border-gray-300 px-4 py-2">
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

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={handleUpdateProfile}
              className="bg-black text-white px-6 py-2 rounded-md"
            >
              Update profile
            </Button>
            <Button
              type="button"
              onClick={handleSignOut}
              className="bg-black text-white px-6 py-2 rounded-md"
            >
              Sign out
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
