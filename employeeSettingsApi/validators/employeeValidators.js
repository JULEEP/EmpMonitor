/**
 * Custom validators for the Employee Settings API.
 */

const { check, validationResult } = require('express-validator');

/**
 * Validate email format.
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

/**
 * Validate phone number format.
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
const validatePhoneNumber = (phone) => {
    // Simple validation for phone numbers with optional dashes, spaces, or parentheses
    const re = /^[\d\s\(\)\-\+]{10,15}$/;
    return re.test(phone);
};

/**
 * Validation rules for employee settings
 */
const employeeSettingsValidationRules = [
    check('employeeId')
        .notEmpty().withMessage('Employee ID is required')
        .isLength({ min: 1, max: 50 }).withMessage('Employee ID must be between 1 and 50 characters'),

    check('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),

    check('email')
        .notEmpty().withMessage('Email is required')
        .isLength({ min: 5, max: 100 }).withMessage('Email must be between 5 and 100 characters')
        .custom(value => {
            if (!validateEmail(value)) {
                throw new Error('Invalid email format');
            }
            return true;
        }),

    check('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 characters')
        .custom(value => {
            if (!validatePhoneNumber(value)) {
                throw new Error('Invalid phone number format');
            }
            return true;
        }),

    check('address')
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 255 }).withMessage('Address must be between 5 and 255 characters'),

    check('department')
        .notEmpty().withMessage('Department is required')
        .isLength({ min: 1, max: 100 }).withMessage('Department must be between 1 and 100 characters'),

    check('workSchedule')
        .notEmpty().withMessage('Work schedule is required')
        .isLength({ min: 1, max: 100 }).withMessage('Work schedule must be between 1 and 100 characters'),

    check('profilePicture')
        .notEmpty().withMessage('Profile picture URL is required')
        .isURL().withMessage('Profile picture must be a valid URL'),

    check('dateOfJoining')
        .notEmpty().withMessage('Date of joining is required')
        .isDate().withMessage('Date of joining must be a valid date format (YYYY-MM-DD)')
        .custom(value => {
            const dateOfJoining = new Date(value);
            const today = new Date();
            if (dateOfJoining > today) {
                throw new Error('Date of joining cannot be in the future');
            }
            return true;
        }),

    check('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['Active', 'On Leave', 'Terminated', 'Probation', 'Contract', 'Remote'])
        .withMessage('Status must be one of: Active, On Leave, Terminated, Probation, Contract, Remote')
];

/**
 * Middleware to validate request
 */
const validateEmployeeSettings = [
    ...employeeSettingsValidationRules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    validateEmail,
    validatePhoneNumber,
    validateEmployeeSettings
};