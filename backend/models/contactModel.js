const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    {
        volunteer:{
            type:mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'Volunteer', //Model Name
        },
        incharge:{
            type:mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'Volunteer', //Model Name
        },
        name:{
            type:String,
            // required:[true,'Please add an name']
        },
        company:{
            type:String,
            // required:[true,'Please add a company']
        },
        contactNumber:{
            type:Number,
            // required:[true,'Please add a contact']
        },
        email:{
            type:String,
            // required:[true,'Please add a email']
        },
        status:{
            type:String,
            enum:[
                'notCalled',
                'calledAccepted',
                'calledDeclined',
                'calledPostponed',
                'calledNotReachable',
                'emailedAccepted',
                'emailedAwaitingResponse',
                'emailedDeclined',
                'blacklisteds'
                    
                ],
            default: 'notCalled'
        },
        interviewMode:{
            type:String,
            enum:[
                'online',
                'offline',
                'onlineOffline'
            ]
        },
        HRCount:{
            type:Number,
        },
        transport:{
            type:String
        },
        address:{
            type:String,
        },
        internship:{
            type:String,
            // required:[true,'Please add the intership detail']

        },
        dept:{
            type:Array

        },
        // department:{[
        //     INT:Boolean,
        //     CSE:Boolean,
        //     ADS:Boolean,
        //     ECE:Boolean,
        //     EEE:Boolean,
        //     BIO:Boolean,
        //     CHE:Boolean,
        //     CVE:Boolean,
        //     AUT:Boolean,
        //     MEC:Boolean,
        //     MAR:Boolean,
        // ]},
        comments:{
            type:String,
        },
    }
)
module.exports = mongoose.model('contact',contactSchema)