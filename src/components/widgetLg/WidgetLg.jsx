import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
// import {format} from "timeago.js";
import formatVND from "../../formatVND";


export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        const latestOrders = res.data.slice(0, 5);
        setOrders(latestOrders);
      } catch (err) {
        return err;
      }
    };
    getOrders();
  }, []);


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Giao dịch mới nhất</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Thời gian</th>
          <th className="widgetLgTh">Số tiền</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        {orders.map((order) => (

          <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.username}</span>
          </td>
          <td className="widgetLgDate">{order.createdAt}</td>
          <td className="widgetLgAmount">{formatVND(order.amount)}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
              ))}
        
      </table>
    </div>
  );
}
