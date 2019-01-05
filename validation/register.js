const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'First Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First Name field is required';
    }

    if(!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = 'Last Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name field is required';
    }

    if(!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Username must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}