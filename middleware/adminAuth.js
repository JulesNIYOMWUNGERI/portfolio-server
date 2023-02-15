const jwt = require('jsonwebtoken');


const AdminAuth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'portifolioKey');

            req.userId = decodedData.id; 
        }else{
            decodedData = jwt.decode(token)

            req.userId = decodedData.sub
        }


        next();
    } catch (error) {
        console.log(error)
    }
}



module.exports = AdminAuth;