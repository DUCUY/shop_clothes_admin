import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm sản phẩm mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Tên sản phẩm</label>
          <input type="text" placeholder="" />
        </div>
        <div className="addProductItem">
          <label>Số lượng</label>
          <input type="text" placeholder="100" />
        </div>
        {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
