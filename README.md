# DogMatch (COMP 5322 Project)

DogMatch is a website for dog lovers to find a partner for their beloved dogs. Thus, our primary target users are dog owners and secondary target users are the dogs.

## Project Demo

https://comp-5322.appspot.com/

### Installing

First clone the project

```
git clone *URL*
```

Modify the MongoDB URL in config.js
MONGO_URI is the place for modify

```
database: process.env.MONGO_URI || 'MONGO_URI' || 'localhost/nef',
```

Modify the email account in server.js

```
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Gmail Here',
        pass: 'Password Here'
    }
});
```

Then install all module required through npm

```
npm install
```

And then bower install packages and build gulp

```
npm run postinstall
```

Finally, host the server

```
npm run watch
```

## Deployment

We deploy our application through Google Cloud Platform(GCP) app engine.

## Built With

* [MongoDB](https://www.mongodb.com/) - The database
* [Express.js](https://expressjs.com/) - The node.js framework used
* [React.js](https://reactjs.org/) - Front-end
* [Node.js](https://nodejs.org/) - Backend

## Authors

* **Arul Kamala Thiyagarajan** - *System architect*

* **Tsang Kam Ha Samantha** - *Front-end programmer*

* **Wong Kwun Shing Benny** - *Back-end programmer*
