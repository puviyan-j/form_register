const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    const tokens = await req.header("Authorization");
    try{
        if (!tokens) { return res.status(400).send("access Denied") }

        const verify = jwt.verify(tokens, process.env.s_key)
    
        req.user = verify
    
        next()
    }
    catch(err){ res.send({error:err.message})}

}

module.exports = { auth }