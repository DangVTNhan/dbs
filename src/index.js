const app = require("./app").default
const db = require('./db')

app.listen(3000,async ()=>{
    console.log("server is running on port 3000")
})

