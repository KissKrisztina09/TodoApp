const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const JWT_Secret = "fjvfdnvgdenglregn54t4t5t56";

const mongoUrl= 'mongodb://localhost:27017/todo';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => console.error('Connection error:', e));
  
  require('./userDetails');
  const User = mongoose.model('users');

  require('./todoDetails')
  const Todo = mongoose.model('tasks');
  
  app.use(express.json());


  
  app.post('/register', async (req, res) => {
    const { fname, lname, email, password } = req.body;

    console.log("Received data:", req.body);

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({ fname, lname, email, password: encryptedPassword });

        res.status(201).json({ status: 'ok' });
    } catch (e) {
        console.error('Error creating user:', e);
        res.status(500).json({ error: 'Error creating user!' });
    }
});

  app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if (!user) {
        return res.json({ error: 'User not found!' });
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_Secret);

        if(res.status(201)){
            return res.json({status:"ok", data: token});  
        }else{
            return res.json({error:"error"});
        }
    }

    res.json({status: "error", error: "Invalid password!"});
  });

  app.post("/userDetails", async(req, res) =>{
        const {token} = req.body;
        try{
            const user = jwt.verify(token, JWT_Secret);
            const userEmail = user.email;
            User.findOne({email: userEmail}).then((data) => {
                res.send({status: "ok", data:data});
            }).catch((error) => {
                res.send({status:"error", data: error})
            });
        }catch(error){}

  });

  app.post('/addTask', async (req, res) => {
    const { token, title, dueDate } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token must be provided' });
    }
    try {
        const user = jwt.verify(token, JWT_Secret);
        const userId = user.email;

        await Todo.create({title, dueDate, status:'todo', userId});
        res.status(201).json({ status: 'ok'});
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task!', message: error.message });
    }
});

app.get('/tasks', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_Secret);
        const userId = decodedToken.email;
        const tasks = await Todo.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks!', message: error.message });
    }
});



app.listen(5000, ()=>{
    console.log("Server started");
 });