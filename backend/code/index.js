import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';

const __dirname = path.resolve(path.dirname(''));
dotenv.config({ path: path.resolve(__dirname, '.env') });
const client = new MongoClient(`mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.URI}`, 
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const blog = client.db(process.env.DB).collection(process.env.COL);
const app = express();
const frontend = 'http://localhost:'+process.env.FRONTEND_PORT+'/';
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', frontend);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/* Functions */


/* End Points */
var tokens = [];
app.post("/login", (request,response) => {
    const rand = () => {
        return Math.random().toString(36).substr(2);
    };
    const token = () => {
        console.log("INFO: Token generated");
        return rand() + rand();
    };
    const generatedToken = token();

    console.log("INFO: "+request.body.username + ' | ' + request.body.password);
    if(request.body.username === "nithjoe1" && request.body.password === "poggy") {
        console.log("INFO: Token Validated");
        tokens.push(generatedToken);
    }
    return response.redirect(frontend+"login?token="+generatedToken);
});

app.get("/login", (request,response) => {
    let isFound = false;
    for(let i = 0; i < tokens.length; i++) {
        if(request.query.token === tokens[i]) {
            console.log("INFO: Token Matched");
            isFound = true;
            break;
        }
    }

    return response.json({
        "loggedIn": isFound
    });
});

app.get("/posts", (request, response) => {
    function success(val) {
        console.log('Resolved: ', val);
    }
    function error(err) {
        console.log('ERROR: ', err);
        response.json(err);
    }

    client.connect(async err => {
        if(err) {
            response.status(400).send("Error connecting to DB!");
            console.log("ERROR: DB connection");
        }
        else {
            console.log("GET: Posts");
            let ans = await blog.find().sort({date: -1}).toArray().catch(error);
            //console.log(ans);
            response.json(ans);
        }
        await client.close();
    });
});

app.get("/posts/:postId", (request, response) => {
    function success(val) {
        console.log('Resolved: ', val);
    }
    function error(err) {
        console.log('ERROR: ', err);
        response.json(err);
    }

    client.connect(async err => {
        if(err) {
            response.status(400).send("Error connecting to DB!");
            console.log("ERROR: DB connection");
        }
        else {
            console.log("GET: Post("+postId+")");
            let ans = await blog.findOne({
                _id: ObjectId(request.params.postId)
            }).then(success,error);
            //console.log(ans);
            response.json(ans);
        }
        await client.close();
    });
});

app.post("/edit", (request, response) => {
    function success(val) {
        console.log('Resolved: ', val);
        response.redirect(frontend+'projects');
    }
    function error(err) {
        console.log('ERROR: ', err);
        response.json(err);
    }

    client.connect(async err => {
        if(err) {
            response.status(400).send("Error connecting to DB!");
            console.log("ERROR: DB connection");
        }
        else {
            if(request.body.type == 'edit') {
                await blog.updateOne(
                    {
                        _id: ObjectId(request.body.postid)
                    }, 
                    {
                        $set: {
                            title: request.body.title,
                            subtitle: request.body.subtitle,
                            content: request.body.contents
                        }
                }).then(success,error);
            }
            else if(request.body.type == 'create') {
                await blog.insertOne({
                    title: request.body.title,
                    subtitle: request.body.subtitle,
                    date: new Date(),
                    content: request.body.contents
                }).then(success,error);
            }
        }

        await client.close();
    });
});

app.post("/delete", (request,response) => {
    function success(val) {
        console.log('Resolved: ', val);
        response.redirect(frontend+'projects');
    }
    function error(err) {
        console.log('ERROR: ', err);
        response.json(err);
    }

    client.connect(async err => {
        if(err) {
            response.status(400).send("Error connecting to DB!");
            console.log("ERROR: DB connection");
        }
        else {
            await blog.deleteOne({_id: ObjectId(request.body.postid)})
            .then(success,error);
        }
        
        await client.close();
    });
});


app.listen(process.env.PORT);