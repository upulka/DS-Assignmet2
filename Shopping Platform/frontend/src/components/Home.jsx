import React from 'react';
import M from "materialize-css";
import ItemCard from './ItemCard';




class Home extends React.Component{

    constructor(){
        super();
        this.state ={
            Items:[],
            token: '',
            isLoading: true,
            item:{},
            userId:'',
        }
        this.addToCart= this.addToCart.bind(this);
    }

async componentDidMount(){

        // get items available in the database
        const response = await fetch(`http://localhost:8070/item`);
        const data = await response.json().then(data=> {
            this.setState({
                Items: data
            })
        }).catch(err=>{
            console.error(err);
        });


    }
   
    addToCart=(itemId, itemPrice)=>{

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
                    M.toast({html: 'Item Added to Cart'});
                }
            })
            .catch(error => console.error('Error:', error));
        }
        else{
            //display a toast message if the user is not logged in
            M.toast({html: 'Login to add items to the cart'});
        }
        
        
    }

    render(){
        return(
            <div >   
                {/* display available item list */}
                {this.state.Items.map((item)=>
                    <ItemCard 
                        key={item._id}
                        id={item._id} 
                        name={item.name} 
                        price={item.price} 
                        description={item.description} 
                        category={item.category}
                        addToCart={this.addToCart}
                    />
                )}
                
            </div>
        )
    }
}

export default Home;