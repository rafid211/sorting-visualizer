
var bar=[];
function generateArrayBar()
{
    bar=[];
    var container = document.getElementById('array-container');
    
    for(var i=0;i<150;i++){
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
    },delay+=1);
    
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
    document.getElementById('btn-sort').disabled=true;
    document.getElementById('btn-generate').disabled=true;
    enableButton();
}

function enableButton()
{
   setTimeout(()=>{
       
        document.getElementById('btn-sort').disabled=false;
        document.getElementById('btn-generate').disabled=false;
    },delay);
}

generateArrayBar();

document.getElementById('btn-generate').addEventListener("click",()=>{generateArrayBar()});
document.getElementById('btn-sort').addEventListener("click",()=>{bubbleSort()});


      