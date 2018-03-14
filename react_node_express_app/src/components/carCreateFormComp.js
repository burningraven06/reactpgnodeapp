import React from 'react';
import  './form-error.css';

export default class CarCreateComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        carname: "",
        carcolor: "",
        carprice: "",
        nameInValid: false,
        colorInValid: false,
        priceInValid: false
    }
    this.handleCarNameChange = this.handleCarNameChange.bind(this);
    this.handleCarColorChange = this.handleCarColorChange.bind(this);
    this.handleCarPriceChange = this.handleCarPriceChange.bind(this);
    this.sendCarFormData = this.sendCarFormData.bind(this);
    this.unrenderCreateForm = this.unrenderCreateForm.bind(this);

  }
  handleCarNameChange = (event) => {
    this.setState({ carname: event.target.value });
  }
  handleCarColorChange = (event) => {
    this.setState({ carcolor: event.target.value });
  }
  handleCarPriceChange = (event) => {
    this.setState({ carprice: event.target.value });
  }

  validateFormData = () => {
    if (this.state.carname.length > 0 && this.state.carcolor.length> 0 && this.state.carprice){
      return true; 
    }
    if (!this.state.carname.length > 0){
      this.setState({ nameInValid: true})
      document.getElementById('carNameInput').classList.add('orange-boundary');;
      return false;
    }
    if (!this.state.carcolor.length > 0) {
      this.setState({ colorInValid: true })
      document.getElementById('carColorInput').classList.add('orange-boundary');;
      return false;
    } 
    if (!this.state.carprice) {
      this.setState({ priceInValid: true })
      document.getElementById('carPriceInput').classList.add('orange-boundary');;
      return false;
    }
  }

  resetValidationCSS = () => {
    this.setState({ nameInValid: false, colorInValid: false, priceInValid: false })
    document.getElementById('carNameInput').classList.remove('orange-boundary');
    document.getElementById('carColorInput').classList.remove('orange-boundary');
    document.getElementById('carPriceInput').classList.remove('orange-boundary');
  }

  sendCarFormData = (event) => {
    event.preventDefault()
    this.resetValidationCSS()
    this.validateFormData() && this.props.receiveCarData(this.state.carname, this.state.carcolor, this.state.carprice);
  }
  
  unrenderCreateForm = () => {
    this.props.unrenderForm()
  }

  render(){
    return (
      <div className='col-sm-6 col-sm-offset-3'> 
        <form> 
          <div className="form-group">
            <label htmlFor='carname'> Name</label>
            <input type='text' placeholder='Name' name='carname' className={'form-control'} onChange={this.handleCarNameChange} id='carNameInput' /> 
            {this.state.nameInValid && <p className='input-err'> ** Name Invalid</p> }
          </div>
          <div className="form-group">
            <label htmlFor='carcolor'> Color</label> 
            <input type='text' placeholder='Color' name='carcolor' className={'form-control'} onChange={this.handleCarColorChange} id='carColorInput' /> 
            {this.state.colorInValid && <p className='input-err'> ** Color Invalid</p>}
          </div>
          <div className="form-group">
            <label htmlFor='carprice'> Price</label>
            <input type='text' placeholder='Price' name='carprice' className={'form-control'} onChange={this.handleCarPriceChange} id='carPriceInput' /> 
            {this.state.priceInValid && <p className='input-err'> ** Price Invalid</p>}<br />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-primary' onClick={this.sendCarFormData}> Submit </button>
            <button type='cancel' className='btn btn-default' onClick={this.unrenderCreateForm}> Cancel </button>
          </div>
        </form>
      </div>
    );
  }
}