
import { Link } from "react-router-dom";
import defoultProfileImage from "../../../assets/profile.jpg";
export function UserListItem({user}){
    return (
        <Link to={`/user/${user.id}`} className="d-flex text-decoration-none"
        >
      
        <img src={defoultProfileImage}
        width="30" className="img-fluid rounded-circle shadow-sm"></img> 
        <span className="ms-3">
            {user.username} - {user.email}
        </span>     
        
        </Link>
        
    );
}