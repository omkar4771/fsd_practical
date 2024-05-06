const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Define event listeners
eventEmitter.on('event1', () => {
    console.log('Event 1 occurred');
});

eventEmitter.on('event2', () => {
    console.log('Event 2 occurred');
});

// Main loop to listen for events
console.log('Listening for events...');
process.stdin.on('data', (data) => {
    const input = data.toString().trim();

    // Trigger events based on user input
    if (input === '1') {
        eventEmitter.emit('event1');
    } else if (input === '2') {
        eventEmitter.emit('event2');
    } else if (input === 'exit') {
        console.log('Exiting...');
        process.exit();
    } else {
        console.log('Invalid input. Enter 1 or 2 to trigger events, or type "exit" to exit.');
    }
});
