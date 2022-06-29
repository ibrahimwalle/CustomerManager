const connectDb = require("./connectDb");
var ObjectId = require('mongodb').ObjectId;

//update customer
async function updateCustomer(customerData) {
    const collection = await connectDb();
    const customer = await collection.replaceOne({_id: customerData._id}, customerData)
    return customer.acknowledged
}

module.exports = updateCustomer;