import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Register extends React.Component {

    register = async (e) =>{
        e.preventDefault();
        if(!e.target.elements.name.value){
            alert('Name must be provided');
            console.log('Name must be provided');
        }
        else if(!e.target.elements.username.value){
            console.log('Username must be provided');
            alert('Username must be provided');
        }
        else if(!e.target.elements.password.value){
            console.log('Password must be provided');
            alert('Pasword must be provided');
        }        
        else{
            try{
                const api_call = await fetch(`http://localhost:1337/register`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name : e.target.elements.name.value,
                        username : e.target.elements.username.value,
                        password : e.target.elements.password.value
                    })
                    });
                    const status = await api_call.status;
                    const data = await api_call.json();
                    console.log(data.msg);
                    if(status === 200) {
                            console.log('User Added Successfully')
                            console.log(data.msg);
                            alert('User Added Successfully');
                            window.location = '/login';

                    }
                    else {
                        console.log(status);
                        console.log('error');
                }
            }
            catch(err) {
                console.log(err);
                console.log('Could not add the user');
            }
        }
    }
    render() {
        return (
            <div className="main" style= {{margin : 10}}> 
                <div className="header">
                    <div className="navbar">
                        <NavLink to="/"><strong style={{ fontSize: 20, padding:5 }}>Home</strong></NavLink>
                        <NavLink to="/Dashboard"><strong style={{ fontSize: 20, padding:5 }}>Dashboard</strong></NavLink>
                        <NavLink to="/Login"><strong style={{ fontSize: 20, padding:5 }}>Login</strong></NavLink>
                    </div> 
                </div>   
                <div className="body">
                    <h1>Register Componnet</h1>
                    <form onSubmit={this.register}>
                        <input type="text" name="name" placeholder="Name"></input><br></br>
                        <input type="text" name="username" placeholder="Username"></input><br></br>
                        <input type="password" name="password" placeholder="Password"></input><br></br>
                        <button>Register</button>
                    </form>  
                </div>
            </div>
        )
    }
}

