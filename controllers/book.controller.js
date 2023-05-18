import express, { query, Router } from 'express';

import { validationResult } from 'express-validator';

import book from '../modals/book.js';
import User from '../modals/user.js';

//add 
export function addBook(req, res){
  book
 .create({
   userId:req.body.userId,
   title: req.body.title,
   year: req.body.year,
   description: req.body.description,
   offre: req.body.offre,
   //recuperer l URL de image pour inserer dans la DB
    image: req.body.image
    })
   // .save()
    .then(newBook => {
        res.status(200).json(newBook);
            
    })
    
    .catch(err => {
        res.status(500).json({ error: err});
    });
   }

//update
export async function putBook(req, res) {
  const bookId = req.params.id;
  const updatedBook = {
    userId: req.body.userId,
    title: req.body.title,
    year: req.body.year,
    description: req.body.description,
    offre: req.body.offre,
    image: req.body.image
  };

  if (req.file) {
    updatedBook.image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
  }

  try {
    const Book = await book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    if (!Book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(Book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
} 



// Delete Post
export function deleteBook (req, res, next) {
book.deleteOne({_id: req.params.id}).then(
  (book) => {
    res.status(200).json(book);
  }
).catch(
  (error) => {
    res.status(400).json({
      error: error
    });
  }
);
};

/*
export async function deleteBook(req, res) {
try{
    let checkIfUserExists = await book.findById(req.params.id);
    if(!checkIfUserExists) throw new Error();
    const Book = await book
        .findByIdAndRemove(req.params.id)
    res.status(200).json({"message": Book});
}catch(err){
    res.status(404).json({message: "post not found"});
}

}
*/


export function getAllBooks(req, res) {
  book.find().populate('userId')
  .then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
}

/*export function getAllBooks(req, res){
 book
.find({})
.then(books => {
     res.status(200).json(books);
})
.catch(err => {
     res.status(500).json({ error: err});
});
}*/


//Search by title
export function getBook(req, res){
 book
.findOne({ "title": req.params.title })
.then(book => {
     res.status(200).json(book);
})
.catch(err => {
     res.status(500).json({ error: err});
});
}




/// post by user 
export function getAllBooksByUser(req, res){
  const loggedInUserId = req.headers['user-id'];
  if (!loggedInUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
  }
  book
  .find({ "userId": loggedInUserId })
  .then(books => {
       res.status(200).json(books);
  })
  .catch(err => {
       res.status(500).json({ error: err});
  });
}



    //dynamic search
    export async function searchBook(req, res) {
      const { value } = req.query;
    
      try {
        const result = await book.find({
          $or: [
            { title: { $regex: value, $options: 'i' } },
            { year: { $eq: Number(value) ? +value : 0 } },
            { description: { $regex: value, $options: 'i' } },
            { offre: { $regex: value, $options: 'i' } },
          ],
        });
        res.status(200).json({ resultis: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    }




/*export function getAllBooksByUser(req, res){
     book
    .find({ "userId": req.params.id })
    .then(books => {
         res.status(200).json(books);
    })
    .catch(err => {
         res.status(500).json({ error: err});
    });
    }*/

////
/*export function getAllBooksByUser(req, res){
  const loggedInUserId = req.userId; // assuming you have the logged-in user ID in the request object
  book
  .find({ "userId": loggedInUserId })
  .then(books => {
       res.status(200).json(books);
  })
  .catch(err => {
       res.status(500).json({ error: err});
  });
}*/


////////// 
/*
export function getAllBooksByUser(req, res) {
  const userId = req.params.id;
  const authToken = req.headers.authorization;

  // Verify the user's authentication status
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Find the user in the database based on their ID
  user.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the user's authentication token matches their ID
      if (authToken !== user.authToken) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Find all books associated with the user ID
      book.find({ "userId": userId })
        .then(books => {
          res.status(200).json(books);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
*/




