const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false} ));
//app.use(express.static('root'));

const port = 3000;

app.use(express.static('dist'))
const server = app.listen(port, () => {
    console.log(`server running`);
    console.log(`console is running on port ${port}`);
})

const projectData = [];

app.get('/', (req, res) => {
    res.send(projectData);
    res.sendFile('./dist/index.html')
})

app.post('/', (req, res) => {
   
    const newData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    };

    projectData.push(newData);
    //res.send(newData);
    console.log(newData);

})

module.exports = app;