import LoginForm from "@/features/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadqr | Log in",
};
const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;