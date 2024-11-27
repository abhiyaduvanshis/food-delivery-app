import { memo } from "react";
import { motion } from "framer-motion"

const LoadingPopup=()=>{

    return (
       <>

            <motion.img
                src="/assets/images/scooter.png"
                alt="Running Bike"
                style={{
                width: '90px',
                position: 'relative',
                left:'45%',
                bottom:'-10px'
                }}
                animate={{
                    y: [3,10], // Move from x = 0 to x = 200px
                    }}
                    transition={{
                    duration: 1, // 1 second duration
                    ease: 'linear',
                    repeat: Infinity, // Repeat infinitely
                    repeatType: 'reverse', // Alternate direction
                }}
            />
          
       </>
    );
}

export default memo(LoadingPopup);