"use client";

import OTPInput from "@/components/OTPInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  const handleVerify = async () => {
    const phone = localStorage.getItem("phone");

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl border border-white/20 w-[400px] text-center">
        <h1 className="text-2xl font-bold text-white">Verify OTP</h1>

        <div className="mt-6">
          <OTPInput length={6} onChange={handleOTPChange} />
        </div>

        <button
          onClick={handleVerify}
          className="mt-6 w-full py-3 rounded-xl bg-[#bd7880] text-white"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
