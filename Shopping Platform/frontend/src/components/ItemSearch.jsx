import React, { Component } from 'react';

class ItemSearch extends Component {
    render() {
        return (
            <div>
                <form >
                <div class="row">
                        <div class="input-field col s4 offset-s4" >
                             <input   type="text" class="autocomplete" style={{border: "none",marginBottom:"0px"}} required/>
                             <label for="search">Search Item</label>
                             <ul style={{border: "1px solid black", marginBlockStart: "0em"}}>
                                {/* {this.showSuggestions()} */}
                            </ul>
                        </div>
                        <div class="input-field col s3" >
                             <button class="waves-effect waves-light grey darken-1 btn-small">Search</button>
                        </div>
                </div>
                </form>
            </div>
        );
    }
}

export default ItemSearch;