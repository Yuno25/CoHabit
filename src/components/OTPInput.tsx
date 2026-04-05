// "use client";
// import { useState, useRef } from "react";

// export default function OTPInput({ length = 6, onChange }: any) {
//   const [otp, setOtp] = useState(Array(length).fill(""));
//   const inputs = useRef<HTMLInputElement[]>([]);

//   const handleChange = (value: string, index: number) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < length - 1) {
//       inputs.current[index + 1]?.focus();
//     }

//     onChange(newOtp.join(""));
//   };

//   const handleKeyDown = (e: any, index: number) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   return (
//     <div className="flex gap-3 justify-center">
//       {otp.map((digit, index) => (
//         <input
//           key={index}
//           type="text"
//           maxLength={1}
//           value={digit}
//           ref={(el) => (inputs.current[index] = el!)}
//           onChange={(e) => handleChange(e.target.value, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//           className="w-12 h-14 text-center text-xl rounded-xl bg-white/10 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#bd7880]"
//         />
//       ))}
//     </div>
//   );
// }
