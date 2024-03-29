import express from 'express';
import usersData from './../../db/users.json' assert { type: 'json' };
import route from './route.json' assert { type: 'json' };
import fs from 'fs';
import {
  isAvatarValid,
  isEmailValid,
  isMobileValid,
  isNameValid,
} from '../../utils/validator.js';
import ApiError from '../../utils/ApiError.js';

const usersRouter = express.Router();

usersRouter
  .route(route.ROOT)
  .get((req, res) => {
    res.json(usersData);
  })
  .post((req, res) => {
    const { first_name, last_name, email, mobile, avatar } = req.body;
    if (
      first_name &&
      isNameValid(first_name) &&
      last_name &&
      isNameValid(last_name) &&
      email &&
      isEmailValid(email) &&
      mobile &&
      isMobileValid(mobile) &&
      avatar &&
      isAvatarValid(avatar)
    ) {
      const id = usersData[usersData.length - 1].id + 1;
      const newUser = { id, first_name, last_name, email, mobile, avatar };
      usersData.push(newUser);
      fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
        if (err) {
          console.log('Error:', `error in post method - ${err}`);
          return res
            .status(500)
            .json(new ApiError('File operation failed', 500));
        }
        res.status(201).json(newUser);
      });
    } else {
      res
        .status(404)
        .json(new ApiError('Data missing or validation failed', 404));
    }
  });

usersRouter
  .route(`/:userId`)
  .get((req, res) => {
    const userId = +req.params.userId;
    const userData = usersData.find((ele) => ele.id === userId);
    res.json(userData);
  })
  .delete((req, res) => {
    const userId = +req.params.userId;
    const userIndex = usersData.findIndex((ele) => ele.id === userId);
    if (userIndex >= 0) {
      usersData.splice(userIndex, 1);
      fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
        if (err) {
          console.log('Error:', `error in delete method - ${err}`);
          return res
            .status(500)
            .json(new ApiError('File operation failed', 500));
        }
        res.status(204).json({ message: 'user deleted successfully' });
      });
    } else {
      res.json(new ApiError('Data missing or validation failed', 400));
    }
  })
  .put((req, res) => {
    const { first_name, last_name, email, mobile, avatar } = req.body;
    const userId = +req.params.userId;

    const modifyUserData = {};
    if (first_name && isNameValid(first_name))
      modifyUserData.first_name = first_name;
    if (last_name && isNameValid(last_name))
      modifyUserData.last_name = last_name;
    if (email && isEmailValid(email)) modifyUserData.email = email;
    if (mobile && isMobileValid(mobile)) modifyUserData.mobile = mobile;
    if (avatar && isAvatarValid(avatar)) modifyUserData.avatar = avatar;

    const userIndex = usersData.findIndex((ele) => ele.id === userId);

    if (userIndex >= 0 && Object.keys(modifyUserData).length > 0) {
      const updateUserData = { ...usersData[userIndex], ...modifyUserData };
      usersData[userIndex] = updateUserData;

      fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
        if (err) {
          console.log('Error:', `error in put method - ${err}`);
          return res
            .status(500)
            .json(new ApiError('File operation failed', 500));
        }
        res.status(201).json(updateUserData);
      });
    } else {
      res
        .status(404)
        .json(new ApiError('Data missing or validation failed', 400));
    }
  });

export default usersRouter;
