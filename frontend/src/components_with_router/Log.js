import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Log extends React.Component {
    addPet = async (e) =>{
        e.preventDefault();
        console.log(e.target.elements.project.value);
        const body = {
            task : e.target.elements.task.value,
            project : e.target.elements.project.value,
            start_time : e.target.elements.start_time.value,
            end_time : e.target.elements.end_time.value,
            username: localStorage.username
        }
        const api_call = await fetch(`http://localhost:1337/logs`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.jwtToken
        }
        });
        const status = await api_call.status;
        console.log(status);
        if(status === 200) {
            console.log('log details added to database');
            alert('log details added to database');
            window.location = '/log';
        }
        else if(status === 403) {
            console.log('not authenticated please login');
            alert('not authenticated please login');
            window.location = '/login';    
        }
        else {
            console.log('could not add the log details to database');
            alert('could not add the log details to database');
        }
    }
    render() {
        return (
            <div className="main" style= {{margin : 10}}> 
                <div className="header">
                    <div className="navbar">
                        <NavLink to="/Dashboard"><strong style={{ fontSize: 20, padding:5 }}>Dashboard</strong></NavLink>
                        <NavLink to="/GetLogs"><strong style={{ fontSize: 20, padding:5 }}>Get Log Times</strong></NavLink>
                        <NavLink to="/" onClick= {this.logout} ><strong style={{ fontSize: 20, padding:5 }}>Logout</strong></NavLink>
                    </div>
                    
                </div>   
                <div className="body">
                    <h1>Log Time</h1>
                    <form  onSubmit={this.addPet}>
                        <input type="text" name="task" placeholder="Task"></input><br></br><br></br>
                        Project<br></br>
                        <select name="project">
                            <option value="project1" >Project 1</option>
                            <option value="project2" >Project 2</option>
                            <option value="project3" >Project 3</option>
                            <option value="project4" >Project 4</option>
                        </select><br></br><br></br>
                        Start Time <br></br>
                        <input type="datetime-local" name="start_time" placeholder="Start Time"></input><br></br><br></br>
                        End Time <br></br>
                        <input type="datetime-local" name="end_time" placeholder="End Time"></input><br></br>   <br></br>                                       
                        <button>Log Time</button>
                    </form>    
                </div>
            </div>
        )
    }
}

