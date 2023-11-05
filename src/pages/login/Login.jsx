import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { publicRequest } from "../../requestMethods";
import { loginSuccess } from "../../redux/userRedux";
import "./login.css"
import toast from "react-hot-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const next = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    const api = async () => {
      const res = await publicRequest.post("auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      if (res.data) {
        next.push('/');
        toast.success("Đăng nhập thành công.");
      }
    }
    api();
  };

  return (
    <div className="Container">
      <div className="Wrapper">
        <h2>ĐĂNG NHẬP ADMIN</h2>
        <input className="inForm"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="inForm"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={handleClick} >
          Đăng Nhập
        </button>
      </div>
    </div>
  );
};

export default Login;
