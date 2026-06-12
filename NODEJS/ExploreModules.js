const fs=require('fs');
const os=require('os');
const pa=require('path');
const ev=require('events');

console.log(fs.existsSync('charan.txt'));

fs.writeFileSync('charan.txt','Hello Charan');

let data=fs.readFileSync('charan.txt','utf8');
console.log(data);

fs.appendFileSync('charan.txt','\nWelcome to NodeJS');

console.log(fs.statSync('charan.txt').size);

console.log(os.platform());
console.log(os.arch());
console.log(os.hostname());

console.log(pa.basename('charan.txt'));
console.log(pa.dirname('charan.txt'));
console.log(pa.extname('charan.txt'));

const emitter=new ev.EventEmitter();

emitter.on('message',(msg)=>{
    console.log(msg);
});

emitter.emit('message','Event Triggered');