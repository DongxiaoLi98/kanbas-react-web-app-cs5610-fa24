import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {

  // children property
  // <ProtectedRoute> <Dashboard.../> </ProtectedRoute>
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Account/Signin" />;
}}

