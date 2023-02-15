const express = require('express');
const AdminAuth = require('../middleware/adminAuth')

const router = express.Router();


const adminController = require('../controllers/adminController')


/**
 * @swagger
 * /admin/signup:
 *  post:
 *      summary: To add admin in mongoDB
 *      description: This api is used to add admin in mongoDB
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Admin'
 *      responses:
 *          200:
 *              description: signup successfully! now login!!!
 */


router.post('/signup',adminController.signUp);

/**
 * @swagger
 * /admin/signin:
 *  post:
 *      summary: To login as an admin
 *      description: This api is used to login as an admin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Admin'
 *      responses:
 *          200:
 *              description: This api is used to login as an admin
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Admin'
 */


router.post('/signin',adminController.signIn);

/**
 * @swagger
 * /admin/update/{id}:
 *  put:
 *      summary: To update Admin in mongoDB
 *      description: This api is used to update admin data in mongoDB
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
 *                      $ref: '#components/schemas/Admin'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: This api is used to update admin data in mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Admin'
 */


router.put('/update/:id',AdminAuth,adminController.updateAdmin);




module.exports = router;