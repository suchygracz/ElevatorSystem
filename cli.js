const ElevatorSystem = require('./elevatorsystem');
const readline = require('readline');
const { promisify } = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = promisify(rl.question).bind(rl);

let nElevators;

const getNumberOfElevators = async () => {
    while (true) {
        const input = await question(
            'Please enter desired number of elevators (1-16): '
        );
        nElevators = parseInt(input, 10);

        if (
            Number.isInteger(nElevators) &&
            nElevators >= 1 &&
            nElevators <= 16
        ) {
            console.log(
                `Elevator system with ${nElevators} elevators has been created`
            );
            break;
        } else {
            console.log(
                'Wrong input, please type an integer between 1 and 16.'
            );
        }
    }
    return nElevators;
};

// Use an async IIFE to call getNumberOfElevators and ensure nElevators is set
(async () => {
    try {
        nElevators = await getNumberOfElevators();
        restOfLogic();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

function restOfLogic() {
    const system = new ElevatorSystem(nElevators, rl);
    console.log('ELEVATOR SYSTEM');
    console.log('Commands:');
    console.log('pickup <floor>');
    console.log('update <elevatorId> <currentFloor> <targetFloor>');
    console.log('step');
    console.log('status');
    console.log('exit');

    rl.on('line', (input) => {
        const [command, ...args] = input.split(' ');

        switch (command) {
            case 'pickup':
                if (args.length !== 2) {
                    console.log(
                        'Usage: pickup <floor> <direction( 1 for up -1 for down )>'
                    );
                } else {
                    const [floor, direction] = args.map(Number);
                    system.pickup(floor, direction);
                    console.log('Pickup request added');
                }
                break;
            case 'step':
                system.step();
                console.log('Step executed');
                break;
            case 'status':
                console.log(system.status());
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Unknown command');
                break;
        }
        console.log(
            'Commands: pickup <floor>, step, status, update <elevatorId> <current floor> <target floor>exit'
        );
    });
}
