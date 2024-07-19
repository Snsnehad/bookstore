import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes//booksRoute.js";
import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
// Option1 : allow all origins with default of cors(*)
app.use(cors());

// Option2: allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT','DELETE'],
//     allowedHeaders: ['Coneten-Type']
//   })
// )

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/books", booksRoute); // this is middleware to handle the request with prefix books the below code is written under the booksroute.js
// // Route for save a new book
// app.post('/books',async(req, res)=>{
//   try {
//     if(
//       !req.body.title||
//       !req.body.author||
//       !req.body.publishYear
//     ){
//       return res.status(400).send({
//         message:'Send all required fields: title, author,publishYear',
//       });
//     }
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       publishYear: req.body.publishYear,
//     };

//     const book = await Book.create(newBook);
//     return res.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message: error.message});
//   }
// })

// // route for get all books from database
// app.get('/books', async(req,res)=>{
//   try {
//     const books = await Book.find({});

//     return res.status(200).json({
//       count: books.length,
//       data: books
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message: error.message});
//   }
// });

// // route for get one book from database by id
// app.get('/books/:id', async(req,res)=>{
//   try {
//     const { id } = req.params;

//     console.log(`Received ID: ${id}`);

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).send({ message: "Invalid book ID" });
//     }

//     const book = await Book.findById(id);

//     if (!book) {
//       console.log("Book not found");
//       return res.status(404).send({ message: "Book not found" });
//     }

//     return res.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message: error.message});
//   }
// });

// // route for update a book
// app.put('/books/:id', async(req, res)=>{
//   try {
//     if(
//       !req.body.title||
//       !req.body.author||
//       !req.body.publishYear
//     ){
//       return res.status(300).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }

//     const {id} = req.params;

//     const result = await Book.findByIdAndUpdate(id, req.body);

//     if(!result){
//       return res.status(404).json({message: 'Book not found'});
//     }
//     return res.status(200).send({message: 'Book updated'})
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message: error.message});
//   }
// })

// // route for delete a book
// app.delete('/books/:id', async(req,res)=>{
//   try {
//     const {id} = req.params;
//     const result = await Book.findByIdAndDelete(id);

//     if(!result){
//       return res.status(404).json({message: 'Book not found' });
//     }
//     return res.status(200).send({message: 'Book deleted succesfully'});
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message: error.message});
//   }
// });


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT,'0.0.0.0', () => {
      console.log(`App is listening to port :${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
