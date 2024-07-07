const Data = require('./model');

const store = async (req, res, next) => {
    const {name, done} = req.body;

    Data.create({name, done})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const update = async (req, res, next) => {
    const id = req.params.id;
    let {done} = req.body;

    Data.updateOne(
        { _id: id },
        { $set: {done: done} }
    )
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const index = async (req, res, next) => {
    Data.find()
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const destroy = async (req, res, next) => {
    const id = req.params.id;

    Data.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

module.exports = {
    store,
    index,
    update,
    destroy
}