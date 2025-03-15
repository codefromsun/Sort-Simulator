// bubble.js
const container = document.getElementById('main');
const settled = new Set();
let timeoutId = null; // Store timeout ID for clearing


function reset() {
    
    
    window.arr = [];
    settled.clear();
    // Clear any existing timeout:
    if (timeoutId) {
        clearTimeout(timeoutId);

        timeoutId = null;
    }
    for (let i = 0; i < window.dataSize; i++) {  // Use window.dataSize
        let element=Math.floor(Math.random() * 100);
        if(element===0){
            element=1;
        }
      window.arr.push(element);
    }
    display([-1, -1, 0, 1]);
}


function sort() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        reset();
    }
    let copy = [...arr];
    let steps = bubbleSort(copy);
    animate(steps);
}

function animate(steps) {
    if (steps.length === 0) {
        settled.clear();
        return;
    }

    let [i, j, a, b] = steps.shift();
    display([i, j, a, b]);

    // Store the timeout ID:
    timeoutId = setTimeout(() => {
        if (b === 0) {
            if (a === 1) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            display([i, j, a, b]);
        } else {
            display([i, j, a, b]);
        }

        // Schedule the next animate:
        timeoutId = setTimeout(() => animate(steps), window.animationSpeed * .3); // Use window.animationSpeed
    }, window.animationSpeed * .3);
}

function bubbleSort(arr) {
    const steps = [];
    // let flag = 0;
    for (let i = 0; i < window.dataSize - 1; i++) { // Use window.dataSize
        for (let j = 0; j < window.dataSize - i - 1; j++) {
            let flag = 0;
            if (arr[j] > arr[j + 1]) {
                steps.push([j, j + 1]);
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = 1;
            }
            steps.push([j, j + 1, flag, 0]);
        }
        steps.push([window.dataSize - i - 1, 0, 0, 1]); // Use window.dataSize
    }
    steps.push([0, 0, 0, 1]);
    return steps;
}


function display(ind) {
    container.innerHTML = '';
    for (let i = 0; i < window.dataSize; i++) { // Use window.dataSize
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height =window.arr[i]*4 + 'px';

        if (ind[3] === 1) {
            if (i === ind[0] || settled.has(i)) {
                bar.style.backgroundColor = '#04e76d'; // green
            }
        } else {
            if (i === ind[0] || i === ind[1]) {
                bar.style.backgroundColor = '#ff4545';  // red
            } else if (settled.has(i)) {
                bar.style.backgroundColor = '#04e76d'; // green
            }
        }
        container.appendChild(bar);
    }
    if (ind[3] === 1) {
        settled.add(ind[0]);
    }

}
export { reset, sort };