import React from 'react';
import { NavLink , Link} from 'react-router-dom';


export default class Dashboard extends React.Component {
    logout = async (e) =>{
        e.preventDefault();
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        alert('you have been logged out');
        window.location = '/';
    }
    render() {
        return (

                <div className="main" style= {{margin : 10}}> 
                    <div className="header">
                        <div className="navbar">
                            <NavLink to="/"><strong style={{ fontSize: 20, padding:5 }}>Home</strong></NavLink>
                            <NavLink to="/Log"><strong style={{ fontSize: 20, padding:5 }}>Log Time</strong></NavLink>
                            <NavLink to="/GetLogs"><strong style={{ fontSize: 20, padding:5 }}>Get Time Logs</strong></NavLink>
                            <NavLink to="/" onClick= {this.logout} ><strong style={{ fontSize: 20, padding:5 }}>Logout</strong></NavLink>
                        </div>
                        
                    </div>   
                    <div className="body">
                        <h1>Home Component</h1>
                    </div>
                </div>

        );
    }
}