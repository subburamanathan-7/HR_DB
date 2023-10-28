const fs = require('fs');
const mongoose = require('mongoose')

const csv = require('csv-parser');
const dotenv = require('dotenv').config();
const contactModel  = require('../models/contactModel');

const csvFilePath = './contacts.csv';
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected :${conn.connection.host}`.blue.underline)

    }
    catch(e){

        console.log(e)
        process.exit(1)
    }
}

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', async (row) => {
    // Create a new contact instance based on the CSV row datas
    const contact = new contactModel({
      name: row.name,
      company: row.company,
      contactNumber: parseInt(row.contactNumber),
      status: row.status,
      interviewMode: row.interviewMode,
      HRCount: parseInt(row.HRCount),
      transport: row.transport,
      address: row.address,
      internship: row.internship,
      comments: row.comments,
    });

    console.log(contact)

    const newContact = await contactModel.create(contact)
    // console.log(contact)

  
  })
  .on('end', () => {
    console.log('CSV file processing complete.');
    mongoose.connection.close();
  });
