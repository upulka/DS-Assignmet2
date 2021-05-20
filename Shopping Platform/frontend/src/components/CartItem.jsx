import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props){
        super(props);
        this.state={
            item:{},
            quantity:this.props.quantity
        }
        this.handledecrement= this.handledecrement.bind(this);
    }
    componentDidMount(){
        fetch(`http://localhost:8070/item/findById/${this.props.itemId}`)
            .then(res=>res.json())
            .then(data=> {
                this.setState({
                    item: data
                });
                console.log(this.state.item);
                
            }).catch(err=>{
                console.error(err);
            });
    }
    handledecrement=()=>{
        this.setState({
            // quantity: quantity- 1
        })
        if(this.props.quantity == 0){
            console.log('cannot be negative');
        }
        else{
            this.props.decrement(this.props.itemId, this.props.price);
        }


    }
    render() {
        return(
            <div style ={{width:'100%', float:'left'}}>
                <div class="row">
                    <div class="col s12 m7">
                        <div class="card">
                            <div class="card-image">
                                {/* <img src="images/sample-1.jpg"/> */}
                               
                            </div>
                            <span class="card-title" style={{color:'black'}}>{this.state.item.name}</span>
                            <div class="card-content">
                                <p>{this.state.item.description}</p>
                                <p>{this.props.price}</p>
                            </div>
                            <div class="card-action">
                                <ul>
                                    <li>
                                    <button class="waves-effect waves-light btn-small left" onClick={()=>this.props.increment(this.props.itemId, this.props.price)}> +1 </button>
                                    </li>
                                    <li>
                                    <button class="waves-effect waves-light btn-small left" disabled> {this.props.quantity} </button>
                                    </li>
                                    <li>
                                    <button class="waves-effect waves-light btn-small left" onClick={this.handledecrement} disabled={this.props.quantity==1}> -1 </button>
                                    </li>
                                    <li>
                                    <button class="waves-effect waves-light btn-small right"><i class="material-icons right">clear</i>Remove</button>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;