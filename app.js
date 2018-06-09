const express        = require('express');
const bodyParser     = require('body-parser');
const index          = require("./index.js");

const app            = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();  

router.post('/createTinyUrl/', index.createTinyUrl);
router.post('/createTinyUrl/:urlcode', index.createCustomTinyUrl);
router.get('/', index.helloWorld);
router.get('/:urlcode', index.redirectToUrl);
app.use("/", router);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
