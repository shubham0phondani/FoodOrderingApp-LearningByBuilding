import { useState } from "react";

const User = ({name}) =>{
    
    const [count , setCount] = useState(0);
    const [count2] = useState(1);

    return <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: Dehradun</h3>
        <h4>Contact: @phondanishubham23@gmail.com</h4>
        <h5>Count : {count}</h5>
        <h5>Count2 : {count2}</h5>
    </div>
}

export default User;