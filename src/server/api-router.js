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

      bloodBankCollection.findOneAndUpdate(
              {"bloodType": donorInfo.selectedBloodGroup},
              {$inc: {"quantity": 1}  } 
      );

      return res.json({ message: "Donor " + donorInfo.bloodDonorName + " donation info has been added Successfully" });
    });
  });

  // Use blood { Donated blood }
  router.post("/useBlood", (req, res)=> {

    const bloodBankCollection = database.collection("bloodBank");
    const requestedBlood = req.body;

    bloodBankCollection.find({bloodType: requestedBlood.bloodType}).toArray((err, result)=>{

        //Check before using giving the blood { incase the requested blood it too much greater than the blood stored in stock}
        if(result[0].quantity < requestedBlood.quantity){
          return res.json({error: "Error , There is a shortage in Blood Store"});
        }
        bloodBankCollection.findOneAndUpdate(
          {bloodType: requestedBlood.bloodType},
          {$set : { quantity: result[0].quantity - requestedBlood.quantity}}
        )
        
        if(err){
          return res.json({error: "Error Occured while finding requested blood type , Try Again"});
        }
        return res.json({status : "Requested blood type is updated , You can use it now "});
    
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

  router.post('/getApprovedAppointments', (req,res)=>{

    const appointmentBody = req.body;
    const appointmentsCollection = database.collection('appointments');
    const userCollection = database.collection('users');

    //change user name into doctor firstname and lastname
    userCollection.findOne({"username": appointmentBody.username},(err,result)=>{
        if(err){
          return res.json({error: "Unable to get Doctor detail info"});
        }
        const firstname = result.firstname;
        const lastname = result.lastname;
        appointmentsCollection.find({'doctorFirstName': firstname, 'doctorLastName': lastname, 'status': "approved"}).toArray((err,result)=>{
            if(err){
              return res.json()
            }
            return res.json(result);
        });
    })

  });

  //Get pending appointments
  router.post('/getPendingAppointments', (req,res)=>{

    const appointmentBody = req.body;
    const appointmentsCollection = database.collection('appointments');
    const userCollection = database.collection('users');

    //change user name into doctor firstname and lastname
    userCollection.findOne({"username": appointmentBody.username},(err,result)=>{
        if(err){
          return res.json({error: "Unable to get Doctor detail info"});
        }
        const firstname = result.firstname;
        const lastname = result.lastname;
        appointmentsCollection.find({'doctorFirstName': firstname, 'doctorLastName': lastname, 'status': "pending"}).toArray((err,result)=>{
            if(err){
              return res.json()
            }
            return res.json(result);
        });
    })

  });

  // Approve or Delete Appointment
  router.post('/approveAppointment', (req, res)=>{
    const appointmentInfo = req.body;
    const appointmentsCollection = database.collection('appointments');

    const action = appointmentInfo.action;
    if(action == 'approve'){

        appointmentsCollection.findOneAndUpdate(
              {'patientFirstName': appointmentInfo.patientFirstName,
               'patientLastName': appointmentInfo.patientLastName}
              ,{$set : {'status': 'approved'}});
        return res.json({status: "Appointment has been approved successfully"});
    }else{
      appointmentsCollection.findOneAndDelete(
        {'patientFirstName': appointmentInfo.patientFirstName,
         'patientLastName': appointmentInfo.patientLastName});
      return res.json({status: "Appointment has been deleted successfully"});
    }

  });

  // Assign Patient 
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

    const patientBigDataCollection = database.collection('patientsBigData');
    const patientsCollection = database.collection('patients');
    
    
    patientsCollection.findOne({
      firstname: patientToBeAssignedFirstName, lastname: patientToBeAssignedLastName},(err,result)=>{
          if(err){
            return res.json({error: "Error occured while admiting patient"});
          }
          const payload = {
            patientId : result.patientId,
            firstname : result.firstname,
            lastname : result.lastname,
            email : result.email,
            password : result.password,
            phone: result.phone,
            gender : result.gender,
            age : result.age
          }
          patientBigDataCollection.insertOne(payload, (err, r)=>{
            if(err){
              return res.json({error : "Error occured while admiting patient"});
            }
          })
      });
    patientCollection.findOneAndDelete({firstname: patientToBeAssignedFirstName, lastname: patientToBeAssignedLastName});
    patientsAssigned.insertOne(patientInfo, (err, result) => {
      if (err) {
        return res.json({ error: "Error: Unable to Add Into Assigned PatientsList" });
      }

      return res.json({ message: "Patient " + patientToBeAssignedFirstName + " " + patientToBeAssignedLastName + " has been Assigned to Dr. " + assignedDoctorFirstName });

    });
  })

  // Get patients Assigned to Specific doctor requested
  router.post('/assignedPatientsList', (req, res)=>{

      const doctorAdmittingInfo = req.body;
      const assignedPatientCollection = database.collection('assignedPatients');
      const userCollection = database.collection('users');
      
      userCollection.findOne({"username": doctorAdmittingInfo.username},(err,result)=>{
        if(err){
          return res.json({error: "Unable to get Doctor detail info"});
        }
        const firstname = result.firstname;
        const lastname = result.lastname;

        assignedPatientCollection.find({'assignedDoctorFirstName': firstname, 'assignedDoctorLastName': lastname,
                                        'status' : 'unadmitted'
                                    }).toArray((err,result)=>{
                                      
          if(err){
            return res.json({error: "Unable to get Doctor detail info"});
          }
          return res.json(result);
        });
          
    });

  });

  // Admit Patient { By Doctor}
  router.post('/admitPatient', (req, res)=>{

    const admitInfo = req.body;
    const admitPatientsCollection = database.collection('assignedPatients');
    
    admitPatientsCollection.findOneAndUpdate(
        {patientFirstName: admitInfo.patientFirstName,
         patientLastName: admitInfo.patientLastName},
        {$set : {status: "admitted"}});
    return res.json({status: "Patient has been admitted successfully"});
  });

  //Get Patient Id
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


  //Prescription Add
  router.post('/addPrescription', (req,res)=>{

      const prescriptionInfo = req.body;

      const prescriptionCollection = database.collection('prescription');
      const assignedPatients = database.collection('assignedPatients');
      const patient = prescriptionInfo.patientFullName.split('_');

      assignedPatients.findOne({patientFirstName: patient[0],
                           patientLastName: patient[1]},(err,result)=>{

              if(err){
                return res.json({error: "Error Occurerd while adding prescription"});
              }
              const payload = {
                 patientFirstName : result.patientFirstName,
                 patientLastName : result.patientLastName,
                 patientAge : result.patientAge,
                 patientGender : result.patientGender,
                 presciptionGivenBy : result.assignedDoctorFirstName + " " + result.assignedDoctorLastName,
                 presciptionDetail : prescriptionInfo.prescriptionDetail
              }
              console.log(payload);
              prescriptionCollection.insertOne(payload,(err,result)=>{
                if(err){
                  return res.json({error: "Error Occurerd while adding prescription"});
                }
                return res.json({status: "Prescription has been added Successfully"});
              });
          });

  });


  // Prescription List
  router.post('/getPresciptionList', (req, res)=>{
    const prescriptionInfo = req.body;
    const prescriptionCollection = database.collection('prescription');
    const userCollection = database.collection('users');
    
    userCollection.findOne({username: prescriptionInfo.username},(err,result)=>{
      if(err){
        return res.json({error: "Error Occured while fetching presciption list"});
      }

      const presciptionOrderDoctor = result.firstname + " " + result.lastname;
      prescriptionCollection.find({presciptionGivenBy: presciptionOrderDoctor}).toArray((err,result)=>{
        if(err){
          return res.json({error: "Error Occured while fetching presciption list"});
        }
        
        return res.json(result);
      })
    })
  })

  //Patient List
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
