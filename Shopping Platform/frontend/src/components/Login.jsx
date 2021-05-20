import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
 
    this.usernameChangeHandler= this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler= this.passwordChangeHandler.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.signin= this.signin.bind(this);
    

    this.state = { 
        
        username: '',
        password:'',
        signinSuccess: false
    
 }
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
  handleSubmit = (event)=> {
    console.log(1);
    event.preventDefault();
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

  render(){
    return(
      <div className='container'>
        <div className="row">
          <form 
            style={{backgroundColor: "white", borderRadius:"6px", padding:"30px", width:'50%'}} 
            className="row" 
            onSubmit={this.handleSubmit}
          >
            <h4 className="center-align grey-text">Signin</h4>
            <div className="row">
              <div className="input-field col s6">
                <input 
                  id="username" 
                  type="text" 
                  className="validate" 
                  value={this.state.username} 
                  onChange={this.usernameChangeHandler} 
                  required
                />
                <label for="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input 
                  id="password" 
                  type="password" 
                  className="validate" 
                  value={this.state.password} 
                  onChange={this.passwordChangeHandler} 
                  required
                />
                <label for="password">Password</label>
              </div>
            </div>
            
            <div className="col s4 push-s4">
              <button 
                type="submit" 
                className="waves-effect waves-light btn-large" 
                id ="submitbtn">
                  Submit
              </button>
            </div>
          </form>
          </div>
      </div>
      );
    }
  }
export default Login;