import './App.css';
import React, { useState,useEffect } from "react";
import axios from "axios";

function App() {

  const fetchCustomers = () => {
    axios.get('http://localhost:4000/customers')
    .then(response => {
      console.log(response);
      setCustomers(response.data)})
    .catch(error => alert(error))
  }

  const deleteCustomer = (id) => {
    console.log(id)
    axios.post('http://localhost:4000/deleteCustomer',{'id':id})
      .then(response => {
        alert('Customer Deleted',response);
        fetchCustomers()})
      .catch(error => alert(error))
  }

  const addCustomer = (event) => {
    event.preventDefault();
    console.log(formData);
    axios.post('localhost:4000/createCustomer',formData)
      .then((response=> alert('Customer Created', response)))
      .catch((error => alert('Failed',error)))
  }

  const updateCustomer = (event) => {
    event.preventDefault();
    console.log(updateformData);
    axios.post('localhost:4000/updateCustomer',updateformData)
      .then((response=> alert('Customer Updated', response)))
      .catch((error => alert('Failed',error)))
  }

  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    number: ''
  })
  const [updateformData, setUpdateFormData] = useState({
    id: '',
    name: '',
    address: '',
    number: ''
  })
  useEffect(()=> {fetchCustomers()},[])

  return (
    <div className="App">
      <div className='App-header'>
        {/* Lists Customers */}
        <h1>Customers</h1>
        <div className='customersContainer'>
          {customers.length == 0?'No Customer Data':null}
          {customers.map((el)=>{
            return (
              <div className='customerDetails'>
                <p>ID: {el._id}</p>
                <p>Name: {el.name}</p>
                <p>Adress: {el.address}</p>
                <p>Phone Number: {el.phone}</p>
                <button onClick={()=>deleteCustomer(el._id)}>Delete</button>
              </div>)
          })}
        </div>
        {/* Creates a new Customer */}
        <h1>Add a Customer</h1>
        <form className='addForm' onSubmit={(e)=>addCustomer(e)}>
          <span>
            <label>Name </label>
            <input required type="text" placeholder='Enter your Name' id='name'value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})}/>
          </span>
          <span>
            <label>Address </label>
            <input required type="text" placeholder='Enter your address' id="address" value={formData.address} onChange={(e)=> setFormData({...formData, address: e.target.value})}/>
          </span>
          <span>
            <label>Phone Number </label>
            <input required type="number" placeholder='Enter your PhoneNumber' id="number" value={formData.number} onChange={(e)=> setFormData({...formData, number: e.target.value})}/>
          </span>
          <button type="submit">Submit</button>
        </form>

          {/* update an existing customer */}
        <h1>Update Customer</h1>
        <div>
        <form className='addForm' onSubmit={(e)=>updateCustomer(e)}>
          <select name="" id="" onChange={(e)=> setUpdateFormData({...updateformData, id: e.target.value})}>
            <option defaultValue={''}>Select Customer</option>
          {
           customers.map((el)=>{
            return (
              <option value={el.id}>{[el.name,el.address,el.number]}</option>) 
          })}
          </select>
          <span>
            <label>Name </label>
            <input required type="text" placeholder='Enter your Name' id='name'value={updateformData.name} onChange={(e)=> setUpdateFormData({...updateformData, name: e.target.value})}/>
          </span>
          <span>
            <label>Address </label>
            <input required type="text" placeholder='Enter your address' id="address" value={updateformData.address} onChange={(e)=> setUpdateFormData({...updateformData, address: e.target.value})}/>
          </span>
          <span>
            <label>Phone Number </label>
            <input required type="number" placeholder='Enter your PhoneNumber' id="number" value={updateformData.number} onChange={(e)=> setUpdateFormData({...updateformData, number: e.target.value})}/>
          </span>
          <button type="submit">Submit</button>
        </form>
        </div>
      </div>
    </div>
  );

}



export default App;
