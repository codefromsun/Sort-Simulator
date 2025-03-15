
import { reset as bubbleReset, sort as bubbleSort } from './bubble.js';
import { reset as selectionReset, sort as selectionSort } from './selection.js';
import { reset as insertionReset, sort as insertionSort } from './insertion.js';
import { reset as mergeReset, sort as mergeSort } from './merge.js';
import { reset as quickReset, sort as quickSort } from './quick.js';


document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    const dataSizeSlider = document.getElementById('data-size-slider');
    const speedSlider = document.getElementById('speed-slider');
    const sortButton = document.getElementById('sort-btn');
    const resetButton = document.getElementById('reset-btn');

    let selectedAlgorithm = 'bubble'; // Default algorithm
    let dataSize = parseInt(dataSizeSlider.value); // Initial data size
    let animationSpeed = parseInt(speedSlider.value); // Initial animation speed
    let arr=[]
    // Event listener for dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            reset(); // Reset when algorithm changes
            event.preventDefault();
            dropdownToggle.textContent = this.textContent;
            dropdownToggle.dispatchEvent(new Event('click'));
            selectedAlgorithm = this.getAttribute('data-value');
            console.log("Selected:", selectedAlgorithm);
            sortButton.classList.remove('disable')//appear
        });
    });



    // Event listener for data size slider
    dataSizeSlider.addEventListener('input', function () {
        dataSize = parseInt(this.value);
        window.dataSize = dataSize;
        sortButton.classList.remove('disable')//appear
        reset(); // Reset when data size changes
    });

    // Event listener for speed slider
    speedSlider.addEventListener('input', function () {
        animationSpeed = parseInt(this.value);
        window.animationSpeed = animationSpeed;

    });

    // Event listener for sort button
    sortButton.addEventListener('click', function () {
        sort();
        sortButton.classList.add('disable');//disappear
    });

    // Event listener for reset button
    resetButton.addEventListener('click', function () {
        reset();
        sortButton.classList.remove('disable')//appear
    });


    // Expose variables and functions to bubble.js (or other algorithm files)
    // all global variables are stored in window object as attributes
    window.dataSize = dataSize;
    window.animationSpeed = animationSpeed;
    window.arr=arr;

    // Algorithm selection
    function reset() {
        if (selectedAlgorithm === 'bubble') {
            bubbleReset();
        } else if (selectedAlgorithm === 'selection') {
            selectionReset();
        }
        else if (selectedAlgorithm === 'insertion') {
            insertionReset();
        }
        else if (selectedAlgorithm === 'merge') {
            mergeReset();
        }
        else if (selectedAlgorithm === 'quick') {
            quickReset();
        }
    }
    function sort() {
        if (selectedAlgorithm === 'bubble') {
            bubbleSort();
        } else if (selectedAlgorithm === 'selection') {
            selectionSort();
        }
        else if (selectedAlgorithm === 'insertion') {
            insertionSort();
        }
        else if (selectedAlgorithm === 'merge') {
            mergeSort();
        }
        else if (selectedAlgorithm === 'quick') {
            quickSort();
        }
    }
 

    reset();

});
