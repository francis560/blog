import Skeleton from "react-loading-skeleton";


import 'react-loading-skeleton/dist/skeleton.css'


const HeroLoading = () => {

    return (
        <div className="rounded-md p-6 bg-slate-50 grid grid-cols-6 gap-6 my-14">

            <div className="col-span-2">
                <Skeleton className="h-56" count={1} />
            </div>
            
            <div className="col-span-4 my-auto">
                <div className="w-2/12">
                    <Skeleton className="h-2" count={1} />
                </div>

                <Skeleton className="h-8 mb-2" count={1} />

                <div className="w-9/12">
                    <Skeleton className="h-4" count={4} />
                </div>
            </div>

        </div>
    );

}


export default HeroLoading;