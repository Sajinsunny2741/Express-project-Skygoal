const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

let Article = require('../models/e1article');
let Article2 = require('../models/e1article2');

var token;



router.use('/', async function (req, res, next) {
    if (req.path != '/login' && req.path != '/signup') {
        const bearerd = req.headers["authorization"];
        var reqtoken2 = 0;

        if (typeof bearerd !== "undefined" && typeof token !== "undefined") {
            const bearer = bearerd.split(" ");
            const token2 = bearer[1];

            await jwt.verify(token2, "mashup_secret_key", (err, authdata) => {
                if (err) {
                    res.json({ success: false, message: "Error! Token is invalid." });
                } else {
                    reqtoken2 = 1;
                    stringmessage=authdata
                }
            });
        } else {
            res.status(200).json({ success: false, message: "Error! Token was not provided. Please log in" });
        }
    }
    next();
});




router.post('/signup', function (req, res) {
    let article2 = new Article();
    article2.username = req.body.username;
    article2.password = req.body.password1;

    let query = { username: req.body.username };
    let eerrors = [1, 2];

    Article.findOne(query)
        .then(doc => {
            if (doc) {
                eerrors[0] = "User Name already exists";
                console.log(eerrors[0]);
                res.json(eerrors[0]);
            } else {
                if (req.body.password1 != req.body.password2) {
                    eerrors[1] = "Both passwords should be the same";
                    console.log(eerrors[1]);
                    res.json(eerrors[1]);
                } else {
                    article2.save()
                        .then(doc => {
                            res.json({ message: "signup completed." });
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
});




router.post('/login', async function (req, res) {
    let query = { username: req.body.username, password: req.body.password };
    Article.findOne(query)
        .then(doc => {
            if (doc) {
                token = jwt.sign(
                    { userId: req.body.username, email: req.body.password },
                    "mashup_secret_key",
                    { expiresIn: "1h" }
                );
                res.json({
                    data: {
                        userId: req.body.username,
                        token: token,
                    },
                });
               
            } else {
                res.json({ message: "invalid credentials" });
            }
        })
        .catch(err => {
            console.log(err);
        });
});



router.post('/adddata', function (req, res) {
    if (reqtoken2 = 1) {
        let article = new Article2();
        article.medicinename = req.body.medicinename;
        article.description = req.body.description;
        article.Expirydate = req.body.Expirydate;
        article.price = req.body.price;
        article.itemcount = req.body.itemcount;

        article.save()
            .then(doc => {
                res.json({ loggeduser: stringmessage.userId, message: "data successfully added" });
            })
            .catch(err => {
                console.error(err);
            });
    }
});





router.get('/list', function (req, res) {
    if (reqtoken2 = 1) {
        Article2.find()
            .then(doc => {
                res.json({ loggeduser: stringmessage.userId, result: doc });
            })
            .catch(err => {
                console.error(err);
            });
    }
});




router.get('/view/:id', function (req, res) {
    if (reqtoken2 = 1) {
        Article2.findById(req.params.id)
            .then(doc => {
                if (doc) {
                    res.json({ loggeduser: stringmessage.userId, result: doc });
                } else {
                    res.json({ message: "id doesn't match" });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
});




router.post('/edit/:id', function (req, res) {
    if (reqtoken2 = 1) {
        let article = {};
        article.medicinename = req.body.medicinename;
        article.description = req.body.description;
        article.Expirydate = req.body.Expirydate;
        article.price = req.body.price;
        article.itemcount = req.body.itemcount;

        let query = { _id: req.params.id };
        Article2.findOneAndUpdate(query, article)
            .then(doc => {
                if (doc) {
                res.json({ loggeduser: stringmessage.userId, message: "new data edited." });} 
                 else {
                    res.json({ message: "id doesn't match" });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
});






router.post('/delete/:id', function (req, res) {
    if (reqtoken2 = 1) {
        let query = { _id: req.params.id };
        Article2.findOneAndRemove(query)
            .then(doc => {
                if (doc) {
                    res.json({ loggeduser: stringmessage.userId, message: "deleted" });
                } else {
                    res.json({ loggeduser: stringmessage.userId, message: "id entered doesn't exist" });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
});









router.get('/logout', function (req, res) {
    if (reqtoken2 = 1) {
        token = undefined;
        res.json({ message: "Log out completed" });
    }
});

module.exports = router;
