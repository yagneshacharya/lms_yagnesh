const company_m = require('../Model/company_registration')
const bcrypt = require('bcrypt')

// Adding companies ___________________________

const addCompany = (req, res) => {

    const company = new company_m({
        company_name: req.body.name,
        company_password: bcrypt.hashSync(req.body.password, 10),
        company_email: req.body.email,
        company_contact_number: req.body.contact,
        company_address: req.body.address,
        company_logo: req.body.logo,
        company_isDeleted: req.body.isDeleted
    })

    company.save().then((data) => {
        res.send({
            isSuccess: true,
            message: "Company is added",
            datas: data
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            isSuccess: false,
            message: "Something went wrong",
            error: err
        })
    })
}

// updating companies ___________________

const updateCompany = (req, res) => {

    let obj = {}

    if (req.body.name) {
        obj.company_name = req.body.name
    }
    if (req.body.email) {
        obj.company_email = req.body.email
    }
    if (req.body.password) {
        obj.company_password = bcrypt.hashSync(req.body.password, 10)
    }
    if (req.body.logo) {
        obj.company_logo = req.body.logo
    }
    if (req.body.address) {
        obj.company_address = req.body.address
    }
    if (req.body.contact) {
        obj.company_contact_number = req.body.contact
    }
    if (req.body.isDeleted) {
        obj.company_isDeleted = req.body.isDeleted
    }


    company_m.updateOne({ company_name: req.query.name }, obj).then((data) => {
        res.send({
            isSuccess: true,
            message: "company has been updated",
        })
    }).catch((err) => {
        res.send({
            isSuccess: false,
            message: "Something went wrong",
            error: err
        })
    })

}


// Deleting companies ___________________

const deleteCompany = (req, res) => {
    company_m.deleteOne({ company_name: req.query.name }).then((data) => {
        res.send({
            isSuccess: true,
            message: "Company has been deleted successfully",
        })
    }).catch((err) => {
        res.send({
            isSuccess: false,
            message: "Something went wrong while deletion",
        })
    })
}

// Find all companies __________________

const getAllcompanies = (req, res) => {
    company_m.find({})
        .then((data) => {
            res.send({
                isSuccess: true,
                message: "List of companies ",
                response: data
            })
        })
        .catch((err) => {
            res.send({
                isSuccess: false,
                message: "Companies not found",
                error: err
            })
        })
}

module.exports = { addCompany, deleteCompany, getAllcompanies, updateCompany }

