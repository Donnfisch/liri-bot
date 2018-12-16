var inquirer = require("inquirer");



function  player(name, postion, offense, defense) {
    this.name = name;
    this.postion = postion;
    this.offense = offense;
    this.defense = defense;
    this.goodGame = function() {
    }
    this.badGame = function() {
    }
    this.printInfo = function() {
                console.log("Name: " + this.name + "\nPosition: " + this.position +
                "\nOffense: " + this.offense + "\nDefense: " + this.defense);
              };
         
        
    }
    
    
    var count = 0;

    var starters = [];
    var subs = [];
    var team = [];
    
    var createPlayer = function() {
        if (count < 3) {
            console.log("New Player:")
    
            inquirer.prompt([
              {
                name: "name",
                message: "Player's name?"
            }, {
                position: "postion",
                message: "Player's position?"
            }, {
                offense: "offense",
                message: "Player's offensive ability"
            }, {
                defense: "defense",
                message: "Player's defensive ability"
            }
            ]).then(function(answers) {
                var player = new Player(answers.name, answers.position, answers.offense, answers.defense)
            })
        }
    }	
    createPlayer();