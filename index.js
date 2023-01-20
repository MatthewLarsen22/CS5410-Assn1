let prevTime = performance.now();
const events = [];

function gameLoop() {
    let timeStamp = performance.now();
    let elapsedTime = timeStamp - prevTime;
    prevTime = timeStamp;

    //processInput(elapsedTime);
    update(elapsedTime);
    render();

    window.requestAnimationFrame(gameLoop);
}

function update(elapsedTime) {
    // update any active events inside this function
    for(let i = events.length - 1; i >= 0; i--) {
        events[i].remainingInterval -= elapsedTime;

        if(events[i].remainingInterval <= 0){
            events[i].shouldDisplay = true;
            events[i].remainingInterval += events[i].interval;
            events[i].times -= 1;

            if(events[i].times < 0) {
                events.splice(i, 1);
            }
        }
    }
}

function render() {
    // display events needing reported inside this function
    var node = document.getElementById('eventContainer');
    //node.innerHTML += "<p>Test</p>";
    for(let i = 0; i < events.length; i++) {
        if(events[i].shouldDisplay) {
            events[i].shouldDisplay = false;
            node.innerHTML +=
                "<p>Event: " +
                events[i].name +
                " (" +
                events[i].times +
                " remaining)</p>";
            node.scrollTop = node.scrollHeight;
        }
    }
}

function processInput(){
    var name = document.getElementById('Name').value;
    var interval = parseInt(document.getElementById('Interval').value);
    var times = parseInt(document.getElementById('Times').value);

    if (!(name == "" || isNaN(interval) || interval < 1 || isNaN(times) || times < 1)){
        clearInput();
        createEvent(name, interval, times);
    }
}

function clearInput() {
    document.getElementById('Name').value = "";
    document.getElementById('Interval').value = "";
    document.getElementById('Times').value = "";
}

function createEvent(name, interval, times) {
    events.push({name: name, interval: interval, times: times, remainingInterval: 0, shouldDisplay: false});
}