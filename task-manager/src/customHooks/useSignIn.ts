import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/User/userLoginSlice";
import { useNavigate } from "react-router-dom";

const API_SIGNIN_URL = "http://localhost:8000/api/signin/";

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (credentials: { name: string; password: string }) => {
      const response = await axios.post(API_SIGNIN_URL, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.access) {
        localStorage.setItem("token", data.access); // Save token for persistence
        dispatch(setUser({ token: data.access, name: data.name })); // Store in Redux
        navigate("/dashboard");
      }
    },
    onError: (error: AxiosError) => {
      console.error("Error signing in:", error.response?.data || error.message);
    },
  });

  return { signIn, isPending, error };
};
