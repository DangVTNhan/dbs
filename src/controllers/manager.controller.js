const db = require('../db')
const index = require('../index')
const app = require('../app')
const uuid = require('uuid')
let managerConnection = []

export function isLogin(req,res,next){
    if(req.session.userId==undefined){
        res.send("Unauthenticated")
    }
    else{
        next()
    }
}
// Procedure

// Bat buoc
export async function login(req,res,next){
    try{
        let username = req.body.username
        let password = req.body.password
        let connection =  db.loginDB(username,password)
        managerConnection.push(connection)
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
    catch(err){
        res.status(400).send(err)
    }
}
export async function logout(req,res,next){
    let userID = req.session.userId
    req.session.destroy(err=>{
        if(err){
            return res.send({message:"Err at destroying session"})
        }
        managerConnection[userID].end()
        managerConnection.splice(userID,1)
        console.log("Close database connection of: " + userID)
        res.clearCookie("sid")
        res.send({message:"Logout Success",status:200})
        next()
    })
}
export async function searchMaterialInformation(req,res,next){
    let fabricCode = req.body.fabricCode;
    try{
        managerConnection[req.session.userId].query('CALL search_info(?)',[fabricCode],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else
                res.status(200).send({message: "Success",data: rows})
        })
    }catch(err){
        res.status(400).send(err)
        next()
    }
}
export async function getSupplierCategories(req,res,next){
    let supplierId = req.body.supplierId;
    try{
         managerConnection[req.session.userId].query('CALL list_category_by_supplier(?)',[supplierId],(err,rows,fields)=>{
            if(err)
                res.status(400).send(err)
            else
                res.status(200).send({message: "Success",data: rows})
        })
    }catch(err){
        res.status(400).send(err)
        next()
    }
}
export async function addSuppier(req,res,next){
    let {tax,bank,addr,sname,phone} = req.body;
    let userId = req.session.userId;
    managerConnection[userId].query('CALL add_supplier(?,?,?,?,?)',[tax,bank,addr,sname,phone],(err,rows,fields)=>{
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
        managerConnection[req.session.userId].query('CALL order_info(?)',[customerCode],(err,rows,fields)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
        res.status(200).send({message:"Success", data: rows})
        }
    })
    }
    catch(err){
        res.status(400).send(err)
    }
}


// Optioal
export async function getBoltOfFabric(req,res,next){
    let fabircId = req.body.fabircId;
    try{
        managerConnection[req.session.userId].query('CALL get_bolt_of_fabric(?)',[fabircId],(err,rows,fields)=>{
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
        managerConnection[req.session.userId].query('CALL get_import_of_supplier(?)',[supplierId],(err,rows,fields)=>{
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
        managerConnection[req.session.userId].query('CALL get_price_of_fabric(?)',[fabricId],(err,rows,fields)=>{
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
export async function getPhoneOfSupplier(req,res,next){}

export async function addFabric(req,res,next){}
export async function addFabricPrice(req,res,next){}
export async function addEmployee(req,res,next){}
export async function addCustomer(req,res,next){}

// View
export async function getAllSupplier(req,res,next){
    try{
        let sql = `SELECT * from get_all_supplier`;
        managerConnection[req.session.userId].query(sql, function(err, data, fields) {
        if (err) {
            console.log(err)
        };

        res.json({
            status: 200,
            data,
            message: "User lists retrieved successfully"
        })
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


