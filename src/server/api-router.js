const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
var jwtDecode = require('jwt-decode');

function apiRouter(database) {
  const router = express.Router();

  router.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate' })
  );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });

  router.get('/contacts', (req, res) => {

    const contactsCollection = database.collection('contacts');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  //Fetch and Send Doctors List
  router.get('/doctorsList', (req, res) => {
    const doctorsCollection = database.collection('doctors');

    doctorsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    })
  })

  router.post('/contacts', (req, res) => {
    const user = req.body;

    const contactsCollection = database.collection('contacts');

    contactsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  /* -------------------  Doctors Section -----------------------*/

        router.get('doctorsList', (req, res)=> {
          const doctorsCollection = database.collection('doctors');
          doctorsCollection.find({}).toArray((err,result)=> {
            if(err){
              return res.json({ error: "Error: Unable to reterive doctors" });
            }
            return res.json(result);
          })
        })
  

   /* -------------------  Doctors Section Ends -----------------------*/      


  /* ---------------------   Patients Section ------------------*/

        router.post('/assignDoctor', (req,res)=>{
          
          const patientInfo = req.body;
          
          const patientToBeAssignedFirstName = patientInfo.patientFirstName;
          const patientToBeAssignedLastName = patientInfo.patientLastName;
          const patientToBeAssignedGender = patientInfo.patientGender;
          const patientToBeAssignedAge = patientInfo.patientAge;
          const assignedDoctorFirstName = patientInfo.assignedDoctorFirstName;
          const assignedDoctorLastName = patientInfo.assignedDoctorLastName;

          const patientCollection = database.collection('patients');
          
          patientCollection.remove({firstname:patientToBeAssignedFirstName, lastname: patientToBeAssignedLastName,
                                  gender: patientToBeAssignedGender, age: patientToBeAssignedAge},1);
              
              const patientsAssigned = database.collection('assignedPatients');

              patientsAssigned.insertOne(patientInfo, (err,result)=>{
                if (err) {
                  return res.json({ error: "Error: Unable to Add Into Assigned PatientsList" });
                }

                return res.json({message: "Patient " + patientToBeAssignedFirstName + " " + patientToBeAssignedLastName +  " has been Assigned to Dr. " + assignedDoctorFirstName});

            });
        })

        router.get('/patientsList', (req, res) => {

          const patientCollection = database.collection('patients');
          //Get list of patients from the collection
          patientCollection.find({}).toArray((err, result) => {
            if (err) {
              return res.json({ error: "Error: Unable to reterive patients" });
            }
            return res.json(result);

          });
        })

        //Patient Add
        router.post('/addPatient', (req, res) => {
          const info = req.body;
          const patientCollection = database.collection('patients');

          //Check whether the patient is found or not
          patientCollection.findOne({
            firstname: info.firstname, lastname: info.lastname,
            gender: info.gender, bloodCategory: info.bloodCategory
          }, (err, result) => {
            if (result || err) {
              return res.json({ warning: 'Error : Patient is already registered' });
            }

            //now we checked the patient is new , so insert it
            patientCollection.insertOne(info, (err, r) => {

              if (err) {
                return res.json({ error: 'Error Occured while inserting Patient Record.' });
              }

              const newRecord = r.ops[0];

              return res.json({ status: 'Patient successfully inserted' });

            });
          });


        });

  /* ---------------------   Patients Section Ends ------------------*/

  //Login 
  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.json({
            error: 'user not found',
            statusCode: 404
          })
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.json({
            error: 'incorrect password',
            statusCode: 401
          });
        }

        const payload = {
          username: result.username,
          role: result.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token,
          role: payload.role
        });
      });
  });

  //SignUp
  router.post('/signup', (req, res) => {
    const user = req.body;

    user.password = bcrypt.hashSync(user.password, 10);
    console.log("user pass "+ user.password);
    const userCollection = database.collection('users');
    userCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error Occured when inserting new Record' });
      }

      const userInserted = r.ops[0];
      //return res.status(201).json(userInserted);
      const payload = {
        username: user.username,
        role: user.role
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

      return res.json({
        message: 'successfuly registered',
        token: token
      });
    });
  })


  //Lockscreen
  router.post('/lock', (req, res) => {

    const tokenFetched = req.body.token;
    var decoded = jwt.verify(tokenFetched, process.env.JWT_SECRET);

    res.json({
      message: "Account Lock Successs",
      user: decoded.username,
      role: decoded.role
    });
  });

  return router;
}

module.exports = apiRouter;
