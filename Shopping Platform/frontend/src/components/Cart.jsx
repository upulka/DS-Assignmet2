import React, { Component } from 'react';
import CartItem from "./CartItem";
import M from "materialize-css";

class Cart extends Component {

    constructor(props){
        super(props);
        this.state={
            cartItems: []
        }
        this.increment= this.increment.bind(this);
        this.getCartItems= this.getCartItems.bind(this);
        this.decrement= this.decrement.bind(this);
    }

    componentDidMount(){
          this.getCartItems();
        // fetch(`http://localhost:8070/cart/getCart/${this.props.userId}`)
        //  .then(res=>res.json())
        //  .then(data=> {
        //      this.setState({
        //          cartItems: data
        //      });
        //      console.log(this.state.cartItems);
             
        //  }).catch(err=>{
        //      console.error(err);
        //  });

         console.log(this.props.userId);
    }

    getCartItems=()=>{
         // get list of items in a users cart
         fetch(`http://localhost:8070/cart/getCart/${this.props.userId}`)
         .then(res=>res.json())
         .then(data=> {
             this.setState({
                 cartItems: data
             });
             console.log(this.state.cartItems);
             
         }).catch(err=>{
             console.error(err);
         });
    }
    // increment=(itemId, itemPrice)=>{
    //     fetch("http://localhost:8070/cart/addToCart", {
    //                         headers: {
    //                             Accept: "application/json",
    //                                     "Content-Type": "application/json",
    //                         },
    //                         method: "POST",
    //                         body: JSON.stringify({
    //                             user: this.props.userId,
    //                             cartItems:{
    //                                 item: itemId,
    //                                 quantity:1,
    //                                 price: itemPrice
    //                             },
    //                         }),
    //     })
    //     .then(res => res.json())
    //     .then(data=> {
    //         if(data.success){
    //             console.log(data.message);
    //         }
    //     })
    //     .catch(error => console.error('Error:', error));

        
        
        
    // }
    increment=(itemId, itemPrice)=>{

        console.log("clicked on add to cart");

        let token = localStorage.getItem("token");
        //if token is available in the local storage get the user ID
        if(token){
            fetch("http://localhost:8070/account/verify?token="+token)
                .then(res => res.json())
                .then(data=>{
                if(data.success){
                    let userId = data.userId;

                    return(
                        // add items to the cart
                        fetch("http://localhost:8070/cart/addToCart", {
                            headers: {
                                Accept: "application/json",
                                        "Content-Type": "application/json",
                            },
                            method: "POST",
                            body: JSON.stringify({
                                user: userId,
                                cartItems:{
                                    item: itemId,
                                    quantity:1,
                                    price: itemPrice
                                },
                            }),
                        })
                    )

                }else{
                    console.log(data.message);
                    console.log('fail');
                }
                })
            .then(res => res.json())
            .then(data=> {
                if(data.success){
                    console.log(data.message);
                    // M.toast({html: 'Incremented'});
                    this.getCartItems();
                }
            })
            .catch(error => console.error('Error:', error));
        }
        else{
            //display a toast message if the user is not logged in
            M.toast({html: 'Login to add items to the cart'});
        }
        
        
    }
    decrement=(itemId, itemPrice)=>{

        console.log("clicked on add to cart");

        let token = localStorage.getItem("token");
        //if token is available in the local storage get the user ID
        if(token){
            fetch("http://localhost:8070/account/verify?token="+token)
                .then(res => res.json())
                .then(data=>{
                if(data.success){
                    let userId = data.userId;

                    return(
                        // add items to the cart
                        fetch("http://localhost:8070/cart/reduce", {
                            headers: {
                                Accept: "application/json",
                                        "Content-Type": "application/json",
                            },
                            method: "POST",
                            body: JSON.stringify({
                                user: userId,
                                cartItems:{
                                    item: itemId,
                                    quantity:1,
                                    price: itemPrice
                                },
                            }),
                        })
                    )

                }else{
                    console.log(data.message);
                    console.log('fail');
                }
                })
            .then(res => res.json())
            .then(data=> {
                if(data.success){
                    console.log(data.message);
                    // M.toast({html: 'Incremented'});
                    this.getCartItems();
                }
            })
            .catch(error => console.error('Error:', error));
        }
        else{
            //display a toast message if the user is not logged in
            M.toast({html: 'Login to add items to the cart'});
        }
        
        
    }
    render() {
        // if(this.state.cartItems.length === 0){
        //     return(
        //         <div>
        //         <h1>
        //             no items in the cart
        //         </h1>
        //     </div>
        //     );
        // }
        // else{
            
        // }
        return (
            <div class="container center-align" style={{width: '50%'}}>
                <h2>Cart Items</h2>
                {this.state.cartItems.map((item)=>
                    <CartItem
                        key={item._id}
                        id={item._id}
                        itemId={item.item} 
                        price={item.price} 
                        quantity={item.quantity}
                        increment={this.increment}
                        decrement={this.decrement}
                    />
                )}
            </div>
        );
    }
}

export default Cart;