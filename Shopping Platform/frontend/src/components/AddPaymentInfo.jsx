import React , { useState } from "react";
import axios from "axios";
//The npm package called "axios" is used to send data to the backend using http requests

function AddPaymentInfo(){

    const [cardNumber , setCardNumber] = useState("");
    const [totalPrice , setTotalPrice] = useState("");
    const [cvc , setCvc] = useState("");
    const [cardHolderName , setCardHolderName] = useState("");

    //Create a function which will be called when the submit button is clicked
    function sendData(e){//passing the event "onSubmit"
        e.preventDefault();/*without redirecting to a new page it will insert
        data from the same page itself. That function will prevent the normal behaviour
        of the even "onSubmit"*/

        //creat a new object
        const newOrderObj = {
            cardNumber,
            totalPrice,
            cvc,
            cardHolderName
        }

        axios.post("http://localhost:8070/order/newOrder" , newOrderObj).then(() => {
            alert( 'Added' );
            //after submitting, make all the fields default by clearing the data typed by the user

            /* this.setState({
                 cardNumber : '',
                 totalPrice : '',
                 cvc : '',
                 cardHolderName : ''
             });*/

        }).catch((err) =>{
            alert(err);
        })
    }



    return(
        <div className = "container">
            <form onSubmit={sendData}>
                <br/>

                {/*Credit Card Number*/}
                <div className="form-group" >

                    <label htmlFor="exampleFormControlInput1" className="form-label" >Enter Credit Card Number</label>
                    <input type="text" className="form-control" id="cardNumber"
                           onChange = {(e) => {
                               setCardNumber(e.target.value);
                           }}
                    />

                </div>

                {/*Amount*/}
                <div className="form-group" >

                    <label htmlFor="exampleFormControlInput1" className="form-label" >Total Amount to be Paid</label>
                    <input id="totalPrice" className="form-control" type="text"
                           placeholder="Amount Should be retrieved here"
                           aria-label="Disabled input example" disabled readOnly

                        //retrieve the amount

                           onChange = {(e) =>{
                               setTotalPrice(e.target.value);
                           }}
                    />

                </div>

                {/*CVC number (3 digit no. at the back of the credit card)*/}
                <div className="form-group" >

                    <label htmlFor="exampleFormControlInput1" className="form-label" >Enter CVC Number</label>
                    <input type="text" className="form-control" id="cvc"
                           onChange = {(e) =>{
                               setCvc(e.target.value);
                           }}
                    />

                </div>

                {/*Card holder's name*/}
                <div className="form-group" >

                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Card Holder Name</label>
                    <input type="text" className="form-control" id="cardHolderName"
                           onChange = {(e) => {
                               setCardHolderName(e.target.value);
                           }}
                    />

                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    )
}

export default AddPaymentInfo;