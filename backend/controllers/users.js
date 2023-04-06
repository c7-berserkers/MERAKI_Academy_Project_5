const {pool} = require('../models/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT)

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role_id,
    img
  } = req.body

  const emailLower = await email.toLowerCase()
  const bcryptPassword = await bcrypt.hash(password, saltRounds)

  const query = `INSERT INTO users (firstName,
        lastName,
        age,
        country,
        email,
        password,
        role_id,
        img) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`
  const data = [
    firstName,
    lastName,
    age,
    country,
    emailLower,
bcryptPassword,
    role_id,
    img
  ]

  pool.query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'user created successfully',
      })
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: 'The email already exists',
        err,
      })
    })
}

const login = (req, res) => {
  const password = req.body.password
  const email = req.body.email

  const emailLower = email.toLowerCase()
  const query = `SELECT * FROM users WHERE email = $1`

  const data = [emailLower]
  pool
    .query(query, data)
    .then(async(result) => {
      if (result.rows.length) {
        const t =await bcrypt.compare(password, result.rows[0].password)
        console.log(t)
        if (t) {
          const payload = {
            userId: result.rows[0].id,
            country: result.rows[0].country,
            role: result.rows[0].role_id,
          }
          const options = { expiresIn: '1d' }
          const secret = process.env.SECRET
          const token = jwt.sign(payload, secret, options)
          if (token) {
            return res.status(200).json({
              success: true,
              message: `Valid login credentials`,
              token,
              result: result.rows,
            })
          } else {
            throw Error
          }
        } else {
          res.status(403).json({
            success: false,
            message: `The email doesn’t exist or the password you’ve entered is incorrect`,
          })
        }
      } else throw Error
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          'The email doesn’t exist or the password you’ve entered is incorrect',
        err,
      })
    })
}



module.exports = {
    register,
    login,
  };
  