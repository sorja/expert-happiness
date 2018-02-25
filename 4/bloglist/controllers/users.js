const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const body = requesy.body;
  if (!body.adult) {
    body.adult = true;
  }

  if (body.password.length < 3)
    return response
      .status(400)
      .json({ error: "Error. password needs to be at least 3 characters" });
  if (body.password.length < 3)
    return response
      .status(400)
      .json({ error: "Error. password needs to be at least 3 characters" });

  try {
    const existingUser = await User.find({ username: body.username });
    if (existingUser) {
      return response.status(400).json({
        error: "Username exists in database. Choose another username or login"
      });
    }
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    adult,
    passwordHash
  });
  const _user = await user.save();

  response.json(_user);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    likes: 1,
    url: 1
  });
  response.json(users.map(User.format));
});

module.exports = usersRouter;
