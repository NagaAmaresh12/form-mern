import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProject,
  editProject,
  deleteProject,
} from "@/features/projects/projectThunk";
import ProjectForm from "./ProjectForm";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchProject(id)).unwrap();
        console.log("projectdetails response", response);
      } catch (error) {
        toast.error(error.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };
    console.log("id", id);

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);
  const deleteProjectHandler = async (projectId) => {
    try {
      const data = await dispatch(deleteProject(projectId)).unwrap();
      console.log("response in projectdetails", data);

      if (data.success === true) {
        toast.success("Deleted Project");
        navigate("/projects");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete project");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const data = await dispatch(editProject({ id, formData })).unwrap();
      if (data.success === true) {
        toast.success("Project updated successfully!");
        console.log("updated data projectdetails", data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update project");
    }
  };

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (!projects) {
    return <div>Project not found.</div>;
  }

  return (
    <ProjectForm
      defaultValues={projects}
      onSubmit={handleUpdate}
      buttonLabel="Update Project"
      deleteProjectHandler={deleteProjectHandler}
      projectId={id}
    />
  );
};

export default ProjectDetails;
