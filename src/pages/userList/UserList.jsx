import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../../redux/apiCall";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    getUsers(dispatch);
  },[dispatch]);

  const handleDelete = (id) => {
    deleteUser(id,dispatch);
  };

  let rowNum = 1;

  const columns = [
    {
      field: 'rowNumber',   
      headerName: 'STT',
      width: 75,
      sortable: false, // Không cho phép sắp xếp theo cột số thứ tự
      renderCell: (params) => {
        return <div>
          {/* {params.api.getRowIndex(params.row.code)+ 1} */}
          {rowNum++}
        </div>;
      },
    },
    {
      field: "user",
      headerName: "Tên người dùng",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email",
    headerName: "Email",
     width: 200,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 350,
    },
    {
      field: "phone",
      headerName: "SĐT",
      width: 120,
    },
    // {
    //   field: "transaction",
    //   headerName: "Tổng giao dịch",
    //   width: 150,
    // },
    {
      field: "isAdmin",
      headerName: "Vai trò",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
