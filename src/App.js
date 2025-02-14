import HomePage from "./pages/homepage/homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Forgotpassword from "./pages/forgotpassword/forgotpassword";
import ResetPasswordPage from "./pages/forgotpassword/ResetPasswordConfirmPage";
import { isAuthenticated } from "./config/Auth";
import Userindex from "./pages/userindex/userindex";
import UserSettings from "./pages/userSettings/UserSettings";
import CourseDetails from "./pages/coursedetails/coursedetails";
import CategoryPage from "./pages/categorypage/CategoryPage";
import ContactUs from "./pages/contactus/contactus";
import About from "./pages/about/About";
import AdminIndex from "./pages/Admin/AdminIndex";
import AdminCoursesManagement from "./pages/Admin/AdminCoursesManagement/AdminCoursesManagement";
import AdminUsersManagement from "./pages/Admin/AdminUsersManagement/AdminUsersManagement";
import AdminReviewsManagement from "./pages/Admin/AdminReviewsManagement/AdminReviewsManagement";
import AdminInbox from "./pages/Admin/AdminInbox/AdminInbox";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import CoursePlanning from "./pages/schedule/CoursePlanning";
import CreateAdminAccount from "./pages/Admin/CreateAdminAccount/CreateAdminAccount";
import AdminLogs from "./pages/Admin/AdminLogs/AdminLogs";
import ModifyProfile from "./pages/Admin/ModifyProfile/ModifyProfile";
import PublicRoute from './components/HOC/HOC';

function App() {
  const isAuth = isAuthenticated();

  return (
    <>
      {/*Routes*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />        
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route
          path="/resetpasswordpage/:token"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/userindex"
          element={isAuth ? <Userindex /> : <Navigate to="/login" />}
        />
        <Route
          path="/usersettings"
          element={isAuth ? <UserSettings /> : <Navigate to="/login" />}
        />
        <Route
          path="/coursedetails/:id"
          element={isAuth ? <CourseDetails /> : <Navigate to="/login" />}
        />{" "}
        <Route path="/category/:categoryName/page/:pageNumber" element={isAuth ? <CategoryPage /> : <Navigate to="/login" />} />
        <Route path="/contactus" element={isAuth ? <ContactUs /> : <Navigate to ="/login" />}/>
        <Route path="/about" element={ <About />}/>
        <Route path="/Admin" element={isAuth ?<AdminIndex/> : <Navigate to = "/login"/>}/>
        <Route path="/UsersManagement" element={isAuth? <AdminUsersManagement/>: <Navigate to ="/login"/>}/>
        <Route path="/CoursesManagement" element={isAuth? <AdminCoursesManagement/>: <Navigate to ="/login"/>}/>
        <Route path="/ReviewsManagement" element={isAuth?<AdminReviewsManagement/> : <Navigate to = "/login"/>}/>
        <Route path="/AdminLogs" element={isAuth? <AdminLogs/> : <Navigate to ="/login"/>}/>
        <Route path="/bookmarks" element={isAuth ? <BookmarksPage /> : <Navigate to="/login" />} />
        <Route path="/modify-profile" element={isAuth ? <ModifyProfile/>: <Navigate to ="/login"/>}/>

        <Route
        path="/schedule"
        element={isAuth? <CoursePlanning/>: <Navigate to="/login"/>}/>
        <Route
        path="/create-admin-account"
        element={isAuth? <CreateAdminAccount/>: <Navigate to="/login"/>}/>
        <Route
        path="/admin-contact-page"
        element ={isAuth? <AdminInbox/> : <Navigate to ="/login"/>}/>
      </Routes>
    </>
  );
}

export default App;
