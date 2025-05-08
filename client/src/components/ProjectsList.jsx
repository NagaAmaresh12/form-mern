import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "@/features/projects/projectThunk";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchAllProjects())
      .unwrap()
      .then((res) => {
        console.log("Fetched projects:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        toast.error("Error fetching projects");
      });
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    );
  }

  if (status === "error") {
    return <h1>{error || "Failed to load projects"}</h1>;
  }

  return (
    <div className="w-full relative flex justify-center py-5 mt-4">
      <DropdownMenu>
        <div className="w-[80vw] relative">
          <DropdownMenuTrigger asChild>
            <Button className="w-full justify-between border border-zinc-900 bg-white py-6">
              Projects
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="bg-white mt-1 w-[80vw] flex flex-col justify-center"
            align="start"
          >
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
                <DropdownMenuItem
                  asChild
                  key={project._id}
                  className={"hover:cursor-pointer bg-white"}
                >
                  <Link
                    className=" hover:bg-zinc-200 my-2"
                    to={`/projects/${project._id}`}
                  >
                    {project.projectTitle}
                  </Link>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                No projects available
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default ProjectsList;
