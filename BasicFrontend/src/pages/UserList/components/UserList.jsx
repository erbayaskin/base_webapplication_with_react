/* eslint-disable react/jsx-key */
import { useCallback, useEffect, useState } from "react";
import { getUserList } from "../../UserList/api.js";
import { Spinner } from "react-bootstrap";
import { UserListItem } from "./UserListItem.jsx";

export function UserList(){
const [apiProgress,setApiProgress]=useState(false);
const [users,setUsers]= useState({
    content:[],
    last:false,
    first:false,
    number:0
});

const getAllUsers = useCallback(async (page,size)=> {
    setApiProgress(true);
    try{
      const response = await getUserList(page,size);
      console.log('response',response);
      setUsers(response.data.data);
    }catch { /* empty */ } finally {
        setApiProgress(false);
    }
 
    },[]);

    useEffect(()=>{
        getAllUsers(0);
    },[]);
    return (
        <div className="container">
            <div className="card mb-3">
           <div className="card-header text-center fs-4">User List</div>
           <ul className="list-group">
            {users &&  users.content.map((u) => {
              return <UserListItem key={u.id} user={u}></UserListItem>
            })}
           </ul>
           <div className="card-footer">
            <div className="d-flex justify-content-center">{apiProgress && <Spinner></Spinner>} </div>
            {users?.content?.length>0 && !apiProgress && !users.first && 
            <button className="btn btn-outline-secondary btn-sm float-start" onClick={() => getAllUsers(users.pageable.pageNumber - 1)}>Previous</button>}
            {users?.content?.length>0 && !apiProgress && !users.last && 
            <button className="btn btn-outline-secondary btn-sm float-end" onClick={() => getAllUsers(users.pageable.pageNumber + 1)}>Next</button>}
           </div>

           </div>
        </div>
           
          );

}