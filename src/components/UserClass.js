import React from "react"

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo:{
                name : "Dummy",
                location : "Default",
                avtar_url: "http://dummy"
            },
            // count: 0,
            // count2: 1,
        };

        // console.log(this.props.name + " Child Constructor");
    }

    async componentDidMount() {
        // console.log(this.props.name + " child Component Did Mount ");
        const data = await fetch("https://api.github.com/users/shubham0phondani");
        const json = await data.json();

        this.setState({
            userInfo : json,
        })

        console.log(json);
    }

    componentDidUpdate(){
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log ("unmount");
    }

    render() {
        const { name, location, avatar_url } = this.state.userInfo;
        // const { count} = this.state;
 
        // console.log(name + " Child Render");
        
        return <div className="user-card">
         <img src={avatar_url} alt={name} />
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @phondanishubham23@gmail.com</h4>
            {/* <h5>Count : {count}</h5>
            <button onClick={()=>{
                this.setState({
                    count: this.state.count + 1
                })
            }}>
                +
            </button>
            <h5>Count2 : {count2}</h5> */}
        </div>
    }
}

export default UserClass;