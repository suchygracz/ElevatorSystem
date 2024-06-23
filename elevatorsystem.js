//const Elevator = require('./elevator');
import { Elevator } from './elevator.js';

export class ElevatorSystem {
    constructor(numElevators, rl) {
        this.elevators = [];
        for (let i = 0; i < numElevators; i++) {
            this.elevators.push(new Elevator(i, rl));
        }
    }

    pickup(floor, direction) {
        let bestElevator = null;
        let minDistance = Infinity;

        for (let elevator of this.elevators) {
            const distance = Math.abs(elevator.currentFloor - floor);

            if (
                elevator.dir === direction &&
                direction === 1 &&
                elevator.currentFloor <= floor
            ) {
                // Elevator going up and on the way
                if (distance < minDistance) {
                    bestElevator = elevator;
                    minDistance = distance;
                }
            } else if (
                elevator.dir === direction &&
                direction === -1 &&
                elevator.currentFloor >= floor
            ) {
                // Elevator going down and on the way
                if (distance < minDistance) {
                    bestElevator = elevator;
                    minDistance = distance;
                }
            } else if (
                elevator.targetFloor === null ||
                elevator.requests.length === 0
            ) {
                // Idle elevator or no requests
                if (distance < minDistance) {
                    bestElevator = elevator;
                    minDistance = distance;
                }
            }
        }

        if (!bestElevator) {
            bestElevator = this.elevators[0]; // Fallback to the first elevator if no suitable one found
        }

        bestElevator.addRequest(floor, 'outside');
    }

    async step() {
        for (let elevator of this.elevators) {
            await elevator.step();
        }
    }

    status() {
        return this.elevators.map((e) => e.status());
    }
}

//module.exports = ElevatorSystem;
