import { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import algoliasearch from "algoliasearch";


const Hero = () => {

    const [selectedId, setSelectedId] = useState(null);
    const [autoComplete, setAutoComplete] = useState([{}]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);

    const APPLICATION_ID = 'IAGFGMYGHZ';
    const SEARCH_API_KEY = '2a6411d1154b1f0f5471956a528f8c7c';
    const ALGOLIA_INDEX = 'development_api::post.post';

    const router = useRouter();

    const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
    const index = client.initIndex(ALGOLIA_INDEX);

    const performSearch = async (val) => {

        if (val === "") {
            return setShowAutoComplete(false)
        } 

        await index.search(val, { hitsPerPage: 3, highlightPreTag: ' ', highlightPostTag: ' ' }).then(({ hits }) => {

            const results = hits.map(hit => {

                const { objectID: key, _highlightResult } = hit;

                const {
                    title: { value: title },
                    description: { value: description },
                } = _highlightResult;

                const cover = _highlightResult?.cover;

                return { title, key, description, cover };

            });

            setAutoComplete(results);
            setShowAutoComplete(true);

        });

    }

    return (

        <header className="bg-slate-900 p-10 rounded-b-md">
            <nav className="flex justify-between">
                {/* <img src="" alt="" /> */}
                <p className="font-extrabold text-white">Logo</p>

                <motion.button layoutId={{ id: "search" }} onClick={() => setSelectedId({ id: "search" })} className="flex items-center justify-center cursor-pointer"><i className="fi fi-rr-search inline-flex text-base text-white"></i></motion.button>
            </nav>

            <hr className="my-4" />

            <h1 className="font-extrabold text-white text-9xl">THE BLOG</h1>

            <AnimatePresence>
                {selectedId && (
                    <motion.div className="flex space-y-10 flex-col z-40 items-center justify-center fixed left-0 top-0 w-full h-full bg-slate-900/90" layoutId={selectedId}>
                        
                        <motion.div className="flex items-center justify-center w-1/2">
                            <motion.input onChange={(e) => performSearch(e.target.value)} className="text-white outline-none border-b-2 py-2 mr-6 w-4/5 md:w-1/2 bg-transparent" placeholder="Search..." layoutId={selectedId.id} />
                            <motion.button onClick={() => {
                                setShowAutoComplete(false)
                                setSelectedId(null)
                            }} className="flex items-center justify-center cursor-pointer"><i className="fi fi-rr-cross inline-flex text-base text-white hover:text-red-400"></i></motion.button>
                        </motion.div>

                        <div className="space-y-4 w-1/2">
                            {
                                showAutoComplete &&

                                autoComplete.map((item, key) =>
                                    <motion.div whileTap={{ scale: 0.9 }} className="flex flex-row cursor-pointer rounded-md w-full bg-white p-2" key={key} onClick={() => {
                                        setShowAutoComplete(false)
                                        setSelectedId(null)
                                        router.push(`/article/${item.key}`)
                                    }}>
                                        <img className="rounded-md w-32" src={" https://res.cloudinary.com/dqvcp9dby/image/upload/v1663599795/" + item?.cover?.hash.value} alt="" />

                                        <div className="ml-4 my-auto">
                                            <p className="text-slate-900 font-bold text-base">{item.title}</p>
                                            {/* <p className="text-slate-400 font-normal text-sm">{item.description}</p> */}
                                        </div>
                                    </motion.div>
                                )
                            }
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </header>

    );

}


export default Hero;