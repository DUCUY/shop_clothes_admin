import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCall";

export default function CommentProduct() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const products = useSelector((state) => state.product.products);
  console.log(products);
  const totalComments = [];

  products.forEach(element => {
    element.comments.forEach((comment) => {
      totalComments.push({...comment, productName: element.title})
    })
  });

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // deleteProduct(id, dispatch);
  };

  const columns = [
    // { field: "index", headerName: "STT", width: 220 },
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "Người dùng",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.productName}
          </div>
        );
      },
    },
    {
      field: "comments", headerName: "Bình luận", width: 350,
      renderCell: (parrams) => {
        return (
          <div>
            {parrams.row.content}
          </div>
        )
      }
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
        rows={totalComments}
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