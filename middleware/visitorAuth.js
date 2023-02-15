const jwt = require('jsonwebtoken');


const VisitorAuth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'portifolioKeyVisitor');

            req.visitorId = decodedData.id; 
        }else{
            decodedData = jwt.decode(token)

            req.visitorId = decodedData.sub
        }

        
        next();
    } catch (error) {
        console.log(error)
    }
}



module.exports = VisitorAuth;