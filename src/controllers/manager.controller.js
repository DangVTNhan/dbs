const db = require('../db')
const index = require('../index')
const app = require('../app')
let managerConnection = null


export function isLogin(req,res,next){
    if(!req.session.isLogin){
        res.send("Unauthenticated")
    }
    else{
        next()
    }
}

export async function login(req,res,next){
    let username = req.body.username
    let password = req.body.password

    managerConnection =  db.loginDB(username,password)
    managerConnection.connect(function(err){
            if(err) {
                res.send(err)
                next()
            }
            else{
                req.session.isLogin = true
                res.send({message: "success",status:200})
                next()
            }
        }
    )
}

export async function logout(req,res,next){
    req.session.destroy(err=>{
        if(err){
            return res.send({message:"Err at destroying session"})
        }
        managerConnection.end()
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