import Skeleton from "react-loading-skeleton";


import 'react-loading-skeleton/dist/skeleton.css'


const MoreArticles = () => {

    const list = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="mt-6 space-y-4 p-2">

            {list.map((item, key) =>
                
                <div key={key} className="grid grid-cols-6 gap-6">

                    <Skeleton className="h-36 col-span-1" count={1} />
                    
                    <div className="col-span-4">
                        <div className="w-2/12">
                            <Skeleton className="h-2" count={1} />
                        </div>

                        <Skeleton className="h-8 mb-2" count={1} />

                        <div className="w-9/12">
                            <Skeleton className="h-4" count={3} />
                        </div>
                    </div>

                </div>

            )}

        </div>
    );

}


export default MoreArticles;