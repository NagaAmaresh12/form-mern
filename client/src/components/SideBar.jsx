import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="">
      <Button
        asChild
        variant={"outline"}
        className={"bg-zinc-900 w-full mb-2 hover:scale-105"}
      >
        <Link to={"/projects"}>Projects</Link>
      </Button>
      <Button
        asChild
        variant={"outline"}
        className={"bg-zinc-900 w-full hover:scale-105"}
      >
        <Link to={"/profile"}>Profile</Link>
      </Button>
    </div>
  );
};

export default SideBar;
