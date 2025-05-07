// src/App.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("isAuthenticated app.jsx", isAuthenticated);

      dispatch(checkAuth());
    } else {
      navigate("/profile");
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (status === "loading") {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1.2 -translate-y-1/2">
        Loading...
      </div>
    );
  }

  return <div>{isAuthenticated ? "Welcome back!" : "Please log in"}</div>;
};

export default App;
