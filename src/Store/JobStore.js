import { create } from "zustand";
import { persist } from "zustand/middleware";
import Jobs from "../Pages/Jobs";
import jobPostingApi from "../Api/JobPostingApi";

const initialState = {
  error: null,
  loading: false,
  successful: false,
  jobs: [],
  searchedJob: null,
};

const useJobStore = create(
  persist((set) => ({
    ...initialState,
    fetchJobs: async (title, location) => {
      set({ loading: true, error: null, successful: false });
      try {
        const res = await jobPostingApi.get("/Jobposts", {
          params: { title, location },
        });
        const jobsFetched = res.data;
        set({
          jobs: jobsFetched,
          loading: false,
          successful: true,
          error: null,
        });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to fetch jobs",
          loading: false,
          successful: false,
        });
      }
    },
    fetchJobById: async (jobId) => {
      set({ loading: true, error: null, successful: false });
      try {
        const res = await jobPostingApi.get(`/Jobposts/${jobId}`);
        const jobFetched = res.data;
        set({
          loading: false,
          successful: true,
          error: null,
          searchedJob: jobFetched,
        });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to fetch job",
          loading: false,
          successful: false,
        });
      }
    },
    fetchJobForManage: async () => {
      set({ loading: true, error: null, successful: false });
      try {
        const res = await jobPostingApi.get("/jobposts/dashboardjobs");
        const jobsFetched = res.data;
        set({
          loading: false,
          successful: true,
          error: null,
          jobs: jobsFetched,
        });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to fetch jobs",
          loading: false,
          successful: false,
        });
      }
    },
    fetchJobForCompany: async (companyId) => {
      set({ loading: true, error: null, successful: false });
      try {
        const res = await jobPostingApi.get(`/jobposts/company/${companyId}`);
        const jobsFetched = res.data;
        set({
          loading: false,
          successful: true,
          error: null,
          jobs: jobsFetched,
        });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to fetch jobs",
          loading: false,
          successful: false,
        });
      }
    },
    createJob: async (jobData) => {
      set({ loading: true, error: null, successful: false });
      try {
        await jobPostingApi.post("/Jobposts", jobData);
        set({ loading: false, successful: true, error: null });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to create job",
          loading: false,
          successful: false,
        });
      }
    },
    updateJob: async (jobId, jobData) => {
      set({ loading: true, error: null, successful: false });
      try {
        await jobPostingApi.put(`/Jobposts/${jobId}`, jobData);
        set({ loading: false, successful: true, error: null });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to update job",
          loading: false,
          successful: false,
        });
      }
    },
    deleteJob: async (jobId) => {
      set({ loading: true, error: null, successful: false });
      try {
        await jobPostingApi.delete(`/Jobposts/${jobId}`);
        set({
          loading: false,
          successful: true,
          error: null,
        });
      } catch (err) {
        set({
          error: err.response?.data?.message || "Failed to delete job",
          loading: false,
          successful: false,
        });
      }
    },
    clearJobs: () => {
      set({
        jobs: [],
        searchedJob: null,
        error: null,
        loading: false,
        successful: false,
      });
    },
  }))
);

export default useJobStore;
