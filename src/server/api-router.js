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

  /* Admin Section */
  router.post('/addDepartment', (req, res) => {
    const departmentName = req.body.departmentName;
    const departmentCollection = database.collection('departments');

    departmentCollection.findOne({ departmentName: departmentName }, (err, result) => {
      if (err) {
        return res.json({ error: "Error Occured while adding Department" });
      }
      if (result) {
        return res.json({ error: "Error Occured while trying to duplicate Department " });
      } else {
        departmentCollection.insertOne({ departmentName: departmentName }, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while adding Department" });
          }
          return res.json({ status: "Department has been successfully added" });
        });
      }
    });
  });

  router.get('/departments', (req, res) => {
    const departmentCollection = database.collection('departments');
    departmentCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error Occured while reteriving Department" });
      }
      return res.json(result);
    });
  });


  router.post('/addDoctor', (req, res) => {
    const doctorsCollection = database.collection('doctors');
    const doctorInfo = req.body;
    const userCollection = database.collection('users');
    doctorsCollection.findOne({
      firstname: doctorInfo.firstname, lastname: doctorInfo.lastname,
      department: doctorInfo.department, address: doctorInfo.address,
      phone: doctorInfo.phone
    }, (err, result) => {

      if (err) {
        return res.json({ error: "Error Occured while Adding Doctor" });
      }
      if (result) {
        return res.json({ error: "Error Occured while trying to duplicate Nurse " });
      } else {

        userCollection.insertOne({
          firstname: doctorInfo.firstname, lastname: doctorInfo.lastname,
          password: bcrypt.hashSync(doctorInfo.password, 10), role: 'doctor',
          username: doctorInfo.username
        }, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while Adding Doctor" });
          }
        });

        doctorsCollection.insertOne(doctorInfo, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while Adding Doctor" });
          }
          return res.json({ status: "Doctor has been successfully added" });
        });
      }
    });

  })

  router.get('/doctors', (req, res) => {
    const doctorCollection = database.collection('doctors');
    doctorCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error Occured while Reteriving Doctors" });
      }
      return res.json(result);
    });
  });

  router.post('/fireDoctor', (req, res) => {
    const doctorCollection = database.collection('doctors');
    const userCollection = database.collection('users');
    const docInfo = req.body;
    doctorCollection.findOneAndDelete({
      firstname: docInfo.firstname, lastname: docInfo.lastname,
      phone: docInfo.phone
    });
    userCollection.findOneAndDelete({ firstname: docInfo.firstname, lastname: docInfo.lastname });

    return res.json({ status: "Doctor has been Fired" });
  });

  router.post('/addNurse', (req, res) => {
    const nurseCollection = database.collection('nurses');
    const nurseInfo = req.body;
    const userCollection = database.collection('users');

    nurseCollection.findOne({
      firstname: nurseInfo.firstname, lastname: nurseInfo.lastname,
      department: nurseInfo.department, address: nurseInfo.address,
      phone: nurseInfo.phone
    }, (err, result) => {

      if (err) {
        return res.json({ error: "Error Occured while Adding Nurse" });
      }
      if (result) {
        return res.json({ error: "Error Occured while trying to duplicate Nurse " });
      } else {
        userCollection.insertOne({
          firstname: nurseInfo.firstname, lastname: nurseInfo.lastname,
          password: bcrypt.hashSync(nurseInfo.password, 10), role: 'nurse',
          username: nurseInfo.username
        }, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while Adding Nurse" });
          }
        });
        nurseCollection.insertOne(nurseInfo, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while Adding Nurse" });
          }
          return res.json({ status: "Nurse has been successfully added" });
        });
      }
    });

  })


  router.get('/nurses', (req, res) => {
    const nurseCollection = database.collection('nurses');
    nurseCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error Occured while Reteriving Nurses" });
      }
      return res.json(result);
    });
  });

  router.post('/fireNurse', (req, res) => {
    const nurseCollection = database.collection('nurses');
    const nurseInfo = req.body;
    const userCollection = database.collection('users');
    nurseCollection.findOneAndDelete({
      firstname: nurseInfo.firstname, lastname: nurseInfo.lastname,
      phone: nurseInfo.phone
    });
    userCollection.findOneAndDelete({ firstname: receptionistInfo.firstname, lastname: receptionistInfo.lastname });

    return res.json({ status: "Nurse has been Fired" });
  });

  router.post('/addReceptionist', (req, res) => {
    const receptionistCollection = database.collection('receptionist');
    const receptionistInfo = req.body;
    const userCollection = database.collection('users');
    receptionistCollection.findOne({
      firstname: receptionistInfo.firstname, lastname: receptionistInfo.lastname,
      address: receptionistInfo.address, phone: receptionistInfo.phone
    }, (err, result) => {

      if (err) {
        return res.json({ error: "Error Occured while Adding Receptionist" });
      }
      if (result) {
        return res.json({ error: "Error Occured while trying to duplicate Receptionist " });
      } else {

        userCollection.insertOne({
          firstname: receptionistInfo.firstname, lastname: receptionistInfo.lastname,
          password: bcrypt.hashSync(receptionistInfo.password, 10), role: 'receptionist',
          username: receptionistInfo.username
        }, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while Adding Receptionist" });
          }
        });

        receptionistCollection.insertOne(receptionistInfo, (err, result) => {
          if (err) {
            return res.json({ error: "Error Occured while Adding Receptionist" });
          }
          return res.json({ status: "Receptionist has been successfully added" });
        });
      }
    });

  })

  router.get('/receptionist', (req, res) => {
    const receptionistCollection = database.collection('receptionist');
    receptionistCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error Occured while Reteriving Receptionist" });
      }
      return res.json(result);
    });
  });

  router.post('/fireReceptionist', (req, res) => {
    const receptionistCollection = database.collection('receptionist');
    const receptionistInfo = req.body;
    const userCollection = database.collection('users');
    receptionistCollection.findOneAndDelete({
      firstname: receptionistInfo.firstname, lastname: receptionistInfo.lastname,
      phone: receptionistInfo.phone
    });
    userCollection.findOneAndDelete({ firstname: receptionistInfo.firstname, lastname: receptionistInfo.lastname });
    return res.json({ status: "Receptionist has been Fired" });
  });

  router.post('/addGuestAppointment', (req, res) => {
    const guestCollectgion = database.collection('guestAppointment');
    const appointmentInfo = req.body;
    guestCollectgion.insertOne(appointmentInfo, (err, result) => {
      if (err) {
        return res.json({ error: "Error Occured While Adding Appointment , Try Again" });
      }
      return res.json(result);
    })
  });

  /* ADmin Section Ends */

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
        { "bloodType": donorInfo.selectedBloodGroup },
        { $inc: { "quantity": 1 } }
      );

      return res.json({ message: "Donor " + donorInfo.bloodDonorName + " donation info has been added Successfully" });
    });
  });

  // Use blood { Donated blood }
  router.post("/useBlood", (req, res) => {

    const bloodBankCollection = database.collection("bloodBank");
    const requestedBlood = req.body;

    bloodBankCollection.find({ bloodType: requestedBlood.bloodType }).toArray((err, result) => {

      //Check before using giving the blood { incase the requested blood it too much greater than the blood stored in stock}
      if (result[0].quantity < requestedBlood.quantity) {
        return res.json({ error: "Error , There is a shortage in Blood Store" });
      }
      bloodBankCollection.findOneAndUpdate(
        { bloodType: requestedBlood.bloodType },
        { $set: { quantity: result[0].quantity - requestedBlood.quantity } }
      )

      if (err) {
        return res.json({ error: "Error Occured while finding requested blood type , Try Again" });
      }
      return res.json({ status: "Requested blood type is updated , You can use it now " });

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

    bedCollection.findOne({ bedNumber: bedBody.bedNumber }, (err, result) => {
      if (result) {
        return res.json({ error: "Bed Number has assigned Bed , Try Other Numbers" });
      } else {
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
  router.post('/discharge', (req, res) => {
    const bedNumber = req.body.bedNumber;
    const bedCollection = database.collection('beds');


    bedCollection.updateOne(
      { bedNumber: bedNumber },
      { $set: { "status": "free" } });
    bedCollection.findOne({ bedNumber: bedNumber }, (err, r) => {
      if (r) {
        const allocatedTime = r.allocatedTime;
        return res.json({ status: "Patient discharged , Bed Number " + bedNumber + " is Availble Now" });
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
    appointmentsCollection.findOne({
      patientFirstName: patientFirstName,
      patientLastName: patientLastName,
      status: appointmentStatus
    }, (err, result) => {

      if (result) {
        return res.json({ error: "Patient has pending Appointment!" });
      } else {
        appointmentsCollection.insertOne(appointmentBody, (err, result) => {
          if (err) {
            return res.json({ error: "Unable to Add Appointment, Try Later" });
          }
          return res.json({ message: "Appointment for " + patientFirstName + " " + patientLastName + " has been successfully added." })
        });
      }

    })

  });

  router.post('/getApprovedAppointments', (req, res) => {

    const appointmentBody = req.body;
    const appointmentsCollection = database.collection('appointments');
    const userCollection = database.collection('users');

    //change user name into doctor firstname and lastname
    userCollection.findOne({ "username": appointmentBody.username }, (err, result) => {
      if (err) {
        return res.json({ error: "Unable to get Doctor detail info" });
      }
      const firstname = result.firstname;
      const lastname = result.lastname;
      appointmentsCollection.find({ 'doctorFirstName': firstname, 'doctorLastName': lastname, 'status': "approved" }).toArray((err, result) => {
        if (err) {
          return res.json()
        }
        return res.json(result);
      });
    })

  });

  //Get pending appointments
  router.post('/getPendingAppointments', (req, res) => {

    const appointmentBody = req.body;
    const appointmentsCollection = database.collection('appointments');
    const userCollection = database.collection('users');

    //change user name into doctor firstname and lastname
    userCollection.findOne({ "username": appointmentBody.username }, (err, result) => {
      if (err) {
        return res.json({ error: "Unable to get Doctor detail info" });
      }
      const firstname = result.firstname;
      const lastname = result.lastname;
      appointmentsCollection.find({ 'doctorFirstName': firstname, 'doctorLastName': lastname, 'status': "pending" }).toArray((err, result) => {
        if (err) {
          return res.json()
        }
        return res.json(result);
      });
    })

  });

  // Approve or Delete Appointment
  router.post('/approveAppointment', (req, res) => {
    const appointmentInfo = req.body;
    const appointmentsCollection = database.collection('appointments');

    const action = appointmentInfo.action;
    if (action == 'approve') {

      appointmentsCollection.findOneAndUpdate(
        {
          'patientFirstName': appointmentInfo.patientFirstName,
          'patientLastName': appointmentInfo.patientLastName
        }
        , { $set: { 'status': 'approved' } });
      return res.json({ status: "Appointment has been approved successfully" });
    } else {
      appointmentsCollection.findOneAndDelete(
        {
          'patientFirstName': appointmentInfo.patientFirstName,
          'patientLastName': appointmentInfo.patientLastName
        });
      return res.json({ status: "Appointment has been deleted successfully" });
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
      firstname: patientToBeAssignedFirstName, lastname: patientToBeAssignedLastName
    }, (err, result) => {
      if (err) {
        return res.json({ error: "Error occured while admiting patient" });
      }
      const payload = {
        patientId: result.patientId,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        password: result.password,
        phone: result.phone,
        gender: result.gender,
        age: result.age
      }
      patientBigDataCollection.insertOne(payload, (err, r) => {
        if (err) {
          return res.json({ error: "Error occured while admiting patient" });
        }
      })
    });
    patientCollection.findOneAndDelete({ firstname: patientToBeAssignedFirstName, lastname: patientToBeAssignedLastName });
    patientsAssigned.insertOne(patientInfo, (err, result) => {
      if (err) {
        return res.json({ error: "Error: Unable to Add Into Assigned PatientsList" });
      }

      return res.json({ message: "Patient " + patientToBeAssignedFirstName + " " + patientToBeAssignedLastName + " has been Assigned to Dr. " + assignedDoctorFirstName });

    });
  })

  // Get patients Assigned to Specific doctor requested
  router.post('/assignedPatientsList', (req, res) => {

    const doctorAdmittingInfo = req.body;
    const assignedPatientCollection = database.collection('assignedPatients');
    const userCollection = database.collection('users');

    userCollection.findOne({ "username": doctorAdmittingInfo.username }, (err, result) => {
      if (err) {
        return res.json({ error: "Unable to get Doctor detail info" });
      }
      const firstname = result.firstname;
      const lastname = result.lastname;

      assignedPatientCollection.find({
        'assignedDoctorFirstName': firstname, 'assignedDoctorLastName': lastname,
        'status': 'unadmitted'
      }).toArray((err, result) => {

        if (err) {
          return res.json({ error: "Unable to get Doctor detail info" });
        }
        return res.json(result);
      });

    });

  });

  // Admit Patient { By Doctor}
  router.post('/admitPatient', (req, res) => {

    const admitInfo = req.body;
    const admitPatientsCollection = database.collection('assignedPatients');

    admitPatientsCollection.findOneAndUpdate(
      {
        patientFirstName: admitInfo.patientFirstName,
        patientLastName: admitInfo.patientLastName
      },
      { $set: { status: "admitted" } });
    return res.json({ status: "Patient has been admitted successfully" });
  });

  //Get Patient Id
  router.post('/getPatientId', (req, res) => {
    const patientCollection = database.collection('patients');
    const patientInfo = req.body;

    patientCollection.findOne({ firstname: patientInfo.firstname, lastname: patientInfo.lastname }, (err, r) => {
      if (err) {
        return res.json({ error: "Error Occured While Billing patient for Bed" });
      } else {
        const beds = database.collection('beds');
        beds.findOne({ patientFirstName: patientInfo.firstname, patientLastName: patientInfo.lastname }, (err, r2) => {
          if (r2) {
            return res.json({ result: r.patientId, allocatedTime: r2.allocatedTime });
          }
        })
        //console.log( " ---- " + r.patientId);

      }
    })

  })


  //Prescription Add
  router.post('/addPrescription', (req, res) => {

    const prescriptionInfo = req.body;

    const prescriptionCollection = database.collection('prescription');
    const assignedPatients = database.collection('assignedPatients');
    const patient = prescriptionInfo.patientFullName.split('_');

    assignedPatients.findOne({
      patientFirstName: patient[0],
      patientLastName: patient[1]
    }, (err, result) => {

      if (err) {
        return res.json({ error: "Error Occurerd while adding prescription" });
      }
      const payload = {
        patientFirstName: result.patientFirstName,
        patientLastName: result.patientLastName,
        patientAge: result.patientAge,
        patientGender: result.patientGender,
        presciptionGivenBy: result.assignedDoctorFirstName + " " + result.assignedDoctorLastName,
        presciptionDetail: prescriptionInfo.prescriptionDetail
      }
      console.log(payload);
      prescriptionCollection.insertOne(payload, (err, result) => {
        if (err) {
          return res.json({ error: "Error Occurerd while adding prescription" });
        }
        return res.json({ status: "Prescription has been added Successfully" });
      });
    });

  });


  // Prescription List
  router.post('/getPresciptionList', (req, res) => {
    const prescriptionInfo = req.body;
    const prescriptionCollection = database.collection('prescription');
    const userCollection = database.collection('users');

    userCollection.findOne({ username: prescriptionInfo.username }, (err, result) => {
      if (err) {
        return res.json({ error: "Error Occured while fetching presciption list" });
      }

      const presciptionOrderDoctor = result.firstname + " " + result.lastname;
      prescriptionCollection.find({ presciptionGivenBy: presciptionOrderDoctor }).toArray((err, result) => {
        if (err) {
          return res.json({ error: "Error Occured while fetching presciption list" });
        }

        return res.json(result);
      })
    })
  })

  //Patient List { From Big Data }
  router.get('/patients', (req, res) => {

    const patientCollection = database.collection('patientsBigData');
    //Get list of patients from the collection
    patientCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error: Unable to reterive patients" });
      }
      return res.json(result);

    });
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
      if (result) {
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

  router.post('/patientUserDetail', (req,res)=>{
    
    const patientDetail = req.body;
    const patientCollection = database.collection('patientsBigData');

    patientCollection.findOne({patientId: patientDetail.id}, (err,result)=>{
      if(err){
        return res.json({error: "ERror while reteriving patient detail"});
      }
      return res.json(result);
    });

  });

  router.get('/deathReports', (req,res)=>{
    const deathReport = database.collection('deathReport');
    deathReport.find({}).toArray((err,result)=>{
      if (err) {
        return res.json({ error: "Error occured while reteriving death reports" });
      }
      return res.json(result);
    });
  });

  router.post('/addDeathReport', (req, res) => {

    const deathInfo = req.body;
    const patientCollection = database.collection('patientsBigData');
    const deathReport = database.collection('deathReport');

    patientCollection.findOne({ patientId: deathInfo.patientID }, (err, result) => {
      if (err) {
        return res.json({ error: "Error occured while adding death report" });
      }

      if (!result) {
        return res.json({ error: "Patient with the ID " + deathInfo.patientID + " is not found" });
      }

      deathReport.findOne({ patientId: deathInfo.patientID }, (err, result) => {
        if (err) {
          return res.json({ error: "Error occured while adding death report" });
        }
        if(!result)
        {
          return res.json({error: "Patinet Death Report has already been  added "});
        }else{
          deathReport.insertOne(deathInfo, (err, result) => {
            if (err) {
              return res.json({ error: "Error occured while adding death report" });
            }
            return res.json({ status: "Patient death report has been added Successfully" });
          })
        }
      })
    });

  });


  router.post('/patientUserDetail', (req,res)=>{
    const userInfo = req.body;
    const id = userInfo.id;
    const patientCollection = database.collection('patientsBigData');

    patientCollection.findOne({patientId: id}, (err,result)=>{
      if(err){
        return res.json({error: "Error occured while reterving User Detail Data"});
      }
      return res.json(result);
    });

  });

  router.get('/birthReports',(req , res)=>{
    const birthReport = database.collection('birthReports');
    birthReport.find({}).toArray((err,result)=>{
      if(err){
        return res.json({error: "Error occured while reteriving birth report"});
      }
      return res.json(result);
    });
  });

  router.post('/addBirthReport', (req,res)=>{
    const childInfo = req.body;
    const birthReport = database.collection('birthReports');

    birthReport.findOne({childName : childInfo.childName}, (err,result)=>{
      if(err){
        return res.json({error: "Error occured while adding birth report"});
      }
      if(result){
        return res.json({error: "Child birth report has already been added"});
      }

      birthReport.insertOne(childInfo , (err,result)=>{
        if (err) {
          return res.json({ error: "Error occured while adding birth report"});
        }
        return res.json({ status: "Child Birth Report has been added Successfully" });
      });
    });

  });

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


  router.get('/notice', (req, res) => {
    const noticeCollection = database.collection('noticeBoard');
    noticeCollection.find({}).toArray((err, result) => {
      if (err) {
        return res.json({ error: "Error occured while reteriving Notifications" });
      }
      return res.json(result);
    });
  })


  return router;
}

module.exports = apiRouter;
