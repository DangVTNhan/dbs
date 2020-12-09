const mysql = require("mysql")

// var myConnection = mysql.createConnection({
//     host:'localhost',
//     user: 'root',
//     password:'conmeno123',
//     database: 'dbs',
//     port: "1224",
// })

// myConnection.connect(err=>{
//     if(!err)
//         console.log("Success to connect to db")
//     else
//         console.log("Err orcure: ", JSON.stringify(err,undefined,2))
// })

export function loginDB(username,password){
    try{
        let myConnection = mysql.createConnection({
        host:'4.tcp.ngrok.io',
        user: username,
        password:password,
        database: 'dbs_assignment2',
        port: "15004",
        })
        return myConnection
    }catch(err){
        return err
    }
}


