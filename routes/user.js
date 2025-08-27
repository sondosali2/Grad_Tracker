import express from 'express';
import AsyncHandler from '../utils/AsyncHanler.js';
import userModel from '../models/userModel.js';


const Userrouter = express.Router();

Userrouter.get('/', AsyncHandler(async(req, res) => {
      await userModel .find()
      .then((data) => {
          res.json(data);   
      }) 
      .catch((err) => {
          console.log(err);
      });
    }));
    export default Userrouter