import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      navigate("/home");
    }
  }, [navigate]);
  return (
    <div className="px-20 py-2">
      <div className="font-medium text-3xl flex gap-1 items-center justify-center">
        Get Started to<span className="text-[#DC143C]">Web</span>-Log.
      </div>
    </div>
  );
};

export default LandingPage;
