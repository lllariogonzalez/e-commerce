import { motion } from 'framer-motion';

const animations = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 , y: -50},
};

export default function TransitionY({ children }){
    return(
        <motion.div 
            variants={animations} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            transition={{ 
                duration : 0.25,
                ease: "easeInOut",
            }} 
        >
            { children }
        </motion.div>
    )
}