const app = require('express')();
const validateNb = require('./src/phoneAPI');
const {createCustomer,  getAllCustomers, deleteCustomer, updateCustomer} = require('./src/db')

//validate Number
app.post('/validateNb', (req,res) =>{
    validateNb(req.query.number)
        .then(apiResponse => res.json(apiResponse))
        .catch(error => console.log(error));
})

//get Customers
app.get('/customers', (req,res) =>{
    getAllCustomers()
        .then(customers => res.json(customers))
        .catch(error => console.log('Error', error))
})

//create customer
app.post('/createCustomer', (req,res) =>{
    if(req.query.name && req.query.address && req.query.number){
        let customerData = {
            name: req.query.name,
            address: req.query.address,
            phone: req.query.number
        }
        validateNb(customerData.phone)
            .then(apiResponse => {
                console.log('Number is valid!',apiResponse),
                createCustomer(customerData).then(ack => res.json({Acknowledged: ack}))
            })
            .catch(error => console.log(error));
    }else{
        throw {Error: 'Please enter all the required parameters!'}
    }
})

//update customer
app.post('/updateCustomer', (req,res) =>{
    if(req.query.id && req.query.name && req.query.address && req.query.number){
        let customerData = {
            _id: req.query.id,
            name: req.query.name,
            address: req.query.address,
            phone: req.query.number
        }
        validateNb(customerData.phone)
            .then(apiResponse => {
                console.log('Number is valid!',apiResponse),
                updateCustomer(customerData).then(ack => res.json({Acknowledged: ack}))
            })
            .catch(error => console.log(error));
    }else{
        res.json({Error: 'Please enter all the required parameters!'})
    }
})

//delete customer
app.post('/deleteCustomer', (req, res) =>{
    if (req.query.id) {
        deleteCustomer(req.query._id).then(result => res.json(result))
    }
})


app.listen(4000)

