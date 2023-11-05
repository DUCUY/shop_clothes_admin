import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function SupportUser() {

    const [mess, setMess] = useState([]);


  useEffect(() => {
    const getMess = async () => {
        try {
            const res = await userRequest.get('users/messsupports');
            console.log(res);
            setMess(res.data.mess);
        } catch(err) {
            console.log(err);
            return err
        }
    };
    getMess();
  }, []);

  const handleDelete = (id) => {
    // deleteProduct(id, dispatch);
  };

  const columns = [
    // { field: "index", headerName: "STT", width: 220 },
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Người dùng",
      width: 150,
      
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "phone", 
      headerName: "SĐT", 
      width: 150,
      
    },
    {
        field: "mess", 
        headerName: "Tin nhắn hỗ trợ", 
        width: 350,
        
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={mess}
        rowNumberMode="static"
        enableRowNumbers
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  )
}