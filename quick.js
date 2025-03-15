// quick.js
const container = document.getElementById('main');
const settled = new Set();
let timeoutId = null; // Store timeout ID for clearing
let result = [];
let red= null ; // FOR PIVOT ELEMENT RED COLOUR
let blue = []; // FOR SPACE ELEMENT BLUE COLOUR
function reset() {
    window.arr = [];
    settled.clear();
    // Clear any existing timeout:
    if(timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        settled.clear();
        red=null;
        blue=[];
        result=[];
    }
    for (let i = 0; i < window.dataSize; i++) {  // Use window.dataSize
        let element=Math.floor(Math.random() * 100);
        if(element===0){
            element=1;
        }
      window.arr.push(element);
    }
    display();
}


function sort() {
    
    if(timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        settled.clear();
        red=null;
        blue=[];
        result=[];
    }
    let copy = [...window.arr];
    quicksort(copy,0,window.dataSize-1);
    animate(result);
    display();
    
}

function animate(steps) {
    if (steps.length === 0) {
        settled.clear();
        return;
    }

    let [i, j, k] = steps.shift();
    // display([i, j, a, b]);
 
   
     if (k==0){
  red=i;
  blue.push(i+1);
  blue.push(j);
    display();
    timeoutId = setTimeout(() => animate(steps), window.animationSpeed);
        return;
     }
     if (k==1){

    display();

    if(i==red){
        red=j;
        blue[0]=i;
    }

        timeoutId = setTimeout(() => {
            let temp = window.arr[i];
            window.arr[i] = window.arr[j];
            window.arr[j] = temp;
            display();
            // Schedule the next animate:
            timeoutId = setTimeout(() => animate(steps), window.animationSpeed);
        }, window.animationSpeed*.5)

        return;
     }

     if (k==2){
red= null;
blue=[];
settled.add(i);
display();
timeoutId = setTimeout(() => animate(steps), window.animationSpeed);
        return;
     }

    // Store the timeout ID:
 
}

function partition(arr1,low,high){
    
    let pivot=arr1[low];
    let i=low+1;
    let j=high;
    result.push([low,high,0]); // space define blue colour and pivot red colour
    while(i<=j){
    if(arr1[i]<=pivot){
        i++;
    }

    if(arr1[j]>pivot){
        j--;
    }

    if(i<j && arr1[i]>pivot && arr1[j]<=pivot){
        let temp=arr1[i];
        arr1[i]=arr1[j];
        arr1[j]=temp;
        result.push([i,j,1]); //swap 
    }
}

let temp=arr1[low];
arr1[low]=arr1[j];
arr1[j]=temp;
result.push([low,j,1]); //swap 

    return j;
    
}



function quicksort(arr1,low,high) {
    if(low<high){
        let pivot = partition(arr1,low,high);
        
        result.push([pivot,-1,2]); // settled
        quicksort(arr1,low,pivot-1);
        quicksort(arr1,pivot+1,high);
        return ;
    }

    if(low==high){
        result.push([low,-1,2]); // settled
        return ;
    }
    
}


function display() {
    container.innerHTML = '';
    for (let i = 0; i < window.dataSize; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = window.arr[i]*4 + 'px';
     if(settled.has(i)){
         bar.style.backgroundColor = '#04e76d';    // green
     }
     if(blue.length>0 && i>=blue[0] && i<=blue[1]){
         bar.style.backgroundColor = '#0d6efd';     // blue
        }
        if(red==i){
            bar.style.backgroundColor = '#ff4545';    // red
        }
 
        container.appendChild(bar);
    }


}

export { reset, sort };