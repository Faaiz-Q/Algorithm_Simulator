const container = document.getElementById('container');

const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");
const speedSlider = document.getElementById("speed");
const sizeSlider = document.getElementById("size");

const algorithmSelect=document.getElementById("algorithm");

let arr = [];

function generateArray(){

    arr=[];
    container.innerHTML = "";

    for(let i=0;i<sizeSlider.value;i++){

        const value = Math.floor(Math.random()*300)+20;

        arr.push(value);

        const bar = document.createElement("div");

        bar.classList.add("bar");
        bar.style.height = `${value}px`;

        container.appendChild(bar);
    }
}


function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve,ms));
}



async function bubbleSort(){
    generateBtn.disabled = true;
    sortBtn.disabled = true;
    const bars = document.querySelectorAll(".bar");
    for(let i=0;i<arr.length;i++){

        for(let j=0;j< arr.length-i-1;j++){
            bars[j].style.backgroundColor = "blue";
            bars[j+1].style.backgroundColor = "blue";

            await sleep(1000-speedSlider.value);
            
            if(arr[j]>arr[j+1]){
            [arr[j+1],arr[j]] = [arr[j],arr[j+1]];

            bars[j].style.height = `${arr[j]}px`;
            bars[j+1].style.height = `${arr[j+1]}px`;
            }
            
            await sleep(1000-speedSlider.value);
            bars[j].style.backgroundColor = "maroon";
            bars[j+1].style.backgroundColor = "maroon";
        }
        bars[arr.length - i - 1].style.backgroundColor = "green";
    }
    await sleep(300);
    for(let i=0;i<arr.length;i++)
    {
        bars[i].style.backgroundColor = "maroon";
    }
    generateBtn.disabled = false;
    sortBtn.disabled = false;
}


async function selectionSort(){
    generateBtn.disabled = true;
    sortBtn.disabled = true;

    const bars = document.querySelectorAll(".bar");

    for(let i=0;i<arr.length;i++){
        let minIndex = i;
        bars[minIndex].style.backgroundColor = "blue";

        for(let j=i+1;j<arr.length;j++){
            bars[j].style.backgroundColor = "blue";

            await sleep(1000-speedSlider.value);

            if(arr[j]<arr[minIndex])
            {
                bars[minIndex].style.backgroundColor = "maroon";
                minIndex = j;
                bars[minIndex].style.backgroundColor = "blue";
            }
            else{
                bars[j].style.backgroundColor = "maroon";
            }
        }
        [arr[minIndex],arr[i]] = [arr[i],arr[minIndex]];

            bars[minIndex].style.height = `${arr[minIndex]}px`;
            bars[i].style.height = `${arr[i]}px`;

            bars[minIndex].style.backgroundColor = "maroon";
            bars[i].style.backgroundColor = "green";
    }
    generateBtn.disabled = false;
    sortBtn.disabled = false;
}

sortBtn.addEventListener("click",()=>{
    const algorithm = algorithmSelect.value;
    if(algorithm === "bubble"){
        bubbleSort();
    }
    else if(algorithm === "selection"){
        selectionSort();
    }
});
generateBtn.addEventListener("click",generateArray);
sizeSlider.addEventListener("input", generateArray);

generateArray();