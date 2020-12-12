const db = require('../db')
const index = require('../index')
const app = require('../app')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
let connections = [];


const tokenSecret = "dbs"
// Bat buoc
export function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(400).send({message:"Null token"})

    jwt.verify(token, tokenSecret , (err, user) => {
        if (err) return res.status(400).send({message:"Invalid token"})
        req.user = user
        
        next() // pass the execution off to whatever request the client intended
  })
}
export  function generateAccessToken(tokenPayload){
    return jwt.sign(tokenPayload,tokenSecret, { expiresIn: '18000s' })
}

// Procedure
export async function login(req,res,next){
    try{
        let username = req.body.username
        let password = req.body.password
        let connection =  db.loginDB(username,password)
        connection.connect(function(err){
                if(err) {
                        res.status(400).send(err)
                        console.log(err)
                        next()
                }
                else{
                    connections.push(connection)
                    let userid = connections.length - 1
                    let accessToken =  generateAccessToken({username: username,userid: userid})
                    res.status(200).send({message: "success", accessToken: accessToken})
                    next()
                }
            }
        )
    }
    catch(err){
        res.status(400).send(err)
    }
}
export async function logout(req,res,next){
    try{
        console.log("Close database connection of: " + req.user.userid)
        res.status(200).send({message:"Logout Success"})
        next()
    }
    catch(err){ 
        res.status(400).send(err)
    }
    
}

export async function searchMaterialInformation(req,res,next){
    let fabricCode = req.body.fabricCode;
    try{
        connections[req.user.userid].query('CALL search_info(?)',[fabricCode],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else
                res.status(200).send({message: "Success", rows})
        })
    }catch(err){
        res.status(400).send(err)
        next()
    }
}

export async function getSupplierCategories(req,res,next){
    console.log(req.body)
    let supplierId = req.body.supplierId; 
    try{
         connections[req.user.userid].query('CALL get_fabric_of_suppier(?)',[supplierId],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else{
                let data = rows[0]
                res.status(200).send(data)
            }
        })
    }catch(err){
        res.status(400).send(err)
        next()
    }
}
export async function addSuppier(req,res,next){
    let {tax,bank,addr,sname,phone} = req.body;
    let userId = req.user.userid;
    connections[userId].query('CALL add_supplier(?,?,?,?,?)',[tax,bank,addr,sname,phone],(err,rows,fields)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
        res.status(200).send("success")
        }
    })

}
export async function makeReport(req,res,next){
    let customerCode = req.body.customerCode
    try{
        connections[req.user.userid].query('CALL order_info(?)',[customerCode],(err,rows,fields)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(200).send({message:"Success", rows})
        }
    })
    }
    catch(err){
        res.status(400).send(err)
    }
}

// Khong bat buoc
export async function getBoltOfFabric(req,res,next){
    let fabircId = req.body.fabircId;
    try{
        connections[req.user.userid].query('CALL get_bolt_of_fabric(?)',[fabircId],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else{
                res.status(200).send({message:"Success", data: rows})
            }
        })
    }catch(err){
        res.status(400).send(err)
    }
}
export async function getImportOfSupplier(req,res,next){
    let supplierId = req.body.supplierId
    try{
        connections[req.user.userid].query('CALL get_import_of_supplier(?)',[supplierId],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else{
                res.status(200).send({message:"Success", data: rows})
            }
        })
    }catch(err){
        res.status(400).send(err)
    }
}
export async function getFabricOfSupplier(req,res,next){
    
}
export async function getPriceOfFabric(req,res,next){
    let fabricId = req.body.fabricId
    try{
        connections[req.user.userid].query('CALL get_price_of_fabric(?)',[fabricId],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else{
                res.status(200).send({message:"Success", rows})
            }
        })
    }catch(err){
        res.status(400).send(err)
    }
}


export async function getPhoneOfSupplier(req,res,next){}
export async function addFabric(req,res,next){}
export async function addFabricPrice(req,res,next){}
export async function addEmployee(req,res,next){}
export async function addCustomer(req,res,next){}
// View
export async function getAllSupplier(req,res,next){
    try{
        let sql = `SELECT * from get_all_supplier`;
        connections[req.user.userid].query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err)
        }
        res.status(200).send(rows)
        })
    }
    catch(err){
        res.status(400).send(err)
    }
}

export async function getAllFabric(req,res,next){}
export async function getAllImport(req,res,next){}
export async function getAllOrdering(req,res,next){}
export async function getAllBolt(req,res,next){}
export async function getAllCustomer(req,res,next){}
export async function getAllEmployee(req,res,next){}


