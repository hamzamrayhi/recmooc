import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import AdminLogsIcon from './adminLogsIcon.svg';
import CoursesIcon from "../../share/images/courses.svg";
import UsersIcon from "../../share/images/user.svg";
import ReviewsIcon from "../../share/images/reviews.svg";
import DashboardIcon from"../../share/images/dashboard.svg";
import CreateAdminIcon from"../../share/images/createAdmin.svg";
import AdminModifyIcon from "../../share/images/AdminModify.svg";
import LogoutIcon from "../../share/images/logoutAdmin.svg";
import InboxIcon from "../../share/images/inbox.svg"

const { Sider, Content } = Layout;

const AdminNavbar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleMenuItemClick = (key) => {
    if (key === "logout") {
      logout();
    } else {
      navigate(key);
    }
  };

  const path = window.location.pathname;

  const items = [
    {
      key: "/Admin",
      icon: <img src={DashboardIcon} alt="dashboard" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Dashboard",
    },
    {
      key: "/UsersManagement",
      icon: <img src={UsersIcon} alt="Users" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Users",
    },
    {
      key: "/CoursesManagement",
      icon: <img src={CoursesIcon} alt="Courses" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Courses",
    },
    {
      key: "/ReviewsManagement",
      icon: <img src={ReviewsIcon} alt="Reviews" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Reviews",
    },
    {
      key: "/AdminLogs",
      icon: <img src={AdminLogsIcon} alt="Logs" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Audit Logs",
    },
   
    {
      key: "/create-admin-account",
      icon: <img src={CreateAdminIcon} alt="Create Admin" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Create Admin Account"
    },
    {
      key: "/modify-profile",
      icon: <img src={AdminModifyIcon} alt="Modify Profile" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Modify Profile"
    },
    {
      key: "/admin-contact-page",
      icon: <img src={InboxIcon} alt="logout" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Contact Page",
    },
    {
      key: "logout",
      icon: <img src={LogoutIcon} alt="logout" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />,
      label: "Logout",
    },
 
  
  
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{ background: 'white' }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[path]}
          onClick={({ key }) => handleMenuItemClick(key)}
          style={{ paddingTop: '16px' }}
        >
          {items.slice(0, 5).map((item, index) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ marginBottom: index < 4 ? '16px' : '0' }}>
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Divider />
          {items.slice(5, 8).map((item, index) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ marginBottom: index < 1 ? '16px' : '0' }}>
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Divider />
          <Menu.Item key={items[8].key} icon={items[8].icon}>
            {items[8].label}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '16px', padding: '24px', background: '#fff', height: '100%' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminNavbar;
