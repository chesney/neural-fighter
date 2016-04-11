// Enums
var CHARACTER_TYPE = Object.freeze({"HUMAN" : {'name' : "Human"}, "ALIEN" : {'name' : "ALIEN"}});
var FIGHTING_STYLE = Object.freeze({"BOXER" : {'name' : "Boxer"}, "KARATE" : {'name' : "Karate"}});
var ATTACK_TYPE = Object.freeze(
    {
        'KICK' : {
            'name' : "Kick",
            'damage' : 10
        },
        'PUNCH' : {
            'name' : "Punch",
            'damage' : 5
        },
        'ELBOW' : {
            'name' : "Elbow",
            'damage' : 15
        },
        'UPPERCUT' : {
            'name' : "Uppercut",
            'damage' : 20
        },
        'HADOKEN' : {
            'name' : "HADOKEN",
            'damage' : 15
        }
    });

//Temp Character Storage
var db = {};
db.items = [];
db.store = function(obj){
    this.items.push(obj);
}

db.getCharacter = function(name){
    db.items.forEach(
        function(obj, i){
            console.log(obj);
            if (obj.name === name){
                return obj;
            }
        }
    );
}

var Character = function(){
    this.name = '';
    this.color = "";
    this.gender = "";
    this.health = 0;
    this.type = CHARACTER_TYPE.HUMAN;
    this.fStyle = FIGHTING_STYLE;
    this.isAlive = false;
    this.abilities = [];
    this.isHero = false;
};

Character.prototype.setName = function(name){
    this.name = name;
    return this;
}

Character.prototype.setGender = function(gender){
    this.gender = gender;
    return this;
}

Character.prototype.setHealth = function(health){
    this.health = health;
    return this;
}

Character.prototype.setType = function(type){
    this.type = type
    return this;
}

Character.prototype.setFighterType = function(fStyle){
    this.fStyle = fStyle;
    return this;
}

Character.prototype.takeDamage = function(damage){
    this.health -= damage;
    if (this.health <= 0 ){
        this.health = 0;
    }
    return this;
}

Character.prototype.save = function(){
    var output = ["saving", this.name, this.gender, this.health, this.type.name];
    console.log(output.join(","));
    // Save to storage
    db.store(this);
    return this;
}

Character.prototype.setAlive = function(){
    this.isAlive = true;
    return this;
}

// Assign different attack types for different fighting styles
Character.prototype.setAbilities = function(fStyle){
    var actions = [];
    switch (fStyle.name){
        case FIGHTING_STYLE.KARATE.name :
        // Assign Karate actions
            actions = [ATTACK_TYPE.PUNCH, ATTACK_TYPE.KICK, ATTACK_TYPE.ELBOW, ATTACK_TYPE.HADOKEN];
            break;
        default :
            actions = [ATTACK_TYPE.PUNCH, ATTACK_TYPE.UPPERCUT];
    }
    this.abilities = actions;
    return this;
}

Character.prototype.setHero = function(){
    this.isHero = true;
    return this;
}

Character.prototype.causeDamageTo = function(receiver){
    // Get a random attack based on fighting style
    var attack = this.abilities[ randomIntFromInterval(0, this.abilities.length - 1) ];
    
    console.log(this.name + " attacks " + receiver.name + " with " + attack.name + ". Damage caused : " + attack.damage);
    receiver.health -= attack.damage;

    if (receiver.health <= 0) {
        console.log("*** /// GAME OVER ///*** ===> Winner : " + this.name);
        receiver.isAlive = false;
    } else {
         console.log("=====> " + this.name + " ====== HEALTH ===== : " + this.health);
        console.log("=====> " + receiver.name + " ====== HEALTH ===== : " + receiver.health);
    }
    
    return this;
}

// Create a Boxer 
var opponent = new Character()
    .setName("Mike")
    .setFighterType(FIGHTING_STYLE.BOXER)
    .setGender("Male")
    .setHealth(100)
    .setType(CHARACTER_TYPE.HUMAN)
    .setAlive()
    .setAbilities(FIGHTING_STYLE.BOXER)
    .save();

// Create a Karate kid
var hero = new Character()
    .setName("Daniel")
    .setFighterType(FIGHTING_STYLE.KARATE)
    .setGender("Male")
    .setHealth(100)
    .setType(CHARACTER_TYPE.HUMAN)
    .setAlive()
    .setAbilities(FIGHTING_STYLE.KARATE)
    .setHero()
    .save();

var combatants = [hero, opponent];

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Start the battle!
var startBattle = function(){
    // reset some vars
    hero.setHealth(100).setAlive();
    opponent.setHealth(100).setAlive();

    // Announce battle
    console.log(hero.name + " vs " + opponent.name);
    while (hero.isAlive && opponent.isAlive){
        // Choose first attacker ( randomly )
        attacker = combatants[Math.round(Math.random())];

        if (attacker.isHero === true){
            // Hero attacks first
            hero.causeDamageTo(opponent);
        } else {
            // Opponent attacks first
            opponent.causeDamageTo(hero);
        }
    }
}

startBattle();



