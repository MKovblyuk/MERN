const {Router} = require("express")
const router = Router()
const Link = require("../models/Link")

router.get("/:code", async (req, res) => {
    try{
        const link = await Link.findOne({code: req.params.code})
        if(link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.json("Link not found") 
    } catch(e){
        res.status(500).json({message: "something was wrong"})
    }
})

module.exports = router