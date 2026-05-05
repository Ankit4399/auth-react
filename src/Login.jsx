import React from 'react'
import { useForm } from "react-hook-form"

import { api } from "./api.js";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {errors,isSubmitSuccessful,isSubmitting},
    getValues
  } = useForm({mode: "onTouched"});

  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      await api.post("/login", {
        username: data.username, 
        password: data.password,
      });

      localStorage.setItem(
      "user",
      JSON.stringify({ username: data.username })
    );

      alert("Login Successful");
      navigate({ to: "/home" })
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    }
};
    
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(submit)}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p className="form-subtitle">Sign in to your account</p>
        </div>

        <div className="form-group">
          <input
            className={`form-input ${errors.username ? 'input-error' : ''}`}
            placeholder="Enter your username"
            {...register("username", { required: "Username required" })}
          />
          {errors.username && <span className="error-message">{errors.username?.message}</span>}
        </div>

        <div className="form-group">
          <input
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password required" })}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <button className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="btn-loading">
              <span className="spinner"></span>Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>

        <p className="form-footer">Don't have an account? <Link to="/register">Sign up</Link></p>
      </form>
    </div>
  )
}

export default Login;
