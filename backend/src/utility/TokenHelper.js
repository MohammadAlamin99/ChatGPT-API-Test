const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, user_id) => {
    return jwt.sign({ email: email, id: user_id }, "abc123", { expiresIn: '6h' });
}

exports.DecodeToken = (token) => {
    try {
        return jwt.verify(token, 'abc123');
    }
    catch (err) {
        console.log(err)
        return null;
    }
}