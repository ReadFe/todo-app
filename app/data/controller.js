const Data = require('./model');

const store = async (req, res, next) => {
    try {
        const {name, done} = req.body;
        const result = await Data.create({name, done});
        res.json(result);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }

        next(err);
    }
    
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        let {done} = req.body

        const result = await Data.updateOne(
            {_id: id}, 
            {$set: {done: done}}
        );
        res.json(result);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }

        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await Data.find();
        res.json(result);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }

        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Data.findByIdAndDelete(id);

        res.json(result);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
        return res.json({
            error: 1,
            message: err.message,
            fields: err.errors
        });
    }

    next(err);
    }
}

module.exports = {
    store,
    index,
    update,
    destroy
}