import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as courseClient from "../client"
import PeopleTable from "./Table";

export default function People() {
    const [users, setUsers] = useState<any[]>([]);
    const { cid } = useParams();
    console.log(cid);
    const fetchUsers = async (courseID: string) => {
    const users = await courseClient.findUsersForCourse(courseID);
    const filteredusers = users.filter((user: any) => user !== null);
    console.log(filteredusers);
    setUsers(filteredusers);
    };
    useEffect(() => {
        if (cid){
            fetchUsers(cid);
        }
      }, [cid]);
    
    return (
        <div>
            <PeopleTable users={users} />
        </div>

    );
}