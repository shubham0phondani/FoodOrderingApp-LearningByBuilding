import User from "../components/User";
import UserClass from "../components/UserClass";
// import React from "react";
import { Component } from "react";

class About extends Component {

    constructor(props){
        super(props);
        // console.log("Parent Constructor");
    }

    componentDidMount() {
        // console.log("parent Component Did Mount ");
    }


    render(){
    console.log("Parent Render");
    return(
        <div>
            <h1>About Class Component</h1>
            <h2>Food Ordering App</h2>
            {/* <User name={"Shubham Phondani (function)"}/> */}
            <UserClass name={"Shubham Phondani (class)"}  location={"Dehradun (class)"}/>
            {/* <UserClass name={"Akshay Saini (class)"}  location={"Hyderabad (class)"}/> */}
        </div>
    );
    }
}

// const About = () =>{
//     return(
//         <div>
//             <h1>About Us</h1>
//             <h2>Food Ordering App</h2>
//             {/* <User name={"Shubham Phondani (function)"}/> */}
//             <UserClass name={"Shubham Phondani (class)"}  location={"Dehradun (class)"}/>
//         </div>
//     );
// };

export default About;