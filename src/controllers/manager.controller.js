const db = require('../db')
const index = require('../index')
const app = require('../app')
const uuid = require('uuid')
let managerConnection = []

export function isLogin(req,res,next){
    console.log(req.session)
    if(req.session.userId==undefined){
        res.send("Unauthenticated")
    }
    else{
        next()
    }
}

export async function login(req,res,next){
    let username = req.body.username
    let password = req.body.password
    let connection =  db.loginDB(username,password)
    managerConnection =  [
        ...managerConnection,
        connection
    ]
    if(req.session.userId != undefined)
    {
        res.send("Login yet")
    }
    else{
        connection.connect(function(err){
                if(err) {
                    res.send(err)
                    console.log(err)

                    next()
                }
                else{
                    // req.session.isLogin = true
                    req.session.userId = managerConnection.length - 1
                    res.send({message: "success",status:200})
                    next()
                }
            }
        )
    }
}

export async function logout(req,res,next){
    let userID = req.session.userId
    
    req.session.destroy(err=>{
        if(err){
            return res.send({message:"Err at destroying session"})
        }
        managerConnection[userID].end()
        console.log("Close database connection")
        res.clearCookie("sid")
        res.send({message:"Logout Success",status:200})
        next()
    })
}
export async function searchMaterialInformation(req,res,next){

}
export async function getSupplierCategories(req,res,next){

}
export async function addSuppier(req,res,next){}
export async function makeReport(req,res,next){}

export async function getAllSupplier(req,res,next){
    let sql = `SELECT * from get_all_supplier`;
    managerConnection[req.session.userId].query(sql, function(err, data, fields) {
      if (err) {
        console.log(err)
      };
      data = JSON.stringify(data);
      data =  JSON.parse(data);
      data = uuid.stringify(data[0].scode.data)
      res.json({
        status: 200,
        data,
        message: "User lists retrieved successfully"
      })
    })
}