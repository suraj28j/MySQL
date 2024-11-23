const jwt = require('jsonwebtoken');

// Token based verification
const authentication = async (req, res, next) => {
    // To get auth token from headers
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer")) {
        return res.status(401).json({ success: false, message: "Autherization denied" })
    }
    try {
        const token = authToken.split(" ")[1];

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);
        req.email = decoded.email;
        req.role = decoded.role;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token Expired" })
        }
        res.status(401).json({ success: false, message: "Invalid token, Please login again" })
    }
}

module.exports = {authentication}