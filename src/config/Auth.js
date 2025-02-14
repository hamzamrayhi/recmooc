export const isAuthenticated =()=>{
const token = window.localStorage.getItem("token");
return !!token;
};