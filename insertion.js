// insertion.js
const container = document.getElementById('main');
const settled = new Set();
let timeoutId = null; // Store timeout ID for clearing
function reset() {
    window.arr = [];
    settled.clear();
    // Clear any existing timeout:
    if(timeoutId) {
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
    display();
    // settled.add(0);
}


function sort() {
    
    let copy = [...arr];
    let steps =insertionSort(copy);
    animate(steps);
}

function animate(steps) {
    if (steps.length === 0) {
        display();
        settled.clear();
        return;
    }
    
    let [i, j, k] = steps.shift();

    if(k==0){
        display(i); // Highlight the element being inserted
        timeoutId = setTimeout(() => animate(steps), window.animationSpeed*.5);  // Continue after highlighting
        return;
    }
    
    if (k === 1) {
        display(j);  // Highlight element at j during swap.
        settled.add(j); // Settle the element at j
        timeoutId = setTimeout(() => {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          display(i); // Highligh the inserted element at the end
          timeoutId = setTimeout(() => animate(steps), window.animationSpeed*.5);  // Continue after swapping and highlighting
        },window.animationSpeed*.3);
        return;
    }
    
    if (k==-1){
        // display(i); //Highlight before settling
        timeoutId = setTimeout(() => {
            settled.add(i); // Set the element to settled
            display();
          animate(steps);  // Continue after timeout
        }, window.animationSpeed*.6); //Delay
        return;
    }
}


function display(ind) {
    container.innerHTML = '';
    for (let i = 0; i < window.dataSize; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = window.arr[i]*4 + 'px';
          if(settled.has(i)){
              bar.style.backgroundColor='#04e76d'; // green
            }
            if(ind !== undefined && ind==i){
                bar.style.backgroundColor='#ff4545';  // red
            }
            container.appendChild(bar);
        }
        
    }
    function insertionSort(arr) {
    settled.add(0);
    let record=[];
    for (let i = 1; i < arr.length; i++) {
        let ins=arr[i]; // Element to be inserted

        let j=i-1;
        record.push([i,-1,0]); // high the element

        while(j>=0 && arr[j]>ins){
            record.push([j,j+1,1]); // 1 for swap
            arr[j+1]=arr[j];
            j--;
        }
        arr[j+1]=ins;
        
        record.push([i,-1,-1]); // settled elements
        
    }

    return record;
}


export { reset, sort };