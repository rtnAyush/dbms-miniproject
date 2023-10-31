const jwt = require('jsonwebtoken')

const checkAuth = async (req, res, next) => {
  // console.log('AuthFunc middleware called', req.headers.authorization.split(' ')[1]);
  // console.log('AuthFunc middleware called', req.headers.authorization);

  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1]

    // console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // console.log('JWT verification failed:', err);
        return res
          .status(400)
          .json({ msg: 'Session timeout! Please Login again' })
      } else {
        req.user = user
        req.token = token
        next()
      }
    })
  } else {
    return res.status(400).json({ msg: 'unauthorized access' })
  }
}

module.exports = checkAuth
