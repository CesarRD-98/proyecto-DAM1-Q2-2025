const success = (res, message, data = null) => {
    res.status(200).json({success: true, message, data})
}

const error = (res, tempStatus = 500, message) => {
    res.status(tempStatus).json({success: false, message})
}

module.exports = { success, error }