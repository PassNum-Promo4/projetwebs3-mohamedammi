const router = require('express').Router();
const async = require('async');
const Category = require('../models/category');
const Event = require('../models/event');

router.get('/events', (req, res, next) =>{
    const perPage = 10;
    const page = req.query.page
    async.parallel([
        function(callback) {
            Event.count({}, (err, count) =>{
                var totalEvents = count;
                callback(err, totalEvents);
            });
        }, 
        function( callback ) {
            Event.find({})
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .exec((err, events) => {
                    if(err) return next(err);
                    callback(err, events);
                    
                });
        }
       
    ], function(err, results) {
        var totalEvents = results[0];
        var events = results[1];
       

        res.json({
            success: true,
            message: 'category',
            events: events,
            totalEvents: totalEvents,
            pages: Math.ceil(totalEvents / perPage)

        });
    });
});

router.route('/categories')
    .get((req, res, next) => {
        Category.find({}, (err, categories) =>{
            res.json({
                success: true,
                message: 'Success',
                categories: categories
            })
        })
    })
        .post((req, res, next) =>{
            let category = new Category();
            category.name = req.body.category;
            category.save();
            res.json({
                success: true,
                message: 'successful'
            });

        });

router.get('/categories/:id', (req, res, next) =>{
    const perPage = 10;
    const page = req.query.page
    async.parallel([
        function(callback) {
            Event.count({ category: req.params.id}, (err, count) =>{
                var totalEvents = count;
                callback(err, totalEvents);
            });
        }, 
        function( callback ) {
            Event.find({ category: req.params.id})
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .exec((err, events) => {
                    if(err) return next(err);
                    callback(err, events);
                    
                });
        },
        function( callback){
            Category.findOne({ _id: req.params.id}, (err, category) =>{
               callback(err, category)
            });
        }
    ], function(err, results) {
        var totalEvents = results[0];
        var events = results[1];
        var  category = results[2];

        res.json({
            success: true,
            message: 'category',
            events: events,
            categoryName: category.name,
            totalEvents: totalEvents,
            pages: Math.ceil(totalEvents / perPage)

        });
    });
});

router.get('/event/:id', (req, res, next) =>{
    Event.findById({ _id: req.params.id})
        .populate('category')
        .populate('owner')
        .exec((err, event) =>{
            if(err){
                res.json({
                    success:false,
                    message: 'Event is not found'
                });
            } else {
                if(event) {
                    res.json({
                        success: true,
                        event: event
                    });
                }
            }
        });
});

router.post('/event/:id', (req, res, next) =>{
    Event.findById({ _id: req.params.id})
        .populate('category')
        .populate('owner')
        .exec((err, event) =>{
            if(err){
                res.json({
                    success:false,
                    message: 'Event is not found'
                });
            } else {
            if(req.body.categoryId) event.category = req.body.categoryId;
            if(req.body.title) event.title = req.body.title;
            if(req.body.date) event.date = req.body.date;
            if(req.body.place) event.place = req.body.place;
            if(req.body.description) event.description = req.body.description;
            
            
            event.save();
            res.json({
                success: true, 
                message: 'Successfully edited your event'
            });
        }
        });
    })

router.delete('/event/:id', (req, res, next) =>{
    Event.findById({ _id: req.params.id})
        .populate('category')
        .populate('owner')
        .exec((err, event) =>{
            if(err){
                res.json({
                    success:false,
                    message: 'Event is not found'
                });
            } else {
                event.remove();
                res.json({
                    success: true, 
                    message: 'Successfully deleted your event'
                });
            }
        });
    });

module.exports = router;        