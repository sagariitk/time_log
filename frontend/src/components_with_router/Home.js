import React from 'react';
import { NavLink , Link} from 'react-router-dom';


export default class Home extends React.Component {
    render() {
        return (
            <div className="main" style= {{margin : 10}}> 
                <div className="header">
                    <div className="navbar">
                        <NavLink to="/Dashboard"><strong style={{ fontSize: 20, padding:5 }}>Dashboard</strong></NavLink>
                        <NavLink to="/Login"><strong style={{ fontSize: 20, padding:5 }}>Login</strong></NavLink>
                        <NavLink to="/Register"><strong style={{ fontSize: 20, padding:5 }}>Register</strong></NavLink>
                    </div>
                </div>   
                <div className="body">
                    <h1>Home Component</h1>
                </div>
            </div>
        );
    }
}