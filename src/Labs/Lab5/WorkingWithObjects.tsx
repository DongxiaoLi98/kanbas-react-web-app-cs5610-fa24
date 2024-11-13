import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,    
    })
    const [module, setModule] = useState({
        id:123,
        name:"the default module",
        description:"Create a Module with ExpressJS",
        course:"CS5610"
    })
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URP = `${REMOTE_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
        <h3>Working With Objects</h3>
        <h4>Modifying Properties</h4>
        <a id="wd-update-assignment-title"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>Update Title</a>
        <input className="form-control w-75" id="wd-assignment-title"
            defaultValue={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })}/>
        <br/>

        <a id="wd-update-assignment-score"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>Update Score</a>
        <input type="number" className="form-control w-75" id="wd-assignment-score"
            defaultValue={assignment.score || 0} onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>
        <br/>

        <a id="wd-update-assignment-completed"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>Update Completed</a>
        <input type="checkbox" className="form-check-input w-65 me-2" id="wd-assignment-completed"
            checked={assignment.completed || false} onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked})}/>
        <label className="form-check-label me-2" htmlFor="wd-assignment-completed">check completed</label>
        <br/><br/>

        <a id="update-module-name" className="btn btn-danger float-end"
        href={`${MODULE_API_URP}/name/${module.name}`}>
            Update Module Name
        </a>
        <input className="form-control w-75" id="wd-module-name"
            defaultValue={module.name} onChange={(e) =>
            setModule({ ...module, name: e.target.value })}/><br />

        <a id="update-module-description" className="btn btn-danger float-end"
            href={`${MODULE_API_URP}/description/${module.description}`}>
            Update Module Description
        </a>
        <input className="form-control w-75" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/><hr />

        <h4>Retrieving Objects</h4>
        <a id="wd-retrieve-assignments" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment`}>
            Get Assignment
        </a><br /><br />
        <a id="wd-retrive-module-name" className="btn btn-danger"
            href={`${REMOTE_SERVER}/lab5/module`}>Get Module</a>
        <hr/>


        <h4>Retrieving Properties</h4>
        <a id="wd-retrieve-assignment-title" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/title`}>
            Get Title
        </a><br/><br/>
        <a id="wd-retrive-module-name" className="btn btn-danger"
            href={`${REMOTE_SERVER}/lab5/module/name`}>Get Module Name</a><hr/>
    </div>
);}
