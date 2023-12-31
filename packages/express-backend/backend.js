import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      },
      {
   	    id: "qwe123",
   	    job: "Zookeeper",
   	    name: "Cindy"
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name);
}

const findUsersByNameAndJob = (name, job) => {
    return users['users_list']
        .filter((user) => user['name'] === name && user['job'] === job);
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

function randomIDGenerater() {
    const id = Math.random().toString(36).substring(2);
    return id;
}

const addUser = (user) => {
    user.id = randomIDGenerater();
    const userToAdd = {
        id: user.id,
        name: user.name,
        job: user.job
    }
    users['users_list'].push(userToAdd);
    return userToAdd;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    console.log('Current users data:', users.users_list);
    res.status(201).json(userToAdd);
});

app.delete('/users/:id', (req, res) => {
  const id = req.params['id'];
  let result = findUserById(id);
  if (result === undefined) {
    	res.status(404).send('User not found.');
  }
  else {
       const userIndex = users.users_list.findIndex((user) => user.id === id);
       users.users_list.splice(userIndex, 1);
       res.status(204).send();
  }
});
 
