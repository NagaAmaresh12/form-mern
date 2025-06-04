// src/features/projects/components/ProjectForm.jsx
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useMemo } from "react";
import { formatBudget } from "./FormatBudget";

const ProjectForm = ({
  watch,
  expenditureFields,
  appendExpenditure,
  removeExpenditure,
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
  const [budgetValue, setBudgetValue] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const watchedExpenditures = watch("projectExpenditure") || [];
  const role = useSelector((state) => state.auth.user.role);

  const normalizeDate = (dateStr) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDisabled = role !== "admin";

  const filteredActivities = useMemo(() => {
    if (!activityFilter) return activityFields;
    return activityFields.filter(
      (activity) => normalizeDate(activity.date) === activityFilter
    );
  }, [activityFilter, activityFields]);

  //Budget
  let remainingBudget =
    budgetValue -
    watchedExpenditures.reduce((total, e) => total + Number(e.amount || 0), 0);

  return (
    <form
      onSubmit={onSubmit}
      className="p-6 space-y-6 bg-white rounded-md shadow-md border border-zinc-900 m-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Project Details</h2>
        <div className="flex items-center justify-center gap-10">
          {budgetValue && watchedExpenditures && (
            <p>
              Total Budget:
              <span className="px-2 py-2 rounded-md bg-green-600 text-white font-bold mx-2 tracking-wider">
                {formatBudget(budgetValue)}
              </span>
            </p>
          )}
          {budgetValue && watchedExpenditures.length > 0 && (
            <p>
              Remaining Budget: ₹
              <span
                className={`text-sm ${
                  remainingBudget < 0 ? "bg-red-600" : "bg-green-600"
                } px-2 py-2 rounded-md text-white font-bold mx-2 `}
              >
                {formatBudget(remainingBudget)}
              </span>
            </p>
          )}
        </div>
      </div>

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
      {errors.projectSanctionedBy && (
        <p className="text-red-500">{errors.projectSanctionedBy.message}</p>
      )}
      <Input
        {...register("projectInspectingAuthority", { required: true })}
        placeholder="Inspecting Authority"
        disabled={isDisabled}
      />
      {errors.projectInspectingAuthority && (
        <p className="text-red-500">
          {errors.projectInspectingAuthority.message}
        </p>
      )}
      <Input
        {...register("projectLocation", { required: true })}
        placeholder="Location"
        disabled={isDisabled}
      />
      {errors.projectLocation && (
        <p className="text-red-500">{errors.projectLocation.message}</p>
      )}
      <Input
        type="number"
        {...register("projectBudget", {
          required: true,
          onChange: (e) => setBudgetValue(e.target.value),
        })}
        placeholder="Budget"
        disabled={isDisabled}
      />
      {errors.projectBudget && (
        <p className="text-red-500">{errors.projectBudget.message}</p>
      )}
      {budgetValue && (
        <p className="text-sm text-gray-600">≈ {formatBudget(budgetValue)}</p>
      )}

      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-[6vw]">Start-Date: </span>
          <Input
            type={"date"}
            value={normalizeDate(watch("projectStartDate")) || ""}
            {...register("projectStartDate", { required: true })}
            disabled={isDisabled}
            className={"w-[11vw]"}
          />
        </div>
        <div className="flex items-center justify-center gap-2 ">
          <span className="w-[6vw]">End-Date: </span>
          <Input
            type={"date"}
            value={normalizeDate(watch("projectEndDate")) || ""}
            {...register("projectEndDate", { required: true })}
            disabled={isDisabled}
            className={"w-[11vw]"}
          />
        </div>
      </div>
      {/* Team Members */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Team Members</h3>
        {teamFields.map((fld, i) => (
          <div key={fld.id} className="space-y-2 border p-3 rounded-md">
            <Input
              {...register(`projectTeamDetails.${i}.firstName`, {
                required: true,
              })}
              placeholder="First Name"
              disabled={isDisabled}
            />
            {errors.projectTeamDetails?.[i]?.firstName && (
              <p className="text-red-500">
                {errors.projectTeamDetails[i].firstName.message}
              </p>
            )}
            <Input
              {...register(`projectTeamDetails.${i}.lastName`, {
                required: true,
              })}
              placeholder="Last Name"
              disabled={isDisabled}
            />
            {errors.projectTeamDetails?.[i]?.lastName && (
              <p className="text-red-500">
                {errors.projectTeamDetails[i].lastName.message}
              </p>
            )}
            <Input
              {...register(`projectTeamDetails.${i}.contactNumber`, {
                required: true,
              })}
              placeholder="Contact No."
              disabled={isDisabled}
            />
            {errors.projectTeamDetails?.[i]?.contactNumber && (
              <p className="text-red-500">
                {errors.projectTeamDetails[i].contactNumber.message}
              </p>
            )}
            <Input
              {...register(`projectTeamDetails.${i}.headQtrs`, {
                required: true,
              })}
              placeholder="HQ"
              disabled={isDisabled}
            />
            {errors.projectTeamDetails?.[i]?.headQtrs && (
              <p className="text-red-500">
                {errors.projectTeamDetails[i].headQtrs.message}
              </p>
            )}
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
              appendTeam({
                firstName: "",
                lastName: "",
                contactNumber: "",
                headQtrs: "",
              })
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
      {errors.projectObjectives && (
        <p className="text-red-500">{errors.projectObjectives.message}</p>
      )}
      <Input
        {...register("projectDuration", { required: true })}
        placeholder="Duration"
        disabled={isDisabled}
      />
      {errors.projectDuration && (
        <p className="text-red-500">{errors.projectDuration.message}</p>
      )}
      <Input
        type="date"
        {...register("projectCommencementDate", { required: true })}
        disabled={isDisabled}
        className={"w-[11vw]"}
      />
      {errors.projectCommencementDate && (
        <p className="text-red-500">{errors.projectCommencementDate.message}</p>
      )}

      {/* Activities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Activities</h3>
          {/* Filter activities by filter goes here */}
          <div className="flex items-center gap-2">
            <h4>Filter:</h4>
            <Input
              type="date"
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="w-[11vw]"
            />
          </div>
        </div>
        {filteredActivities.map((fld, i) => (
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
              type="date"
              {...register(`projectActivities.${i}.date`, { required: true })}
              disabled={isDisabled}
              className={"w-[11vw]"}
            />
            {errors.projectActivities?.[i]?.date && (
              <p className="text-red-500">
                {errors.projectActivities[i].date.message}
              </p>
            )}

            <Input
              {...register(`projectActivities.${i}.actionImpact`, {
                required: true,
              })}
              placeholder="Impact"
              disabled={isDisabled}
            />
            {errors.projectActivities?.[i]?.actionImpact && (
              <p className="text-red-500">
                {errors.projectActivities[i].actionImpact.message}
              </p>
            )}
            <Input
              {...register(`projectActivities.${i}.programAttendance`, {
                required: true,
              })}
              placeholder="Attendance"
              disabled={isDisabled}
            />
            {errors.projectActivities?.[i]?.programAttendance && (
              <p className="text-red-500">
                {errors.projectActivities[i].programAttendance.message}
              </p>
            )}
            <Input
              {...register(`projectActivities.${i}.observations`, {
                required: true,
              })}
              placeholder="Observations"
              disabled={isDisabled}
            />
            {errors.projectActivities?.[i]?.observations && (
              <p className="text-red-500">
                {errors.projectActivities[i].observations.message}
              </p>
            )}
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
                date: "",
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
      {errors.projectRangeCoverage?.numberOfVillages && (
        <p className="text-red-500">
          {errors.projectRangeCoverage.numberOfVillages.message}
        </p>
      )}
      <Input
        type="number"
        {...register("projectRangeCoverage.totalPopulation", {
          required: true,
        })}
        placeholder="Population"
        disabled={isDisabled}
      />
      {errors.projectRangeCoverage?.totalPopulation && (
        <p className="text-red-500">
          {errors.projectRangeCoverage.totalPopulation.message}
        </p>
      )}
      <Input
        type="number"
        {...register("projectRangeCoverage.numberOfFarmers", {
          required: true,
        })}
        placeholder="Farmers"
        disabled={isDisabled}
      />
      {errors.projectRangeCoverage?.numberOfFarmers && (
        <p className="text-red-500">
          {errors.projectRangeCoverage.numberOfFarmers.message}
        </p>
      )}
      {/* Support & Pending */}
      <Textarea
        {...register("requiredSupportFromHO", { required: true })}
        placeholder="Support from HO"
        disabled={isDisabled}
      />
      {errors.requiredSupportFromHO && (
        <p className="text-red-500">{errors.requiredSupportFromHO.message}</p>
      )}
      <Textarea
        {...register("pendingWorks", { required: true })}
        placeholder="Pending Works"
        disabled={isDisabled}
      />
      {errors.pendingWorks && (
        <p className="text-red-500">{errors.pendingWorks.message}</p>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-medium">Expenditures</h3>
        {(expenditureFields || []).map((field, i) => (
          <div key={field.id} className="space-y-2 border p-3 rounded-md">
            <Input
              {...register(`projectExpenditure.${i}.description`, {
                required: true,
              })}
              placeholder="Description"
              disabled={isDisabled}
            />
            <Input
              type="number"
              {...register(`projectExpenditure.${i}.amount`, {
                required: true,
              })}
              placeholder="Amount"
              disabled={isDisabled}
            />
            <Input
              type="date"
              {...register(`projectExpenditure.${i}.date`, { required: true })}
              disabled={isDisabled}
            />
            {!isDisabled && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeExpenditure(i)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendExpenditure({ description: "", amount: "", date: "" })
            }
          >
            + Add Expenditure
          </Button>
        )}
      </div>
      {budgetValue && watchedExpenditures && (
        <p>Total Budget:{formatBudget(budgetValue)}</p>
      )}
      {budgetValue && watchedExpenditures.length > 0 && (
        <p>
          Remaining Budget: ₹{" "}
          <span
            className={`text-sm ${
              remainingBudget < 0 ? "bg-red-600" : "bg-green-600"
            } px-2 py-2 rounded-md text-white font-bold mx-2 tracking-wider`}
          >
            {formatBudget(remainingBudget)}
          </span>
        </p>
      )}

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
