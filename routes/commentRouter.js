const express = require('express');
const VisitorAuth = require('../middleware/visitorAuth');
const AdminAuth = require('../middleware/adminAuth')

const router = express.Router();

const commentController = require('../controllers/commentController')

router.post('/add/:id',VisitorAuth,commentController.addComment);

/**
 * @swagger
 * /comment/add/{id}:
 *  post:
 *      summary: To add comment in mongoDB
 *      description: This api is used to add comment data in mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: AlphaNumeric ID required
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Comment'
 *      responses:
 *          200:
 *              description: This api is used to add comment data in mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Comment'
 */


router.get('/get/:id',commentController.getCommentsOfSpecificBlog);

/**
 * @swagger
 * /comment/get/{id}:
 *  get:
 *      summary: To get comment of specified blog id from mongoDB
 *      description: This api is used to fetch comment data of specified blog id from mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *      responses:
 *          200:
 *              description: This api is used to fetch comment data of specified blog id from mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Comment'
 */


router.get('/getall',AdminAuth,commentController.getAllComments);

/**
 * @swagger
 * /comment/getall:
 *  get:
 *      summary: To get all comments from mongoDB
 *      description: This api is used to fetch all comments data from mongoDB
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: This api is used to fetch all comments data from mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Comment'
 */


router.delete('/delete/:id',AdminAuth,commentController.deleteComment);

/**
 * @swagger
 * /comment/delete/{id}:
 *  delete:
 *      summary: To delete comment of specified id from mongoDB
 *      description: This api is used to delete comment of specified id from mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: comment deleted successfully
 */

module.exports = router;