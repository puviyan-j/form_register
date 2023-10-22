const express = require("express");
const mongoose = require('mongoose');
const userSchema = require('./model/register');
const cors = require('cors')
const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {auth} = require("./auth/auth")


mongoose.connect(process.env.db)
    .then(() => {
        app.listen(5000, () => {
            console.log("server connect")
        })
    })
    .catch(() => { console.log('db not connected') })


const app = express();

app.use(express.json());
app.use(cors())


app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body
        const datas = await userSchema.findOne({ email });
        if (!datas) { res.json("email not found") }
        const compare_password = await bcrypt.compare(password, datas.password)
        if (compare_password) {
            const token = jwt.sign({ id: email._id }, process.env.s_key)
            res.json({ admin: datas.admin,token:token })
        }
        else {
            res.status(400).send("password not match")
        }
    }
    catch (error) {
        res.send({error:error.message})
    }


})

app.get('/getdata',auth,async (req, res) => {

    try {
        const view = await userSchema.find({})
        const view_data = view.map(save => {
            return {
                _id: save._id,
                firstname: save.firstname,
                lastname: save.lastname,
                email: save.email,
                phone: save.phone,
                service: save.service,
                term: save.term,
            }
        });
        res.json(view_data)
    }
    catch (error) {
        res.send({error:error.message})
    }
})

app.post('/register', async (req, res) => {

    try {

        const password = await bcrypt.hash(req.body.password, 7)
        const data = new userSchema({
            ...req.body, password: password
        })
        const save = await data.save();

        const datas = {
            _id: save._id,
            firstname: save.firstname,
            lastname: save.lastname,
            email: save.email,
            phone: save.phone,
            service: save.service,
            term: save.term,
            admin: save.admin
        }
        res.json(datas)
    }
    catch (error) { res.send(error.message) }


})

