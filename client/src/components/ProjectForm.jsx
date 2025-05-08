// src/features/projects/components/ProjectForm.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProjectForm = ({
  onSubmit,
  register,
  errors,
  teamFields,
  appendTeam,
  removeTeam,
  activityFields,
  appendActivity,
  removeActivity,
  projectId,
  deleteProjectHandler,
}) => {
  const role = useSelector((state) => state.auth.user.role);
  const isDisabled = role !== "admin";

  return (
    <form
      onSubmit={onSubmit}
      className="p-6 space-y-6 bg-white rounded-md shadow-md border border-zinc-900 m-4"
    >
      <h2 className="text-2xl font-semibold">Project Details</h2>

      {/* Basic Fields */}
      <Input
        {...register("projectTitle", { required: "Required" })}
        placeholder="Title"
        disabled={isDisabled}
      />
      {errors.projectTitle && (
        <p className="text-red-500">{errors.projectTitle.message}</p>
      )}
      <Input
        {...register("projectSanctionedBy", { required: true })}
        placeholder="Sanctioned By"
        disabled={isDisabled}
      />
      <Input
        {...register("projectInspectingAuthority", { required: true })}
        placeholder="Inspecting Authority"
        disabled={isDisabled}
      />
      <Input
        {...register("projectLocation", { required: true })}
        placeholder="Location"
        disabled={isDisabled}
      />
      <Input
        type="number"
        {...register("projectBudget", { required: true })}
        placeholder="Budget"
        disabled={isDisabled}
      />

      {/* Team Members */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Team Members</h3>
        {teamFields.map((fld, i) => (
          <div key={fld.id} className="space-y-2 border p-3 rounded-md">
            <Input
              {...register(`projectTeamDetails.${i}.name`, { required: true })}
              placeholder="Name"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectTeamDetails.${i}.contactNumber`, {
                required: true,
              })}
              placeholder="Contact No."
              disabled={isDisabled}
            />
            <Input
              {...register(`projectTeamDetails.${i}.headQtrs`, {
                required: true,
              })}
              placeholder="HQ"
              disabled={isDisabled}
            />
            {!isDisabled && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeTeam(i)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <Button
            type="button"
            variant={"outline"}
            onClick={() =>
              appendTeam({ name: "", contactNumber: "", headQtrs: "" })
            }
          >
            + Add
          </Button>
        )}
      </div>

      {/* Objectives, Duration, Date */}
      <Textarea
        {...register("projectObjectives", { required: true })}
        placeholder="Objectives"
        disabled={isDisabled}
      />
      <Input
        {...register("projectDuration", { required: true })}
        placeholder="Duration"
        disabled={isDisabled}
      />
      <Input
        type="date"
        {...register("projectCommencementDate", { required: true })}
        disabled={isDisabled}
      />

      {/* Activities */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Activities</h3>
        {activityFields.map((fld, i) => (
          <div key={fld.id} className="space-y-2 border p-3 rounded-md">
            <Input
              {...register(`projectActivities.${i}.name`, { required: true })}
              placeholder="Name"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${i}.daywiseWorkProgress`, {
                required: true,
              })}
              placeholder="Progress"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${i}.placeOfVisit`, {
                required: true,
              })}
              placeholder="Place of Visit"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${i}.actionTaken`, {
                required: true,
              })}
              placeholder="Action Taken"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${i}.actionImpact`, {
                required: true,
              })}
              placeholder="Impact"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${i}.programAttendance`, {
                required: true,
              })}
              placeholder="Attendance"
              disabled={isDisabled}
            />
            <Input
              {...register(`projectActivities.${i}.observations`, {
                required: true,
              })}
              placeholder="Observations"
              disabled={isDisabled}
            />
            {/* add other activity inputs here */}
            {!isDisabled && (
              <Button
                type="button"
                variant={"outline"}
                onClick={() => removeActivity(i)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <Button
            type="button"
            variant={"outline"}
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
          >
            + Add
          </Button>
        )}
      </div>

      {/* Range Coverage */}
      <Input
        type="number"
        {...register("projectRangeCoverage.numberOfVillages", {
          required: true,
        })}
        placeholder="Villages"
        disabled={isDisabled}
      />
      <Input
        type="number"
        {...register("projectRangeCoverage.totalPopulation", {
          required: true,
        })}
        placeholder="Population"
        disabled={isDisabled}
      />
      <Input
        type="number"
        {...register("projectRangeCoverage.numberOfFarmers", {
          required: true,
        })}
        placeholder="Farmers"
        disabled={isDisabled}
      />

      {/* Support & Pending */}
      <Textarea
        {...register("requiredSupportFromHO", { required: true })}
        placeholder="Support from HO"
        disabled={isDisabled}
      />
      <Textarea
        {...register("pendingWorks", { required: true })}
        placeholder="Pending Works"
        disabled={isDisabled}
      />

      {/* Actions */}
      <div className="flex justify-end gap-4">
        {projectId && !isDisabled && (
          <Button
            type="button"
            variant="outline"
            onClick={deleteProjectHandler}
          >
            Delete
          </Button>
        )}
        {!isDisabled && (
          <Button variant={"outline"} type="submit">
            {projectId ? "Update" : "Create"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default React.memo(ProjectForm);
