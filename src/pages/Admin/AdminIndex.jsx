import React from "react";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
function AdminIndex() {
  return (
    <AdminNavbar>
    <div>
      
      <AdminDashboard />
    </div>
    </AdminNavbar>

  );
}

export default AdminIndex;
