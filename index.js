const express =  require('express')
const app = express()

const bparser = require('body-parser')
app.use(bparser.urlencoded({extended:true}))

const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mytodo" 
});


app.get('/', (req,res) => {
    res.send(`
    <html>
        <body>
            <form action="/todo" method="post">
                <input name="deskripsi" />
                <button>Add</button>
            </form>
        </body>
    </html>`)
})

//insert to database
app.post('/todo',(req,res)=> {
    con.connect(function(err){
        const kata = req.body.deskripsi
        con.query("insert into tabel_tugas values(?)", [kata]) 
    })
    res.end()  
})

app.get('/todo', (req ,res) => {
    con.connect(function(err) {
        var data =""
        con.query("SELECT * FROM tabel_tugas", function (err, result) {   
            result.forEach((dataa) => {
                data += `<div>` + dataa.deskripsi + `</div>`
            }); 
            res.send(data)
            res.end()
        });
    });
})

app.listen(3000,function() {
    console.log("server...")
})  