import { motion } from "framer-motion";

export default function MotionButtonPrimary({ children }: any) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-6 cursor-pointer w-fit px-6 py-2 text-sm border border-primary text-primary relative overflow-hidden group"
    >
      <span className="relative z-10 group-hover:text-primary-foreground transition">
        {children}
      </span>

      <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition duration-500" />
    </motion.button>
  );
}
