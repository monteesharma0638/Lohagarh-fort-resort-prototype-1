"use client";
import {motion} from 'framer-motion';

export default function MotionA({...props}) {
  return (
    <motion.a {...props}>
        {props.children}
    </motion.a>
  )
}
