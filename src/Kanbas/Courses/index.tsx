import { Navigate, Route, Routes, useParams, useLocation} from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editors";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { courses, assignments } from "../Database";
import Quizzes from "./Quizzes";

export default function Courses({ courses }: { courses: any[]; }) {
  const {cid, aid} = useParams();
  const course = courses.find((course) => course._id === cid); // find course based on the first parameter
  const assignment = assignments.find((assignment=>assignment._id === aid))
  const { pathname } = useLocation();

    return (
      <div id="wd-courses">
        <h2 className = "text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course && course.name}  &gt; {pathname.split("/")[4]}</h2><hr />
        <div className= "d-flex">
          <div className="d-none d-md-block">
          <CoursesNavigation />
          </div>
          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} /> {/*Find assignmemnt based on the second parameter*/}
              {/*<Route path="AssignmentEditor" element={<AssignmentEditor />} />*/}
              <Route path="People" element={<PeopleTable />} />
              <Route path="Quizzes/*" element={<Quizzes />} />
            </Routes>
            </div></div>
      </div>
  );}
  