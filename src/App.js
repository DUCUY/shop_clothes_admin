import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import SaleProduct from "./pages/sale/SaleProduct";
import Order from "./pages/order/Order";
import StockManagement from "./pages/stock/StockManagement";
import CommentProduct from "./pages/comment/CommentProduct";
import SupportUser from "./pages/support/SupportUser";
import { Toaster } from 'react-hot-toast';




function App() {
  // const admin = useSelector((state) => state.user.currentUser.isAdmin);
  const admin = useSelector((state) => state.user && state.user.currentUser && state.user.currentUser.isAdmin)
  return (
    <>
    <Toaster position="top-center"/>
    <Router>

      <Switch>
        {!admin && (<Route path="/">
          <Login />
        </Route>)}
        <Route path="/login">
          <Login />
        </Route>

        {admin && (
          <>

            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/salesproduct">
                <SaleProduct />
              </Route>
              <Route path="/order">
                <Order />
              </Route>
              <Route path="/stock">
                <StockManagement />
              </Route>
              <Route path="/comment">
                <CommentProduct />
              </Route>
              <Route path="/support">
                <SupportUser />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  </>
  );
}

export default App;
