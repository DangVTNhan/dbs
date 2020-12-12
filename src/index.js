const app = require("./app").default
const db = require('./db')

const PORT = 3000

app.listen(PORT,async ()=>{
    console.log(`server is running on port ${PORT}`)
})

