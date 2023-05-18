import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js';
import chatRouter from './routes/chat.route.js';
import multer from 'multer';
import path from 'path';
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import client from'./modals/user.js'
import book from'./modals/book.js'

// swagger
const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "BOOKY API",
          version: "1.0.0",
          description: "A simple Express  API",
      },
      servers: [
          {
              url: "http://localhost:9090",
          },
      ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);


const app = express();
const port = process.env.port || 9090;
const databaseName ='test';

mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://booky:nbvcxw123@cluster0.ujh1rk9.mongodb.net/${databaseName}`).then(() => {
    console.log(`connected to ${databaseName}`);
} ).catch(er => console.log(er));




app.use(morgan("dev"))  //morgan

app.use(express.json());
app.use(express.urlencoded({encoded : true}));


app.use('/user',userRouter);
app.use('/book',bookRouter);
app.use("/chat", chatRouter)



app.use('/img', express.static('public/images'));

// multer Configuration

const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb( null , './public/images')
  },
  filename:  (req, file ,cb) => {
        
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({storage: storage})

//upload image

app.post("/user/profileimage/:id", upload.single('upload'), (req,res) => {
  client.findById(req.params.id)
  .then(client => {        
     
    client.profilPic = req.file.path

    client.save()
      .then(() => res.send(client))
      .catch(err => res.status(400).json('Error: ' + err));
      
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

app.post("/book/profileimage/:id", upload.single('upload'), (req,res) => {
  book.findById(req.params.id)
  .then(client => {        
     
    client.image = req.file.path

    client.save()
      .then(() => res.send(client))
      .catch(err => res.status(400).json('Error: ' + err));
      
  })
  .catch(err => res.status(400).json('Error: ' + err));
})




//swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));




app.listen(port, () => {
    console.log(`Server running at http://hostname:${port}/`);
})




