// Babel ES6/JSX Compiler
require('babel-register')

// Import external modules
const async = require('async');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const express = require('express');
const fs = require('fs-extra');
const favicon = require('serve-favicon');
const http = require('http');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const mongoose = require('mongoose');
const moment = require('moment');
const nodemailer = require('nodemailer');
const path = require('path');
const request = require('request');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const swig  = require('swig');
const _ = require('underscore');

// Import internal setting
const config = require('./config');
const routes = require('./app/routes');

// Import models
const Account = require('./models/account');
const Counter = require('./models/counter');
const Dating = require('./models/dating');
const Notification = require('./models/notification');
const Owner = require('./models/owner');
const Party = require('./models/party');
const Pet = require('./models/pet');
const PetComments = require('./models/petComments');
const Ticket = require('./models/ticket');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Gmail Here',
        pass: 'Password Here'
    }
});

mongoose.connect(config.database, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('tokenSecret', config.secret);
app.use(compression());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb'}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables
const allowedDataType = {jpg: 1, jpeg: 1, JPG: 1, JPEG: 1, png: 1, PNG: 1};

// Global Function
var sha512 = function(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')
            .slice(0,length);
};
var calculateAge = function(birthday) {
  let thisYear = moment(new Date().getTime()).format("YYYY");
  let age = thisYear - moment(parseInt(birthday)).format("YYYY");
  return age;
};
var counter = function(counterId) {
  return Counter
          .findOneAndUpdate({id: counterId}, { $inc: { counter: 1 }})
          .select({ _id: 0, counter: 1});
}
var uploadImage = async function(dataURI, id, type) {
  let res;
  let regExMatches = dataURI.match('data:image/(.*);base64,(.*)');
  let imageDecoded = {
    imageType: regExMatches[1],
    dataBase64: regExMatches[2],
    dataBuffer: new Buffer(regExMatches[2], 'base64')
  };
  if (!(imageDecoded.imageType in allowedDataType)) return 'Only accepted jpg and png format.';
  if (imageDecoded.dataBuffer.length > 300000) return 'Image size should below 300KB';
  switch (type) {
    case 'owner':
      res = await Owner
                        .findOneAndUpdate({petOwnerId: id}, {iconImage: dataURI});
      if (res) return 'SUCCESS';
      return 'ERROR';
      break;
    case 'pet':
      res = await Pet
                        .findOneAndUpdate({petId: id}, {iconImage: dataURI});
      if (res) return 'SUCCESS';
      return 'ERROR';
      break;
  }
}

/*
 * GET /api/owner/following/:offset/:limit
 * Find owner's following.
 */
app.get('/api/owner/following/:offset/:limit', function(req, res, next) {
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({message: "Failed to authenticate token."});
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return next(err);
    Pet
      .find({"followers.petOwnerId": decoded.petOwnerId})
      .select({_id: 0})
      .exec(function(err, pets) {
        if (err) return next(err);
        let total = pets.length;
        results = pets.slice(offset, offset + qty);
        let result = results.map(pet => {
          let tmpPet = pet.toObject();
          tmpPet.age = calculateAge(pet.birthday);
          return tmpPet;
        });
        return res.status(200).json({result, total: total});
      });
  });
});

/*
 * GET /api/pets/dating/:offset/:limit
 * Find pets' dating.
 */
app.get('/api/pets/dating/:offset/:limit', function(req, res, next) {
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let token = req.cookies['token'], result = [];
  if (!token) return res.status(409).send({message: "Failed to authenticate token."});
  jwt.verify(token, app.get('tokenSecret'), async (err, decoded) => {
    if (err) return next(err);
    let datings = await Dating
                        .find({$or: [{targetPetOwnerId: decoded.petOwnerId}, {petOwnerId: decoded.petOwnerId}]})
                        .select({_id: 0})
                        .sort({date: -1});
    let total = datings.length;
    results = datings.slice(offset, offset + qty);
    for (var i = 0; i < results.length; i++) {
      let tempResult = results[i].toObject();
      tempResult.date = moment(parseInt(results[i].date)).format("DD MMM YYYY");
      let petName = await Pet.findOne({petId: results[i].petId}).select({_id: 0, name: 1});
      tempResult.petName = petName.name;
      result.push(tempResult);
    }
    return res.status(200).json({result, total: total});
  });
});

/*
 * GET /api/pet/:petId
 * Returns pet information detail.
 */
app.get('/api/pet/:petId', function(req, res, next) {
  let id = parseInt(req.params.petId), token = req.cookies['token'];
  let isFollowed = false, owned = false, havePet = false;

  Pet.findOne({ petId: id, status: {$ne: -1}}, { _id: 0}, function(err, pet) {
    if (err) return next(err);
    if (!pet) return res.status(404).json({message: 'Pet not found'});
    let petInfo = pet.toObject();
    petInfo.birthday = moment(parseInt(pet.birthday)).format("YYYY-MM-DD");
    if (!token) return res.status(200).json({petInfo, owned: owned, havePet: havePet});
    jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
      if (err) return next(err);
      if (decoded.petId) havePet = true;
      if (pet.petOwnerId == decoded.petOwnerId) {
        owned = true;
      } else {
        for (let i = 0; i < pet.followers.length; i++) {
          if (pet.followers[i].petOwnerId == decoded.petOwnerId) {
            isFollowed = true;
            break;
          }
        }
      }
      return res.status(200).json({petInfo, owned: owned, isFollowed: isFollowed, havePet: havePet});
    });
  });
});

/*
 * GET /api/owner/:petOwnerId
 * Returns owner information detail.
 */
app.get('/api/owner/:petOwnerId', function(req, res, next) {
  var id = parseInt(req.params.petOwnerId), token = req.cookies['token'];

  Owner.findOne({ petOwnerId: id, status: {$ne: -1}}, { _id: 0}, function(err, owner) {
    if (err) return next(err);
    if (!err && !owner) return res.status(404).send({message: "Owner Not Found"});
    let ownerInfo = owner.toObject();
    ownerInfo.memberSince = moment(owner.memberSince).format("ddd, DD MMM YYYY HH:mm:ss [GMT]Z");
    ownerInfo.birthday = moment(owner.birthday).format("YYYY-MM-DD");
    if (!token) return res.status(200).send({ownerInfo, owned: false});
    jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
      if (err) return next(err);
      id == decoded.petOwnerId ? owner.owned = true : owner.owned = false;
      return res.status(200).send({ownerInfo, owned: owner.owned});
    });
  });
});

/*
 * GET /api/pet/:petId/comments/:offset/:limit
 * Returns all pet comments.
 */
app.get('/api/pet/:petId/comments/:offset/:limit', function(req, res, next) {
  let id = parseInt(req.params.petId);
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let results = [];

  PetComments
    .find({ petId: id })
    .select({ _id: 0 })
    .sort('-time')
    .exec(function(err, comments) {
      if (err) return res.status(500).send({message: 'Error Occurred'});
      let total = comments.length;
      result = comments.slice(offset, offset + qty);
      for (let i = 0; i < result.length; i++) {
        let tempComment = result[i].toObject();
        tempComment.time = moment(parseInt(result[i].time)).format("ddd, DD MMM YYYY HH:mm:ss");
        results.push(tempComment);
      }
      return res.status(200).send({results, total: total});
    });
});

/*
 * GET /api/owner/mypets/:offset/:limit
 * Returns the owner's pets.
 */
app.get('/api/owner/mypets/:offset/:limit', function(req, res, next) {
  let id = parseInt(req.params.petId);
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let results = [], token = req.cookies['token'];
  if (!token) return res.status(401).send({message: "UNAUTHORIZED"});

  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return next(err);
    Pet
      .find({ petOwnerId: decoded.petOwnerId })
      .select({ _id: 0})
      .sort('name')
      .exec(function(err, pets) {
        if (err) return next(err);
        let total = pets.length;
        result = pets.slice(offset, offset + qty);
        var results = result.map(pet => {
          let tmpPet = pet.toObject();
          tmpPet.age = calculateAge(pet.birthday);
          return tmpPet;
        });
        return res.status(200).send({results, total: total});
      });
  });
});

/*
 * GET /api/owner/:petOwnerId/pets/:offset/:limit
 * Returns the owner's pets.
 */
app.get('/api/owner/:petOwnerId/pets/:offset/:limit', function(req, res, next) {
  let id = parseInt(req.params.petId);
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let results = [];
  Pet
    .find({ petOwnerId: req.params.petOwnerId })
    .select({ _id: 0})
    .sort('name')
    .exec(function(err, pets) {
      if (err) return next(err);
      let total = pets.length;
      result = pets.slice(offset, offset + qty);
      var results = result.map(pet => {
        let tmpPet = pet.toObject();
        tmpPet.age = calculateAge(pet.birthday);
        return tmpPet;
      });
      return res.status(200).send({results, total: total});
    });
});


/*
 * GET /api/pet/:petId/attended/:offset/:limit
 * Returns the pet attended parties.
 */
app.get('/api/pet/:petId/attended/:offset/:limit', function(req, res, next) {
  let id = parseInt(req.params.petId);
  let qty = parseInt(req.params.limit);
  let offset = parseInt(req.params.offset) * qty;
  let results = [];

  Party
    .find({ attendant: { $elemMatch: {petId: id}} })
    .select({ _id: 0 })
    .sort('-start')
    .exec(function(err, parties) {
      if (err) return next(err);
      let total = parties.length;
      result = parties.slice(offset, offset + qty);
      for (let i = 0; i < result.length; i++) {
        let tempParty = result[i].toObject();
        tempParty.start = moment(parseInt(result[i].start)).format("ddd, DD MMM YYYY HH:mm:ss");
        tempParty.end = moment(parseInt(result[i].end)).format("ddd, DD MMM YYYY HH:mm:ss");
        results.push(tempParty);
      }
      return res.status(200).send({results, total: total});
    });
});

/*
 * GET /api/party/:partyId/attendants/:offset/:limit
 * Returns the party attendants.
 */
app.get('/api/party/:partyId/attendants/:offset/:limit', async function(req, res, next) {
  let partyId = parseInt(req.params.partyId);
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let attendants = [];

  let pets = await Party
                    .findOne({ partyId: partyId })
                    .select({ _id: 0, attendant: 1});
  let total = pets.attendant.length;
  if (total) {
    results = pets.attendant.slice(offset, offset + qty);
    attendants = await Pet
                        .find({$or: results})
                        .select({_id: 0});
  }
  return res.status(200).send({attendants, total: total});
});

/*
 * GET /api/pets/new
 * Return newest pets.
 */
app.get('/api/pets/new', function(req, res, next) {
  let results = [];
  Pet
    .find({status: {$ne: -1}})
    .select({ _id: 0})
    .sort('-createTime')
    .limit(3)
    .exec(function(err, pets) {
      if (err) return next(err);
      for (let i = 0; i < pets.length; i++) {
        let tempPet = pets[i].toObject();
        tempPet.age = calculateAge(pets[i].birthday);
        results.push(tempPet);
      }
      return res.status(200).send(results);
    });
});

/*
 * GET /api/pets/:offset/:limit
 * Return all pets.
 */
app.get('/api/pets/:offset/:limit', function(req, res, next) {
  let qty = parseInt(req.params.limit);
  let offset = parseInt(req.params.offset) * qty;

  Pet
    .find({ status: 1 })
    .select({ _id: 0})
    .sort('name')
    .exec(function(err, pets) {
      if (err) return next(err);
      let total = pets.length;
      result = pets.slice(offset, offset + qty);
      var results = result.map(pet => {
        let tmpPet = pet.toObject();
        tmpPet.age = calculateAge(pet.birthday);
        return tmpPet;
      });
      return res.status(200).send({results, total: total});
    });
});

/*
 * GET /api/pets/stars/:offset/:limit
 * Return all stars.
 */
app.get('/api/pets/stars/:offset/:limit', function(req, res, next) {
  let qty = parseInt(req.params.limit);
  let offset = parseInt(req.params.offset) * qty;
  if(offset >= 30 || qty > 30) return res.status(400).send({message: "Not allowed action"});

  Pet
    .find()
    .select({ _id: 0})
    .sort({followerNum: -1})
    .exec(function(err, pets) {
      if (err) return next(err);
      let total = pets.length;
      result = pets.slice(offset, offset + qty);
      var results = result.map(pet => {
        let tmpPet = pet.toObject();
        tmpPet.age = calculateAge(pet.birthday);
        return tmpPet;
      });
      return res.status(200).send({results, total: total});
    });
});

/*
 * GET /api/parties/:offset/:limit
 * Return all parties.
 */
app.get('/api/parties/:offset/:limit', function(req, res, next) {
  let qty = parseInt(req.params.limit);
  let offset = parseInt(req.params.offset) * qty;
  let results = [];

  Party
    .find()
    .select({ _id: 0})
    .sort('-startTime')
    .exec(function(err, parties) {
      if (err) return next(err);
      let total = parties.length;
      result = parties.slice(offset, offset + qty);
      for(let i = 0; i < result.length; i++) {
        let tempParty = result[i].toObject();
        tempParty.date = moment(parseInt(result[i].date)).format("ddd, DD MMM YYYY");
        results.push(tempParty);
      }
      return res.status(200).send({results, total: total});
    });
});

/*
 * GET /api/owner/notifications/:offset/:limit
 * Return owner's notification.
 */
app.get('/api/owner/notifications/:offset/:limit', function(req, res, next) {
  let qty = parseInt(req.params.limit), offset = parseInt(req.params.offset) * qty;
  let token = req.cookies['token'], tempResults = [], readedMsg = [];

  if (!token) return res.status(409).send({message: 'You are not allowed to access this page'});
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return next(err);
    Notification
      .find({petOwnerId: decoded.petOwnerId, status: 1})
      .select({_id: 0})
      .sort({timeStamp: -1})
      .exec(function(err, result) {
        if (err) return next(err);
        let total = result.length;
        results = result.slice(offset, offset + qty);
        for (let i = 0; i < results.length; i++) {
          let temp = results[i].toObject();
          temp.timeStamp = moment(parseInt(results[i].timeStamp)).format("ddd, DD MMM YYYY HH:mm:ss");
          tempResults.push(temp);
          readedMsg.push({notificationId: results[i].notificationId});
        }
        Notification
          .update({$or: readedMsg}, {$set: {isRead: true}}, { multi: true })
          .select({_id: 0})
          .exec(function(err, result) {
            if (err) return next(err);
            return;
          });
        return res.status(200).send({notifications: tempResults, total: total});
      });
  });
});

/*
 * GET /api/party/:partyId
 * Return the party details.
 */
app.get('/api/party/:partyId', function(req, res, next) {
  let partyId = parseInt(req.params.partyId);
  let token = req.cookies['token'];
  let attended = false, tempParty = null;

  Party
    .findOne({partyId: partyId}, {_id: 0})
    .exec(function(err, party) {
      if (err) return next(err);
      tempParty = party.toObject();
      tempParty.date = moment(parseInt(party.date)).format("ddd, DD MMM YYYY");
      tempParty.logined = false;
      tempParty.attended = attended;
      if (!token) return res.status(200).json(tempParty);
      jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
        if (err) return next(err);
        tempParty.logined = true;
        for (let i = 0; i < party.attendant.length; i++) {
          if(party.attendant[i].petId == decoded.petId) tempParty.attended = true;
        }
        return res.status(200).json(tempParty);
      });
    });
});

/*
 * GET /api/dating/:datingId
 * Return the dating details.
 */
app.get('/api/dating/:datingId', function(req, res, next) {
  let datingId = parseInt(req.params.datingId);
  let token = req.cookies['token'];
  let tempDating = null;

  if (!token) return res.status(401).json({message: "UNAUTHORIZED"});
  Dating
    .findOne({datingId: datingId}, {_id: 0})
    .exec(function(err, dating) {
      if (err) return next(err);
      if (!dating) return res.status(404).json({message: "NOT FOUND"});
      jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
        if (err) return next(err);
        if (dating.targetPetOwnerId != decoded.petOwnerId && dating.petOwnerId != decoded.petOwnerId)
          return res.status(401).json({message: "UNAUTHORIZED"});
        tempDating = dating.toObject();
        tempDating.date = moment(parseInt(dating.date)).format("DD MMM YYYY");
        if (dating.petOwnerId == decoded.petOwnerId) tempDating.isInviter = true
        return res.status(200).json(tempDating);
      });
    });
});

/*
 * GET /api/count/owner/notifications/unread
 * Return owner's unread notifications number.
 */
app.get('/api/count/owner/notifications/unread', function(req, res, next) {
  let token = req.cookies['token'];

  if (!token) return res.status(409).send({total: null});
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return next(err);
    Notification
      .find({petOwnerId: decoded.petOwnerId, isRead: false, status: 1})
      .select({ _id: 0})
      .exec(function(err, result) {
        if (err) return next(err);
        return res.status(200).send({total: result.length});
      });
  });
});

/*
 * POST /api/signup
 * Sign up an account.
 */
app.post('/api/signup', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  if (password.length < 6) return res.status(409).send({ message: 'The password required at least 6 characters' });

  async.waterfall([
    function(callback) {
      Account.findOne({ email: email, status: {$ne: -1} }, { _id: 0, email: 1}, function(err, email) {
        if (err) return next(err);
        if (email) return res.status(409).send({ message: email.email + ' is already been used.' });
        return callback(err, true);
      });
    },
    function(callback, petOwnerId) {
      Counter
        .findOneAndUpdate({id: "petOwnerId"}, { $inc: { counter: 1 }})
        .select({ _id: 0, counter: 1})
        .exec(function(err, pId) {
          if (err) return next(err);
          return petOwnerId(null, pId.counter);
        });
    },
    function(petOwnerId, hashPassword) {
      var passwordData = sha512(password, genRandomString(16));
      var activateCode = sha512(genRandomString(16), 'dogMatch');
      var activateLink = 'http://' + config.domain + '/activate/' + activateCode.passwordHash;

      var account = new Account({
        email: email,
        password: passwordData.passwordHash,
        petOwnerId: petOwnerId,
        status: 0,
        salt: passwordData.salt,
        activateCode: activateCode.passwordHash,
        forgotPassword: null,
        name: null
      });

      var text = 'Thank you for signed up DogMatch! \n Please click the below link to finish the registration: \n\n' +
      activateLink + '\n\n *If you haven\'t finish this step within 24 hours, your application will be canceled. \n *This email generated by system. Please do not reply this email directly.' +
      ' If you have any inquiries, welcome to send an email to petdate0@gmail.com. \n\nThank you again.';

      var mailOptions = {
          from: 'DogMatch',
          to: email,
          subject: 'Activate DogMatch account',
          text: text
      };

      transporter.sendMail(mailOptions, function(err, info){
          if (err) return next(err);
      });

      account.save(function(err) {
        if (err) return next(err);
        return res.status(200).send({ message: 'Account has been added successfully! Please go to your email and activate your account.' });
      });
    }
  ]);
});

/*
 * POST /api/forgotpassword
 * Forgot the password.
 */
app.post('/api/forgotpassword', function(req, res, next) {
  let email = req.body.email;
  let confirmCode = sha512(genRandomString(16), 'DogMatch');
  let confirmLink = 'http://' + config.domain + '/forgotpassword/' + confirmCode.passwordHash;

  Account
    .findOneAndUpdate({$or: [{email: email, status: {$ne: -1}}, { name: email, status: {$ne: -1} }]},
                      {$set: {forgotPassword: confirmCode.passwordHash}})
    .select({_id: 0})
    .exec(function(err, result) {
      if (err) return next(err);
      if (!result && !err) return res.status(200).send({message: "Reset password request sent successfully. Please checks your email."});

      var text = 'We had received your reset password request. \n Please click the below link to finish the process: \n\n' +
      confirmLink + '\n\n *if you haven\'t finish this step within 24 hours, your request will be canceled. \n *This email generated by system. Please do not reply this email directly.' +
      'if you have any inquiries, welcome to send an email to petdate0@gmail.com. \n\nThank you again.';

      var mailOptions = {
          from: 'DogMatch',
          to: result.email,
          subject: 'Reset DogMatch password',
          text: text
      };

      transporter.sendMail(mailOptions, function(err){});
      return res.status(200).send({message: "Reset password request sent successfully. Please checks your email."});
    });
});

/*
 * POST /api/login
 * Login an account.
 */
app.post('/api/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  Account.findOne({$or: [{email: email, status: {$ne: -1}}, { name: email, status: {$ne: -1} }]},
    { _id: 0}, function(err, account) {
    if (err) return next(err);
    if (!err && !account) return res.status(409).send({ message: 'Account or password incorrect.' });
    if (!account.status) return res.status(409).send({ message: 'Please activate your account first.' });

    var hashPassword = sha512(password, account.salt);
    if(hashPassword.passwordHash !== account.password) return res.status(409).send({ message: 'Account or password incorrect.' });

    Pet
      .find({petOwnerId: account.petOwnerId})
      .select({_id: 0, petId: 1})
      .sort('createTime')
      .exec(function(err, pets) {
        var tempToken = { email: account.email,
                          petOwnerId: account.petOwnerId,
                          name: account.name };
        if (pets.length) tempToken.petId = pets[0].petId;

        var token = jwt.sign(tempToken, app.get('tokenSecret'), {expiresIn: 60 * 60 * 24});

        res.cookie('token', token);
        return res.status(200).json({ success: true, message: 'Login successful' });
      });
  });
});

/*
 * POST /api/activate/account
 * Activate an account.
 */
app.post('/api/activate/account', function(req, res, next) {
  let activateCode = req.body.activateCode;
  let name = 'User'+ Math.floor(10000000 + Math.random() * 90000000);

  Account.findOneAndUpdate({ activateCode: activateCode }, { status: 1, activateCode: null, name: name }, { _id: 0}, function(err, data) {
    if (err) return next(err);
    if (!data) return res.status(409).send({ message: 'Activate code incorrect.' });

    Owner.collection.dropIndexes(function (err, results) {});
    let now = new Date().getTime();

    let owner = new Owner({
      petOwnerId: data.petOwnerId,
      name: name,
      gender: "Male",
      country: "Afghanistan",
      iconImage: "/img/default.png",
      birthday: now,
      memberSince: now,
      status: 1,
      friends: []
    });
    owner.save();

    return res.status(200).send({ message: 'Activated successful. Please sign in again.' });
  });
});

/*
 * POST /api/owner/update
 * Update pet owner's information.
 */
app.post('/api/owner/update', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(401).json({message: "UNAUTHORIZED"});

  jwt.verify(req.cookies['token'], app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    let ownerFind = await Owner
                            .findOne({name: req.body.userName})
                            .select({_id: 0, name: 1, petOwnerId: 1});
    if (ownerFind && ownerFind.petOwnerId != decoded.petOwnerId)
      return res.status(500).send({message: 'User name existed'});
    await Owner.findOneAndUpdate({ petOwnerId: decoded.petOwnerId },
                                  { name: req.body.userName,
                                    gender: req.body.gender,
                                    country: req.body.country,
                                    birthday: new Date(req.body.birthday).getTime()
                                  });
    await Account.findOneAndUpdate({ petOwnerId: decoded.petOwnerId },
      { name: req.body.userName },
      function(err, results) {
        if (err) return next(err);
        decoded.name = req.body.userName;
        let token = jwt.sign(decoded, app.get('tokenSecret'));
        res.cookie('token', token);
        return res.status(200).send({ message: 'Update information successful'});
      });
  });
});

/*
 * POST /api/pet/:petId/update
 * Update pet's information.
 */
app.post('/api/pet/:petId/update', function(req, res, next) {
  var id = parseInt(req.body.petId);

  jwt.verify(req.cookies['token'], app.get('tokenSecret'), (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    Pet.findOneAndUpdate({ petId: id },
      { name: req.body.name,
        gender: req.body.gender,
        country: req.body.country,
        type: req.body.type,
        introduction: req.body.introduction,
        birthday: new Date(req.body.birthday).getTime()
      },
      function(err, results) {
        if (err) return next(err);
        return res.status(200).send({ message: 'Update information successful'});
      });
  });
});

/*
 * POST /api/dating/:query
 * Update the status of dating.
 */
app.post('/api/dating/:query', function(req, res, next) {
  let datingId = parseInt(req.body.datingId), status = 1;

  jwt.verify(req.cookies['token'], app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    let dating = await Dating.findOne({datingId: datingId}).select({_id: 0});
    if (dating.targetPetOwnerId != decoded.petOwnerId) return res.status(401).send({message: "UNAUTHORIZED"});
    switch (req.params.query) {
      case "accept":
        status = 2;
        break;
      case "reject":
        status = 3;
        break;
    }
    await Dating.findOneAndUpdate({ datingId: datingId }, { status: status });
    return res.status(200).send({ message: 'Updated successful', datingId: datingId});
  });
});

/*
 * POST /api/owner/update/iconimage
 * Update user's icon.
 */
app.post('/api/owner/update/iconimage', function(req, res, next) {
  let dataURI = req.body.image.toString();
  if (!req.cookies['token']) return res.status(500).send({ message: 'Failed to authenticate token.' });
  jwt.verify(req.cookies['token'], app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    if (!/data:image\//.test(dataURI)) return res.status(500).send({message: 'It is not an image. Please upload again.'});

    let upload = await uploadImage(dataURI, decoded.petOwnerId, 'owner');

    if (upload != 'SUCCESS') return res.status(500).send({ message: upload });
    return res.status(200).send({ message: 'Update profile image successfully', petOwnerId: decoded.petOwnerId });
  });
});

/*
 * POST /api/pet/update/iconimage
 * Update the pet's icon.
 */
app.post('/api/pet/update/iconimage', function(req, res, next) {
  let dataURI = req.body.image.toString();
  let petId = req.body.petId;
  if (!req.cookies['token']) return res.status(500).send({ message: 'Failed to authenticate token.' });
  jwt.verify(req.cookies['token'], app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    if (!/data:image\//.test(dataURI)) return res.status(500).send({message: 'It is not an image. Please upload again.'});

    let upload = await uploadImage(dataURI, petId, 'pet');

    if (upload != 'SUCCESS') return res.status(500).send({ message: upload });
    return res.status(200).send({ message: 'Update profile image successfully', petId: petId });
  });
});

/*
 * POST /api/pet/new
 * Create a pet.
 */
app.post('/api/pet/new', function(req, res, next) {
  jwt.verify(req.cookies['token'], app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    let pets = await Pet.find({petOwnerId: decoded.petOwnerId});
    if (pets.length > 5) return res.status(400).send({ message: 'You cannot add more than 5 dogs.' });
    let petId = await Counter
                        .findOneAndUpdate({id: "petId"}, { $inc: { counter: 1 }})
                        .select({ _id: 0, counter: 1});
    let iconImage = req.body.iconImage;
    let imagePath = '/img/default.png';
    if (/data:image\//.test(iconImage)) imagePath = iconImage;
    let pet = new Pet({
      petId: petId.counter,
      petOwnerId: decoded.petOwnerId,
      name: req.body.name,
      gender: req.body.gender,
      type: req.body.type,
      introduction: req.body.introduction,
      iconImage: imagePath,
      birthday: new Date(req.body.birthday).getTime(),
      status: 1,
      followers: [],
      followerNum: 0,
      createTime: new Date().getTime().toString()
    });

    pet.save(function(err) {
      if (err) return next(err);
      decoded.petId = pet.petId;
      let token = jwt.sign(decoded, app.get('tokenSecret'));
      res.cookie('token', token);
      return res.status(200).send({ message: 'Create successful.' });
    });
  });
});

/*
 * POST /api/owner/modifypassword
 * Modify user's password.
 */
app.post('/api/owner/modifypassword', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(500).send({ message: 'Failed to authenticate token.' });
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return next(err);
    Account.findOne({ email: decoded.email, petOwnerId: decoded.petOwnerId },
      { _id: 0, password: 1, salt: 1},
      function(err, dbPassword) {
      if (err) return next(err);
      let hashPassword = sha512(req.body.oldPassword, dbPassword.salt);
      if(hashPassword.passwordHash !== dbPassword.password) return res.status(409).send({ message: 'Password incorrect.' });
      let newPasswordData = sha512(req.body.newPassword, genRandomString(16));
      Account.update(
        { email: decoded.email, petOwnerId: decoded.petOwnerId},
        { $set: { password: newPasswordData.passwordHash,
                  salt: newPasswordData.salt }},
        function(err, msg) {
          if (err) return next(err);
          return res.status(200).send({ message: 'Update password successful' });
      });
    });
  });
});

/*
 * POST /api/owner/modifyemail
 * Modify user's email.
 */
app.post('/api/owner/modifyemail', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(500).send({ message: 'Failed to authenticate token.' });

  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return next(err);
    Account
      .findOne({ email: req.body.newEmail})
      .select({_id: 0})
      .exec(function(err, account){
        if (err) return next(err);
        if (account) return res.status(500).send({ message: 'The email existed.' });
        Account.update(
          { email: decoded.email, petOwnerId: decoded.petOwnerId},
          { $set: { email: req.body.newEmail}},
          function(err, msg) {
            if (err) return next(err);
            return res.status(200).send({ message: 'Update email successful. Please Login again.' });
        });
      });
  });
});

/*
 * POST /api/:confirmCode/modifyPassword
 * Modify user's password by searching the confirmCode.
 */
app.post('/api/:confirmCode/modifyPassword', function(req, res, next) {

  async.waterfall([
    function(callback) {
      if (req.cookies['token'])
        jwt.verify(req.cookies['token'], app.get('tokenSecret'), (err, decoded) => {
          if (err) return next(err);
          return callback({ message: 'Please logout first' });
        });
      return callback(null, true);
    },
    function(callback, updatePassword) {
      let newPasswordData = sha512(req.body.newPassword, genRandomString(16));
      Account.update(
        { forgotPassword: req.params.confirmCode},
        { $set: { password: newPasswordData.passwordHash,
                  salt: newPasswordData.salt,
                  forgotPassword: null }},
        function(err, msg) {
          if (err) return next(err);
          if (msg.nModified == 0) return updatePassword({message: 'There is no any reset password request'});
          if (msg) return updatePassword(null, true);
        });
    }
  ], function(err, result) {
    if (err && (err.message == 'Please logout first' || err.message == 'There is no any reset password request')) {
      return res.status(500).send({message: err.message});
    } else if (err) {
      return next(err);
    }
    return res.status(200).send({message: 'Updated your password successfully. Please login again.'});
  });
});

/*
 * POST /api/comment/post
 * Post a pet's comment.
 */
app.post('/api/comment/post', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(500).send({ message: 'Failed to authenticate token.' });

  jwt.verify(token, app.get('tokenSecret'), async (err, decoded) => {
    if (err) return next(err);
    let commentId = await counter("commentId");
    let owner = await Owner
                        .findOne({petOwnerId: decoded.petOwnerId})
                        .select({_id: 0});
    let petComment = new PetComments({
      commentId: commentId.counter,
      petId: req.body.petId,
      petOwnerId: decoded.petOwnerId,
      petOwnerName: owner.name,
      comment: req.body.comment,
      time: new Date().getTime().toString()
    });
    await petComment.save();
    return res.status(200).send({ message: 'Comment posted', petId: req.body.petId});
  });
});

/*
 * POST /api/party/attend
 * Attend the tournament.
 */
app.post('/api/party/attend/', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({ message: 'Please login your account first.' });
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to authenticate token.' });
    Party
      .findOneAndUpdate({"partyId": req.body.partyId}, {$push: { "attendant": {$each: [{"petId": parseInt(decoded.petId)}]}}})
      .select({ _id: 0})
      .exec(function(err, result) {
        if (err) return next(err);
        return res.status(200).send({ attendedPartyId: parseInt(req.body.partyId), message: 'Attended the party successful.' });
      });
  });
});

/*
 * GET /logout
 * Logout and clear all the cookie.
 */
app.get('/logout', function(req, res) {
  res.clearCookie("token");
  return res.status(200).send({ message: 'Logout success' });
});

/*
 * GET /authenticate
 * Check whether user are logined.
 */
app.get('/authenticate', (req, res, next) => {
  let token = req.cookies['token'];
  if (!token) return res.status(200).send({ success: false,  message: 'No token provided.'});
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err && err.message == 'jwt expired') {
      res.clearCookie("token");
      return res.status(200).send({ success: false,  message: 'No token provided.'});
    }
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    return res.status(200).send({
      success: true,
      message: 'Authenticated',
      petOwnerId: decoded.petOwnerId,
      userName: decoded.name,
      petId: decoded.petId});
  });
});

/*
 * POST /api/changespet
 * Change the current pet.
 */
app.post('/api/changespet', (req, res, next) => {
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({ success: false,  message: 'No token provided.'});
  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    Pet
      .findOne({petId: req.body.petId})
      .select({_id: 0, petOwnerId: 1})
      .exec(function(err, pet) {
        if(pet.petOwnerId != decoded.petOwnerId) return res.status(409).send({ message: 'UNAUTHORIZED'});
        decoded.petId = req.body.petId;
        let token = jwt.sign(decoded, app.get('tokenSecret'));
        res.cookie('token', token);
        return res.status(200).json({ success: true, message: 'Login successful' });
      });
  });
});

/*
 * POST /api/pet/follows
 * Follows the pet.
 */
app.post('/api/pet/follows', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({ message: 'Please login your account first.' });
  jwt.verify(token, app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    let petId = parseInt(req.body.petId);
    let pet = await Pet
                .findOneAndUpdate({petId: petId}, {$inc: {followerNum: 1}, $push:{"followers": {$each: [{petOwnerId: parseInt(decoded.petOwnerId), followDate: new Date().getTime()}]}}})
                .select({ _id: 0});
    let notificationId = await counter("notificationId");
    let notification = new Notification({
      notificationId: notificationId.counter,
      petOwnerId: decoded.petOwnerId,
      timeStamp: new Date().getTime(),
      message: [{type: "follow", followPetId: petId, followPetName: pet.name}],
      isRead: false,
      senderId: 0,
      status: 1
    });
    await notification.save();
    return res.status(200).send({ message: 'Follow the pet successfully', followedPetId: petId});
  });
});

/*
 * POST /api/pet/unfollows
 * Unfollows the pet.
 */
app.post('/api/pet/unfollows', function(req, res, next) {
  var token = req.cookies['token'];
  if (!token) return res.status(409).send({ message: 'Please login your account first.' });
  jwt.verify(token, app.get('tokenSecret'), async (err, decoded) => {
    if (err) return res.status(409).json({ success: false, message: 'Failed to authenticate token.' });
    let petId = parseInt(req.body.petId);
    let pet = await Pet
            .findOneAndUpdate({petId: petId}, { $inc: { followerNum: -1 }, $pull: { "followers":{ petOwnerId: parseInt(decoded.petOwnerId)}}})
            .select({ _id: 0});
    let notificationId = await counter("notificationId");
    let notification = new Notification({
      notificationId: notificationId.counter,
      petOwnerId: decoded.petOwnerId,
      timeStamp: new Date().getTime(),
      message: [{type: "unfollow", unfollowPetId: petId, unfollowPetName: pet.name}],
      isRead: false,
      senderId: 0,
      status: 1
    });
    await notification.save();
    return res.status(200).send({ message: 'Unfollowed the pet successfully', unFollowedPetId: petId });
  });
});

/*
 * POST /api/notifications/delete/
 * Delete the notification.
 */
app.post('/api/notifications/delete/', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({message: 'Please login your account first.'});

  jwt.verify(token, app.get('tokenSecret'), (err, decoded) => {
    if (err) return res.status(500).send({message: 'Failed to authenticate token.'});
    Notification
      .findOneAndUpdate({notificationId: req.body.notificationId, petOwnerId: decoded.petOwnerId},
                        { $set: {status: 0} })
      .select({ _id: 0})
      .exec(function(err, result) {
        if (err) return next(err);
        return res.status(200).send({ message: 'Deleted the notification successfully'});
      });
  });
});

/*
 * POST /api/support/post
 * Post the ticket.
 */
app.post('/api/support/post', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({message: 'Please login your account first.'});
  jwt.verify(token, app.get('tokenSecret'), async (err, decoded) => {
    if (err) return next(err);
    let ticketId = await counter("ticketId");
    let ticket = new Ticket({
      ticketId: ticketId.counter,
      petOwnerId: decoded.petOwnerId,
      email: decoded.email,
      subject: req.body.subject,
      type: req.body.type,
      content: req.body.content,
      timeStamp: new Date().getTime(),
      status: 'Waiting for reply'});
    await ticket.save();
    return res.status(200).send({ message: 'Post the ticket successfully'});
  });
});

/*
 * POST /api/pet/date
 * Post the dating invitation.
 */
app.post('/api/pet/date', function(req, res, next) {
  let token = req.cookies['token'];
  if (!token) return res.status(409).send({message: 'Please login your account first.'});
  jwt.verify(token, app.get('tokenSecret'), async (err, decoded) => {
    if (err) return next(err);
    let datingId = await counter("datingId");
    let dating = new Dating({
      datingId: datingId.counter,
      targetPetId: req.body.targetPetId,
      targetPetOwnerId: req.body.targetPetOwnerId,
      name: req.body.name,
      type: req.body.type,
      address: req.body.address,
      date: new Date(req.body.date).getTime(),
      start: req.body.start,
      end: req.body.end,
      message: req.body.message,
      petOwnerId: decoded.petOwnerId,
      petOwnerName: decoded.name,
      petId: decoded.petId,
      status: 1 });
    await dating.save();
    let notificationId = await counter("notificationId");
    let notification = new Notification({
      notificationId: notificationId.counter,
      petOwnerId: req.body.targetPetOwnerId,
      timeStamp: new Date().getTime(),
      message: [{type: "invitation", petOwnerId: decoded.petOwnerId, petOwnerName: decoded.name}],
      isRead: false,
      senderId: 0,
      status: 1
    });
    await notification.save();
    return res.status(200).send({ message: 'Dating invitation sent successful'});
  });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message });
});

var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
