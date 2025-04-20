import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/heroimage.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search/${searchText}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%] ">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Food at your fingertips, anytime, anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Delicious food is calling your name—always fresh, always near.
          </p>
        </div>
        <div className="relative flex items-center gap-2 ">
          <Input
            type="text"
            value={searchText}
            placeholder="Search restaurant by name, city, and country"
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 shadow-lg"
          ></Input>
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button
            onClick={handleSearch}
            className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-gray-800"
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <img
          src={HeroImage}
          alt=""
          className="object-cover w-full max-h-[500px] "
        />
      </div>
    </div>
  );
};

export default HeroSection;
