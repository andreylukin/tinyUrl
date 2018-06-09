const mySQLDBConnector = require("./mySQLDBConnector.js");

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function mySQLDB() {
    return new mySQLDBConnector( "localhost", "root", "", "tinyurl");
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}


async function createTinyUrl(request, response) {
        var requestedUrl = request.body.url;
        var sqlResponseBoolen = true;
        var code;
        while(sqlResponseBoolen) {
            code = makeid();
            var sqlresponse = await mySQLDB().checkCode({url_code :code});
            if(sqlresponse.length == 0) {
                sqlResponseBoolen = false;
            }
        }
        var insertResponse = await mySQLDB().insertUrl({url: requestedUrl, code: code});
        console.log(insertResponse);
        response.send("Your website is at url: https://tiny.localtunnel.me/" + code);
}

async function createCustomTinyUrl(request, response) {
    var requestedUrl = request.body.url;
    var sqlResponseBoolen = true;
    var code = request.params.urlcode ;
    var sqlresponse = await mySQLDB().checkCode({url_code :code});
    if(sqlresponse.length == 0) {
        console.log("ass");
        code = request.params.urlcode;
    } else {
        while(sqlResponseBoolen) {
            code = makeid();
            var sqlresponse = await mySQLDB().checkCode({url_code :code});
            if(sqlresponse.length == 0) {
                sqlResponseBoolen = false;
            }
        } 
    }
    var insertResponse = await mySQLDB().insertUrl({url: requestedUrl, code: code});
    console.log(insertResponse);
    response.send("Your website is at url: https://tiny.localtunnel.me/" + code);
}

async function redirectToUrl(request, response) {
    try {
        var urlCode = request.params.urlcode;
        var redirectUrl = await mySQLDB().getRedirected({url: urlCode});
        url = redirectUrl[0].url;
        response.writeHead(302, {location: url});
        response.end();
    } catch (e) {
        console.log(e);
    }
}

function helloWorld(request, response) {
    try {
        mySQLDB();
        response.set('Content-Type', 'application/json');
        response.sendStatus("200");
    } catch(e) {
        console.log(e);
    } 
}









module.exports.createCustomTinyUrl = createCustomTinyUrl;
module.exports.helloWorld = helloWorld;
module.exports.createTinyUrl = createTinyUrl;
module.exports.redirectToUrl = redirectToUrl;