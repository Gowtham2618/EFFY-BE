
class Responses {
    success(req, res, status, data = {}, message = 'success') {
        return res.status(status).json({ status: status, data: data, message: message });
    }
    error(req, res, status, data = {}, message = 'something went wrong !') {
        return res.status(status).json({ status: status, data: data, message: message });
    }
}

const responses = new Responses;
module.exports = responses;