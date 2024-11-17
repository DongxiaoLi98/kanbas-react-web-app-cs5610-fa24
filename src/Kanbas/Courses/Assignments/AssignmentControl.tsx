import { BsPlus } from "react-icons/bs";
//import { IoEllipsisVertical } from "react-icons/io5";
//import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./Icon.css"
import { Link, useParams} from "react-router-dom";

export default function AssignmentControl() {
    const {cid} = useParams();
    
    return(
        <div id="wd-modules-controls" className="text-nowrap">
        <Link to={`/Kanbas/Courses/${cid}/Assignments/NewAssignment`}>
            <button className="btn btn-lg btn-danger me-1 float-end rounded-0">
            <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment</button></Link>

            <button className="btn btn-lg me-1 btn-secondary float-end rounded-0">
            <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group</button>

            <div className="input-container border rounded-0">
                <input type="text" placeholder="Search..." className="input-filed"></input>
                <CiSearch className="input-icon bg-white" />
            </div>
        </div>
    );
}