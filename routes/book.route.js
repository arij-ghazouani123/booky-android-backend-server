import express from 'express';
import { body } from 'express-validator';

import {getAllBooks, addBook,  putBook,  getBook, deleteBook, getAllBooksByUser, searchBook} from '../controllers/book.controller.js'

import multer from '../middlewares/multer-config.js';


//const app = express();
const router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Posts
  *   description: The books managing API
*/

/**
 * @swagger
 * /book/getAllBooks:
 *   get:
 *     summary: get all books
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

router
    .route('/getAllBooks')
    .get(getAllBooks)


/**
 * @swagger
 * /book/addBook:
 *   post:
 *     summary: add book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Post was added sucessfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

router
.route('/addBook')
    .post(
        body('image'),
        body('title'),
        body('year'),
        body('description'),
        addBook);


/**
 * @swagger
 * /book/updateBook/{id}:
 *   post:
 *     summary: get all books
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Your Post Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: book not found 
 */

 router
   .route('/updateBook/:id')
    
    .post(
            body('title'),
            body('year'),
            body('description'),
            body('offre'),
            putBook)

    
 /**
 * @swagger
 * /book/deleteBook/{id}:
 *   delete:
 *     summary: get all books
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Post Deleted!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: error
 */           


 router
    .route('/deleteBook/:id')
    .delete(deleteBook);
        
 
/**
 * @swagger
 * /book/getAllBooksByUser/{id}:
 *   get:
 *     summary: getAllBooksByUser
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description:  error
 */       
            
router
    .route('/getAllBooksByUser/:id')
    .get(getAllBooksByUser)
        

router
    .route('/searchBook')
    .get(searchBook)
 
    
export default router;



