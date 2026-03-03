import { useNavigate } from "react-router-dom";

const useHandleLogin = () => {
  const navigate = useNavigate();
  const handelLogin = () => {
    navigate("/login");
  };
  return handelLogin;
};

export default useHandleLogin;
