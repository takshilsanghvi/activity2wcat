let fs=require("fs");
let inputArr=process.argv.slice(2);
//console.log(inputArr);
let optionArr=[];
let fileArr=[];
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionArr.push(inputArr[i]);
    }
    else{
        fileArr.push(inputArr[i]);
    }
}
//*****************check if all the files are present */
for(let i=0;i<fileArr.length;i++){
    let ans=fs.existsSync(fileArr[i]);
    if(ans==false){
        console.log("file doesn't exists");
        return;
    }
}
//*************************content append */
let content="";
for(let i=0;i<fileArr.length;i++){
    let cFileContent=fs.readFileSync(fileArr[i]);
    content=content+cFileContent+"\n";
}
//console.log(content);
//console.log(optionArr);
let contentArr=content.split("\n")

//s check

let isSPresent=optionArr.includes("-s");
if(isSPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!== null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
    
}
console.log(contentArr.join("\n"));
//n index b index
let indexofN=optionArr.indexOf("-n");
let indexofB=optionArr.indexOf("-b");
let finalOption="";
//console.log(optionArr);
//both are present
//*********solve whether to implement -n or -b */
if(indexofN > -1 && indexofB > -1){
    //index--smaller
    if(indexofN<indexofB){
        finalOption="-n";
    }
    else{
        finalOption="-b";
    }
}
else{
    //is there any option-->-n,-b
    if(indexofN > -1){
        finalOption="-n";
    }
    else if(indexofB>-1){
     finalOption="-b";
    }
}
if(finalOption !=""){
    if(finalOption=="-n"){
        modifyContentByN(contentArr);
    }
    else if(finalOption=="-b"){
        modifyContentByB(contentArr)
    }
}
function modifyContentByN(contentArr){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+" "+contentArr[i];
    }
}
function modifyContentByB(contentArr){
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+" "+contentArr[i];
            count++;
        }
    }
}
console.log("final option",finalOption);
console.log(contentArr);
console.log("````````");
console.log(contentArr.join("\n"));