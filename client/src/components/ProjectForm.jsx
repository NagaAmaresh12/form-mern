import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";

const ProjectForm = ({
  onSubmit,
  defaultValues = {},
  deleteProjectHandler,
  projectId,
}) => {
  const role = useSelector((state) => state.auth.user.role);
  const isDisabled = role !== "admin";

  const {
    register,
    handleSubmit,
    control,
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
      ...defaultValues,
    },
  });

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({
    control,
    name: "projectTeamDetails",
  });

  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: "projectActivities",
  });

  useEffect(() => {
    if (defaultValues && typeof defaultValues === "object") {
      const data = { ...defaultValues };

      if (data.projectCommencementDate) {
        const date = new Date(data.projectCommencementDate);
        if (!isNaN(date)) {
          data.projectCommencementDate = date.toISOString().split("T")[0];
        } else {
          data.projectCommencementDate = "";
        }
      }

      reset(data);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-6 bg-white rounded-md shadow-md border-[1px] border-zinc-900 m-4"
    >
      <h2 className="text-2xl font-semibold">Project Details</h2>

      {/* Basic Project Fields */}
      <div className="space-y-2">
        <Input
          {...register("projectTitle", { required: "Title is required" })}
          placeholder="Project Title"
          className="Input"
          disabled={isDisabled}
        />
        <p className="text-red-500">{errors.projectTitle?.message}</p>

        <Input
          {...register("projectSanctionedBy", { required: "Required" })}
          placeholder="Sanctioned By"
          className="Input"
          disabled={isDisabled}
        />
        <Input
          {...register("projectInspectingAuthority", { required: "Required" })}
          placeholder="Inspecting Authority"
          className="Input"
          disabled={isDisabled}
        />
        <Input
          {...register("projectLocation", { required: "Required" })}
          placeholder="Location"
          className="Input"
          disabled={isDisabled}
        />
        <Input
          type="number"
          {...register("projectBudget", { required: "Required" })}
          placeholder="Budget"
          className="Input"
          disabled={isDisabled}
        />
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Team Members</h3>
        {teamFields.map((item, index) => (
          <div key={item.id} className="space-y-2 border p-3 rounded-md">
            <Input
              {...register(`projectTeamDetails.${index}.name`, {
                required: "Required",
              })}
              placeholder="Name"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectTeamDetails.${index}.contactNumber`, {
                required: "Required",
              })}
              placeholder="Contact Number"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectTeamDetails.${index}.headQtrs`, {
                required: "Required",
              })}
              placeholder="Headquarters"
              className="Input"
              disabled={isDisabled}
            />
            {!isDisabled && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeTeam(index)}
                className="mt-2 bg-zinc-900 text-white"
              >
                Remove Member
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <button
            type="button"
            onClick={() =>
              appendTeam({ name: "", contactNumber: "", headQtrs: "" })
            }
            className="btn"
          >
            + Add Team Member
          </button>
        )}
      </div>

      {/* Project Objectives, Duration, Date */}
      <Textarea
        {...register("projectObjectives", { required: "Required" })}
        placeholder="Project Objectives"
        className="Input"
        disabled={isDisabled}
      />
      <Input
        {...register("projectDuration", { required: "Required" })}
        placeholder="Duration"
        className="Input"
        disabled={isDisabled}
      />
      <Input
        type="date"
        {...register("projectCommencementDate", { required: "Required" })}
        placeholder="Commencement Date"
        className="Input"
        disabled={isDisabled}
      />

      {/* Project Activities */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Project Activities</h3>
        {activityFields.map((item, index) => (
          <div
            key={item.id}
            className="space-y-2 border p-3 rounded-md relative"
          >
            <Input
              {...register(`projectActivities.${index}.name`, {
                required: "Required",
              })}
              placeholder="Activity Name"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${index}.daywiseWorkProgress`, {
                required: "Required",
              })}
              placeholder="Work Progress"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${index}.placeOfVisit`, {
                required: "Required",
              })}
              placeholder="Place of Visit"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${index}.actionTaken`, {
                required: "Required",
              })}
              placeholder="Action Taken"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${index}.actionImpact`, {
                required: "Required",
              })}
              placeholder="Impact"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${index}.programAttendance`, {
                required: "Required",
              })}
              placeholder="Attendance"
              className="Input"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${index}.observations`, {
                required: "Required",
              })}
              placeholder="Observations"
              className="Input"
              disabled={isDisabled}
            />
            {!isDisabled && (
              <Button
                type="button"
                className=" bg-zinc-900 text-white"
                onClick={() => removeActivity(index)}
              >
                Remove Activity
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <button
            type="button"
            onClick={() =>
              appendActivity({
                name: "",
                daywiseWorkProgress: "",
                placeOfVisit: "",
                actionTaken: "",
                actionImpact: "",
                programAttendance: "",
                observations: "",
              })
            }
            className="btn"
          >
            + Add Activity
          </button>
        )}
      </div>

      {/* Project Range Coverage */}
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Range Coverage</h3>
        <Input
          type="number"
          {...register("projectRangeCoverage.numberOfVillages", {
            required: "Required",
          })}
          placeholder="Number of Villages"
          className="Input"
          disabled={isDisabled}
        />
        <Input
          type="number"
          {...register("projectRangeCoverage.totalPopulation", {
            required: "Required",
          })}
          placeholder="Total Population"
          className="Input"
          disabled={isDisabled}
        />
        <Input
          type="number"
          {...register("projectRangeCoverage.numberOfFarmers", {
            required: "Required",
          })}
          placeholder="Number of Farmers"
          className="Input"
          disabled={isDisabled}
        />
      </div>

      {/* Support & Pending Work */}
      <Textarea
        {...register("requiredSupportFromHO", { required: "Required" })}
        placeholder="Support from HO"
        className="Input"
        disabled={isDisabled}
      />
      <Textarea
        {...register("pendingWorks", { required: "Required" })}
        placeholder="Pending Works"
        className="Input"
        disabled={isDisabled}
      />

      {/* Final Buttons */}
      {!isDisabled && (
        <div className="flex w-full items-center justify-between px-4">
          <div></div>
          <div className="flex items-center justify-center gap-4">
            {projectId && (
              <Button
                type="button"
                onClick={() => deleteProjectHandler(projectId)}
                variant={"outline"}
                className="bg-zinc-900 text-white block btn btn-primary"
              >
                Delete
              </Button>
            )}
            <Button
              type="submit"
              variant={"outline"}
              className="bg-zinc-900 text-white block btn btn-primary"
            >
              Submit Project
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ProjectForm;
