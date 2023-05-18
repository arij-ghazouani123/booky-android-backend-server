import express from "express";
import user from '../modals/user.js'
import bcrypt from 'bcrypt';
import sendConfirmationEmail from "../middlewares/nodemailer.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import multer from "multer";
import nodemailer from "nodemailer";



 

 //activation code

  const listofnumber = "0123456789";
  var activationCode ="";
  for(let i = 0; i<5 ; i++){
     activationCode+= listofnumber[Math.floor(Math.random()*listofnumber.length)];
  }



  export async function sendmail ( req,res){

    async function main() {
   
      return await res.json( sendConfirmationEmail(req.body.email, req.body.activationCode))
  }
  main().catch(console.error);
 

  

}


  //register

export async function register ( req,res){


 
    // Get user input
    const { firstName, lastName, email, password} = req.body;


     // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All inputs are required");
    }


     // check if user already exist
    // Validate if user exist in our database
    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }


    // hashed password
      var hashedPassword = await bcrypt.hash(req.body.password, 10)
     // const token = jwt.sign({userEmail: req.body.userEmail}, process.env.SECRET)


  user.create(

    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      activationCode: req.body.activationCode


    }
  ).then(newUser => {
    sendConfirmationEmail(req.body.email, req.body.activationCode);
        res.status(200).json(newUser
        );
 

  }).catch(err => {
    res.status(500).json({ error: err });
  });

}


// LogIn


export async function logIn(req,res){
    
    // Validate if user exist in our database

   const User =  await user.findOne({email : req.body.email });

  //Token creation
  const token = jwt.sign({User}, 'privateKey', {expiresIn: '10h'})


   if(!User) return res.status(404).send({message:"Invalid Email!"})
  let id = User._id
  let firstName = User.firstName
  let lastName = User.lastName



   const validPass = await bcrypt.compare(req.body.password, User.password)
   if(!validPass) return res.status(400).send({message:"Invalid Password!"})

   const UserStatus = User.verified  
    // Mail Verification
    if (UserStatus == "false"){

      sendConfirmationEmail(req.body.email, User.activationCode);
      return res.status(200).send(User);

    } else {

  } return res.status(200).send(User)     
   
  }
  
  
export async function getOnce(req,res){

    await user
    .findById(req.params.id)
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
}



export function putOnce(req, res)
{
    Game.findOneAndUpdate({id: req.params._id} , {"firstName": req.body.firstName , "lastName" : req.body.lastName}
    ).then(doc =>{
        res.status(200).json(doc);
    }).catch(err=>{
        res.status(500).json({err: error});
    });
}

export async function deleteOnce(req,res){
    await user
    .findByIdAndRemove(req.params.id)
    .then(docs=>{
     res.status(200).json(docs);
    })
    .catch(err=>{
     res.status(500).json({error:err});
    });
}



//verify user


export   function verifyUser(req, res, next)  {
  user.findOne({
    activationCode: req.body.activationCode,
  })
    .then((User) => {
      if (!User) {
      return res.status(404).send({ message: "User Not found." });
      }

      User.verified = "true";
      User.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
      let id = User._id
      let firstName = User.firstName
      let lastName = User.lastName
      let email = User.email
      res.status(200).send({ id, firstName, lastName, email });
    })
    .catch((e) => console.log("error", e));
}


// user activation status

export   function IsActivated(req, res, next)  {
 var User = user.findOne({
    email: req.body.email,})
    
      if (!User) {
        return res.status(404).send({ message: "User Not found." });
      }

      let r = res.send(User.verified)

      if(r == true){
          res.status(200).send({ message: true });

      }
      else{
          res.status(403).send({ message: false });
      }

      next();
    }



    // New verify user

export   function NewverifyUser(req, res)  {
var User = user.findOne({
      activationCode:req.body.activationCode});
    
      if (!User) {
      return res.status(404).send({ message: "User Not found." });
      }
        res.status(200).send({activationCode});
    };
  






 



//  reset Password email

export  function resetPass(req,res){

user.findOne({
    email: req.body.email,
  })
    .then((User) => {
      if (!User) {
      return res.status(404).send({ message: "User Not found." });
      }
      const listofnumber = "0123456789";
      let newCode = "";
      for (let i = 0; i < 5; i++) {
        newCode += listofnumber[Math.floor(Math.random() * listofnumber.length)];
      }


      User.activationCode = newCode;
      sendConfirmationEmail (req.body.email,newCode);
      User.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
      res.status(200).send( {newCode}  );
    })
    .catch((e) => console.log("error", e));
    
  
}



 

  // Update User Password*

  export async function UpdatePass(req,res){
      
    let hashedPass = await bcrypt.hash(req.body.password, 10)


    user.findByIdAndUpdate((req.body.id).trim(),{"password": hashedPass}, {new: true}) .then((note) => {
res.json(note)
     
    })
  }


// Update User with Email


export async function UpdatePassEmail(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const u = await user.findOne({ email });

    if (!u) {
      return res.status(404).send('User not found');
    }

    await user.updateOne({ email }, { password: hashedPass });

    return res.status(200).send('Password Updated');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}



  export async function patchOnce(req, res) {

    await user
        //findByIdAndUpdate si vous voulez modifier un document à l’aide de son ID.
        .findByIdAndUpdate(req.params.id, req.body)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

}



// UPDATE Profile

export async function updateProfile(req, res) {
  const { _id ,firstName, lastName } = req.body

  let User = await user.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        firstName,
        lastName,
      },
    }, {new: true}).then(user=>{
      return res.send( user )
    })

}


export async function updateProfileVerififed(req, res) {
  const { _id , verified } = req.body

  let User = await user.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        verified,
        
      },
    }, {new: true}).then(user=>{
      return res.send( user )
    })


}



    

export async function findOneEmail(req, res) {
    
  user.find({email: req.body.email})
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.Email
          });            
      }
      res.send(note);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.Email
          });                
      }
      return res.status(500).send({
          message: "Error retrieving note with id " + req.params.Email
      });
  });
};

  


    






