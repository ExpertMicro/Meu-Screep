require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


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
        else if (creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer')
        {
            roleRepairer.run(creep);
        }
    }

    var minimumNumberOfHarvesters = 4;
    var minimumNumberOfUgraders = 1;
    var minimumNumberBuilders = 1;
    var minimumNumberRepairers = 2;

    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0)
        {
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }
    else if (numberOfUpgraders < minimumNumberOfUgraders)
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    else if (numberOfRepairers < minimumNumberRepairers)
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer')
    }
    else if (numberOfBuilders < minimumNumberBuilders)
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy,'builder')
    }
    else {
        name = Game.spawns.Spawn1.createCustomCreep(energy,'builder')
    }
    if (!(name < 0))
    {
        console.log("Spawned new creep: " + creep.memory.role + " creep: " + name);
    }

};