import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class ItemCard extends Component{
    constructor(props){
        super(props);
        // this.addToCart= this.addToCart.bind(this);

    }

    componentDidMount(){

    }

    // addToCart=()=>{

    //     // //get item details
    //     // fetch(`http://localhost:8070/item/${itemId}`)
    //     // .then(res=>res.json())
    //     // .then(data=> {
    //     //     this.setState({
    //     //         item: data
    //     //     })
    //     // }).catch(err=>{
    //     //     console.error(err);
    //     // });
        
    //     fetch("http://localhost:8070/cart/addToCart", {
    //         headers: {
    //             Accept: "application/json",
    //                     "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //         body: JSON.stringify({
    //             user: '60a4eadd1c26780abc3b6f74',
    //             cartItems:{
    //                 item: this.props.id,
    //                 quantity:1,
    //                 price: this.props.price
    //             },
    //         }),
    //     })
    // .then(res => res.json())
    // .then(data=> {
    //   if(data.success){
    //    console.log(data.message);
    //   }
    // })
    // }
        render(){
            return(
                <div style ={{width:'25%', float:'left'}}>
                    <div class="row">
                        <div class="col s12 m7">
                            <div class="card">
                                <div class="card-image" key={this.props.id}>
                                    {/* <img src="images/sample-1.jpg"/> */}
                                   
                                </div>
                                <span class="card-title" style={{color:'black'}}>{this.props.name}</span>
                                <div class="card-content">
                                    <p>{this.props.description}</p>
                                    <p>{this.props.price}</p>
                                </div>
                                <div class="card-action">
                                    <button class="btn waves-effect waves-light btn-small" onClick={()=>{this.props.addToCart(this.props.id, this.props.price)}} style={{color:'white'}}><i class="material-icons left">add</i>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

}
export default ItemCard;