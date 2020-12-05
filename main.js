
var bar=[];
var delay=0;
function disableBUtton()
{
    document.getElementById('btn-bubble-sort').disabled=true;
    document.getElementById('btn-selection-sort').disabled=true;
    document.getElementById('btn-insertion-sort').disabled=true;
    document.getElementById('btn-merge-sort').disabled=true;
    document.getElementById('btn-generate').disabled=true;
}
function enableButton()
{
   setTimeout(()=>{
       
        document.getElementById('btn-bubble-sort').disabled=false;
        document.getElementById('btn-selection-sort').disabled=false;
        document.getElementById('btn-insertion-sort').disabled=false;
        document.getElementById('btn-merge-sort').disabled=false;
        document.getElementById('btn-generate').disabled=false;
    },delay);
}
function setup()
{
    generateArrayBar();
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
    },delay+=100);
    
}
function bubbleSort()
{
    disableBUtton();
    delay=0;   
    for(var i=0;i<bar.length;i++){
        for(var j=0;j<bar.length-i-1;j++){
            update(j,"yellow",bar[j]);
            
            if(bar[j]>bar[j+1]){
                update(j,"red",bar[j]);
                update(j+1,"red",bar[j+1]);

                var temp = bar[j];
                bar[j]=bar[j+1];
                bar[j+1]=temp;

                update(j,"red",bar[j]);
                update(j+1,"red",bar[j+1]);

            }
            update(j,"blue",bar[j]);
        }
        update(j,"green",bar[j]);
    }
    update(0,"green",bar[0]);
    
    enableButton();
}

function selectionSort()
{
    disableBUtton();
    delay=0;
    for(var i=0;i<bar.length-1;i++){
        update(i,"red",bar[i]);
        var minIndex=i;
        for(var j=i+1;j<bar.length;j++){
            update(j,"yellow",bar[j]);
            if(bar[minIndex]>bar[j]){
                if(minIndex!=i){
                    update(minIndex,"blue",bar[minIndex]);
                }
                minIndex=j;
                update(minIndex,"red",bar[minIndex]);
            }
            else{
                update(j,"blue",bar[j]);
            }
        }
        if(minIndex!=i){
            var temp = bar[minIndex];
            bar[minIndex]=bar[i];
            bar[i]=temp;

            update(minIndex,"red",bar[minIndex]);
            update(i,"red",bar[i]);
            update(minIndex,"blue",bar[minIndex]);
        }
        update(i,"green",bar[i]);
    }
    update(i,"green",bar[i]);

    enableButton();
}

function insertionSort()
{
    delay=0;
    disableBUtton();
    var i;
    for(i=0;i<bar.length;i++){
        update(i,"yellow",bar[i]);
        var key=bar[i];
        var j=i-1;
        while(j>=0 && bar[j]>key){
            update(j,"red",bar[j]);
            update(j+1,"red",bar[j+1]);
            bar[j+1]=bar[j];
            update(j,"red",bar[j]);
            update(j+1,"red",bar[j+1]);

            update(j,"blue",bar[j]);

            if(i==j-1)update(j+1,"yellow",bar[j+1]);
            else update(j+1,"blue",bar[j+1]);
            j--;
        }
        bar[j+1]=key;
        for(var pos=0;pos<i;pos++)update(pos,"green",bar[pos]);
    }
    update(i-1,"green",bar[i-1]);
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
        update(mid,"yellow",bar[mid]);
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
            update(s-1,"red",bar[s-1]);
        }
        else if(s>end){
            temp[p++]=bar[f++];
            update(f-1,"red",bar[f-1]);
        }
        else if(bar[s]>bar[f]){
            temp[p++]=bar[f++];
            update(f-1,"red",bar[f-1]);
        }
        else{
            temp[p++]=bar[s++];
            update(s-1,"red",bar[s-1]);
        }
    }
    for(var pos=0;pos<p;pos++){
        bar[start++]=temp[pos];
        update(start-1,"green",bar[start-1]);
    }
}
setup();




      