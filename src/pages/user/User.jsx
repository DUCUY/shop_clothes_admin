import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userRequest } from "../../requestMethods";


export default function User() {
  const [inputs, setInputs] = useState({});
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.users.find((user) => user._id === userId));

  useEffect(() => {
    setInputs({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      address: user?.address
    });
  }, [user, refresh])

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await userRequest.put(`users/${userId}`, inputs)
    if (res.data.status === "successs") {
      toast.success("Cập nhật thành công.");
      setRefresh(!refresh);
    } else {
      toast.error("Cập nhật không thành công!");
    }

  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật người dùng</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">

        <div className="userShow">
          <div className="userShowBottom" >
            <span className="userShowTitle">Thông tin người dùng</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>

            <span className="userShowTitle">Liên lạc</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>

          </div>

        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Cập nhật</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên người dùng</label>
                <input
                  type="text"
                  name='username' value={inputs?.username} onChange={handleChange}
                  className="userUpdateInput"

                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  name='email' value={inputs?.email} onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name='phone' value={inputs?.phone} onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name='address' value={inputs?.address} onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div>
                <button type="submit" onClick={handleUpdate} className="userUpdateButton">Cập nhật</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
