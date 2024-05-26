import express from "express";
import dotenv from "dotenv";
import { User, Property } from "./modules/mongoose.js";
import bcrypt from "bcrypt";

const app = express(); //import app module from express
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

dotenv.config();

/*Middlewares*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //parsing the incoming JSON data (stringified)

/*POST Routes*/
app.post("/register-user-server", (req, res) => {
  const userData = req.body;
  //create user document
  let email = req.body.email;
  userData["email"] = email.toLowerCase();
  //hashing
  bcrypt.hash(userData.password, saltRounds, (err, hash) => {
    if (err) {
      res
        .status(400)
        .json({ message: "User can not be created. Server Error" });
      console.log("User Can not be created", err);
    }

    userData["password"] = hash;
    User.create(userData)
      .then((user) => {
        let sendData = user;
        sendData["password"] = "";
        res.send(sendData);
      })
      .catch((err) => {
        res.status(400).json({
          error_code: err.code,
          error_msg: "User can not be created",
          error: err,
        });
        console.log("User Can not be created", err);
      });
  });
});

app.post("/login-user-server", (req, res) => {
  const loginData = req.body;
  //find the user and send essential data back
  User.findOne({ email: loginData.email })
    .then((user) => {
      if (!user) res.send(false);
      else {
        bcrypt.compare(loginData.password, user.password).then((result) => {
          if (!result) res.send(false);
          else {
            let sendData = user;
            sendData["password"] = "";
            res.send(sendData);
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error_code: err.code,
        error_msg: "Server Error",
        error: err,
      });
      console.log("Server Error", err);
    });
});

app.post("/register-property-server", (req, res) => {
  const propertyData = req.body;
  //02 additional fields are required
  const user_role = propertyData.user_role;
  if (user_role !== "seller")
    res.status(400).json({ message: "Only Seller User can list a property" });
  let slug=propertyData.place+"_"+Math.floor(Math.random()*1000);
  propertyData["slug"]=slug;
  const user_email = propertyData.createdBy;
  //register property and then embed it in the appropriate user document
  Property.create(propertyData)
    .then((property) => {
      if (property) {
        User.findOne({ email: user_email })
          .then((user) => {
            if (user) {
              user.user_properties.push(property);
              res.send(property);
            } else {
              res
                .status(400)
                .json({ message: "User can not be found in the database!!" });
            }
          })
          .catch((err) => {
            res.status(400).json({
              error_code: err.code,
              error_msg: "Error in finding the User",
              error: err,
            });
          });
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      res.status(400).json({
        error_code: err.code,
        error_msg: "Error in Listing the Property",
        error: err,
      });
    });
});

/*Update Routes*/

app.patch("/update-property-server", (req, res) => {
  const propertyData = req.body;
  //find the property and then update it
  Property.updateOne({ _id: propertyData._id }, { $set: propertyData })
    .then((result) => {
      res.send(result ? true : false);
    })
    .catch((err) => {
      res.status(409).json({
        error_code: err.code,
        error_msg: "Error in Updating this Property",
        error: err,
      });
    });
});

/*Delete Routes*/
app.delete("/delete-property-server/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;
  //find the property and delete it. also delete from the users' embeded properties array
  Property.deleteOne({ _id: propertyId })
    .then((result) => {
      User.updateOne(
        { user_properties: propertyId },
        { $pull: { user_properties: propertyId } }
      )
        .then((result) => {
          res.send(true);
        })
        .catch((err) => {
          res.status(400).json({
            error_code: err.code,
            error_msg: "Can not delete from Seller",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        error_code: err.code,
        error_msg:
          "Can not Delete Property. Server Error",
        error: err,
      });
    });
});

/*Get Routes*/

app.get("/api/get-properties", (req, res) => {
  //fetch all the properties from the collection and send to frontend
  Property.find({})
          .then(properties=>{
            res.send(properties);
          })
          .catch(err=>{
            res.status(400).json({
                error_code: err.code,
                error_msg:
                  "Error in Getting all the Properties",
                error: err,
              });
          })
});

//Server Run
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;