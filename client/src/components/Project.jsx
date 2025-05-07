import { createProject } from "@/features/projects/projectThunk";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "../components/ProjectForm.jsx";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use"; // for screen width/height

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { width, height } = useWindowSize(); // auto track window size

  const {
    register,
    control,
    reset,
    handleSubmit,
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

  const { fields: teamFields, append: appendTeam } = useFieldArray({
    control,
    name: "projectTeamDetails",
  });

  const { fields: activityFields, append: appendActivity } = useFieldArray({
    control,
    name: "projectActivities",
  });

  const onSubmit = async (formData) => {
    console.log("form data from project.jsx", formData);

    try {
      const resultAction = await dispatch(createProject(formData)).unwrap();
      console.log("resultAction", resultAction);

      const createdId = resultAction?.data?._id;

      if (resultAction.success === true) {
        reset();
        setShowConfetti(true);

        // Let confetti play for 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
          navigate(`/projects/${createdId}`);
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to create project");
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
          style={{ zIndex: 9999, pointerEvents: "none" }}
        />
      )}

      <ProjectForm
        onSubmit={onSubmit}
        register={register}
        control={control}
        errors={errors}
        teamFields={teamFields}
        activityFields={activityFields}
        appendTeam={appendTeam}
        appendActivity={appendActivity}
      />
    </>
  );
};

export default Project;
