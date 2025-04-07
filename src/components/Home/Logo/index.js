import React from 'react';
import { motion } from 'framer-motion';
import LogoS from '../../../assets/images/logo-3d.png';
import './index.scss';

const svgVariants = {
  visible: {
    rotate: 0,
    transition: { duration: 1 }
  }
}

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 7.4,
      ease: "easeInOut"
    }
  }
}

const Logo = () => {


  return (
    <div className="logo-container">
      <img
        className="solid-logo"
        src={LogoS}
        alt="JavaScript,  Developer"
      />

      <motion.svg
        // width="559pt"
        // height="897pt"
        version="1.1"
        viewBox="142 40 250 897"
        xmlns="http://www.w3.org/2000/svg"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        overflow="visible"
      >
        <g
          className="svg-container"
          // transform="translate(0 457) scale(.1 -.1)"
          fill="none"
        >
          <motion.path d="" variants={pathVariants}/>
        </g>
      </motion.svg>
    </div>
  )
}

export default Logo
