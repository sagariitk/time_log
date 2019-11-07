import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Error extends React.Component {

    render() {
        return (
            <div className="main" style= {{margin : 10}}> 
                <div className="header">
                    <div className="navbar">
                        <NavLink to="/"><strong style={{ fontSize: 20, padding:5 }}>Home</strong></NavLink>
                        <NavLink to="/Dashboard"><strong style={{ fontSize: 20, padding:5 }}>Dashboard</strong></NavLink>
                    </div>
                </div>   
                <div className="body">
                    <h1>Error Component</h1>
                </div>
                <div className="footer"><span>&copy; Copyright 2019 Vijay Yadav</span></div>      
            </div>
        );
    }
}