import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProjects,
  fetchProject,
  createProject,
  editProject,
  deleteProject,
} from "./projectThunk.js";
const initialState = {
  projects: [{}],
  status: "idle",
  loading: false,
  error: null,
};
const projects = createSlice({
  name: "projects",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    //read all projects
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        (state.status = "loading"),
          (state.loading = true),
          (state.error = null);
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        console.log(
          "fetchAllProjects action payload check",
          action.payload.data
        );

        (state.projects = action.payload.data),
          (state.loading = false),
          (state.error = null),
          (state.status = "success");
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        (state.projects = initialState.projects),
          (state.loading = false),
          (state.status = "failed"),
          (state.error = action.payload);
      })
      //read single project
      .addCase(fetchProject.pending, (state) => {
        (state.status = "loading"),
          (state.loading = true),
          (state.error = null);
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        console.log("slice", action.payload);

        (state.projects = action.payload.data),
          (state.loading = false),
          (state.error = null),
          (state.status = "success");
      })
      .addCase(fetchProject.rejected, (state, action) => {
        (state.projects = initialState.projects),
          (state.loading = false),
          (state.status = "failed"),
          (state.error = action.payload);
      })
      //create new project
      .addCase(createProject.pending, (state) => {
        (state.status = "loading"),
          (state.loading = true),
          (state.error = null);
      })
      .addCase(createProject.fulfilled, (state, action) => {
        (state.projects = action.payload.data),
          (state.loading = false),
          (state.error = null),
          (state.status = "success");
      })
      .addCase(createProject.rejected, (state, action) => {
        (state.projects = initialState.projects),
          (state.loading = false),
          (state.status = "failed"),
          (state.error = action.payload);
      })
      //edit project
      .addCase(editProject.pending, (state) => {
        (state.status = "loading"),
          (state.loading = true),
          (state.error = null);
      })
      .addCase(editProject.fulfilled, (state, action) => {
        (state.projects = action.payload.data),
          (state.loading = false),
          (state.error = null),
          (state.status = "success");
      })
      .addCase(editProject.rejected, (state, action) => {
        (state.projects = initialState.projects),
          (state.loading = false),
          (state.status = "failed"),
          (state.error = action.payload);
      })
      //delete
      .addCase(deleteProject.pending, (state) => {
        (state.status = "loading"),
          (state.loading = true),
          (state.error = null);
      })
      .addCase(deleteProject.fulfilled, (state) => {
        (state.projects = state.initialState),
          (state.loading = false),
          (state.error = null),
          (state.status = "success");
      })
      .addCase(deleteProject.rejected, (state, action) => {
        (state.projects = action.payload),
          (state.loading = false),
          (state.status = "failed"),
          (state.error = action.payload);
      });
  },
});
export default projects.reducer;
