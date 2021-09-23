var express = require("express");
var ObjectID = require('mongodb').ObjectID;

var DB = process.env.DB;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;

var URL = "http://localhost:4000/"

var template = require("./public/assets/utils/template.js")
var path = require('path');
var fs = require('fs');

var bodyParser = require('body-parser');
var app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./website");

//to import mongodb 
var MongoClient = require('mongodb').MongoClient;
const { response } = require("express");
//mydb is the new database we want to create
var url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB}:27017/`;

var collName1 = "batteries"
var collName2 = "logs"
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    var dbo = db.db("battmanage");
    dbo.listCollections({name: collName1})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log(`Collection ${collName1} exist already!`);
        } else {
        dbo.createCollection(collName1, function(err, res) {
          if (err) throw err;
          console.log(`Collection ${collName1} created!`);
          db.close();
        });
    };
    });
    dbo.listCollections({name: collName2})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log(`Collection ${collName2} exist already!`);
        } else {
        dbo.createCollection(collName2, function(err, res) {
          if (err) throw err;
          console.log(`Collection ${collName2} created!`);
          db.close();
        });
    };
    });
});

app.listen(4000, function () {
    console.log('Server started !')
   })

app.get("/", function(request, response)  {
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("battmanage");
        var query_storage = { Status: "Storage" };
        dbo.collection("batteries").find(query_storage).toArray(function(err, storage) {
            if(err)
            throw err;
        else {
            //console.log(storage.length);
            var query_hs = { Status: "Out of service" };
            dbo.collection("batteries").find(query_hs).toArray(function(err, hs) {
                if(err)
                throw err;
            else {
                //console.log(hs.length);
                var query_charged = { Status: "Charged" };
                dbo.collection("batteries").find(query_charged).toArray(function(err, charged) {
                    if(err)
                    throw err;
                else {
                    //console.log(charged.length);
                    var query_used = { Status: "Used" };
                    dbo.collection("batteries").find(query_used).toArray(function(err, used) {
                        if(err)
                        throw err;
                    else {
                        var sort = { Date: -1 };
                        dbo.collection("logs").find().sort(sort).toArray(function(err, logs) {
                            if(err)
                            throw err;
                        else {
                            //console.log(used.length);
                            response.render('index' ,{ logs: logs, storage: storage.length, charged: charged.length, hs: hs.length, used: used.length  });
                        }
                        });
                        
                    }
                    });
                }
            });
            }
        });
        }
    });
        
        
        
      });

});

app.get("/batt-informations", function(request, response,)  {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("battmanage");
        dbo.collection("batteries").find().toArray(function(err, result) {
            if(err)
            throw err;
        else {
            //response.render('/batt-informations', { batteries: result });
            response.render('batt-informations', { batteries: result });
            //console.log(result);
        }
        });
      });
});

app.post('/batt-informations/getJson', function (req, res) {
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var battery_name = req.body.battery_name;
        console.log(battery_name);
        var dbo = db.db("battmanage");
        var query = { Name: battery_name };
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            pageid = result[0]._id.toHexString();
            //console.log(pageid)
            res.redirect(`/batteries/${pageid}`)
            //console.log(result);
        }
        });
      });

 });


app.get("/inventory", function(request, response)  {
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("battmanage");
        var query = { Brand: "TBS" };
        dbo.collection("batteries").find().toArray(function(err, result) {
            if(err)
            throw err;
        else {
            response.render('inventory', { batteries: result, URL: URL });
            //console.log(result);
        }
        });
      });
    
});

app.get("/Update-battery", function(request, response)  {
   
    response.render("Update-battery");
});

app.get("/add-battery", function(request, response)  {

    response.render("add-battery");
    
});


app.post('/add-battery-form', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        delete req.body._id; // for safety reasons
        var dbo = db.db("battmanage");
        req.body.Cycles = parseInt(req.body.Cycles);
        dbo.collection('batteries').insertOne(req.body);

        var query = { Name: req.body.Name }
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            var pageid = result[0]._id.toHexString();
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$set: { bID: pageid }});
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            message = ""
            dbo.collection("logs").insertOne({  Date: date, BatteryID: pageid, BatteryName: result[0].Name, Action: "Battery added !", Message: message });
            dbo.collection("batteries").find(result[0]._id).toArray(function(err, newresult) {
                if(err)
                throw err;
            else {
                //console.log(newresult)
                var pagejs = template(newresult[0])
                fs.writeFile(path.join(__dirname, `website/batteries/${pageid}.ejs`), pagejs, (err) => {
                    if (err) throw err;
                });
            }
            });
        }
        });
        
    });    
    res.redirect('/inventory');
});

app.post('/modify-battery-form/:id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        delete req.body._id; // for safety reasons
        req.body.Cycles = parseInt(req.body.Cycles);
        var dbo = db.db("battmanage");
        var battery_id = { bID: req.params.id};
        console.log(req.body)
        var newvalues = { $set: req.body };
        dbo.collection("batteries").updateOne(battery_id, newvalues, function(err, res) {
          if (err) throw err;
          var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          message = ""
          dbo.collection("logs").insertOne({  Date: date, BatteryID: req.params.id, BatteryName: req.body.Name, Action: "Battery edited manually !", Message: message });
        });
        
    });    
    res.redirect(`/batteries/${req.params.id}`);
});

app.get("/batteries/:id", function(request, response)  {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var battery_id = request.params.id;
        var dbo = db.db("battmanage");
        var query =  new ObjectID(battery_id);
        dbo.collection("batteries").find(query).toArray(function(err, resultbat) {
            if(err)
            throw err;
        else {
            var sort = { Date: -1 };
            var query = { BatteryID: request.params.id };
            dbo.collection("logs").find(query).sort(sort).toArray(function(err, logs) {
                if(err)
                throw err;
            else {
                dbo.collection("batteries").find().toArray(function(err, result) {
                    if(err)
                    throw err;
                else {
                    response.render(`./batteries/${request.params.id}`, { logs: logs,batteries: result, battery: resultbat[0] });
                
                }
                });
            //console.log(resultbat);
                }
            });
            }
        });
      });

    //response.render(`./batteries/${request.params.id}`);
    
});

app.post("/batteries/:id/charged", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("battmanage");
        var battery_id = req.params.id;
        var query = { bID: battery_id }
        console.log(query)
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            var state = "Charged";
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$set: { Status: state }});
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$inc: { Cycles: 1 }});
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            message = "";
            dbo.collection("logs").insertOne({  Date: date, BatteryID: result[0].bID, BatteryName: result[0].Name, Action: "Status change to : Charged", Message: message });
            
        }
        });
        
    });    

    res.redirect('back');
    

 });

 app.post("/batteries/:id/used", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("battmanage");
        var battery_id = req.params.id;
        var query = { bID: battery_id }
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            var state = "Used";
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$set: { Status: state }});
            var date = new Date().toISOString().slice(0, 10);
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$set: { LastUsage_date: date }});
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            message = ""
            dbo.collection("logs").insertOne({  Date: date, BatteryID: result[0].bID, BatteryName: result[0].Name, Action: "Status change to : Used", Message: message });
        }
        });
        
    });    

    res.redirect('back');
    

 });

 app.post("/batteries/:id/storage", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("battmanage");
        var battery_id = req.params.id;
        var query = { bID: battery_id }
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            var state = "Storage";
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$set: { Status: state }});
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            message = ""
            dbo.collection("logs").insertOne({  Date: date, BatteryID: result[0].bID, BatteryName: result[0].Name, Action: "Status change to : Storage", Message: message });
        }
        });
        
    });    

    res.redirect('back');
    

 });

 app.post("/batteries/:id/hs", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("battmanage");
        var battery_id = req.params.id;
        var query = { bID: battery_id }
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            var state = "Out of service";
            dbo.collection("batteries").updateOne({ _id: result[0]._id }, {$set: { Status: state }});
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            message = ""
            dbo.collection("logs").insertOne({  Date: date, BatteryID: result[0].bID, BatteryName: result[0].Name, Action: "Status change to : Out of service", Message: message });
        }
        });
        
    });    

    res.redirect('back');
    

 });

 app.post("/batteries/:id/delete", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("battmanage");
        var battery_id = req.params.id;
        var query = { bID: battery_id }
            dbo.collection("batteries").deleteOne(query, function(err, obj) {
                if(err)
                throw err;
            else {
                var chemin = `website/batteries/${battery_id}.ejs`
                fs.unlink(chemin, (err) => {
                    if (err) throw err;
                });
                var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                message = ""
                dbo.collection("logs").insertOne({  Date: date, BatteryID: battery_id, Action: "Battery deleted !", Message: message });
            }
            });
        
    });    

    res.redirect('/inventory');
    

 });

 app.get("/batteries/:id/edit", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("battmanage");
        var battery_id = req.params.id;
        var query = { bID: battery_id }
        console.log(query)
        dbo.collection("batteries").find(query).toArray(function(err, result) {
            if(err)
            throw err;
        else {
            res.render('update-battery', { battery: result[0] });
            
        }
        });
        
    });    

});
