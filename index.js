const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const BlogRouter = require('./routes/blogRouter.js')
const AdminRouter = require('./routes/adminRouter.js')
const VisitorRouter = require('./routes/visitorRouter.js')
const CommentRouter = require('./routes/commentRouter.js')


const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"portfolio API",
            version:"1.0.0",
            description:"express portfolio API"
        },
        servers:[
            {
                url:"http://localhost:5000"
            }
        ],
    },
    apis: ["./routes/*.js"]
}


const specs = swaggerJsDoc(options)

const app = express();

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))



dotenv.config();

app.use(cors());

app.use(express.json())



app.get('/api/welcome',(req,res) => {
    res.status(200).send({message:"welcome to the mocha and chai test API"});
});


app.use('/blogs',BlogRouter)
app.use('/admin',AdminRouter)
app.use('/visitor',VisitorRouter)
app.use('/comment',CommentRouter)


const PORT = process.env.PORT 


mongoose.connect(process.env.MONGODB_URL)
.then(()=>app.listen(PORT, () => console.log(`server is running on port:http://localhost:${PORT}`)))
.catch((error)=>console.log(`${error} did not connect`))


module.exports = app;



















//u2ZI81uoVxa4QuoG