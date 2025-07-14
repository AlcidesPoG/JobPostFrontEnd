import { create } from "zustand";
import { persist } from "zustand/middleware";
import jobPostingApi from "../Api/JobPostingApi";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  loading: false,
  company: null,
  successful: false,
};

const useCompanyStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await jobPostingApi.post("/auth/login", {
            email,
            password,
          });
          const user = res.data;
          localStorage.setItem("token", user.token);
          set({
            isLoggedIn: true,
            user: user,
            token: user.token,
            loading: false,
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Login failed",
            loading: false,
            isLoggedIn: false,
            user: null,
          });
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ token: null, user: null, isLoggedIn: false });
      },
      companyRegister: async (data) => {
        set({ loading: true, error: false });
        try {
          const formData = new FormData();

          // Campos de texto
          formData.append("name", data.Name);
          formData.append("email", data.Email);
          formData.append("password", data.Password);
          formData.append("country", data.Country);
          formData.append("state", data.State);
          formData.append("city", data.City);
          formData.append("address", data.Address);
          formData.append("pageUrl", data.PageUrl || "");
          formData.append("description", data.Description || "");

          if (data.PhotoFile && data.PhotoFile[0]) {
            formData.append("PhotoFile", data.PhotoFile[0]);
          }

          const res = await jobPostingApi.post("/company/create", formData);
          const user = res.data;
          localStorage.setItem("token", user.token);
          set({
            isLoggedIn: true,
            user: user,
            token: user.token,
            loading: false,
            successful: true,
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Register failed",
            loading: false,
            isLoggedIn: false,
            user: null,
            successful: false,
          });
        }
      },
      fetchCompanyProfile: async (companyId) => {
        set({ loading: true, error: null, successful: false });
        try {
          const res = await jobPostingApi.get(`/company/${companyId}`);
          const company = res.data;
          set({
            loading: false,
            successful: true,
            error: null,
            company: company,
          });
        } catch (err) {
          set({
            error:
              err.response?.data?.message || "Failed to fetch company profile",
            loading: false,
            successful: false,
          });
        }
      },
      fetchCompanyForUpdate: async () => {
        set({ loading: true, error: null, successful: false });
        try {
          const res = await jobPostingApi.get(`/company/`);
          const company = res.data;
          set({
            loading: false,
            successful: true,
            error: null,
            company: company,
          });
        } catch (err) {
          set({
            error:
              err.response?.data?.message || "Failed to fetch company profile",
            loading: false,
            successful: false,
          });
        }
      },
      updateProfile: async (data) => {
        set({ loading: true, error: false });
        try {
          const formData = new FormData();

          // Campos de texto
          formData.append("name", data.name);
          formData.append("country", data.country);
          formData.append("state", data.state);
          formData.append("city", data.city);
          formData.append("address", data.address);
          formData.append("pageUrl", data.pageUrl || "");
          formData.append("description", data.description || "");

          if (data.photoFile && data.photoFile[0]) {
            formData.append("photoFile", data.photoFile[0]);
          }

          await jobPostingApi.put(`/company/edit`, formData);
          set({
            isLoggedIn: true,
            loading: false,
            successful: true,
          });
        } catch (err) {
          set({
            error:
              err.response?.data?.message || "Update failed try again later",
            loading: false,
            successful: false,
          });
        }
      },
      clearCompany: () => {
        set({ error: null, successful: false, loading: false });
      },
    }),
    {
      name: "company-store",
    }
  )
);
//

export default useCompanyStore;
