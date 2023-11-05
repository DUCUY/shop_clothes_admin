import { useDispatch } from "react-redux";
import "./newProduct.css";
import { useState } from "react";
import { addProduct } from "../../redux/apiCall";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import toast from "react-hot-toast"


export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
          toast.success("Thêm sản phẩm mới thành công.")
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm sản phẩm mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Tên sản phẩm</label>
          <input type="text" placeholder="" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Mô tả </label>
          <input type="text" name="description" placeholder="Sản phẩm thoáng mát..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="thethao, bongda, thidau" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Giá tiền</label>
          <input type="text" name="price" placeholder="100000" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Số lượng</label>
          <input type="text" name="quantity" placeholder="20" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <select name="size" id="" onChange={handleChange}  >
            <option value="">Chọn size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
