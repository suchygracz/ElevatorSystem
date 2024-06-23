export class Elevator {
    constructor(id, rl) {
        this.id = id;
        this.currentFloor = 0;
        this.requests = [];
        this.rl = rl;
    }
    get dir() {
        if (this.requests.length > 0 && this.requests[0].floor !== null) {
            return Math.sign(this.targetFloor - this.currentFloor);
        }
        return 0;
    }

    get targetFloor() {
        return this.requests.length > 0 ? this.requests[0].floor : null;
    }

    addRequest(floor, source) {
        if (this.requests.length === 0) {
            this.requests.push({ floor, source });
            return;
        }

        const direction = this.dir;

        // Insert the new request in the correct position based on the current direction and existing requests
        if (direction === 1) {
            // Elevator is going up
            for (let i = 0; i < this.requests.length; i++) {
                if (this.requests[i].floor > floor) {
                    this.requests.splice(i, 0, { floor, source });
                    return;
                }
            }
        } else if (direction === -1) {
            // Elevator is going down
            for (let i = 0; i < this.requests.length; i++) {
                if (this.requests[i].floor < floor) {
                    this.requests.splice(i, 0, { floor, source });
                    return;
                }
            }
        }

        // If no insertion point is found, add the request at the end
        this.requests.push({ floor, source });
    }

    async step() {
        if (this.requests.length > 0) {
            if (this.currentFloor === this.requests[0].floor) {
                if (this.requests[0].source === 'inside') {
                    this.requests.splice(0, 1);
                } else {
                    this.requests.splice(0, 1);
                    let validInput = false;
                    while (!validInput) {
                        const input = prompt(
                            `Enter the floor that the person at floor ${this.currentFloor} wants to go to:`
                        );
                        if (input === null) {
                            alert('Please provide a valid floor number.');
                        } else {
                            const parsedFloor = parseInt(input, 10);
                            if (isNaN(parsedFloor)) {
                                alert(
                                    'Invalid input. Please enter a valid floor number.'
                                );
                            } else {
                                console.log(
                                    `Person entered floor: ${parsedFloor}`
                                );
                                this.addRequest(parsedFloor, 'inside');
                                validInput = true;
                            }
                        }
                    }
                }
            } else if (this.dir !== 0) {
                if (this.currentFloor > 0 && this.dir === -1) {
                    this.currentFloor--;
                } else if (this.currentFloor < 10 && this.dir === 1) {
                    this.currentFloor++;
                }
            }
        }
    }

    status() {
        return {
            id: this.id,
            currentFloor: this.currentFloor,
            targetFloor: this.targetFloor,
            dir: this.dir,
            requests: this.requests
                .map((req) => `Floor: ${req.floor}, Source: ${req.source}`)
                .join('; ')
        };
    }
}

//module.exports = Elevator;
