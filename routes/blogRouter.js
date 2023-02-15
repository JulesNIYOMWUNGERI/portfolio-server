const express = require('express');
const VisitorAuth = require('../middleware/visitorAuth')
const AdminAuth = require('../middleware/adminAuth')

const router = express.Router();


const blogControllers = require('../controllers/blogControllers')


/**
 * @swagger
 * /api/welcome:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      description: This api is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test get method
 */

router.get('/getall',blogControllers.getAllBlogs);


/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          Blog:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  title:
 *                      type: string
 *                  desc:
 *                      type: string
 *                  img:
 *                      type: string
 *                  likes:
 *                      type: array
 *                      items:
 *                          integer:
 *                              type: integer
 *                  createdAt:
 *                      type: integer
 *          Admin:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  fullname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  comfirmPassword:
 *                      type: string
 *                  img:
 *                      type: string
 *          Visitor:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  fullname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  comfirmPassword:
 *                      type: string
 *          Comment:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  creatorId:
 *                      type: string
 *                  blogId:
 *                      type: string
 *                  commentValue:
 *                      type: string
 *                  createdAt:
 *                      type: integer
 *                  updatedAt:
 *                      type: integer
 *                  
 */



/**
 * @swagger
 * /blogs/getall:
 *  get:
 *      summary: To get all blogs from mongoDB
 *      description: This api is used to fetch all blog data from mongoDB
 *      responses:
 *          200:
 *              description: This api is used to fetch all blog data from mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Blog'
 */

router.get('/get/:id',blogControllers.getBlogById);

/**
 * @swagger
 * /blogs/get/{id}:
 *  get:
 *      summary: To get blog of specified id from mongoDB
 *      description: This api is used to fetch blog data of specified id from mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *      responses:
 *          200:
 *              description: This api is used to fetch blog data of specified id from mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Blog'
 */


router.post('/add',AdminAuth,blogControllers.addBlog);


/**
 * @swagger
 * /blogs/add:
 *  post:
 *      summary: To add blog in mongoDB
 *      description: This api is used to add blog in mongoDB
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Blog'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              description: This api is used to add blog in mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Blog'
 */


router.post('/like/:id',VisitorAuth,blogControllers.blogLiking);

/**
 * @swagger
 * /blogs/like/{id}:
 *  post:
 *      summary: To add like on blog of specified id in mongoDB
 *      description: This api is used to add like on blog of specified id in mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: AlphaNumeric ID required
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Blog has been liked!
 */


router.patch('/update/:id',AdminAuth,blogControllers.updateBlog);

/**
 * @swagger
 * /blogs/update/{id}:
 *  patch:
 *      summary: To update blog of specified id in mongoDB
 *      description: This api is used to update blog data of specified id in mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: AlphaNumeric ID required
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Blog'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: This api is used to update blog data of specified id in mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Blog'
 */

router.delete('/delete/:id',AdminAuth,blogControllers.deleteBlog);

/**
 * @swagger
 * /blogs/delete/{id}:
 *  delete:
 *      summary: To delete blog of specified id from mongoDB
 *      description: This api is used to delete blog of specified id from mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: blog deleted successfully
 */


module.exports = router;