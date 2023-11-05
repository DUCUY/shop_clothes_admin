import { DataGrid } from "@material-ui/data-grid";
import { Check, Close, DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import formatVND from "../../formatVND"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./Order.css";
import toast from "react-hot-toast";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [refresh, setRefresh] = useState(false);
  const [shipping, setShipping] = useState('');
  const [idShipping, setIdShipping] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (err) {
        return err;
      }
    };
    getOrders();
  }, [refresh]);


  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(`orders/${id}`)
      if (res.data.tb === 'success') {
        toast.success('Xóa đơn hàng thành công.');
        setRefresh(!refresh);
      } else {
        toast.error('Xóa đơn hàng không thành công!');
      }
    } catch (err) {
      console.log(err);
      toast.error('Đã xảy ra lỗi khi xóa đơn hàng!');
    }

  };


  const selectDetailOrder = (id) => {
    const order = orders.find(order => order._id === id)
    setDataDetail(order)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };


  const handleApprouvedOrder = (id) => {
    const aro = async () => {
      try {
        const res = await userRequest.post(`orders/approvedOrder/${id}`);
        if (res.data.status === 'OK') {
          toast.success("Đã duyệt đơn hàng thành công.");
          setRefresh(!refresh);
        } else {
          toast.error("Duyệt đơn hàng không thành công!");

        }
      } catch (err) {
        console.error(err);
      }
    };
    aro();
  };


  const handleRefuseOrder = (id) => {
    const rfo = async () => {
      try {
        const res = await userRequest.post(`orders/refuseOrder/${id}`);
        if (res.data.status === 'OK') {
          toast.success("Đã từ chối đơn hàng thành công.");
          setRefresh(!refresh);
        } else {
          toast.error("Từ chối đơn hàng không thành công!");
        }
      } catch (err) {
        console.error(err);
      }
    };
    rfo();
  };

  const handleChange = (event) => {
    setShipping(event.target.value);
  };

  const handleShipping = () => {
    const hpo = async () =>{
      try{
        const res = await userRequest.post(`orders/shippingOrder/${idShipping}`, {shipping});
        if (res.data.status === 'OK'){
          toast.success("Cập nhật trạng thái vận chuyển thành công.");
          setRefresh(!refresh);
        } else {
          toast.error("Cập nhật trạng thái vận chuyển không thành công!");
        }
      } catch(err) {
        console.error(err);
      }
    };
    hpo();
  };
 

  let rowNum = 1;

  const columns = [
    // { field: "index", headerName: "STT", width: 220 },
    // { field: "_id", headerName: "ID", width: 220 },
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
      field: "username",
      headerName: "Người mua",
      width: 100,
    },

    { field: "phone", headerName: "SĐT", width: 120 },

    { field: "address", headerName: "Địa chỉ", width: 280 },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
    },

    {
      field: "ship",
      headerName: "Vận chuyển",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <button onClick={() => {
              handleClickOpen1()
              setIdShipping(params.row._id)
            }} className="productListEdit" style={{minWidth: '200px'}}>{params.row.ship}</button>
            </div>
          </>
        );
      }
    },

    {
      field: "vb",
      headerName: "Chi tiết đơn hàng",
      width: 100,
      renderCell: (params) => {
        return (
          <>

            <button onClick={() => {
              handleClickOpen()
              selectDetailOrder(params.row._id)
            }} className="productListEdit">Chi tiết</button>
          </>
        );
      }
    },

    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Check onClick={() => handleApprouvedOrder(params.row._id)} />
            <Close onClick={() => handleRefuseOrder(params.row._id)} />
            <button className="productListEdit" >Edit</button>

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
    <div className="order">
      <DataGrid
        rows={orders}
        rowNumberMode="static"
        enableRowNumbers
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
      <div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Chi tiết đơn hàng"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              <div className="orderDetails">
                <div className="orderDetail">Mã đơn hàng: {dataDetail?._id}</div>
                <div className="orderDetail"> Khách hàng: {dataDetail?.username}</div>
                <div className="orderDetail">Số điện thoại: {dataDetail?.phone}</div>
                <div className="orderDetail">Địa chỉ nhận hàng: {dataDetail?.address}</div>

                {dataDetail?.products.map((product) =>
                  <div className="orderDetails-List orderDetail">
                    <img src={product.img} alt="" />
                    <div className="orderDetails-Item">
                      <div>Tên sản phẩm: {product.productName}</div>
                      <div>Size: {product.size}</div>
                      <div>Color: {product.color}</div>
                      <div>Số lượng: {product.quantity}</div>
                    </div>
                  </div>
                )}

                <div className="orderDetail">Tổng tiền: {formatVND(dataDetail?.amount)}</div>
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>

        <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Trạng thái vận chuyển đơn hàng"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormControl sx={{ m: 1 , minWidth: 200}} size="small" style={{width: '100%'}}>
                  {/* <InputLabel id="demo-select-small-label">Trạng thái</InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={shipping}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='Đơn hàng đã được đóng gói'> Đơn hàng đã được đóng gói</MenuItem>
                    <MenuItem value='Đã giao cho đơn vị vận chuyển'>Đã giao cho đơn vị vận chuyển</MenuItem>
                    <MenuItem value='Đơn hàng đang được vận chuyển'>Đơn hàng đang được vận chuyển</MenuItem>
                    <MenuItem value='Đang giao đơn hàng tới bạn'>Đang giao đơn hàng tới bạn</MenuItem>
                    <MenuItem value='Giao hàng thành công'>Giao hàng thành công</MenuItem>

                  </Select>
                </FormControl>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleClose1}>Đóng</Button>
            <Button onClick={handleShipping}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}