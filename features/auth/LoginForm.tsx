"use client";

import Image from "next/image";
import leadsqr from "@/public/assets/leadsqr-sign-in.svg";
import leadsqrlogo from "@/public/assets/lendsqr-logo.svg";
import React, { useState } from "react";
import auth from "./auth.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  
  const handleLogin = () => {
    if (email && password) {
      // Create a proper user object to match your Redux state
      const user = {
        id: Date.now().toString(), 
        name: email.split("@")[0],
        email
      };
      console.log(user,"--user user")
      dispatch(login(user)); 
      router.push("/users");
    }
  };

  return (
    <div className={auth.login_container}>
      <div className={auth.login_left}>
        <Image src={leadsqrlogo} className={auth.logo} alt="leadsqr" />
        <Image src={leadsqr} className={auth.illustration} alt="leadsqr" />
      </div>

      <div className={auth.login_right}>
        <div className={auth.login_box}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={auth.password_wrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>SHOW</span>
          </div>

          <a href="#" className={auth.forgot_password}>
            FORGOT PASSWORD?
          </a>

          <button className={auth.login_btn} onClick={handleLogin}>
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
