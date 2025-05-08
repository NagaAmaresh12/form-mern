// src/features/projects/ProjectDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProject,
  editProject,
  deleteProject,
} from "@/features/projects/projectThunk";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm.jsx";
import { ClipLoader } from "react-spinners";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({ control, name: "projectTeamDetails" });
  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({ control, name: "projectActivities" });

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProject(id))
      .unwrap()
      .then((res) => {
        // make a mutable clone of the fetched data
        const data = JSON.parse(JSON.stringify(res.data));
        // normalize date
        if (data.projectCommencementDate) {
          data.projectCommencementDate = new Date(data.projectCommencementDate)
            .toISOString()
            .split("T")[0];
        }
        reset(data);
      })
      .catch((err) => toast.error(err.message || "Failed to fetch project"))
      .finally(() => setLoading(false));
  }, [dispatch, id, reset]);

  const handleUpdate = useCallback(
    async (formData) => {
      try {
        const result = await dispatch(editProject({ id, formData })).unwrap();
        if (result.success) toast.success("Project updated successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to update project");
      }
    },
    [dispatch, id]
  );

  const handleDelete = useCallback(async () => {
    try {
      const result = await dispatch(deleteProject(id)).unwrap();
      if (result.success) {
        toast.success("Deleted Project");
        navigate("/projects");
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete project");
    }
  }, [dispatch, id, navigate]);

  if (loading)
    return (
      <ClipLoader
        size={50} // default: 35
        color={"#123abc"} // default: #000
        loading={true} // boolean to toggle visibility
      />
    );
  if (!projects) return <div>Project not found.</div>;

  return (
    <ProjectForm
      onSubmit={handleSubmit(handleUpdate)}
      register={register}
      control={control}
      errors={errors}
      teamFields={teamFields}
      appendTeam={appendTeam}
      removeTeam={removeTeam}
      activityFields={activityFields}
      appendActivity={appendActivity}
      removeActivity={removeActivity}
      projectId={id}
      deleteProjectHandler={handleDelete}
    />
  );
};

export default ProjectDetails;
