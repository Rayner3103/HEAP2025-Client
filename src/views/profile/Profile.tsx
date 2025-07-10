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
import AlertDialog from "@/components/AlertDialog";
import { useLoading } from "@/context/OverlayContext";

// [Globals]
const textFields = ["name", "organisation", "teleUsername"];
const numberFields = ["age"];
const readOnlyText = ["email"];

// [Exports]
export default function Profile() {
  const { userId, token, setUserId, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInterface.User | null>(null);
  const [updateUser, setUpdateUser] = useState<UserInterface._User>({});
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const { showLoading, hideLoading } = useLoading();

  const handleSignOut = () => {
    setToken("");
    setUserId("");
    navigate("/");
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
      setDialogTitle("Failure");
      setDialogMessage(e.message);
      setOpen(true);
    }
  };

  const handleFieldChange = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValue = e.target.value;
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
      setDialogTitle("Reminder");
      setDialogMessage("No changes made");
      setOpen(true);
      return;
    }
    try {
      const res = await userService.updateUser(userId, updateUser, token);
      if (res && res.status) {
        setDialogTitle("Success");
        setDialogMessage("Update successful!");
        setOpen(true);
        await fetchUser(userId, token);
        setUpdateUser({});
        return;
      }
      setDialogTitle("Failure");
      setDialogMessage("Update failed");
      setOpen(true);
    } catch (e: any) {
      setDialogTitle("Error");
      setDialogMessage(e.message);
      setOpen(true);
    }
  };

  useEffect(() => {
    showLoading();
    if (userId && token) {
      fetchUser(userId, token);
      return;
    }
    navigate('/login');
    hideLoading();
  }, []);

  return (
    <div>
      {user && (
        <>
          {readOnlyText.map((key, i) => (
            <div className="flex flex-row" key={i}>
              <Label className="">{key}: </Label>
              <Input
                value={user[key as keyof UserInterface.User] ?? ""}
                readOnly
              />
            </div>
          ))}

          {textFields.map((key, i) => (
            <div className="flex flex-row" key={i}>
              <Label className="">{key}: </Label>
              <Input
                value={
                  updateUser[key as keyof UserInterface.User] ??
                  user[key as keyof UserInterface.User]
                }
                onChange={(e) => {
                  handleFieldChange(e, key);
                }}
              />
            </div>
          ))}

          {numberFields.map((key, i) => (
            <div className="flex flex-row" key={i}>
              <Label className="">{key}: </Label>
              <Input
                value={
                  updateUser[key as keyof UserInterface.User] ??
                  user[key as keyof UserInterface.User]
                }
                type="number"
                onChange={(e) => {
                  handleFieldChange(e, key);
                }}
              />
            </div>
          ))}

          <div className="flex flex-row">
            <Label className="">Interests: </Label>
            <ChipInput
              setStateFunction={setUpdateUser}
              field="interests"
              initialList={user.interests}
            />
          </div>

          <div className="flex flex-row items-center mb-2">
            <Label className="mr-2">Gender: </Label>
            <Select
              value={updateUser.gender ?? user.gender ?? ""}
              onValueChange={(value) => handleEnumChange("gender", value)}
            >
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
              value={updateUser.nationality ?? user.nationality ?? ""}
              onValueChange={(value) => handleEnumChange("nationality", value)}
            >
              <SelectTrigger className="w-[180px]">
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

          <div>
            <Button onClick={handleUpdateProfile}>Update profile</Button>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </>
      )}

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        message={dialogMessage}
        title={dialogTitle}
      />
    </div>
  );
}
