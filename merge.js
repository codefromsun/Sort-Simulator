// merge.js
const container = document.getElementById('main');
const settled = new Set();
let timeoutId = null; // Store timeout ID
let blue=[];
let red=[];
let result=[];
function reset() {
    window.arr = [];
    settled.clear();
    // Clear any existing timeout:
    if(timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        settled.clear();
        red=[];
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
        blue=[];
        red=[];
        result=[];
    }
    let copy = [...arr];
    mergesort(copy,0,dataSize-1);
    animate(result);
    display();
    
}

function animate(steps) {
    red=[];
    if (steps.length === 0) {
        for(let i=0;i<window.dataSize;i++){
            settled.add(i);
        }
        display();
        return;
    }
    
    let [i, j, k] = steps.shift();
    if(k==0){

 for(let x=i;x<=j;x++){
    red.push(x);
}
display();
timeoutId = setTimeout(() => animate(steps), window.animationSpeed*.85);
return;
    // Store the timeout ID:
}

if (k == 1) {
// colour bars blue
settled.clear();
blue=[];

for(let x=i;x<=j;x++){
    blue.push(x);
}
display();
timeoutId = setTimeout(() => animate(steps), window.animationSpeed*.8);
return;
}

if (k == 2) {
    // colur bars green
    arr[i] = j;
    settled.add(i);
    display();
    timeoutId = setTimeout(() => animate(steps), window.animationSpeed*.8);
    return;
}
if (k == 3) {
settled.clear();
blue=[];
display();
timeoutId = setTimeout(() => animate(steps), window.animationSpeed*.8);
return;
}

}
function merge(l1,left,right){
    result.push([left,right,1]);
    let i=0,j=0,k=left;
    let m= Math.floor(left + (right - left) / 2);
    let lr=l1.slice(left,m+1);
    let rr=l1.slice(m+1,right+1);
    while(i<lr.length && j<rr.length){
        if(lr[i]<=rr[j]){
            l1[k]=lr[i];
            result.push([k,lr[i],2]);
            k++;
            i++;
        }
        else{
            l1[k]=rr[j];
            result.push([k,rr[j],2]);
            k++;
            j++;
        }
    }
    while(i<lr.length){
        l1[k]=lr[i];
        result.push([k,lr[i],2]);
        k++;
        i++;
    }
    while(j<rr.length){
        l1[k]=rr[j];
        result.push([k,rr[j],2]);
        k++;
        j++;
    }
    if(left==0 && right==window.size-1){
        return;
    } 
    result.push([left,right,3]);    
}
function mergesort(arr1,low,high){
    if(low>=high){
        result.push([low,high,0]);
        result.push([low,arr1[low],2]);
        
        return ;    }

    result.push([low,high,0]);
        let mid = Math.floor(low + (high - low) / 2);
    
  
    mergesort(arr1,low,mid);
    mergesort(arr1,mid+1,high);

    merge(arr1,low,high);
}

function display() {
    container.innerHTML = '';
    for (let i = 0; i < window.dataSize; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = window.arr[i]*4 + 'px';

  if(red.length>0 && red.includes(i)){
            bar.style.backgroundColor = '#ff4545';     // red
        }
        if (blue.length > 0 &&  blue.includes(i)) {
                   bar.style.backgroundColor = '#0d6efd';  // blue
               }   
        if(settled.has(i)){
            bar.style.backgroundColor = '#04e76d';     // green
        }
        container.appendChild(bar);
    }


}

export { reset, sort };