const {Router} = require("express")
const User = require("../models/User")
const passwordHash = require("password-hash")
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const router = Router()

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "Password should be longer than 5 symbols")
            .isLength({min: 6})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data during registration"
                })
            }

            const {email, password} = req.body

            const candidate = User.findOne({email})

            if(candidate){
                return res.status(400).json({message: "Current user exist"})
            }

            hashedPassword = passwordHash.generate(password[0])
            const user = new User({email: email[0], password: hashedPassword})
            await user.save()

            res.status(201).json({message: "User has been created"})

        } catch(e){
            res.status(500).json({message: "something was wrong"})
    }
})

// /api/auth/login
router.post(
    "/login", 
    [
        check("email","Enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data during login"
                })
            }

            const {email, password} = req.body
           
            const user = await User.findOne({email: email})
            if(!user){
                return res.status(400).json({message: "User does not exist"})
            }
            
            const isMatch = passwordHash.verify(password[0], user.password)
            if(!isMatch){
                return res.status(400).json({message: "Incorrect password"})
            }


            const token = jwt.sign(
                {userId: user.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )

            res.json({token, userId: user.id})

        } catch(e){

        }
    }
)


module.exports = router