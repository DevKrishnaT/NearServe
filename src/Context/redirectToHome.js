import { useNavigate } from "react-router-dom";

const useHandleHome = () =>{
    const navigate = useNavigate();

    const handelHome = () =>{
        navigate("/");
    }
    return handelHome;
}

export default useHandleHome;