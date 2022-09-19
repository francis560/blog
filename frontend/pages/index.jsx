import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import moment from "moment";


import Hero from "../components/hero";
import Footer from "../components/footer";


const Home = () => {

    const [latestPost, setLatestPost] = useState([]);
    const [onePost, setOnePost] = useState({});
    const [editorPick, setEditorPick] = useState([]);
    const [morePost, setMorePost] = useState([]);

    const test2 = [1, 2, 3, 4];

    useEffect(() => {

        axios.get("http://localhost:1337/api/posts?sort[0]=title&sort[1]=description&populate=*&pagination[page]=1&pagination[pageSize]=6").then(res => {
            setOnePost(res.data.data[0]);
            setLatestPost(res.data.data);
        });



        axios.get("http://localhost:1337/api/posts?sort[0]=title&sort[1]=description&populate=*&pagination[pageSize]=7").then(res => setMorePost(res.data.data));

    }, []);

    const router = useRouter();

    return (

        <div className="px-24">

            <Head>
                <title>The Blog</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Hero />

            {/* <div className="flex flex-row space-x-4 mt-6 px-4">
                <motion.button whileTap={{ scale: 0.9 }} className="px-4 py-1 rounded-md border-2 border-black hover:bg-slate-50 font-medium">Technology</motion.button>
            </div> */}

            <motion.article whileTap={{ scale: 0.9 }} onClick={() => router.push(`/article/${onePost.id}`)} className="cursor-pointer rounded-md p-6 bg-slate-100 grid grid-cols-6 my-14">
                <img className="col-span-3 rounded-md w-96" src={onePost?.attributes?.cover.data.attributes.url} alt="" />

                <div className="col-span-3 px-10 my-auto">
                    <span className="text-slate-400 font-regular text-sm">{moment(onePost?.attributes?.publishedAt).format('LL')}</span>
                    <h2 className="text-slate-900 font-bold my-2 text-xl">{onePost?.attributes?.title}</h2>
                    <p className="text-slate-500 font-regular text-base">{onePost?.attributes?.description}</p>
                </div>
            </motion.article>

            <section>

                <p className="text-slate-900 font-bold text-base">Latest articles</p>

                <div className="mt-6 space-y-4">

                    {latestPost.map((item, key) =>

                        <motion.div key={key} whileTap={{ scale: 0.9 }} onClick={() => router.push(`/article/${item.id}`)} className="rounded-md hover:bg-slate-100 cursor-pointer flex p-2">
                            <img className="rounded-md w-14" src={item.attributes.cover?.data.attributes.url} alt="" />

                            <div className="ml-4">
                                <h2 className="font-medium text-slate-900 text-base">{item.attributes.title}</h2>
                                <p className="text-slate-400 text-sm">{moment(item.attributes.publishedAt).format('LL')}</p>
                            </div>
                        </motion.div>

                    )}

                </div>

            </section>

            <section className="my-14">

                <p className="text-slate-900 font-bold text-base">Editor's Pick</p>

                <div className="mt-6 grid grid-cols-4 gap-2">

                    {test2.map((item, key) =>

                        <motion.div key={key} whileTap={{ scale: 0.9 }} onClick={() => router.push(`/article/${item.id}`)} className="rounded-md space-y-4 hover:bg-slate-100 cursor-pointer flex flex-col p-2">

                            <img className="rounded-md mx-auto" src="https://via.placeholder.com/1080x720" alt="" />

                            <span className="text-slate-400 text-xs">january 15, 2020</span>
                            <h2 className="font-medium text-slate-900 text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
                            <p className="text-slate-400 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quod quos beatae iure praesentium natus ratione quaerat ut, sequi a expedita neque maiores et officia? Odio laborum cum molestiae sed?</p>

                        </motion.div>

                    )}

                </div>

            </section>

            <section className="my-14">

                <p className="text-slate-900 font-bold text-base">More articles</p>

                <div className="mt-6 flex flex-col space-y-4">

                    {morePost.map((item, key) =>

                        <motion.div key={key} whileTap={{ scale: 0.9 }} onClick={() => router.push(`/article/${item.id}`)} className="rounded-md hover:bg-slate-100 cursor-pointer flex p-2">
                            <img className="rounded-md w-40" src={item.attributes.cover?.data.attributes.url} alt="" />

                            <div className="ml-4  space-y-1">
                                <span className="text-slate-400 text-sm">{moment(item.attributes.publishedAt).format('LL')}</span>
                                <h2 className="font-medium text-slate-900 text-lg">{item.attributes.title}</h2>
                                <p className="text-slate-400 text-sm">{item.attributes.description}</p>
                            </div>
                        </motion.div>

                    )}

                </div>

            </section>

            <Footer />

        </div>

    );

}


export default memo(Home);