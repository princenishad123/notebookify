import React from "react";
import { useCheckAuthUserQuery } from "../rtkQuery/query";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/auth.slice";
export const ProtectedRoute = ({ route }) => {
  const { data, isLoading, isError } = useCheckAuthUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) {
    return (
      <div className="w-full h-screen grid place-content-center">
        <Loader />
      </div>
    );
  }
  if (data) {
    dispatch(setAuth(data));
    return route;
  } else {
    navigate("/login");
  }
};
