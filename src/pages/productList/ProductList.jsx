import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCall";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userRequest } from "../../requestMethods";
import toast from "react-hot-toast";
import formatVND from "../../formatVND"


export default function ProductList() {

  const [open, setOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState();
  const [selectProductId, setSelectProductId] = useState();
  const [inputs, setInputs] = useState();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);


  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      field: "product",
      headerName: "Sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Kho", width: 100 },
    {
      field: "price",
      headerName: "Giá tiền",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatVND(params.row.price)}
          </div>
        );
      },
    },
    {
      field: "oldprice",
      headerName: "Giá cũ",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatVND(params.row.oldprice)}
          </div>
        );
      },
    },
    { field: "sale", headerName: "Giảm giá", width: 140 },
    {
      field: "totalRate",
      headerName: "Đánh giá ",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.totalRate}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 165,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <div >
              <button className="productListEdit" onClick={() => {
                handleClickOpen()
                setSelectProduct(params.row.title)
                setSelectProductId(params.row._id)

              }} >Sale</button>
            </div>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />

          </>
        );
      },
    },
  ];

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleDiscount = async () => {
    const discount = await userRequest.post(`products/discount/${selectProductId}`, inputs);
    if (discount.data.status === "OK") {
      toast.success("Cập nhật giảm giá thành công.");
      handleClose();
    } else {
      toast.error("Cập nhật giảm giá không thành công!");
    }
    console.log(discount);
  };

  return (
    <div className="productList">
      <Link to="/newproduct">
        <button className="productAddButton">Create</button>
      </Link>
      <DataGrid
        rows={products}
        rowNumberMode="static"
        enableRowNumbers
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Giảm giá sản phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectProduct}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="salepercent"
              name="salepercent"
              label="Nhập % muốn giảm giá"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            <Button onClick={handleDiscount}>Giảm giá</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
