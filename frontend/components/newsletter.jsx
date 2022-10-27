import Newletter from "@strapi-newsletter/react";


const Newsletter = () => {

    return (
        <section className="my-14">

            <div className="px-4 py-6 md:p-10 rounded-md bg-slate-100">
                <h2 className="font-bold text-slate-900 text-xl md:text-2xl text-center">Receive a notification when we publish a new post</h2>
                <p className="text-slate-400 text-sm md:text-md font-normal my-4 text-center">Receive an email a day with the most recent articles of this blog.</p>

                <div className="flex flex-row items-center mt-10 justify-center">
                    {/* <input type="email" placeholder="Enter your email" className="outline-none border-none bg-white px-3 py-2 rounded-md" />
                    <button className="text-white px-3 py-2 bg-slate-900 cursor-pointer rounded-md font-normal">Notify me</button> */}
                    <Newletter strapiEndpoint="http://localhost:1337" buttonText="Subscribe" />
                </div>

            </div>

        </section>
    );

}


export default Newsletter;