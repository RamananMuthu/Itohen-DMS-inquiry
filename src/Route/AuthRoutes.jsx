import UserLogin from '../Auth/UserLogin';
import StaffLogin from '../Auth/StaffLogin';
import Register from '../Auth/Register';
export const authRoutes = [
  //{ path: `${process.env.PUBLIC_URL}/loginotp`, Component: <Loginotp /> },
  { path: `${process.env.PUBLIC_URL}/inquiry/adminlogin`, Component: <UserLogin /> },
  { path: `${process.env.PUBLIC_URL}/inquiry/stafflogin`, Component: <StaffLogin /> },
  { path: `${process.env.PUBLIC_URL}/inquiry/register`, Component: <Register /> },
];
