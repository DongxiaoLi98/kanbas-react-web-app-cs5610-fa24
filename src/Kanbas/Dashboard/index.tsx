import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                 CS1234 React JS
                 </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/AlignMath.jpg" width={200} />
            <div>
              <h5>
                 Align Math
                 </h5>
              <p className="wd-dashboard-course-title">
                Foundations of Math
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5004.jpg" width={200} />
            <div>
              <h5>
                 Object-Oriented Design
                 </h5>
              <p className="wd-dashboard-course-title">
                SOLID
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5088.jpg" width={200} />
            <div>
              <h5>
                 Data Structure
                 </h5>
              <p className="wd-dashboard-course-title">
                Merged
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5009.jpg" width={200} />
            <div>
              <h5>
                 Recitation for CS5008
                 </h5>
              <p className="wd-dashboard-course-title">
                CS5009
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5005.jpg" width={200} />
            <div>
              <h5>
                 Recitation for CS5004
                 </h5>
              <p className="wd-dashboard-course-title">
                CS5005
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5002.jpg" width={200} />
            <div>
              <h5>
                 Discrete Structure
                 </h5>
              <p className="wd-dashboard-course-title">
                CS5002
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CareerDesign.jpg" width={200} />
            <div>
              <h5>
                 Career Design
                 </h5>
              <p className="wd-dashboard-course-title">
                COOP
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
