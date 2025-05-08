// src/features/projects/Project.jsx
import { createProject } from "@/features/projects/projectThunk";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "../components/ProjectForm.jsx";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { width, height } = useWindowSize();

  // initialize form for creation
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectTitle: "",
      projectSanctionedBy: "",
      projectInspectingAuthority: "",
      projectLocation: "",
      projectBudget: "",
      projectObjectives: "",
      projectDuration: "",
      projectCommencementDate: "",
      projectRangeCoverage: {
        numberOfVillages: "",
        totalPopulation: "",
        numberOfFarmers: "",
      },
      requiredSupportFromHO: "",
      pendingWorks: "",
      projectTeamDetails: [{ name: "", contactNumber: "", headQtrs: "" }],
      projectActivities: [
        {
          name: "",
          daywiseWorkProgress: "",
          placeOfVisit: "",
          actionTaken: "",
          actionImpact: "",
          programAttendance: "",
          observations: "",
        },
      ],
    },
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

  const onSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(createProject(formData)).unwrap();
      if (resultAction.success) {
        const createdId = resultAction.data._id;
        reset();
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate(`/projects/${createdId}`);
        }, 3000);
      }
    } catch (err) {
      toast.error(err.message || "Failed to create project");
    }
  };

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
        />
      )}
      <ProjectForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        control={control}
        errors={errors}
        teamFields={teamFields}
        appendTeam={appendTeam}
        removeTeam={removeTeam}
        activityFields={activityFields}
        appendActivity={appendActivity}
        removeActivity={removeActivity}
      />
    </>
  );
};

export default Project;
