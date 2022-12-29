const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())
const fs = require('fs');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


const uuid = require('uuid');





app.use(express.json())


/*READ MY JSON FILE AND AND PUT IT IN A VARIABLE SO I CAN USE IT GLOBAL */ 
let games = fs.readFile('games.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error).status(404);
      return;
    }
  
    games = JSON.parse(data);

  });

  

/*SEARCH FOR AN SPECIFIC USER BY NAME*/ 
app.get('/game/:name', function(req, res){
    const game = games.find((game) => game.name === req.params.name);
    if (!game) {
        return res.status(404).send('A game with this Name not found');
      }
    res.send(game);
})


app.get('/game', function (req,res){
  res.json(games);
})




  

  
  app.post('/game/addgame', function(req, res) {
    let userId = uuid.v4();
    const newGame = req.body;
    newGame.id = userId;
    games.push(newGame);
    res.send(`Successfully added ${newGame}`)

    fs.writeFile('games.json', JSON.stringify(games,null,2), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });


  




app.listen(3000, ()=>{
    console.log("listening on port 3000")
})


app.delete('/game/:id/delete', function(req, res) {
  const game = games.findIndex((game) => game.id === req.params.id);
  if(game !==-1){

    games.splice(game,1);
    res.send(`Successfully removed ${game}`)
    /***************Update the Json.File***************/
    fs.writeFile('games.json', JSON.stringify(games,null,2), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  } else {
    return res.status(404).send(`There is no game with that ID`);
  }
});


app.put('/game/:id', function (req,res){
  let newValue = req.body
  const gameIndex = games.findIndex((game) => game.id === req.params.id);
  
  if (gameIndex ===-1){
    return res.send(404).send("Game Not Found")
  }
  
  games[gameIndex] = {...games[gameIndex], ...newValue}
  res.status(200).send("Name updated");

  fs.writeFile('games.json', JSON.stringify(games,null,2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

})