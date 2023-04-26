import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button, Navbar, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { setLogout } from "../redux/reducers/auth";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutFunc = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userName, role, isLoggedIn, userId, pfp } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      pfp: state.auth.pfp,
      userName: state.auth.userName,
      isLoggedIn: state.auth.isLoggedIn,
      role: state.auth.role,
    };
  });
  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, []);
  return (
    <>
      <Navbar
        bg="light"
        className="py-2 fixed-top"
        expand="lg"
        style={{ boxShadow: `0 2px 4px 0 rgba(0,0,0,.2)` }}
      >
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={(e) => {
              navigate("/");
            }}
          >
            <img
              style={{ width: "36px", margin: "auto" }}
              src="/logo.png"
              alt="logo"
            />
            <strong>SnapFeed</strong>
          </Navbar.Brand>{" "}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.target[0].value !== "") {
                navigate(`/search/${e.target[0].value}`);
              }
            }}
          >
            <InputGroup className="mb-auto">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button
                type="submit"
                variant="outline-secondary"
                id="button-addon2"
              >
                <BsSearch style={{ marginBottom: "2px" }} />
              </Button>
            </InputGroup>
          </Form>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={pfp} sx={{ width: 38, height: 38 }}></Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                navigate(`/profile/${userId}`);
                handleClose();
              }}
            >
              <Avatar src={pfp} /> Profile
            </MenuItem>

            <Divider />
            {role === "Admin" && (
              <MenuItem
                onClick={(e) => {
                  navigate(`/dashboard`);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                logOutFunc();
                handleClose();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Container>
      </Navbar>
    </>
  );
}
