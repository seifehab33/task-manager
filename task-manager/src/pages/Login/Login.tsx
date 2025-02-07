import React, { useEffect, useState } from "react";
import style from "../Home/style.module.css";
import { Link } from "react-router-dom";
import { RainAnimation } from "../../components";
import { useSignIn } from "../../customHooks/useSignIn";

const { boxShadow } = style;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    alert("Name:Seif , Password:123456789");
  }, []);
  const { signIn, error, isPending } = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData); // Pass only email & password
  };

  return (
    <div className="relative h-screen flex justify-center items-center bg-[#6366f1]">
      <RainAnimation />
      <div
        className={`relative flex flex-col rounded-xl bg-white ${boxShadow} justify-center items-center max-w-fit p-3`}
      >
        <div className="flex flex-col justify-center items-center text-black">
          <h4 className="block text-xl font-bold text-slate-800">Sign Up</h4>
          <p className="text-slate-500 font-light">
            Nice to meet you! Enter your details to login.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 font-bold"
        >
          <div className="mb-1 flex flex-col gap-6">
            {["name", "password"].map((field) => (
              <div key={field} className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  {field}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder={`Your ${field}`}
                />
              </div>
            ))}
          </div>

          <button
            className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border  text-center text-sm text-[#6366f1] border-solid border-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Logging In..." : "Login In"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
          <p className="flex justify-center mt-6 text-sm text-slate-600">
            Don't have an account?
            <Link
              to="/"
              className="ml-1 text-sm font-semibold text-slate-700 underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
