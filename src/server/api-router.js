const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
var jwtDecode = require('jwt-decode');

function apiRouter(database) {
  const router = express.Router();

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
  /* --------------------- Security Part Ends --------------------------- */

  /* Other Api Urls goes through the Token Authentication */

  router.use(
    checkJwt({ secret: process.env.JWT_SECRET })
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

  router.get('doctorsList', (req, res) => {
    const doctorsCollection = database.collection('doctors');
    doctorsCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error: Unable to reterive doctors" });
      }
      return res.json(result);
    })
  })


  /* -------------------  Doctors Section Ends -----------------------*/


  /* ---------------------   Patients Section ------------------*/

  //Fetch All available blood
  router.get('/bloodList', (req, res) => {
    const bloodBankCollection = database.collection('bloodBank');
    bloodBankCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Unable to reterive blood list, Try Again" });
      }
      return res.json(result);
    });
  });

  //Fetch All Blood Donors
  router.get('/bloodDonors', (req, res) => {
    const bloodDonorCollection = database.collection('bloodDonors');

    bloodDonorCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Unable to reterive blood donors, Try Again" });
      }
      return res.json(result);
    });
  });
  //Add blood donor
  router.post('/addBloodDonor', (req, res) => {

    const donorInfo = req.body;

    const bloodDonorCollection = database.collection('bloodDonors');
    const bloodBankCollection = database.collection('bloodBank');

    bloodDonorCollection.insertOne(donorInfo, (err, result) => {
      if (err) {
        return res.json({ error: "Unable to add blood donor , Try Again !" });
      }

      bloodBankCollection.insertOne({ "bloodType": donorInfo.selectedBloodGroup }, (err, result) => {
        if (err) {
          return res.json({ error: "Error occured while inserting the blood type, Try Again" });
        }
      })
      return res.json({ message: "Donor " + donorInfo.bloodDonorName + "donation info has been added Successfully" });
    });
  });


  //Bed Types Fetch and Return  
  router.get('/getBedTypes', (req, res) => {
    const bedTypeCollection = database.collection('bedTypes');
    bedTypeCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Unable to fetch bedTypes, Try Again!" });
      }
      return res.json(result);
    });
  });

  //Add Bed
  router.post('/addBed', (req, res) => {
    const bedBody = req.body;
    const bedCollection = database.collection('beds');

    bedCollection.findOne({bedNumber:bedBody.bedNumber},(err,result)=>{
        if(result){
          return res.json({error: "Bed Number has assigned Bed , Try Other Numbers"});
        }else{
          bedCollection.insertOne(bedBody, (err, result) => {
            if (err) {
              return res.json({ error: "Unable to Add Bed, Try Again" });
            }
            return res.json({ message: "Bed Successfully Added" });
          });
        }
    });

  })

  //Get All Beds
  router.get('/beds', (req, res) => {
    const bedCollection = database.collection('beds');
    bedCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: 'Unable to reterive all beds, Try Again' });
      }
      return res.json(result);
    });
  });

  //Get all free beds
  router.get('/getFreeBeds', (req, res) => {
    const bedCollection = database.collection('beds');
    bedCollection.find({ status: "free" }).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Unable to reterive free beds, Try Again" });
      }
      return res.json(result);
    });
  });

  //Get all reserved beds
  router.get('/getReservedBeds', (req, res) => {
    const bedCollection = database.collection('beds');
    bedCollection.find({ status: "reserved" }).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Unable to reterive reserved beds, Try again!" });
      }
      return res.json(result);
    });
  });

  //Perform Bed Reserve for Patient
  router.post('/reserveBed', (req, res) => {
    const reserveInfo = req.body;
    const bedCollection = database.collection('beds');

    bedCollection.remove({ bedNumber: reserveInfo.bedNumber }, function (err, removed) {
      if (!err && removed) {
        bedCollection.insert(reserveInfo, (err, result) => {
          if (err) {
            return res.json({ error: "Unable to Reserve Bed , Try Again" });
          }
          return res.json({ message: "Bed " + reserveInfo.bedNumber + " has been assigned for " + reserveInfo.patientFirstName + reserveInfo.patientLastName });
        });
      }
    });

    // bedCollection.update({"bedNumber":reserveInfo.bedNumber}, {$set: {}})
  });

  //Remove Bed
  router.post('/removeBed', (req, res) => {

    const bedNumber = req.body.bedNumber;
    const bedCollection = database.collection('beds');

    bedCollection.remove({
      bedNumber: bedNumber
    }, 1);
    return res.json({ message: "Bed has beed removed Successfully ! " });
  });


  //Discharge Patient
  router.post('/discharge',(req,res)=>{
    const bedNumber = req.body.bedNumber;
    const bedCollection = database.collection('beds');

    
    bedCollection.updateOne(
      { bedNumber : bedNumber},
      { $set: { "status" : "free"} });
      bedCollection.findOne({bedNumber:bedNumber},(err,r)=>{
        if(r){
          const allocatedTime = r.allocatedTime;
          return res.json({status: "Patient discharged , Bed Number " + bedNumber + " is Availble Now"});
        }
      }); 
  });

  //Appointment List
  router.get('/appointmentsList', (req, res) => {
    const appointmentsCollection = database.collection('appointments');
    appointmentsCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error: Unable to reterive Appointments, Try Again!" });
      }
      return res.json(result);

    })
  })

  router.post('/addAppointment', (req, res) => {

    const appointmentBody = req.body;

    const patientFirstName = appointmentBody.patientFirstName;
    const patientLastName = appointmentBody.patientLastName;
    const doctorFirstName = appointmentBody.doctorFirstName;
    const doctorLastName = appointmentBody.doctorLastName;
    const appointmentStatus = appointmentBody.status;

    const appointmentsCollection = database.collection('appointments');
    
    //checks if the patient has pending appointment , if he/she has one , show error
    appointmentsCollection.findOne({patientFirstName : patientFirstName,
                                    patientLastName : patientLastName,
                                    status : appointmentStatus},(err, result)=>{

          if(result)
          {
            return res.json({error: "Patient has pending Appointment!"});
          }else{
            appointmentsCollection.insertOne(appointmentBody, (err, result) => {
              if (err) {
                return res.json({ error: "Unable to Add Appointment, Try Later" });
              }
              return res.json({ message: "Appointment for " + patientFirstName + " " + patientLastName + " has been successfully added." })
            });
          }

      })

  });

  router.post('/assignDoctor', (req, res) => {

    const patientInfo = req.body;

    const patientsAssigned = database.collection('assignedPatients'); // Assigned Patients Collection

    const patientToBeAssignedFirstName = patientInfo.patientFirstName;
    const patientToBeAssignedLastName = patientInfo.patientLastName;
    const patientToBeAssignedGender = patientInfo.patientGender;
    const patientToBeAssignedAge = patientInfo.patientAge;
    const assignedDoctorFirstName = patientInfo.assignedDoctorFirstName;
    const assignedDoctorLastName = patientInfo.assignedDoctorLastName;

    const patientCollection = database.collection('patients');

    patientCollection.remove({
      firstname: patientToBeAssignedFirstName, lastname: patientToBeAssignedLastName,
      gender: patientToBeAssignedGender, age: patientToBeAssignedAge
    }, 1);

    patientsAssigned.insertOne(patientInfo, (err, result) => {
      if (err) {
        return res.json({ error: "Error: Unable to Add Into Assigned PatientsList" });
      }

      return res.json({ message: "Patient " + patientToBeAssignedFirstName + " " + patientToBeAssignedLastName + " has been Assigned to Dr. " + assignedDoctorFirstName });

    });
  })

  router.post('/getPatientId',(req,res)=>{
    const patientCollection = database.collection('patients');
    const patientInfo = req.body;
    
    patientCollection.findOne({firstname: patientInfo.firstname,lastname:patientInfo.lastname},(err,r)=>{
      if(err){
        return res.json({error: "Error Occured While Billing patient for Bed"});
      }else{
        const beds = database.collection('beds');
        beds.findOne({patientFirstName: patientInfo.firstname, patientLastName: patientInfo.lastname},(err,r2)=>{
          if(r2){
            return res.json({result: r.patientId , allocatedTime: r2.allocatedTime});
          }
        })
        //console.log( " ---- " + r.patientId);
        
      }
    })

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

  router.post('/addRevisitingPatient', (req, res) => {
    const patientInfo = req.body;
    const patientCollection = database.collection("patients");

    patientCollection.findOne({ patientId: patientInfo.patientId }, (err, result) => {
      //If patient is already in the patients list, return by displaying error {otherwise duplication}
      if(result) {
        return res.json({
          error: 'Patient ' + patientInfo.firstname + " " + patientInfo.lastname + " has already paid for registration."
        });
      } else {
        patientCollection.insertOne({
          patientId: patientInfo.patientId, firstname: patientInfo.firstname,
          lastname: patientInfo.lastname, email: patientInfo.email,
          password: patientInfo.password, phone: patientInfo.phone,
          gender: patientInfo.gender, age: patientInfo.age
        }, (err, r) => {

          if (err) {
            return res.json({ error: 'Error Occured while adding patinet during Checkup Registration.' });
          }

          const newRecord = r.ops[0];

          return res.json({ status: 'Patient successfully registered and pay for Checkup Again' });

        });
      }
    })

  });


  //Handler for Patient that has been medicated before  , now he/she wants to be admitted again
  router.post('/getFromPatientRecord', (req, res) => {

    const info = req.body;
    const patientOldRecordCollection = database.collection('patientsBigData');


    patientOldRecordCollection.findOne({ patientId: info.patientId }, (err, result) => {
      if (!result) {
        return res.json({
          error: 'Patient with id ' + info.patientId + " is not found.",
          statusCode: 404
        });
      }

      return res.json({
        patientInfo: result
      });
    });
  });

  router.post('/addIntoInvoice', (req, res) => {
    const invoiceCollection = database.collection('invoices');
    const bill = req.body;

    invoiceCollection.insertOne(bill, (err, r) => {
      if (err) {
        return res.json({ error: "Error Occured while adding Billing Details." });
      }

      const newRecord = r.ops[0];
      return res.json({ status: "Patient Billed Successfully" });
    });
  });

  /* ---------------------   Patients Section Ends ------------------*/

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


  router.get('/notice',(req,res)=>{
    const noticeCollection = database.collection('noticeBoard');
    noticeCollection.find({}).toArray((err,result)=>{
      if(err){
        return res.json({error: "Error occured while reteriving Notifications"});
      }
      return res.json(result);
    }); 
  })


  return router;
}

module.exports = apiRouter;
