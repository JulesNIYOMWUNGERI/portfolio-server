const express = require('express');
const AdminAuth = require('../middleware/adminAuth')

const router = express.Router();

const visitorController = require('../controllers/visitorController')

router.post('/signup',visitorController.visitorsignup);

/**
 * @swagger
 * /visitor/signup:
 *  post:
 *      summary: To add visitor in mongoDB
 *      description: This api is used to add visitor in mongoDB
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Visitor'
 *      responses:
 *          200:
 *              description: signup successfully! now login!!!
 */


router.post('/signin',visitorController.visitorsignin);

/**
 * @swagger
 * /visitor/signin:
 *  post:
 *      summary: To login as a visitor
 *      description: This api is used to login as a visitor
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Visitor'
 *      responses:
 *          200:
 *              description: This api is used to login as a visitor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Visitor'
 */


router.get('/getVisitors',AdminAuth,visitorController.getAllVisitors)

router.get('/get/:id',AdminAuth,visitorController.getVisitorById)

router.delete('/delete/:id',AdminAuth,visitorController.deleteVisitor)

/**
 * @swagger
 * /visitor/delete/{id}:
 *  delete:
 *      summary: To delete visitor of specified id from mongoDB
 *      description: This api is used to delete visitor of specified id from mongoDB
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: visitor deleted successfully
 */


module.exports = router;