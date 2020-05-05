const { Router } = require('express');
const router = Router();
const fs = require('fs');
const {v4:uuidv4} = require('uuid');


const json_books=fs.readFileSync('src/books.json','utf-8');//lee el books.json
let books= JSON.parse(json_books);//v2 toma un json y toma lo que esta en string y lo pone en json
//guardaremos inicialmente los libros en este arreglo


router.get('/', (req, res) => {
    res.render('index.ejs',{
        books
    })
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
})


router.post('/new-entry', (req, res) => {//se crea una ruta a traves de POST y recive lo de new-entry
    
    const {title, author, image, description } = req.body;
    
    if(!title||!author||!image||!description){//validacion v2
        res.status(400).send('Entries must have a title and description');
        return;
    }

    let newBook = {
        id: uuidv4(),
        title,
        author,
        image,
        description
    }
    //validacion v1
    // if(!req.body.title|| !req.body. ....)
    books.push(newBook);
    //para ver los datos en console log y para ver los datos en formato json es(req.body.json)
    //v2 nos dice undefined cuando subimos los datos la forma correcta de ponerlo es (req.body)
    //v3 cambiamos el console.log(req.body) por books.push(req.body)
    //v4 el req.body los cambiamos por newBook
    
    const  json_books = JSON.stringify(books);//toma un json (convierte el arreglo en string del arreglo)

    fs.writeFileSync('src/books.json', json_books, 'utf-8');//escribe de manera asincronica, (crea escribe book.json, donde lo escribe, formato) 
    
    res.redirect('/');
    //v1  res.send('received');
});

router.get('/delete/:id',(req,res) => {
    
    books=books.filter(book => book.id!=req.params.id);

    const  json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('/');
    //v1 muestra por consola
    //console.log(req.params);
    //res.send('received')
})

module.exports = router;


// modulo fs (filesystem) de node para leer archivos