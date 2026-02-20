"use client";
import {motion} from 'framer-motion';

export default function MotionH1({...props}) {
  return (
    <motion.h1 {...props}>
        {props.children}
    </motion.h1>
  )
}
