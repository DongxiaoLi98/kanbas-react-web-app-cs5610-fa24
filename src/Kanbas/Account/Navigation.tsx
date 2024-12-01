import { Link, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const { pathname } = useLocation();

  const isActive = (path: any) => (pathname === path ? "active" : "");

  return (
      <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

          <Link to={`/Kanbas/Account/Signin`}  className={`list-group-item 
              ${isActive(`/Kanbas/Account/Signin`)} text-danger border border-0`}> Signin  </Link> <br/>

          <Link to={`/Kanbas/Account/Signup`} className={`list-group-item 
            ${isActive(`/Kanbas/Account/Signup`)} text-danger border border-0`}> Signup  </Link> <br/>

          <Link to={`/Kanbas/Account/Profile`} className={`list-group-item 
            ${isActive(`/Kanbas/Account/Profile`)} text-danger border border-0`}> Profile </Link> <br/>
            {currentUser && currentUser.role === "ADMIN" && (
          <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${isActive("Users")}`}> Users </Link> )}

      </div>
);}
