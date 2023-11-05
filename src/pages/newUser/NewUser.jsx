import { useState } from "react";
import "./newUser.css";
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import { addUser } from "../../redux/apiCall";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();

    }
    const user = { ...inputs };
    addUser(user, dispatch);

    setValidated(true);
  };


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };



  return (
    <div className="newUser">
      <h1 className="newUserTitle">Tạo quản trị viên</h1>

      <Form  noValidate validated={validated} onSubmit={handleSubmit} method="post">
        <Row className="newUserForm mb-3" >
          <Form.Group as={Col} md="6" controlId="validationCustom01" className="newUserItem">
            <Form.Label>Tên Người dùng</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              placeholder="Nhập tên"
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback type="invalid">
              Vui lòng nhập tên
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02" className="newUserItem">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Nhập Email"
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback type="invalid">
              Vui lòng nhập Email
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04" className="newUserItem">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              required
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"

            />
            {/* <Form.Control.Feedback type="invalid">
              Vui lòng nhập số điện thoại

            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03" className="newUserItem">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback type="invalid">
              Vui lòng nhập mật khẩu

            </Form.Control.Feedback> */}
          </Form.Group>

        </Row>
        <Button type="submit" className="newUserButton">Creat</Button>
      </Form>
    </div>
  );
}
