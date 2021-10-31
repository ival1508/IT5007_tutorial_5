db.customers.remove({}) //cleaning the 'customers' collection in the waitlist db

print ('------- Step 0. Removed all the previous entries -------')
print ('------- Step 1. Preparing a list of customers to be inserted in the database -------')
const customersDB = [
    {
        queue_number: 1, name: 'Val', contact_number: 90072169, timestamp: new Date('1991-15-08')
    },
    {
        queue_number: 2, name: 'Glasha', contact_number: 90721467, timestamp: new Date('2017-28-01')
    }
];


db.customers.insertMany(customersDB); //inserting our 2 documents to the database
const count = db.customers.count();
print ('------- Step 1. Inserted the list of',count, 'customers to the database -------')
print ('------- Step 2. Reading details of the customers inserted -------')
let result = db.customers.find().toArray();
result.forEach((e) => printjson(e));

print ('------- Step 3. Deleting customer with queue number 1 -------')
db.customers.deleteOne({ queue_number: 1 })
print ('------- Step 3. Reading a list of customers left -------')
result = db.customers.find().toArray();
result.forEach((e) => printjson(e));
