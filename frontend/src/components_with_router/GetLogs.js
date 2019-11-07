import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Getlogs extends React.Component {
    state = {
        logs:  []
    }
    getLogs = async (e) =>{
        e.preventDefault();
        try{
            const api_call = await fetch(`http://localhost:1337/logs`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.jwtToken
                }
            });
            const status = await api_call.status;
            if(status === 200) {
                const data = await api_call.json();
                this.setState({
                    logs: data
                });
                console.log(data);
            }
            else {
                console.log(status);
                console.log('error');
            }
        }
        catch(err) {
            console.log('error');
            alert('data server is not responding');
        }

    }
    render() {
        return (
            <div className="main" style= {{margin : 10}}> 
                <div className="header">
                    <div className="navbar">
                        <NavLink to="/Dashboard"><strong style={{ fontSize: 20, padding:5 }}>Dashboard</strong></NavLink>
                        <NavLink to="/Log"><strong style={{ fontSize: 20, padding:5 }}>Log Time</strong></NavLink>
                        <NavLink to="/" onClick= {this.logout} ><strong style={{ fontSize: 20, padding:5 }}>Logout</strong></NavLink>
                    </div>
                </div>   
                <div className="body">
                    <h1>Get Logs Component</h1>
                    <form onSubmit={this.getLogs}>
                        <button>Get Logs</button>
                    </form>
                    {this.state.logs && this.state.logs.map((log) => {
                        if(log.username == localStorage.username){
                            return (
                                <div className="body-item">  
                                    <div key = {log.task}>
                                        <p >Task : {log.task}</p>
                                        <p >Project: {log.project}</p>
                                        <p >Start Time: {log.start_time}</p>
                                        <p >End Time: {log.end_time}</p>
                                    </div> <br/>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        )
    }
}

