const express = require("express");
const cookieParser = require('cookie-parser');
const {rateLimit} = require('express-rate-limit')
const bodyParser = require('body-parser')
const ClientError = require('../../utils/client-error')
const {User} = require("../../models/index")
const router =  express.Router()
router.use(cookieParser('your_secret_key'));
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	
})
const UserController = require('../../controller/user-controller')


const {validateUserAuth, validateIsAdminRequest, validateLogin, validateForgotPassRequest, validateResetPassRequest} = require('../../middleware/index');

router.delete("/deleteAccount", async (req, res) => {
  console.log("reached inside")
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const response = await User.destroy({
      where:{
        email
      }
    })
    if(!response) throw new Error("cannot delete")
    return res.status(200).json({ success: true, message: "Account deleted" });
  } catch (err) {
    console.error("Error deleting account:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post('/users', validateUserAuth, UserController.create) //signup

router.get('/users/status/isAuthenticated',validateLogin,UserController.isAuthenticated)
router.get('/users/status/isAdmin/:userId',validateIsAdminRequest ,UserController.isAdmin)
// Sample users list (Replace with database later)
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
  ];
  
  // Get all users
  router.get("/getAll", (req, res) => {
    res.json(users);
  });

router.post('/users/session', validateUserAuth ,UserController.signIn) //signin
router.delete('/users/session', validateLogin,UserController.logout)                  //logout


router.get('/users/password/forgot',limiter, validateForgotPassRequest,UserController.forgotPass)
router.patch('/users/password/reset', validateResetPassRequest, UserController.resetPass)


router.use((err, req, res, next) => {
    
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            success: false,
            name: err.name,
            message: err.message,
            explanation: err.explanation,
            statusCode: err.statusCode
        });
    }

    // Handle unexpected errors with a generic 500 response
    res.status(500).json({ message: "Something went wrong!" });
});


module.exports = router;