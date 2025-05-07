import { Button } from "@/components/ui/button";
import { fetchAllProjects } from "@/features/projects/projectThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineCreateNewFolder } from "react-icons/md";
const ProjectsList = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const { role } = useSelector((state) => state.auth.user);

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

  if (status === "loading")
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1.2 -translate-y-1/2">
        Loading...
      </div>
    );
  if (status === "error") return <h1>{error || "Failed to load projects"}</h1>;

  return (
    <div className="relative flex flex-col mt-4 items-start  w-full overflow-hidden ">
      {role === "admin" && (
        <div className="h-12 w-full flex justify-end items-center px-5  ">
          <Button variant={"outline"} asChild className={" text-md  bg-white "}>
            <Link to={"/projects/new"}>
              Create New <MdOutlineCreateNewFolder />
            </Link>
          </Button>
        </div>
      )}
      <div className=" w-full flex flex-wrap ">
        {console.log("state is", projects)}
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={project._id || index}
              className="h-32 w-full p-4 bg-white shadow-md rounded-lg m-4"
            >
              <h2 className="text-xl font-bold">{project.projectTitle}</h2>
              <p className="text-gray-700">{project.description}</p>
              <Button
                asChild
                className="mt-2 text-white bg-zinc-900"
                variant="outline"
              >
                <Link to={`/projects/${project._id}`}>Open</Link>
              </Button>
            </div>
          ))
        ) : (
          <div className="h-[85vh] w-full flex items-center justify-center">
            <h1 className="text-center w-full text-zinc-500">
              No projects found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
