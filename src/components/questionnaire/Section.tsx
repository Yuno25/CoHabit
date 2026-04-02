"use client";

import { motion } from "framer-motion";

export default function Section({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
