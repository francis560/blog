import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";


import 'react-loading-skeleton/dist/skeleton.css'


const Post = () => {

    const router = useRouter();

    const list = [1, 2, 3, 4];

    return (
        <div className="px-28 my-14">

            <button onClick={() => router.push("/")} className="font-regular mb-8 text-slate-400 text-sm hover:text-slate-300 flex items-center"><i className="fi fi-rr-arrow-small-left mr-2 inline-flex"></i>Regresar</button>

            <div className="w-1/2 mb-12">
                <Skeleton className="h-8" count={1} />
            </div>

            {list.map((item, key) =>
                <div key={key} className="mt-6">
                    <Skeleton className="h-5 mb-2" count={6} />
                </div>
            )}

        </div>
    );

}


export default Post;