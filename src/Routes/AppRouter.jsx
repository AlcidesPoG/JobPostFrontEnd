import { Navigate, Route, Routes } from "react-router-dom";
import useCompanyStore from "../Store/CompanyStore";
import Home from "../Pages/Home";
import Jobs from "../Pages/Jobs";
import ManageJobs from "../Pages/ManageJobs";
import NewJob from "../Pages/NewJob";
import UpdateJob from "../Pages/UpdateJob";
import LoginPage from "../Pages/Login";
import Register from "../Pages/Register";
import CompanyProfile from "../Pages/CompanyProfile";
import ViewJob from "../Pages/ViewJob";
import UpdateProfile from "../Pages/UpdateProfile";

const AppRouter = () => {
  const { isLoggedIn } = useCompanyStore((state) => state);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {isLoggedIn ? (
          <>
            <Route path="/manage" element={<ManageJobs />} />
            <Route path="/update-job/:jobId" element={<UpdateJob />} />
            <Route path="/new-job" element={<NewJob />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Register />} />
          </>
        )}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/viewjob/:jobId" element={<ViewJob />} />
        <Route path="/company/:companyId" element={<CompanyProfile />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default AppRouter;
