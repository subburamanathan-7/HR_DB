const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const Volunteer = require('../models/volunteerModel')

const authenticateVolunteer = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            token = token.substring(1,token.length-1)
            // console.log(token)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded.id)
            req.user = await Volunteer.findById(decoded.id).select('-password')
            // console.log(req.user)
            next()
        }
        catch(e){
            res.status(401)
            throw new Error('Volunteer Not Authorized')
        }

    }
    if(!token){
        res.status(402)
        throw new Error('Token Not Found')
    }
})
module.exports = {authenticateVolunteer};