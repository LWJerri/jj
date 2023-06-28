"use client";

import AuthorizationForm from "@/components/AuthorizationForm";
import { useState } from "react";

export default function Authorization() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="min-h-screen hero flex flex-col justify-around">
      <AuthorizationForm isLogin={isLogin} />

      <div>
        <button onClick={handleSwitch}>{isLogin ? "Я не маю облікового запису" : "У мене є обліковий запис"}</button>
      </div>
    </div>
  );
}
