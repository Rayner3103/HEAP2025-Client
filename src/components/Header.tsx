import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "./ui/input";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { token, userEmail } = useContext(AuthContext);
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (target: string) => path === target;

  const handleAvatarClick = () => {
    if (token === "") {
      return navigate("login");
    }
    navigate("profile");
  };

  const isLoggedIn = userEmail && userEmail.length > 1;

  return (
    <header className="sticky top-0 z-50 bg-[#91ABFF]/90 backdrop-blur-md px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-10">
          <h1
            className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate("/")}
          >
            ACADIVERSE
          </h1>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink
                  onClick={() => navigate("/")}
                  className={`text-lg md:text-xl font-semibold transition underline-offset-4 ${
                    isActive("/")
                      ? "text-indigo-600 underline"
                      : "text-gray-700 hover:text-indigo-600 hover:underline"
                  }`}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  onClick={() => navigate("/about-us")}
                  className={`text-lg md:text-xl font-semibold transition underline-offset-4 ${
                    isActive("/about-us")
                      ? "text-indigo-600 underline"
                      : "text-gray-700 hover:text-indigo-600 hover:underline"
                  }`}
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search & Avatar */}
        <div className="flex items-center gap-5">
          <Input
            type="text"
            placeholder="Search"
            className="w-36 md:w-64 rounded-full px-4 py-3 shadow-md text-gray-800 border border-gray-300 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div
            className={`rounded-full p-1 cursor-pointer transition-transform duration-200 ${
              isLoggedIn
                ? "bg-gradient-to-br from-indigo-400 to-pink-500 shadow-md ring-2 ring-indigo-200 hover:scale-110"
                : "bg-gray-300 text-gray-600 ring-1 ring-gray-400 hover:scale-105"
            }`}
            onClick={handleAvatarClick}
          >
            <AvatarIcon
              width="40"
              height="40"
              className={`transition-colors duration-200 ${
                isLoggedIn ? "text-white" : "text-gray-600"
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
