// selection.js
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
    for (let i = 0; i < window.dataSize; i++) {
        let element=Math.floor(Math.random() * 100);
        if(element===0){
            element=1;
        }
        window.arr.push(element);
    }
    display();
}


function sort() {
    let copy = [...arr];
    let steps = selectionSort(copy);
    animate(steps);
}

function animate(steps) {
    if (steps.length === 0) {
         settled.add(window.dataSize - 1);
         display();
          settled.clear();
        return;
    }

    let [i, j, swap] = steps.shift();
    if (swap != 1) {

        display([i, j, swap]);
        timeoutId = setTimeout(() => {
             animate(steps);
        }, window.animationSpeed *.9);
        return;
    }

    if (swap === 1) {
        display([j, j, 0]);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        settled.add(i);
        display([i, i, 0]);

        timeoutId =  setTimeout(() => {
            animate(steps);
          }, window.animationSpeed*1.15); // Double the animation speed
          return;
        }


}

function display(ind) {
    let flag = 0;
    if (ind && ind[0] == ind[1]) {
        flag = 1;
    }
    container.innerHTML = '';
    for (let i = 0; i < window.dataSize; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = window.arr[i]*4 + 'px';

        if (settled.has(i)) {
            bar.style.backgroundColor = '#04e76d'; // green
        }

        if (ind && flag == 1) {
            if (i === ind[0]) {
                bar.style.backgroundColor = '#0d6efd'; // blue
            }
        } else if (ind && flag == 0) {
            if (i === ind[0]) {
                bar.style.backgroundColor = '#ff4545';  // red
            }

            if (i === ind[1]) {
                bar.style.backgroundColor = '#0d6efd';  // blue
            }
        }

        container.appendChild(bar);
    }
}

function selectionSort(arr) {
    let capture = [];
    for (let i = 0; i < window.dataSize; i++) {
        let min_ind = i;
        for (let j = i; j < window.dataSize; j++) {
            if (arr[j] < arr[min_ind]) {
                min_ind = j;
            }
            capture.push([j, min_ind, 0]);
        }
        capture.push([i, min_ind, 1]); // Swap
        let temp = arr[i];
        arr[i] = arr[min_ind];
        arr[min_ind] = temp;
    }

    return capture;
}
export { reset, sort };