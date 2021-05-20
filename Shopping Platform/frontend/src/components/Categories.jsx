import React, { Component } from 'react';
import ItemCard from './ItemCard';

class Categories extends Component {
    constructor(props){
        super(props);
        this.state={
            Items:[],
            
        }
        this.getCategoryItems= this.getCategoryItems.bind(this);
    }
    componentDidMount(){
        
        this.getCategoryItems(this.props.location.category);
    }
    
    componentDidUpdate(prevProps){
        if (this.props.location.category !== prevProps.location.category) {
            this.getCategoryItems(this.props.location.category);
          }
    }
    async getCategoryItems(category){
        // let category =this.props.location.category
        const response = await fetch(`http://localhost:8070/item//findByCateory/${category}`);
        const data = await response.json().then(data=> {
            this.setState({
                Items: data
            })
            console.log(this.state.Items);
            
        }).catch(err=>{
            console.error(err);
        });
      }
    render() {
        return (
            <div>
                {this.state.Items.map((item)=>
                    <ItemCard id={item._id} name={item.name} 
                    price={item.price} description={item.description} 
                    category={item.category}/>
                )}
            </div>
        );
    }
}

export default Categories;