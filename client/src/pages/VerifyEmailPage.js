import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmailConfirm from "../components/EmailConfirm";
import Loading from "../components/ui/Loading";
import axiosInstance from "../helpers/axiosInstance";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState();
  const navigator = useNavigate();
  useEffect(() => {
    setLoading(true);
    const token = searchParams.get("token");
    if (!token) {
      setLoading(false);
      return navigator("/404", { replace: true });
    }
    axiosInstance
      .patch(`auth/verify-email/${token}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        setError(error.response.data.message);
        toast.error(error.response.data.message, {
          toastId: "wqewsjakyhewmnm",
          autoClose: 1000,
        });
      })
      .finally(() => setLoading(false));
  }, [searchParams, navigator]);
  return (
    <>{loading ? <Loading /> : <EmailConfirm data={data} error={error} />}</>
  );
};

export default VerifyEmailPage;
