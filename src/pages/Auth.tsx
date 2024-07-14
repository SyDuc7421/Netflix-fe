import { useState } from "react";
import { NavBar } from "../components/auth/NavBar";
import { SignInForm } from "../components/auth/SignInForm";
import { SignUpForm } from "../components/auth/SignUpForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="relative h-screen w-screen flex item-center justify-center bg-[url('/src/assets/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <NavBar />

      {/* conditional render form */}
      {isLogin ? (
        <SignInForm setIsLogin={setIsLogin} />
      ) : (
        <SignUpForm setIsLogin={setIsLogin} />
      )}

      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-55" />
    </div>
  );
};

export default AuthPage;
