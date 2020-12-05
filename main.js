
var bar=[];
var delay=0;
var currentColor="rgb(25, 195, 238)";
var runningColor="red";
var scanningColor = "yellow";
var afterSortColor="green";
var speed=1;

function setSpeed()
{
    var s=document.getElementById('speed').value;
    s = parseInt(s);
    if(s==1)speed=1;
    else if(s==2)speed=5;
    else if(s==3)speed=10;
    else if(s==4)speed=100;
    else speed=1000;
    console.log(speed);
}
function disableBUtton()
{
    document.getElementById('btn-bubble-sort').disabled=true;
    document.getElementById('btn-selection-sort').disabled=true;
    document.getElementById('btn-insertion-sort').disabled=true;
    document.getElementById('btn-merge-sort').disabled=true;
    document.getElementById('btn-generate').disabled=true;
    document.getElementById('speed').disabled=true;
}
function enableButton()
{
   setTimeout(()=>{
       
        document.getElementById('btn-bubble-sort').disabled=false;
        document.getElementById('btn-selection-sort').disabled=false;
        document.getElementById('btn-insertion-sort').disabled=false;
        document.getElementById('btn-merge-sort').disabled=false;
        document.getElementById('btn-generate').disabled=false;
        document.getElementById('speed').disabled=false;
    },delay);
}
function setup()
{
    generateArrayBar();
    document.getElementById('speed').addEventListener("input",()=>{setSpeed()});
    document.getElementById('btn-generate').addEventListener("click",()=>{generateArrayBar()});
    document.getElementById('btn-bubble-sort').addEventListener("click",()=>{bubbleSort()});
    document.getElementById('btn-selection-sort').addEventListener("click",()=>{selectionSort()});
    document.getElementById('btn-insertion-sort').addEventListener("click",()=>{insertionSort()});
    document.getElementById('btn-merge-sort').addEventListener("click",()=>{mergeSort()});
}
function generateArrayBar()
{
    bar=[];
    var container = document.getElementById('array-container');
    
    for(var i=0;i<100;i++){
        let barHeight = Math.floor(Math.random()*700)+5;
        //console.log(barHeight);
        bar.push(barHeight);
    }
    // let All = bar.map((height)=>
    //     `<div class="array-bar" style='height:`+height+`px;'></div>`
    // ).join('');
    let allbar="";

    for(var i=0;i<bar.length;i++){
        allbar+=`<div class="array-bar" id='`+i+`' style='height:`+bar[i]+`px;'></div>`;
    }
    container.innerHTML=allbar;

}

function update(i,color,height)
{
   
    setTimeout(()=>{
       
        var divElem = document.getElementById(i);
        divElem.style.height=height+"px";
        divElem.style.backgroundColor=color;
    },delay+=speed);
    
}
function bubbleSort()
{
    disableBUtton();
    delay=0;   
    for(var i=0;i<bar.length;i++){
        for(var j=0;j<bar.length-i-1;j++){
            update(j,scanningColor,bar[j]);
            
            if(bar[j]>bar[j+1]){
                update(j,runningColor,bar[j]);
                update(j+1,runningColor,bar[j+1]);

                var temp = bar[j];
                bar[j]=bar[j+1];
                bar[j+1]=temp;

                update(j,runningColor,bar[j]);
                update(j+1,runningColor,bar[j+1]);

            }
            update(j,currentColor,bar[j]);
        }
        update(j,afterSortColor,bar[j]);
    }
    update(0,afterSortColor,bar[0]);
    
    enableButton();
}

function selectionSort()
{
    disableBUtton();
    delay=0;
    for(var i=0;i<bar.length-1;i++){
        update(i,runningColor,bar[i]);
        var minIndex=i;
        for(var j=i+1;j<bar.length;j++){
            update(j,scanningColor,bar[j]);
            if(bar[minIndex]>bar[j]){
                if(minIndex!=i){
                    update(minIndex,currentColor,bar[minIndex]);
                }
                minIndex=j;
                update(minIndex,runningColor,bar[minIndex]);
            }
            else{
                update(j,currentColor,bar[j]);
            }
        }
        if(minIndex!=i){
            var temp = bar[minIndex];
            bar[minIndex]=bar[i];
            bar[i]=temp;

            update(minIndex,runningColor,bar[minIndex]);
            update(i,runningColor,bar[i]);
            update(minIndex,currentColor,bar[minIndex]);
        }
        update(i,afterSortColor,bar[i]);
    }
    update(i,afterSortColor,bar[i]);

    enableButton();
}

function insertionSort()
{
    delay=0;
    disableBUtton();
    var i;
    for(i=0;i<bar.length;i++){
        update(i,scanningColor,bar[i]);
        var key=bar[i];
        var j=i-1;
        while(j>=0 && bar[j]>key){
            update(j,runningColor,bar[j]);
            update(j+1,runningColor,bar[j+1]);
            bar[j+1]=bar[j];
            update(j,runningColor,bar[j]);
            update(j+1,runningColor,bar[j+1]);

            update(j,currentColor,bar[j]);

            if(i==j-1)update(j+1,scanningColor,bar[j+1]);
            else update(j+1,currentColor,bar[j+1]);
            j--;
        }
        bar[j+1]=key;
        for(var pos=0;pos<i;pos++)update(pos,afterSortColor,bar[pos]);
    }
    update(i-1,afterSortColor,bar[i-1]);
    enableButton();
}

function mergeSort()
{
    delay=0;
    disableBUtton();
    mergeSortPertition(0,bar.length-1);
    enableButton();

}
function mergeSortPertition(start,end)
{
    if(start<end)
    {
        let mid = Math.floor((start+end)/2);
        update(mid,scanningColor,bar[mid]);
        mergeSortPertition(start,mid);
        mergeSortPertition(mid+1,end);

        merge(start,mid,end);
    }
}
function merge(start,mid,end)
{
    var f=start,s=mid+1;
    var temp=[];
    var p=0;
    for(var i=start;i<=end;i++){
        if(f>mid){
            temp[p++]=bar[s++];
            update(s-1,runningColor,bar[s-1]);
        }
        else if(s>end){
            temp[p++]=bar[f++];
            update(f-1,runningColor,bar[f-1]);
        }
        else if(bar[s]>bar[f]){
            temp[p++]=bar[f++];
            update(f-1,runningColor,bar[f-1]);
        }
        else{
            temp[p++]=bar[s++];
            update(s-1,runningColor,bar[s-1]);
        }
    }
    for(var pos=0;pos<p;pos++){
        bar[start++]=temp[pos];
        update(start-1,afterSortColor,bar[start-1]);
    }
}
setup();




      
