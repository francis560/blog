import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";
import axios from "axios";


import Hero from "../../components/hero";
import NewSletter from "../../components/newsletter";
import Footer from "../../components/footer";
import PostLoading from "../../components/loadings/post";
import MoreArticles from "../../components/loadings/moreArticles";


const Article = () => {

    const router = useRouter();

    const { id } = router.query;

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [content, setContent] = useState({});
    const [post, setPost] = useState({ attributes: {} });
    const [morePost, setMorePost] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:1337/api/posts/${id}`).then(({ data }) => {
            setPost(data.data);
            setContent(JSON.parse(data.data.attributes.content));
            setLoading(false);
        });

        axios.get("http://localhost:1337/api/posts?sort[0]=title&sort[1]=description&populate=*&pagination[pageSize]=7").then(res => {
            setMorePost(res.data.data);
            setLoading2(false);
        });

    }, [id]);

    const returnContent = (item, key) => {

        if (item.type === "header") {
            return (
                <h1 className="font-bold text-slate-900 text-xl md:text-3xl">{item.data.text}</h1>
            )
        }

        if (item.type === "paragraph") {
            return (
                <p className="font-regular text-slate-500 text-base">{item.data.text}</p>
            )
        }

        if (item.type === "image") {
            return (
                <img className="rounded-md w-full object-cover" src={item.data.file.url} />
            )
        }

        if (item.type === "list") {
            return (
                <ul className="p-4">
                    {item.data.items.map((items, key) =>
                        <li className="font-regular text-slate-500 list-disc text-base">{items}</li>
                    )}
                </ul>
            )
        }

        if (item.type === "table") {
            return (
                <table>
                    <thead>
                        <tr>
                            {item.data.content[0].map((item, key) =>
                                <th className="py-3 px-6 bg-slate-200" key={key}>{item}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {item.data.content.map((items, key) =>
                            item.data.content[0] !== items &&
                            <tr key={key}>
                                {items.map((text, key) =>
                                    <td className="py-3 px-6 bg-slate-100" key={key}>{text}</td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        }

        if (item.type === "warning") {
            return (
                <div className="flex flex-row space-x-4 rounded-md p-4 bg-yellow-100">
                    <p className="font-bold my-auto text-slate-900 text-sm">{item.data.title}</p>
                    <p className="font-regular text-slate-500 text-sm">{item.data.message}</p>
                </div>
            )
        }

        if (item.type === "code") {
            return (
                <pre className="bg-slate-900 p-4 rounded-md text-cyan-400 text-base"><code>{item.data.code}</code></pre>
            )
        }

        if (item.type === "raw") {
            return (
                <pre className="bg-slate-900 p-4 rounded-md text-red-400 text-base"><code>{item.data.html}</code></pre>
            )
        }

        if (item.type === "quote") {
            return (
                <div className="flex flex-col text-center space-y-2 rounded-md p-6 bg-slate-200">
                    <p className="font-regular text-slate-500 text-base">{item.data.text}</p>
                    <p className="font-bold my-auto text-slate-900 text-sm">{item.data.caption}</p>
                </div>
            )
        }

        if (item.type === "delimiter") {
            return (
                <div className="border-2 border-dashed border-slate-200 rounded-md   " />
            )
        }

    }

    return (

        <div className="px-4 md:px-12 lg:px-24">

            <Head>
                <title>{post.attributes.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Hero />

            {
                loading ?
                    <PostLoading />
                    :
                    <div className="px-2 md:px-14 lg:px-28 mb-14">
                        <button onClick={() => router.push("/")} className="font-regular my-8 text-slate-400 text-sm hover:text-slate-300 flex items-center"><i className="fi fi-rr-arrow-small-left mr-2 inline-flex"></i>Regresar</button>
                        <span className="text-slate-400 font-regular text-sm mb-2">{moment(post.attributes.publishedAt).format('LL')}</span>

                        <section className="space-y-6">

                            {
                                content.blocks.map((item, key) =>
                                    returnContent(item, key)
                                )
                            }

                        </section>

                    </div>
            }

            <section className="my-14">

                <p className="text-slate-900 font-bold text-base">More articles</p>

                {
                    loading2 ?
                        <MoreArticles />
                        :
                        <div className="mt-6 flex flex-col space-y-8 md:space-y-4">

                            {morePost.map((item, key) =>

                                <motion.div key={key} whileTap={{ scale: 0.9 }} onClick={() => router.push(`/article/${item.id}`)} className="rounded-md hover:bg-slate-100 cursor-pointer flex flex-col md:flex-row md:p-2">
                                    <img className="rounded-md w-full md:w-40 h-40 object-cover" src={item.attributes.cover?.data.attributes.url} alt="" />

                                    <div className="md:ml-4 space-y-1">
                                        <span className="text-slate-400 text-sm">{moment(item.attributes.publishedAt).format('LL')}</span>
                                        <h2 className="font-medium text-slate-900 text-lg">{item.attributes.title}</h2>
                                        <p className="text-slate-400 text-sm line-clamp-3">{item.attributes.description}</p>
                                    </div>
                                </motion.div>

                            )}

                        </div>
                }

            </section>

            <NewSletter />

            <Footer />

        </div>

    );

}


export default memo(Article);