import React, { Component } from 'react';
import { PropTypes } from 'react';


class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.handleRegisterUser= this.handleRegisterUser.bind(this);
        this.nameChangeHandler= this.nameChangeHandler.bind(this);
        this.usernameChangeHandler= this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler= this.passwordChangeHandler.bind(this);
        this.emailChangeHandler= this.emailChangeHandler.bind(this);
        this.typeChangeHandler= this.typeChangeHandler.bind(this);
        this.phoneChangeHandler= this.phoneChangeHandler.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.signin= this.signin.bind(this);
        this.state = { 
            name: '',
            username: '',
            password:'',
            email:'',
            phone:'',
            userType:'',
            loggedUser:[],
            token:'',
            loginError:'',
     };
      }
    componentDidMount(){
            
    }
    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value,
        });
    }
    usernameChangeHandler = (event) => {
        this.setState({
            username: event.target.value,
        });
    }
    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }
    phoneChangeHandler = (event) => {
        this.setState({
            phone: event.target.value
        });
    }
    typeChangeHandler = (event) => {
        this.setState({
            userType: event.target.value
        });
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.handleRegisterUser(event);
        
    }
    handleRegisterUser=(event)=> {
        // event.preventDefault();
        fetch("http://localhost:8070/user/register", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
                method: "POST",
                body: JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
                userType: this.state.userType,
                // userType: 'SELLER',
                email: this.state.email,
                phone: this.state.phone
            }),
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));;
        this.signin();
        
    }

    signin=()=>{
            
        fetch("http://localhost:8070/account/signin", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
        .then(res => res.json())
        .then(data=> {
            if(data.success){
              
                this.props.signinSuccess();
                
                localStorage.setItem("token", data.token);
                localStorage.setItem("userType", data.userType);
                
                console.log('signed in');
                //redirect to sellerdashboard when seller logs in successfully
                if(data.userType === 'seller'){
                  window.location.href="/sellerDashboard";
                  
              }else {
                //redirect to home page when buyer logs in successfully
                  window.location.href="/";
              }    
            }
            else
                this.setState({loginError: data.message})
        })
        .catch(error => console.error('Error:', error));
    }
    render() {
        return (
            <div className='container'>
                <div className="row">
                    <form style={{backgroundColor: "white", borderRadius:"6px", padding:"30px", width:'50%'}} className="row" onSubmit={this.handleSubmit}>
                        <h4 className="center-align grey-text">Register</h4>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate" value={this.state.name} onChange={this.nameChangeHandler} required/>
                                <label>Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="email" type="email" className="validate" value={this.state.email} onChange={this.emailChangeHandler} required/>
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="phone" type="text" className="validate" value={this.state.phone} onChange={this.phoneChangeHandler} required/>
                                <label >Phone</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="username" type="text" className="validate" value={this.state.username} onChange={this.usernameChangeHandler} required/>
                                <label >Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.passwordChangeHandler} required/>
                                <label for="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <label for="password">User Type</label>
                            <div className="input-field col s6" >   
                                <div className="form-check">
                                    <label for="buyer">
                                        <input name="userType" type="radio" checked ={this.state.userType === 'buyer'} id='buyer' value="buyer" onChange={this.typeChangeHandler} />
                                        <span>Buyer</span>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label for="seller">
                                        <input name="userType" type="radio" id="seller" value="seller" checked ={this.state.userType === 'seller'} onChange={this.typeChangeHandler}/>
                                        <span>Seller</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col s4 push-s4">
                            <button type="submit" className="waves-effect waves-light btn-large" id ="submitbtn">Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            );
        }
    }

export default RegisterUser;