import React from 'react'
import { useForm } from "react-hook-form"

import { api } from "./api.js";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

 const Register = () => {
  const {
    register,
    handleSubmit,
    formState : {errors,isSubmitSuccessful,isSubmitting},
    getValues,
  } = useForm({mode: "onTouched"})

  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      await api.post("/register", {
        email: data.email,
        password: data.password,
        username: data.name, 
        role: "ADMIN",
      });
      alert("Registered Successfully");
      navigate({ to: "/login" });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
};

    
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(submit)}>
         <div className="form-header">
           <h2>Create Account</h2>
           <p className="form-subtitle">Join us today</p>
         </div>

         <div className="form-group">
           <label className="form-label">
            <span className="label-text">Full Name</span>
            <input 
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter your full name"
              {...register('name',{required : "Name is required"})} 
            />
            {errors.name && <span className="error-message">{errors.name?.message}</span>}
           </label>
         </div>

         <div className="form-group">
           <label className="form-label">
            <span className="label-text">Email</span>
            <input 
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              type="email"
              {...register('email',{required : "email is required"})} 
            />
            {errors.email && <span className="error-message">{errors.email?.message}</span>}
           </label>
         </div>

         <div className="form-group">
           <label className="form-label">
            <span className="label-text">Password</span>
            <input 
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Create a strong password"
              type="password"
              {...register('password',{required : "Password is required"})} 
            />
            {errors.password && <span className="error-message">{errors.password?.message}</span>}
           </label>
         </div>

           <button className="submit-btn" disabled = {isSubmitting}>
             {isSubmitting ? (
               <span className="btn-loading">
                 <span className="spinner"></span>Registering...
               </span>
             ) : (
               'Register'
             )}
           </button>

           <p className="form-footer">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  )
}

export default Register;
