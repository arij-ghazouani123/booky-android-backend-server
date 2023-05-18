import  express  from "express";
import { body } from "express-validator";
import { findOneEmail, IsActivated, logIn, NewverifyUser, putOnce, register, resetPass, sendmail, UpdatePass, UpdatePassEmail, updateProfile, updateProfileVerififed } from "../controllers/user.controller.js";
import { verifyUser } from "../controllers/user.controller.js";






const router = express.Router();
/**
  * @swagger
  * tags:
  *   name: AUTHENTIFICATION
  *   description: The books managing API
*/


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: User Added Successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       409:
 *         description: User Already Exist!
 */

//router.route('/add').post(addOnce);
 router.route('/register').post(
    body('firstName').isLength({ min: 3}),
    body('lastName').isLength({ min: 3}),
    body('email').isEmail(),
    body('password').isLength({ min: 8}),
    register); 


    
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: LogIn user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success activation code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       404:
 *         description: User Not found
 */
router.route('/login').post(logIn);


/**
 * @swagger
 * /user/verify:
 *   post:
 *     summary: Verify user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success activation code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       404:
 *         description: User Not found
 */
router.route('/verify').post(verifyUser);

/**
 * @swagger
 * /user/newverify:
 *   post:
 *     summary: Verify user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success activation code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       404:
 *         description: User Not found
 */
router.route('/newverify').post(NewverifyUser);


/**
 * @swagger
 * /user/rest:
 *   post:
 *     summary: Reset Password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success new activation code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       404:
 *         description: User Not found
 */
router.route('/reset' ).post(resetPass);


/**
 * @swagger
 * /user/newpass/{id}:
 *   patch:
 *     summary: Update Password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success. Password Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.route('/newpass' ).put(UpdatePass);

router.route('/newpassemail').patch(UpdatePassEmail);

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: Update Profil
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success. Profil Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.route('/update').put(updateProfile);

router.route('/updateVerififed').put(updateProfileVerififed);
router.route('/sendmail').post(sendmail);
router.route('/getuserEmail').post(findOneEmail);



/**
 * @swagger
 * /user/status:
 *   post:
 *     summary: User Status
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Success True
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       404:
 *         description: User Not found
 *       403:
 *          description: False
 */
router.route('/status').post(IsActivated);









export default router;
