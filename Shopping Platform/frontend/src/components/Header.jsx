import React from 'react';
import {Link} from 'react-router-dom';
import M from "materialize-css";


class Header extends React.Component{

  constructor(){
    super();
    this.state ={
        tab1: '',
        tab1Link: '',
        tab2:'',
        tab2Link:'',
        buyer: true,
        token:"",
        isLogin:false
        
    }
    this.logout= this.logout.bind(this)

}
  componentDidMount(){

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, document.getElementById('dropdown1'));
    

  }
  logout=()=>{
 
        let token = localStorage.getItem('token');

        if(token!=null || token !=="undefined"){
            console.log("Inside if");
            console.log(token);
            fetch("http://localhost:8070/account/logout?token="+token, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
        })
        .then(res => res.json())
        .then(data=>{
            if(data.success){
                localStorage.clear();
                console.log(data.message);
                this.props.logoutSuccess();
                alert("You have been logged out");
                window.location.href="/";
            }else{
                this.setState({error: data.message})
                console.log(data.message)
            }
        })
        .catch(error => console.error('Error:', error));
        }

        
        
  }

   render(){

      if (localStorage.getItem('userType')==="buyer") {
        return(
          <div style ={{position: 'sticky', top:0, marginBottom: '80px', width: '100%', zIndex: 1}}>
          
              <ul id='dropdown1' class='dropdown-content'>
                <li><Link to="./home">Categories</Link></li>
                <li class="divider" tabindex="-1"></li>
                <li> <Link to={{pathname:'./Categories', category: 'electronics'}}>Electronics</Link></li>
                <li> <Link to={{pathname:'./Categories', category: 'clothing'}}>Clothing</Link></li>
              </ul>
          
            <nav>
              <div className="nav-wrapper #424242 grey darken-3" >
               
                  <Link to='./home' className='brand-logo'>Online Store</Link>
             
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                      <li>
                        <a class="dropdown-trigger" data-target="dropdown1" style={{color:'white'}} >
                          Categories
                          <i class="material-icons right" style={{color:'white'}}>arrow_drop_down</i>
                        </a>
                      </li>
                    </li>
                    
                    
                   <li>
                      <Link to="./Cart"  style={{color:'white'}} >
                        <span className="new badge" data-badge-caption="" style={{borderRadius: "100px",verticalAlign: "super",minWidth: "2rem", marginLeft: "-22px"}}>
                          {}
                        </span>
                        <i className="material-icons left">local_grocery_store
                        </i>
                      </Link>
                    </li>
                    
                      <li onClick={this.logout} >
                        <Link style={{color:'white'}} >
                          Logout
                        </Link>
                          
                        
                      </li>   
        </ul>
      </div>
    </nav>
        </div>
        ) 
      }
      else if(localStorage.getItem('userType')==="seller") {
        return(
          <div style ={{position: 'sticky', top:0, marginBottom: '80px', width: '100%', zIndex: 1}}>
                <nav>
                  <div className="nav-wrapper #424242 grey darken-3" >
                  
                      <Link to='./home' className='brand-logo'>Online Store</Link>
                
                      <ul id="nav-mobile" className="right hide-on-med-and-down">
                        
                          <li onClick={this.logout}>
                            <Link  style={{color:'white'}} >
                              Logout
                            </Link>
                          </li>   
            </ul>
          </div>
        </nav>
        </div>
        );
      }
    else{
      return(
        <div style ={{position: 'sticky', top:0, marginBottom: '80px', width: '100%', zIndex: 1}}>
          
              <ul id='dropdown1' class='dropdown-content'>
                <li><Link to="./home">Categories</Link></li>
                <li class="divider" tabindex="-1"></li>
                <li> <Link to={{pathname:'./Categories', category: 'electronics'}}>Electronics</Link></li>
                <li> <Link to={{pathname:'./Categories', category: 'clothing'}}>Clothing</Link></li>
              </ul>
          
            <nav>
              <div className="nav-wrapper #424242 grey darken-3" >
               
                  <Link to='./home' className='brand-logo'>Online Store</Link>
             
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                      <li>
                        <a class="dropdown-trigger" data-target="dropdown1" style={{color:'white'}} >
                          Categories
                          <i class="material-icons right" style={{color:'white'}}>arrow_drop_down</i>
                        </a>
                      </li>
                    </li>
                    
                    <li>
                      <Link to="./RegisterUser"  style={{color:'white'}} >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link to="./Login"  style={{color:'white'}} >
                        Login
                      </Link>
                    </li>
        </ul>
      </div>
    </nav>
        </div>
      );
    }
    
      
   }
}

export default Header;