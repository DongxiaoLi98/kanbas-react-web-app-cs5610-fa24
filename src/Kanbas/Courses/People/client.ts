import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

const USERS_API = `${REMOTE_SERVER}/api/users`;

export const fetchAllUsers = async() => {
    const {data} = await axios.get(USERS_API);
    return data;
};

export const deleteUser = async (id: any) => {
    const { data } = await axios.delete(`${USERS_API}/${id}`);
    return data;
};
  
export const updateUser = async (userId: any, ...updates:any) => {
    const { data } = await axios.put(`${USERS_API}/${userId}`, updates);
    return data;
};

export const createUser = async (user:any) => {
    const { data } = await axios.post(`${USERS_API}`, user);
    return data;
};