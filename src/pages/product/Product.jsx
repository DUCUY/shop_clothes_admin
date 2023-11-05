import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCall";
import toast from "react-hot-toast";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    const [product, setProduct] = useState();
    const [inputs, setInputs] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || "",
        inStock: product?.inStock || "",
        img: product?.img || "",
        newImage: null,
    });
    const dispatch = useDispatch();


    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    // useEffect(() => {
    //     setInputs({
    //         title: product?.title,
    //         description: product?.description,
    //         price: product?.price,
    //         inStock: product?.inStock,
    //         img: product?.img,
    //         newImage: null,
    //     });
    // }, [product, refresh]);

    const handleChange = (e) => {
        // setInputs((prev) => {
        //     return { ...prev, [e.target.name]: e.target.value };
        // });
        if (e.target.name === "newImage") {
            setInputs((prev) => ({
                ...prev,
                newImage: e.target.files[0], // Lưu trữ hình ảnh mới khi người dùng chọn
            }));
        } else {
            setInputs((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // const res = await userRequest.put(`products/${productId}`, inputs)
        // if(res.data.status === 'success'){
        //     toast.success("Cập nhật sản phẩm thành công.");
        //     setRefresh(!refresh);
        // } else {
        //     toast.error("Cập nhật không sản phẩm thành công!");
        // }
        const formData = new FormData();
        formData.append("title", inputs.title);
        formData.append("description", inputs.description);
        formData.append("price", inputs.price);
        formData.append("inStock", inputs.inStock);
        formData.append("img", inputs.img);
        formData.append("newImage", inputs.newImage); // Thêm hình ảnh mới vào formData

        try {
            const res = await userRequest.patch(`products/${productId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu của yêu cầu là form data
                },
            });

            if (res.data.status === "success") {
                toast.success("Cập nhật sản phẩm thành công.");
                setInputs({
                    title: res.data.data?.title || "",
                    description: res.data.data?.description || "",
                    price: res.data.data?.price || "",
                    inStock: res.data.data?.inStock || "",
                    img: res.data.data?.img || "",
                    newImage: null,
                })
            } else {
                toast.error("Cập nhật sản phẩm không thành công!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi cập nhật sản phẩm.");
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await userRequest.get("products/find/" + productId);
                setProduct(res.data);
           
                setInputs({
                    title: res.data?.title || "",
                    description: res.data?.description || "",
                    price: res.data?.price || "",
                    inStock: res.data?.inStock || "",
                    img: res.data?.img || "",
                    newImage: null,
                })
            } catch { }
        };
        if(productId){
            getProduct();
        }

    }, [productId]);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Hiệu suất bán hàng" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product?.img} alt="" className="productInfoImg" />
                        <span className="productName">{product?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">sale:</span>
                            <span className="productInfoValue">{product?.sale}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Trong kho:</span>
                            <span className="productInfoValue">{product?.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Tên sản phẩm</label>
                        <input type="text" name="title" onChange={handleChange} value={inputs?.title} />
                        <label>Mô tả sản phẩm</label>
                        <input type="text" name="description" onChange={handleChange} value={inputs?.description} />
                        <label>Giá tiền</label>
                        <input type="text" name="price" onChange={handleChange} value={inputs?.price} />
                        <label>Trong kho</label>
                        <input type="text" name="inStock" onChange={handleChange} value={inputs?.inStock} />
                        <div>
                            <button type="submit" onClick={handleUpdate} className="productButton">Cập nhật</button>
                        </div>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={inputs?.newImage ? URL.createObjectURL(inputs.newImage) : product?.img} alt="" className="productUploadImg" />
                            {/* <label for="file"> */}
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setInputs((prev) => ({
                                            ...prev,
                                            newImage: file,
                                        }));
                                    }
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
