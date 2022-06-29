const connectDb = require("./connectDb");

//get all customers
async function getAllCustomers() {
    const collection = await connectDb();
    const customers = await collection.find();
    return customers.toArray()
}

module.exports = getAllCustomers;