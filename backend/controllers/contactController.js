const asyncHandler = require('express-async-handler')
const Contacts = require('../models/contactModel')
const Volunteers = require('../models/volunteerModel')


// @desc getHR
// @route GET/api/database
// @Private{Director,Volunteer}

const listContacts = asyncHandler(async(req,res)=>{
    let contacts
    if(req.user.role === 'Director'){
        contacts = await Contacts.find({incharge:req.user.id})
    }
    else if(req.user.role === 'Admin'){
        contacts = await Contacts.find({})
    }
    else{
        contacts = await Contacts.find({volunteer:req.user.id})
    }
    res.status(200).json({contacts})
    // console.log(contacts)
})

// @desc getHR
// @route GET/api/database
// @Private{Director,Volunteer}
const getContact = asyncHandler(async(req,res)=>{
    let contact = await Contacts.findById(req.params.id)

    if(!req.user){
        res.status(401)
        throw new Error('Please Log In')
    }

    if(!contact){
        res.status(400)
        throw new Error('Contact not listed')
    }
    res.status(200).json(contact)
})

// @desc globalHR
// @route GET/api/database/globalHR
// @access Private {Director}
const globalList = asyncHandler(async(req,res)=>{
    let contacts
    if(req.user.role=='Director'){
        contacts = await Contacts.find({})
    }
    else{
        res.status(201)
        throw new Error('Not Authorized')
    }
    res.status(200).json({contacts})
})

// @desc addHR
// @route POST/api/database
// @access Private {Director,Volunteer}

const addContact = asyncHandler(async(req,res)=>{
    const {
        name, 
        company,
        contactNumber,
        email,
        status,
        interviewMode,
        HRCount,
        transport,
        address,
        internship,
        department,
        comments}  = req.body
    
    const ContactExists = await Contacts.findOne({contactNumber})

    if(!req.user){
        res.status(401)
        throw new Error('Please Log In')
    }

    if(ContactExists){
        res.status(400)
        throw new Error('HR Already Exists')
    }
    //Create HR
    const newHR = await Contacts.create({
        volunteer:req.user.role ==='Member'?req.user.id:null,
        incharge:req.user.role ==='Member'?req.user.incharge:req.user.id,
        name,
        company,
        contactNumber,
        email,
        status,
        interviewMode,
        HRCount,
        transport,
        address,
        internship,
        department,
        comments
    })

    if(newHR){
        res.status(200).json(newHR)
    }
    else{
        res.status(400)
        throw new Error('Invalid HR Details')
    }
})

// @desc updateHR
// @route PUT/api/database/:id
// @access Private{Director,Volunteer}
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    
    if(!req.user){
        res.status(401)
        throw new Error('Please Log In')
    }
    if(req.user.role==='Director'){

        if(contact.incharge.toString() !== req.user.id){
            res.status(401)
            throw new Error('Director not Authorized')
        }
    }
    else if(req.user.role==='Volunteer'){
        if(contact.volunteer.toString() !== req.user.id){
            res.status(401)
            throw new Error('Volunteer not Authorized')
        }
    }
    if(!contact){
        res.status(400)
        throw new Error('Contact not listed')
    }
    const updatedContact = await Contacts.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(201).json({updatedContact})
})


// @desc transferContact
// @route PUT/api/database/transfer/:id
// @access Private{Director}

const transferContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!req.user){
        res.status(401)
        throw new Error('Please Log In')
    }
    if(req.user.role==='Director'){
        
        const transferedContact = await Contacts.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(201).json({transferedContact})
    }
})

// @desc deleteHR
// @route DEL/api/database/:id
// @access Private {Director,Volunteer,Admin}

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(req.user.role==='Director'){
        if(contact.incharge.toString() !== req.user.id){
            res.status(401)
            throw new Error('Director not Authorized')
        }
    }
    else if(req.user.role==='Volunteer'){
        if(contact.volunteer.toString() !== req.user.id){
            res.status(401)
            throw new Error('Volunteer not Authorized')
        }
    }
    if(!contact){
        res.status(400)
        throw new Error('Contact not listed')
    }
    const removedContact = await Contacts.findByIdAndRemove(req.params.id)
    res.status(200).json({removedContact})
})

// @desc Upload CSV
// @route POST/api/database/upload
// @access Private {Director,Volunteer}

const fileUpload = asyncHandler(async(req,res)=>{
    
    let contacts = req.body
    let i
    // contacts = contacts.splice(1,contacts.length-1)
    console.log(contacts.length)
    console.log(contacts)

    for(i=0;i<contacts.length;i++){
        let j = contacts[`${i}`][2]
        console.log(j)
        const ContactExists = await Contacts.findOne({j})
        if(ContactExists){
            continue
        }
        else{

            const newHR = await Contacts.create({
                volunteer:req.user.role ==='Member'?req.user.id:null,
                incharge:req.user.role ==='Member'?req.user.incharge:req.user.id,
                name:contacts[`${i}`][0],
                company:contacts[`${i}`][1],
                contactNumber:contacts[`${i}`][2],
                status:contacts[`${i}`][3],
                email:contacts[`${i}`][4],
                interviewMode:contacts[`${i}`][5],
                HRCount:contacts[`${i}`][6],
                transport:contacts[`${i}`][7],
                address:contacts[`${i}`][8],
                internship:contacts[`${i}`][9],
                comments:contacts[`${i}`][10]
            })
            console.log(newHR)
            if(newHR){
                console.log('HR added Succesfully')
            }
        }
    }
})
module.exports = {
    listContacts,
    getContact,
    globalList,
    addContact,
    updateContact,
    deleteContact,
    transferContact,
    fileUpload
}
