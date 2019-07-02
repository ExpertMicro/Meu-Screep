var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

//Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE]); cria um creep
module.exports.loop = function () {
    //limpa a memória
    for (let name in Memory.creeps)
    {
        if (Game.creeps[name] == undefined)
        {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
    }

    var minimumNumberOfHarvesters = 10;
    var minimumNumberOfUgraders = 1;
    var minimumNumberBuilders = 1;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var name = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'harvester',
            working: false
        });
    }
    else if (numberOfUpgraders < minimumNumberOfUgraders)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {
            role: 'upgrader',
            working: false
        });
    }
    else if (numberOfBuilders < minimumNumberBuilders)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'builder',
            working: false
        });
    }
    else {
        name = Game.spawns.Spawn1.createCreep([WORK, ,WORK, CARRY, MOVE], undefined, {
            role: 'builder',
            working: false
        });
    }
    if (!(name < 0))
    {
        console.log("Spawned new creep: " + name);
    }

};