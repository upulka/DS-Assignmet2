// import React from 'react';
import './App.css';
import Header from'./components/Header';
import Cart from'./components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import ItemSearch from './components/ItemSearch';
import RegisterUser from './components/RegisterUser';
import Categories from './components/Categories';
import SellerDashboard from './components/SellerDashboard';
import React, { useState } from 'react';

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

export class App extends React.Component {

  constructor(props){
    super();
    this.state={
      user: false,
      userId:'',
      cartUpdated: false
    }
    this.signinSuccess = this.signinSuccess.bind(this);
    this.logoutSuccess = this.logoutSuccess.bind(this);
  
  }

  signinSuccess=()=>{
    this.setState({
      user: true,
    });
    console.log('signin success'+this.state.user);
}
logoutSuccess=()=>{
  this.setState({
    user: false
  }) 
}
  componentDidMount(){

    let token = localStorage.getItem("token")
    fetch("http://localhost:8070/account/verify?token="+token)
    .then(res => res.json())
    .then(data=>{
      if(data.success){
          this.setState({
            user: data.success,
            userId: data.userId
          })
          console.log(data.message);
      }else{
          this.setState({error: data.message})
          console.log(data.message)
      }
  })
  }
  

  render(){
    return (
      <Router>
        <Header logoutSuccess={this.logoutSuccess} user={this.state.user}/>
        <Switch>
          <Route path="/login" exact component={()=><Login signinSuccess={this.signinSuccess}/>}/>
          <Route path="/cart" exact component= {()=><Cart userId={this.state.userId}/>}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/itemSearch" exact component={ItemSearch}/>
          <Route path="/registerUser" exact component={()=><RegisterUser signinSuccess={this.signinSuccess} />}/>
          <Route path="/categories" exact component={Categories}/>
          <Route path="/sellerDashboard" exact component={SellerDashboard}/>
          <Redirect to="/home"/>
        </Switch>
      </Router>
    );
  }
  
}

export default App;
