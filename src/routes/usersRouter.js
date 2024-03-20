import express from 'express';
import usersData from './../../db/users.json' assert { type: 'json' };
import route from './route.json' assert { type: 'json' };
import fs from 'fs';

const usersRouter = express.Router();

usersRouter.get(route.USERS, (req, res) => {
  res.json(usersData);
});

usersRouter.get(`${route.USERS}/:userId`, (req, res) => {
  const userId = +req.params.userId;
  const userData = usersData.find((ele) => ele.id === userId);
  res.json(userData);
});

usersRouter.delete(`${route.USERS}/:userId`, (req, res) => {
  const userId = +req.params.userId;
  const userIndex = usersData.findIndex((ele) => ele.id === userId);
  if (userIndex >= 0) {
    usersData.splice(userIndex, 1);
    fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        console.log('Error:', `error in delete method - ${err}`);
      }
      res.status(204).json({ message: 'user deleted successfully' });
    });
  } else {
    res.json({ error: true });
  }
});

usersRouter.post(route.USERS, (req, res) => {
  const { first_name, last_name, email, mobile, avatar } = req.body;
  if (first_name && last_name && email && mobile && avatar) {
    const id = usersData[usersData.length - 1].id + 1;
    const newUser = { id, first_name, last_name, email, mobile, avatar };
    usersData.push(newUser);
    fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        console.log('Error:', `error in post method - ${err}`);
      }
      res.status(201).json(newUser);
    });
  } else {
    res
      .status(404)
      .json({ message: 'error while creating user, provide required fields' });
  }
});

usersRouter.put(`${route.USERS}/:userId`, (req, res) => {
  const { first_name, last_name, email, mobile, avatar } = req.body;
  const userId = +req.params.userId;

  const modifyUserData = {};
  if (first_name) modifyUserData.first_name = first_name;
  if (last_name) modifyUserData.last_name = last_name;
  if (email) modifyUserData.email = email;
  if (mobile) modifyUserData.mobile = mobile;
  if (avatar) modifyUserData.avatar = avatar;

  const userIndex = usersData.findIndex((ele) => ele.id === userId);

  if (userIndex >= 0 && Object.keys(modifyUserData).length > 0) {
    const updateUserData = { ...usersData[userIndex], ...modifyUserData };
    usersData[userIndex] = updateUserData;

    fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        console.log('Error:', `error in put method - ${err}`);
      }
      res.status(201).json(updateUserData);
    });
  } else {
    res
      .status(404)
      .json({ message: 'error while updating user, provide required fields' });
  }
});

export default usersRouter;
