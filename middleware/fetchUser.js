const jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";

const fetchuser = (req , res , next) => {
    // Get The User From The JWT Token From The Header Of Our Request
    const token = req.header('auth-token');

    // If The Token Is Not Found We Will Send Error
    if(!token){
        res.status(401).send({error: "Please Authenticate Using Valid Token"})
    }

    // Else We Will Verify Using The JWT Secret and Send The User Details TO The Req
    try {
        const data = jwt.verify(token , JWT_SECRET)

        req.user = data.user;
    
        // This Next Function Will Run The Next Function In The Argument List Where We Pass This Middleware
        next();
        
    }catch (error) {
        res.status(401).send({error: "Please Authenticate Using Valid Token"})
    }

}

module.exports = fetchuser;