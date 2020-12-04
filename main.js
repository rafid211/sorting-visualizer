
var bar=[];
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
var delay=0;
function update(i,color,height)
{
    setTimeout(()=>{
       
        var divElem = document.getElementById(i);
        divElem.style.height=height+"px";
        divElem.style.backgroundColor=color;
    },delay+=5);
    
}
function bubbleSort()
{
    
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
    document.getElementById('btn-bubble-sort').disabled=true;
    document.getElementById('btn-selection-sort').disabled=true;
    document.getElementById('btn-generate').disabled=true;
    enableButton();
}

function selectionSort()
{
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

    document.getElementById('btn-bubble-sort').disabled=true;
    document.getElementById('btn-selection-sort').disabled=true;
    document.getElementById('btn-generate').disabled=true;

    enableButton();
}
function enableButton()
{
   setTimeout(()=>{
       
        document.getElementById('btn-bubble-sort').disabled=false;
        document.getElementById('btn-selection-sort').disabled=false;
        document.getElementById('btn-generate').disabled=false;
    },delay);
}

generateArrayBar();

document.getElementById('btn-generate').addEventListener("click",()=>{generateArrayBar()});
document.getElementById('btn-bubble-sort').addEventListener("click",()=>{bubbleSort()});
document.getElementById('btn-selection-sort').addEventListener("click",()=>{selectionSort()});


      