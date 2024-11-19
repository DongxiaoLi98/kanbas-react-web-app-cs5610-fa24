import React, {useEffect, useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
//import * as db from "../../Database";
import * as peopleClient from "./client"
import * as userClient from "../../Account/client";
import { useSelector } from "react-redux";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [enrolledUser, setEnrolledUser] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({firstName:"", lastName:"", role:""});
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchEnrolledUsers = async(courseId: any) => {
    try {
      const allUsers = await peopleClient.fetchAllUsers();
      const enrollments = await userClient.fetchEnrollments();

      const enrolledUsers = allUsers.filter((user:any)=> 
        enrollments.some((enrollment: any) => enrollment.course === cid && enrollment.user === user._id));

      setUsers(allUsers);
      setEnrolledUser(enrolledUsers);
    }catch(error) {
      console.error("Error message", error);
    }
  }

  useEffect(()=> {
    fetchEnrolledUsers(cid);
  }, [cid]);

  const handleCreateUser = async() => {
    try {
      const createUser = await peopleClient.createUser(newUser);
      setUsers([...users, newUser]);
      setNewUser({firstName:"", lastName:"", role:""});
    }catch(error) {
      console.error("Error message", error);
    }
  }

  const handleUpdateUser = async(userId:any, updates:any) => {
    try {
      const updateUser = await peopleClient.updateUser({_id:userId, ...updates});
      setUsers(users.map((user)=> (user._id === userId ? updateUser : user)));
    }catch(error) {
      console.error("Error message", error);
    }
  }

  const deleteUser = async(userId:any) => {
    try {
      await peopleClient.deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    }catch(error) {
      console.error("Error message", error);
    }
  }
  
  

  return (
    <div id="wd-people-table">
      <table className="table table-striped">
<thead> <tr>
            <th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
        {enrolledUser.map((user: any) => (
      <tr key={user._id}>

            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">{user.firstName}</span>{" "}
              <span className="wd-last-name">{user.lastName}</span>
            </td>
            <td className="wd-login-id">{user.loginId}</td>
            <td className="wd-section">{user.section}</td>
            <td className="wd-role">{user.role}</td>
            <td className="wd-last-activity">{user.lastActivity}</td>
            <td className="wd-total-activity">{user.totalActivity}</td>
            {isFaculty && <td>
              <button>
                </button></td>}
</tr>))} </tbody> 
      </table>
    </div>
);}