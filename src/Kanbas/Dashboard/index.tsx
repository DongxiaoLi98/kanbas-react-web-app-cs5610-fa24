import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className = "row">

      <div className="row row-cols-1 row-cols-md-5 g-4">

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width="100%" height = {160}/>
            <div className = "card-body">
              <h5 className = "wd-dashboard-course-title card-title">
                 CS1234 React JS
                 </h5>
              <p className="wd-dashboard-course-title card-text">
                2024_Fall Full Stack software developer
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/AlignMath.jpg" width="100%" height = {160} />
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Align Math
                 </h5>
              <p className="wd-dashboard-course-title card-text">
                2024_Fall Foundations of Math
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5004.jpg" width="100%" height = {160}/>
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Object-Oriented Design
                 </h5>
                 <p className="wd-dashboard-course-title card-text">
                2024_Fall SOLID
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5088.jpg" width="100%" height = {183} />
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Data Structure
                 </h5>
                 <p className="wd-dashboard-course-title card-text">
                2024_Fall Merged
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5009.jpg" width="100%" height = {183}  />
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Recitation for CS5008
                 </h5>
                 <p className="wd-dashboard-course-title card-text">
                2024_Fall CS5009
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5005.jpg" width="100%" height = {160}/>
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Recitation for CS5004
                 </h5>
                 <p className="wd-dashboard-course-title card-text">
                2024_Fall CS5005
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5002.jpg"width="100%" height = {160} />
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Discrete Structure
                 </h5>
                 <p className="wd-dashboard-course-title card-text">
                 2024_Fall CS5002
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>

        <div className="wd-dashboard-course col" style={{width:"260px"}}>
        <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CareerDesign.jpg" width="100%" height = {160} />
            <div className = "card-body">
            <h5 className = "wd-dashboard-course-title card-title">
                 Career Design
                 </h5>
                 <p className="wd-dashboard-course-title card-text">
                 2024_Fall COOP
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div></div>
    </div>
    </div>
    </div>
  );
}
