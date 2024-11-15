import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

const Courses_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async() => {
    const {data} = await axios.get(Courses_API);
    return data;
};