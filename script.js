//import { Elevator } from './elevator.js';
import { ElevatorSystem } from './elevatorsystem.js';

let system;

document.getElementById('create-system').addEventListener('click', () => {
    const numElevators = parseInt(
        document.getElementById('num-elevators').value,
        10
    );
    if (
        Number.isInteger(numElevators) &&
        numElevators >= 1 &&
        numElevators <= 16
    ) {
        system = new ElevatorSystem(numElevators);
        createElevatorGrid(numElevators, system.elevators);
        console.log('should be created');
    } else {
        alert('Please enter a valid number of elevators between 1 and 16.');
    }
});

document.getElementById('step-system').addEventListener('click', () => {
    if (system) {
        system.step().then(() => {
            createElevatorGrid(system.elevators.length, system.elevators);
        });
    }
});

document.getElementById('exit-system').addEventListener('click', () => {
    alert('Exiting the system');
    // Additional logic to properly handle exit if needed
});

function createElevatorGrid(nElevators, elevators) {
    console.log('Creating elevator grid');
    const gridContainer = document.getElementById('elevator-grid');
    gridContainer.innerHTML = ''; // Clear existing grid

    for (let i = 0; i < nElevators; i++) {
        const column = document.createElement('div');
        column.classList.add('elevator');
        column.setAttribute('data-id', i);

        for (let floor = 0; floor < 10; floor++) {
            const floorDiv = document.createElement('div');
            floorDiv.classList.add('floor');

            if (elevators[i] && elevators[i].currentFloor === floor) {
                floorDiv.classList.add('current');
            }

            column.appendChild(floorDiv);
        }

        // Append direction indicator first
        const dirIndicator = document.createElement('div');
        dirIndicator.classList.add('dir-indicator');
        dirIndicator.innerText =
            elevators[i].dir > 0 ? '↑' : elevators[i].dir < 0 ? '↓' : '-';
        column.appendChild(dirIndicator);

        gridContainer.appendChild(column);
    }

    const buttonColumn = document.createElement('div');
    buttonColumn.classList.add('elevator');

    for (let floor = 0; floor < 10; floor++) {
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');

        const upButton = document.createElement('button');
        upButton.classList.add('up-button');
        upButton.innerText = '↑';
        upButton.addEventListener('click', () => handleButtonClick(floor, 1));

        const downButton = document.createElement('button');
        downButton.classList.add('down-button');
        downButton.innerText = '↓';
        downButton.addEventListener('click', () =>
            handleButtonClick(floor, -1)
        );

        floorDiv.appendChild(upButton);
        floorDiv.appendChild(downButton);
        buttonColumn.appendChild(floorDiv);
    }

    gridContainer.appendChild(buttonColumn);
}

function handleButtonClick(floor, direction) {
    if (system) {
        system.pickup(floor, direction);
        createElevatorGrid(system.elevators.length, system.elevators);
    }
}
