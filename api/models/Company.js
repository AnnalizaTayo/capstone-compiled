const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyLogo: {
        filename: String,
        png: Buffer,
        favicon: Buffer,
        contentType: String,
    },
    contact: {
        email: {
        type: String,
        },
        landLineNumber: String,
        mobileNumber: String,
        website: String,
        address: {
            type: String,
        },
    },
    about: {
        type: String,
        required: true,
    },
    mission: String,
    vision: String,
    highlightCollection: {
        filename: String,
        data: Buffer,
        contentType: String,
    }
});

const Company = mongoose.model('Company', companySchema, 'company_info');
module.exports = Company;
