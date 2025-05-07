import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  daywiseWorkProgress: { type: String, required: true },
  placeOfVisit: { type: String, required: true },
  actionTaken: { type: String, required: true },
  actionImpact: { type: String, required: true },
  programAttendance: { type: String, required: true },
  observations: { type: String, required: true },
});

const projectReportSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  projectSanctionedBy: { type: String, required: true },
  projectInspectingAuthority: { type: String, required: true },
  projectLocation: { type: String, required: true },
  projectBudget: { type: Number, required: true },

  projectTeamDetails: [
    {
      name: { type: String, required: true },
      contactNumber: { type: String, required: true },
      headQtrs: { type: String, required: true },
    },
  ],

  projectObjectives: { type: String, required: true },
  projectDuration: { type: String, required: true },
  projectCommencementDate: { type: Date, required: true },

  projectActivities: { type: [activitySchema], required: true },

  projectRangeCoverage: {
    numberOfVillages: { type: Number, required: true },
    totalPopulation: { type: Number, required: true },
    numberOfFarmers: { type: Number, required: true },
  },

  requiredSupportFromHO: { type: String, required: true },
  pendingWorks: { type: String, required: true },
});

export const projectReport = mongoose.model(
  "ProjectReport",
  projectReportSchema
);
