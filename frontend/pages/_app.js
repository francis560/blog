import { motion } from 'framer-motion';


import '../styles/globals.css'
import "../styles/custom.css";


function MyApp({ Component, pageProps, router }) {

  return (

    <motion.div key={router.route} initial="pageInitial" transition={{duration: 1}} animate="pageAnimate" variants={{pageInitial: {opacity: 0}, pageAnimate: {opacity: 1}}}>

      <Component {...pageProps} />

    </motion.div>

  );

}

export default MyApp