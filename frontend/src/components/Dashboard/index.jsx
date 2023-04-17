import React, { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { Container, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const { role } = useSelector((state) => {
    return {
      role: state.auth.role,
    };
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (role !== "Admin") navigate("/");
  });
  return (
    <div>
      <Container>
        <div style={{ margin: "5px" }}>
          <h4
            className="title-name"
            style={{ fontWeight: "lighter", marginTop: "15px" }}
          >
            <span>Admin Dashboard</span>
          </h4>
        </div>
        <div className="row">
          <div className="col-md-3" style={{ marginBottom: "10px" }}>
            <Card>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item
                    onClick={(e) => navigate("/dashboard")}
                    className="list-filter"
                  >
                    <strong>Status</strong>
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={(e) => navigate("/dashboard/users")}
                    className="list-filter"
                  >
                    <strong>Users</strong>
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={(e) => navigate("/dashboard/")}
                    className="list-filter"
                  >
                    <strong>Posts</strong>
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={(e) => navigate("/dashboard/")}
                    className="list-filter"
                  >
                    <strong>Add a new admin</strong>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md">
            {" "}
            <Routes>
              <Route path="/" element={<h1>hi</h1>} />
              <Route path="/users" element={<h1>hi</h1>} />
              <Route path="/" element={<h1>hi</h1>} />
              <Route path="/" element={<h1>hi</h1>} />
            </Routes>
          </div>
        </div>
      </Container>
    </div>
  );
}
