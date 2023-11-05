import "./sidebar.css";
import {
  LineStyle,
  // Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  // BarChart,
  // MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  // Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
            <Link to="/salesproduct" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Sản Phẩm
              </li>
            </Link>
            <Link to="/order" className="link" >
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Đơn hàng
              </li>
            </Link>
            <Link to="/stock" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Quản lý kho
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông Báo</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Hỗ trợ 
            </li> */}
            <Link to="/comment" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Bình luận
              </li>
            </Link>
            {/* <Link to="/rate" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Rate
              </li>
            </Link> */}
            <Link to="/support" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Hỗ trợ
              </li>
            </Link>

          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Nhân viên</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Quản lý kho
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
