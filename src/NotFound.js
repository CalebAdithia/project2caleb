import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="flex flex-col justify-center items-center h-full">
            <p className="text-7xl text-[#BA60FE]">404</p>
            <p className="text-2xl">Page Not Found</p>
            <Link to={'/dashboard'} className="mt-2 underline underline-offset-4 hover:text-[#BA60FE]">Back to Dashboard &gt;&gt;</Link>
        </div>
     );
}
 
export default NotFound;