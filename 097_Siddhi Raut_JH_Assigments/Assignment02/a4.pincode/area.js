const express = require('express');
const app = express();
const mysql = require('mysql2');


let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'area',
    port: 3306
};

const con = mysql.createConnection(dbparams);

app.use(express.static("staticfolder"));


app.get("/inarea", (req, resp) => {

    let pin = req.query.p;
    let ot = { status: false, msg: "Not present" };
    console.log(pin);
    con.query('select areaa from areapincode where pincode =?', [pin],
        (err, rows) => {

            if (err) {
                console.log("From  not database");
            } else {
                if (rows.length > 0) {
                    ot.msg = rows[0].areaa;
                    console.log("From database");
                    console.log(ot.msg);

                }

            }
            resp.send(ot);
        }
    );



});

app.listen(800, function () {
    console.log("server listening at port 900...");
});