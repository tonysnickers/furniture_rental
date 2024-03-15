import { useContext } from "react";
import { AuthenContext } from "../context/authContext";

export const useAuth = () => {
    return useContext(AuthenContext);
}