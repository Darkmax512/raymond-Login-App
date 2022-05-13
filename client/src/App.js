import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout/Layout";
import axiosInstance from "./helpers/axiosInstance";
import NotFound from "./pages/NotFound";
import OtpPage from "./pages/OtpPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TwoFAPage from "./pages/TwoFAPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import WelcomePage from "./pages/WelcomePage";
import { userActions } from "./store/userSlice";

function App() {
  const [token] = useCookies(["token"]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!token) return;
    axiosInstance
      .get("/auth/validate")
      .then((res) => dispatch(userActions.setUser(res.data)))
      .catch((error) => {});
  }, [token, dispatch]);
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/welcome" /> : <SigninPage />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/welcome" />}
        />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route
          path="/two-fa"
          element={!user ? <TwoFAPage /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/otp-verify"
          element={!user ? <OtpPage /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/welcome"
          element={user ? <WelcomePage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
