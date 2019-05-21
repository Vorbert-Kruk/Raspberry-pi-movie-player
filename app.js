let express = require('express');
let app = express();
let fs = require('fs');
let playingIndex = -1;

const { exec } = require('child_process');
const appPort = 3000;

app.set('view engine', 'ejs');

app.use('/app', express.static('./'));

app.get('/app', (req, res) => {
    console.log(`Request has been made from ${req.hostname}`);
    fs.readdir('./Movies', (err, files) => {
        if(err)
            throw new Error(`Nie można było zczytać plików z katalogu ${__dirname + '\\Movies'}`);
        res.render('index.ejs', {
            moviesNames: files,
            currentMovie: playingIndex
        });
    });
});

app.get('/movies', (req, res) => {
    let responseObject = { movies: []};
    fs.readdir('./Movies', (err, files) => {
        files.forEach(file => {
            responseObject.movies.push({
                name: file
            });
        });
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(responseObject));
    });
});

app.get('/play/:movieIndex', (req, res) => {
    let movieIndex = req.params.movieIndex;
    fs.readdir('./Movies', (err, files) => {
        if(files.length >= movieIndex)
        {
            console.log(`Lel, uruchomie sobie film o nr ${movieIndex}`);
            let s = exec("omxplayer " + __dirname + `\\Movies\\${files[movieIndex]}`);
            console.log(files[0]);
            // console.log(s.pid);
            // console.log(s);
        }
    });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        message: `Film o id ${movieIndex} zostanie odtworzony`
    }));
});

app.listen(appPort, () => {
    console.log(`App is listening at the port ${appPort}`);
});