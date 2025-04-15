/**
 * Controller for the Employee Settings API endpoints.
 */

const EmployeeSettings = require('../models/employeeModel');
const { successResponse, errorResponse } = require('../utils/responseUtils');

/**
 * Create or update employee settings.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createEmployeeSettings = (req, res) => {
    try {
        const data = req.body;
        const result = EmployeeSettings.createOrUpdate(data);

        return res.status(201).json(
            successResponse('Employee settings created successfully', result, 201)
        );
    } catch (error) {
        console.error('Error creating employee settings:', error);
        return res.status(500).json(
            errorResponse('Failed to create employee settings', 500)
        );
    }
};

/**
 * Update employee settings.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateEmployeeSettings = (req, res) => {
    try {
        const data = req.body;
        const employeeId = data.employeeId;

        if (!EmployeeSettings.getById(employeeId)) {
            return res.status(404).json(
                errorResponse(`Employee settings with ID ${employeeId} not found`, 404)
            );
        }

        const result = EmployeeSettings.createOrUpdate(data);

        return res.status(200).json(
            successResponse('Employee settings updated successfully', result)
        );
    } catch (error) {
        console.error('Error updating employee settings:', error);
        return res.status(500).json(
            errorResponse('Failed to update employee settings', 500)
        );
    }
};

/**
 * Get all employee settings.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getAllEmployeeSettings = (req, res) => {
    try {
        const allSettings = EmployeeSettings.getAll();

        return res.status(200).json(
            successResponse('Employee settings retrieved successfully', allSettings)
        );
    } catch (error) {
        console.error('Error retrieving all employee settings:', error);
        return res.status(500).json(
            errorResponse('Failed to retrieve employee settings', 500)
        );
    }
};

/**
 * Get employee settings by ID.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getEmployeeSettingsById = (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const settings = EmployeeSettings.getById(employeeId);

        if (!settings) {
            return res.status(404).json(
                errorResponse(`Employee settings with ID ${employeeId} not found`, 404)
            );
        }

        return res.status(200).json(
            successResponse('Employee settings retrieved successfully', settings)
        );
    } catch (error) {
        console.error('Error retrieving employee settings by ID:', error);
        return res.status(500).json(
            errorResponse('Failed to retrieve employee settings', 500)
        );
    }
};

/**
 * Delete employee settings by ID.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const deleteEmployeeSettings = (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const result = EmployeeSettings.delete(employeeId);

        if (!result) {
            return res.status(404).json(
                errorResponse(`Employee settings with ID ${employeeId} not found`, 404)
            );
        }

        return res.status(200).json(
            successResponse('Employee settings deleted successfully')
        );
    } catch (error) {
        console.error('Error deleting employee settings:', error);
        return res.status(500).json(
            errorResponse('Failed to delete employee settings', 500)
        );
    }
};

module.exports = {
    createEmployeeSettings,
    updateEmployeeSettings,
    getAllEmployeeSettings,
    getEmployeeSettingsById,
    deleteEmployeeSettings
};