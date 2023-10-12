// server/utils/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');
const { GraphQLError } = require('graphql');

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRES;

 const generateAccessToken = (userId) => {
  const payload = {
    sub: userId,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES || 3600),
  });
};

const hashPassword = async (password, salt = 10) => {
  return await bcrypt.hash(password, salt);
};

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

const authMiddleware = async({ req }) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (err) {
    console.error(err);
    console.log('Invalid token');
  }

  return req;
};

const signToken = async({ email, username, _id }) => {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};


module.exports = {
  authMiddleware,
  signToken,
  generateAccessToken,
  hashPassword,
  verifyToken,
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',}})
};
