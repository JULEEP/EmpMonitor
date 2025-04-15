const successResponse = (message, data = null, statusCode = 200) => {
    return {
        success: true,
        message: message,
        data: data,
        statusCode:statusCode
    }
}
const errorResponse = (message, statusCode = 400) => {
    return {
        success: false,
        message: message,
        data: null,
        statusCode:statusCode
    }
}

module.exports = {
    successResponse,
    errorResponse
}