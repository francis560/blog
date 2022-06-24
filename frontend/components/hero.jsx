import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const Hero = () => {

    const [selectedId, setSelectedId] = useState(null);

    return (

        <header className="bg-black p-10 rounded-b-md">
            <nav className="flex justify-between">
                {/* <img src="" alt="" /> */}
                <p className="font-extrabold text-white">Logo</p>

                <motion.button layoutId={{id: "search"}} onClick={() => setSelectedId({ id: "search" })} className="flex items-center justify-center cursor-pointer"><i className="fi fi-rr-search inline-flex text-base text-white"></i></motion.button>
            </nav>

            <hr className="my-4" />

            <h1 className="font-extrabold text-white text-9xl">THE BLOG</h1>

            <AnimatePresence>
                {selectedId && (
                    <motion.div className="flex z-40 items-center justify-center fixed left-0 top-0 w-full h-full bg-slate-900/90" layoutId={selectedId}>
                        <motion.input className="text-white outline-none border-b-2 py-2 mr-6 w-4/5 md:w-4/12 bg-transparent" placeholder="Search..." layoutId={selectedId.id} />
                        <motion.button onClick={() => setSelectedId(null)} className="flex items-center justify-center cursor-pointer"><i class="fi fi-rr-cross inline-flex text-base text-white"></i></motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>

    );

}


export default Hero;