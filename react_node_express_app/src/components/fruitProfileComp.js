import React from 'react';
import './form-error.css';
import axios from 'axios';

export default class FruitProfileComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      theSingleFruit: {},
      isEditing: false,
      editedFruitName: "",
      editedFruitWeight: "",
      editedFruitFSize: "",
      nameInValid: false,
      weightInValid: false,
      fSizeInValid: false,
    }
    this.editModeOn = this.editModeOn.bind(this)
    this.editModeOff = this.editModeOff.bind(this)
    this.handleFruitNameChange = this.handleFruitNameChange.bind(this)
    this.handleFruitWeightChange = this.handleFruitWeightChange.bind(this)
    this.handleFruitFSizeChange = this.handleFruitFSizeChange.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
    this.updateFruit = this.updateFruit.bind(this)
    this.deleteFruit = this.deleteFruit.bind(this)
  }

  componentDidMount(){
    this.callApiGetSingleFruit().then( res => { 
      this.setState({ theSingleFruit: res.singleFruit })
    }).catch(err => console.log(err))
  } 

  componentDidUpdate(){
    this.callApiGetSingleFruit().then( res => {
      this.setState({ theSingleFruit: res.singleFruit })
    }).catch(err => console.log(err))
  } 

  callApiGetSingleFruit = async() =>{
    const fetchURL = '/api/fruits/' + this.props.match.params.id
    const response = await fetch(fetchURL);
    const resBody = await response.json();
    if (response.status !== 200) throw Error(resBody.message);
    return resBody;
  }

  editModeOn = () => {
    this.setState({
      isEditing: true,
      editedFruitName: this.state.theSingleFruit.name, 
      editedFruitWeight: this.state.theSingleFruit.weight, 
      editedFruitFSize: this.state.theSingleFruit.fsize, 
      nameInValid: false, 
      weightInValid: false, 
      fSizeInValid: false })
  }

  editModeOff = () => {
    this.setState({ isEditing: false})
  }

  handleFruitNameChange = (event) => {
    if(!event.target.value){
      this.setState({ nameInValid: true }); 
      document.getElementById('fruitNameInput').classList.add('orange-boundary');
      document.getElementById('editFruitBtn').classList.add('disabled');
    } else{
      this.setState({ nameInValid: false });
      document.getElementById('fruitNameInput').classList.remove('orange-boundary');
      document.getElementById('editFruitBtn').classList.remove('disabled');
    }
    this.setState({ editedFruitName: event.target.value})
  }

  handleFruitWeightChange = (event) => {
    if (!event.target.value) {
      this.setState({ weightInValid: true });
      document.getElementById('fruitWeightInput').classList.add('orange-boundary');
      document.getElementById('editFruitBtn').classList.add('disabled');
    } else {
      this.setState({ weightInValid: false });
      document.getElementById('fruitWeightInput').classList.remove('orange-boundary');
      document.getElementById('editFruitBtn').classList.remove('disabled');
    }
    this.setState({ editedFruitWeight: event.target.value})
  }

  handleFruitFSizeChange = (event) => {
    if (!event.target.value) {
      this.setState({ fSizeInValid: true });
      document.getElementById('fruitFSizeInput').classList.add('orange-boundary');
      document.getElementById('editFruitBtn').classList.add('disabled');
    } else{
      this.setState({ fSizeInValid: false });
      document.getElementById('fruitFSizeInput').classList.remove('orange-boundary');
      document.getElementById('editFruitBtn').classList.remove('disabled');
    }
    this.setState({ editedFruitFSize: event.target.value})
  }

  validateFormData = () => {
    if (this.state.editedFruitName.length > 0 && this.state.editedFruitWeight.length > 0 &&  this.state.editedFruitFSize ){
			return true;
    }
    return false;
  }

  updateFruitApiCall = () => {
    const patchURL = '/api/fruits/' + this.props.match.params.id
    axios.patch(patchURL, {
      name: this.state.editedFruitName,
      weight: this.state.editedFruitWeight,
      fsize: parseInt(this.state.editedFruitFSize, 10)
    }).then( (res) => {
      console.log(res);
      this.callApiGetSingleFruit().then( (res) => this.setState({
        theSingleFruit: res.singleFruit
      })).catch( err => console.log(err))
    }).catch(err => console.log(err))
  }

  updateFruit = (event) => {
    this.validateFormData() && this.editModeOff()
    this.validateFormData() && this.updateFruitApiCall()
  }

  deleteFruitApiCall = () => {
    const deleteURL = '/api/fruits/' + this.props.match.params.id
    axios.delete(deleteURL).then( (res) => console.log(res.message)).catch(err => console.log(err));
  }

  redirectToFruits = () => {
    this.props.history.push('/fruits')
  }

  deleteFruit = () =>{
    this.deleteFruitApiCall()
    this.redirectToFruits()
  }

  render(){
    return(
      <div className='col-md-10 col-md-offset-1'>
        <div className='col-sm-4'>
            <h2> {this.state.theSingleFruit.name} </h2>
            <p> Weight: <i className='fa fa-paint-scale'> </i> {this.state.theSingleFruit.weight} </p>
            <p> fSize: {this.state.theSingleFruit.fsize} px </p>
            {! this.state.isEditing && 
              <div>
                  <button className='btn btn-success' onClick={this.editModeOn}> Edit </button>
                  <button className='btn btn-danger' onClick={this.deleteFruit}> Delete </button>
              </div>
            }
        </div>
        <div className='col-sm-8'>
          {this.state.isEditing && 
            <div>
              <div className='col-sm-6'>
                <h3> {this.state.editedFruitName} </h3>
                <p> {this.state.editedFruitWeight} {this.state.editedFruitFSize}</p>   
              </div>
              <div className='col-sm-6'>
                <h3> Edit Car </h3>
                <form className='form'>
                    <label htmlFor='fruitName'> Name </label>
                    <input type='text' className='form-control' name='fruitName' defaultValue={this.state.editedFruitName} onChange={this.handleFruitNameChange} id='fruitNameInput' /> 
                    { this.state.nameInValid && <span className='input-err'> ** Name Invalid</span>} <br/>

                    <label htmlFor='fruitWeight'> Weight </label>
                    <input type='text' className='form-control' name='fruitWeight' onChange={this.handleFruitWeightChange} defaultValue={this.state.editedFruitWeight} id='fruitWeightInput' /> 
                    {this.state.weightInValid && <span className='input-err'> ** Weight Invalid</span>} <br />

                    <label htmlFor='fruitFSize'> FSize </label>
                    <input type='text' className='form-control' name='fruitFSzie' onChange={this.handleFruitFSizeChange} defaultValue={this.state.editedFruitFSize} id='fruitFSizeInput' />
                    {this.state.fSizeInValid && <span className='input-err'> ** FSize Invalid</span>} <br />

                    <button className='btn btn-primary' type='submit' onClick={this.updateFruit} id='editFruitBtn' >Save</button>
                    <button className='btn btn-default' onClick={this.editModeOff}>Cancel </button>
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}