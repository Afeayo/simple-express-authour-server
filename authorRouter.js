const express = require('express');
const router = express.Router();
const Joi = require('joi'); 

let authors = [
    { id: 1, name: "Mr Tobi The Chef", books: ["Intro to Backend", "introd to Nodejs"] },
    { id: 2, name: "Afe Ayo Sunday", books: ["The Junior Backend Dev"] }
];

const authorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    books: Joi.array().items(Joi.string())
});

router.get('/', (req, res) => {
    res.send(authors);
});

router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');
    res.send(author);
});

router.post('/', (req, res) => {
    const { error } = authorSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const author = {
        id: authors.length + 1,
        name: req.body.name,
        books: req.body.books || []
    };
    authors.push(author);
    res.status(201).send(author);
});

router.put('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');

    const { error } = authorSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    author.name = req.body.name;
    author.books = req.body.books || [];
    res.send(author);
});

router.delete('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');

    const index = authors.indexOf(author);
    authors.splice(index, 1);
    res.send(author);
});

module.exports = router;
