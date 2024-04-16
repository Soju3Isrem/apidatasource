import dotenv from 'dotenv'
import express from "express"
import userRouter from "./routes/users.routes.js"
import userAuth from './auth/auth.routes.js'

const resource = dotenv.config({path:'.env'})

const PORT = resource.parsed.PORT

const app = express();
app.use(express.json());

app.use("/",userRouter)
app.use("/",userAuth)


app.listen(PORT,() =>{
    console.log('Server listening port ',PORT )
});

console.log('Se esta ejecutando');

