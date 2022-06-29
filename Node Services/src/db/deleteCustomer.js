const connectDb = require("./connectDb");
var ObjectId = require('mongodb').ObjectId;

//delete customer
async function deleteCustomer(customerID) {
    const collection = await connectDb();
    collection.findOneAndDelete({'_id': ObjectId(customerID)}, (err, result) => {
        if(err){return err}
        return result;
    })

}

module.exports = deleteCustomer;