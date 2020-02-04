const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

/**
 * @route  POST api/users
 * @desc   Register user
 * @access Public
 */
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User alredy exists" }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default image
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10); // The bigger the genSalt, the more secure (but slower to compute)
      user.password = await bcrypt.hash(password, salt); //Hashes the password with the salt string generated

      //Save to Database
      await user.save();

      //Return JsonWebToken to login after registring
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"), //found in default.json
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error("Error in users.js: " + err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
