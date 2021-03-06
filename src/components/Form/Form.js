import React, { Component } from 'react';
import './Form.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  validateData
} from "../../utils/productUtil";
import {node_server_address} from "../../config"
class Form extends Component {

  state = {
    name: '',
    product_code: '',
    product_price: '',
    product_img: '',
    active_inactive: `off`,
    loading: false,
    formData: undefined,
    search: ""
  }
  onSubmit = (evt) => {
    evt.preventDefault();
    let formData = this.state.formData;

  let validation = validateData(this.state);
    if(!validation.status || !this.state.formData){
      let errorMessage = validation.errorMessage||"";
      if(!this.state.formData){
        errorMessage+= "Image is not uploaded correctly."
      } 
      this.setState({
        error: errorMessage
      });
      return;
    }

    formData.append("product_code", this.state.product_code)
    formData.append("product_price", this.state.product_price)
    formData.append("name", this.state.name)
    formData.append("active_inactive", this.state.active_inactive)
    if(!this.state.error)
    fetch(`http://${node_server_address}/addProduct`, 
      { 
        method:"POST",
        body: formData
      }).then(res => {
        console.log(res);
        this.setState({
          name: '',
          product_code: '',
          product_price: '',
          loading: false,
        })
      }).catch((err) => {
        console.log(err);
      });
  }
  
  onChange = (evt) => {
    let { id, value } = evt.target || {};
    if (id === `product_img`) {
      let files = Array.from(evt.target.files);
      let formData = new FormData();
      if(files[0].size>4194304){
        this.setState({
          error: (this.state.error?this.state.error:"")+" Image Size should be less than equal to 4MB",
          formData: undefined
        });
        return;
      }
        formData.append('product_img', files[0]);
      
      this.setState({
        formData 
      });
      
    } else {
      this.setState({
        [id]: value
      });
    }
    console.log(value);
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />
    }
    return (
      <div className="productForm">
        <form className="Form" >
          <span className={`inputLabels`}>Name:</span>
          <input
            className="inputFields"
            id="name"
            type="text"
            value={this.state.name}
            placeholder={`name`}
            onChange={this.onChange}
          />
          <span className={`inputLabels`}>Product Code:</span>
          <input
            className="inputFields"
            id="product_code"
            type="text"
            value={this.state.product_code}
            placeholder={`Product Code`}
            onChange={this.onChange}
          />
          <span className={`inputLabels`}>Product Price:</span>
          <input
            className="inputFields"
            id="product_price"
            type="number"
            value={this.state.product_price}
            placeholder={`price`}
            onChange={this.onChange}
          />
          <input
            className="inputFields"
            type="file"
            id={`product_img`}
            title="Click to Upload File."
            accept={"image/*"}
            onChange={this.onChange}
          />
          <span className={`inputLabels`}>Status:</span>
          <input
            className="radioButton"
            type="radio"
            id={`active_inactive`}
            onChange={this.onChange}
          />
          {this.state.error ?
            <div className= "errorText">
              <hr />
              {this.state.error}
            </div> :
            null
          }
          <div className="submitDiv">
            <button className='sub_btn' type="submit" onClick={this.onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
