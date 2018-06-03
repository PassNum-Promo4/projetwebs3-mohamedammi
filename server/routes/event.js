const router = require('express').Router();
const Event = require('../models/event');

const checkJWT = require('../middlewares/check-jwt');

router.route('/')
    .get(checkJWT, (req, res, next) =>{
        Event.find({owner: req.decoded.user._id})
        .populate('owner')
        .populate('category')
        .exec((err, events) =>{
            if(events) {
              res.json({
                success: true,
                message:'events',
                events: events
                });  
            }
        });
        
    })
    .post(checkJWT, (req, res, next) =>{
        let event = new Event();
        event.owner = req.decoded.user._id;
        event.category = req.body.categoryId;
        event.title = req.body.title;
        event.place = req.body.place;
        event.date = req.body.date;
        event.description = req.body.description;
        event.save();
        res.json({
            success: true,
            message: 'successfully added the event'
        });
    });

module.exports = router;    