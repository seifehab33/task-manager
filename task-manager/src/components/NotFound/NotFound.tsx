import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
      <Link to="/" replace={true}>
        {" "}
        How about going back to safety?
      </Link>
    </div>
  );
}
