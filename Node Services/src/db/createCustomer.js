const connectDb = require("./connectDb");

//create customers
async function createCustomer(customerData) {
    const collection = await connectDb();
    const customer = await collection.insertOne(customerData)
    return customer.acknowledged
}

module.exports = createCustomer;