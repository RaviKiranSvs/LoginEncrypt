const did = require('./methods.js');

/*
pf('utf8:     ');	pf(Buffer.from('This is $parta.', 'utf8'));
pf('ascii:    ');	pf(Buffer.from('This is $parta.', 'ascii'));
pf('hex:      ');	pf(Buffer.from('This is $parta.', 'hex'));
pf('base64:   ');	pf(Buffer.from('This is $parta.', 'base64'));
pf('binary:   ');	pf(Buffer.from('This is $parta.', 'binary'));
pf('\n');
pf('utf8:     ');	pf(Buffer.from('This is $parta.').toString('utf8'));
pf('ascii:    ');	pf(Buffer.from('This is $parta.').toString('ascii'));
pf('hex:      ');	pf(Buffer.from('This is $parta.').toString('hex'));
pf('base64:   ');	pf(Buffer.from('This is $parta.').toString('base64'));
pf('binary:   ');	pf(Buffer.from('This is $parta.').toString('binary'));
*/
/*
console.time('tring');
pf('What re!?')
console.timeEnd('tring');
*/
/*
var i = 'em matladuthunnav ra?';
try	{
	i = lolbro;
}catch(err)	{
	pf('There\'s the error\n' + err.message);
}

var a = .1;
var b = .4;
var c = a+b;
pf(c);
*/
/*
for(var i=0; i<12; i++)	{
	//pf(`${i+10}.00 - ${i+11}.00 => ${String.fromCharCode(97+i)}`);
	pf((i+10) + '.00 - ' + 
		(i+11) + '.00 => ' + 
		String.fromCharCode(97+i));
}
*/
/*
var emits = {id: 0, emitters: Buffer.alloc(12,0)};
var timing = 'abcdijklmnop';

try	{
	var timings = timing.split('');
	for(var i=0; i<timings.length; i++)	{
		var position = timings[i].charCodeAt(0) - 97;
		if(0<=position && position<12) {
			emits.emitters[position] = 1;
		}else	throw new Error('outOfBounds');
	}
	pf(emits);	
}catch(err)	{
	pf(err.message);
}
*/
/*
const crypto = require('crypto');
const fs = require('fs');
var name = enc(2, 'Arjun Reddy');
var hosp = enc(3, 'NewDay');
var dept = enc(4, 'cardio');
var timings = Buffer.alloc(12,0);
timings[1] = 1;
timings[2] = 1;
timings[3] = 1;
timings[4] = 1;
timings[9] = 1;
timings[10] = 1;
timings[11] = 1;
timings[12] = 1;

var timing = '';
for(var i=0; i<12; i++)	{
	timing += timings[i];
}
timing = enc(5, timing);

var line = '\r\n' + name + ' $.. ' + hosp + 
' $.. ' + dept + ' $.. ' + timing;
fs.appendFile('doctorList', line, () => {});

function enc(position, input)	{
	const code = ['omega', 'alpha', 'theta', 'sigma', 'beta', 'phi'];
	var cipher = crypto.createCipher('aes192', code[position]);
	return(cipher.update(input, 'utf8', 'hex') + 
		cipher.final('hex'));
}
*/
/*
var timing = '110011001111';
var timingSplit = timing.split('');
var timingS = [];
for(var i=0; i<12; i++)	{
	if(timingSplit[i] == 1)	{
		if(timingS.length===0 || timingS[timingS.length-1].end !== 22)
			timingS.push({start: 10+i, end: 22});
	}else	{
		if(timingS.length!==0 && timingS[timingS.length-1].end === 22)
			timingS[timingS.length-1].end = 10+i;
	}
}
timing = '';
for(var i=0; i<timingS.length; i++)	{
	if(i!==0)	timing += ' + ';
	timing += timingS[i].start + '.00-' + timingS[i].end + '.00';
}
pf(timing);
*/
/*
for(var i = 0; i < 5; i++) {
	for(var i=0; i<3; i++)	{
		pf(i);
	}
	for(var i=0; i<2; i++)	{
		pf(i);
	}
	pf(i);
}
*/
/*
did.p('Bloody Human Life!');
did.pln('Bloody fool!');
did.pf('lolBro');
*/
/*
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const cent = Buffer.from([0xC2, 0xA2]);
did.p(cent);
console.log(decoder.write(cent));

const euro = Buffer.from([0xE2, 0x82, 0xAC]);
did.p(euro);
console.log(decoder.write(euro));
*/
/*
var i=0;
setInterval(() => {
	did.p('This is printing continously - ' + i);
	i++;
}, 2000);
setTimeout(() => {
	did.p('This is a one-time thing bro.');
}, 3000);
*/
/*
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write('ONE');
readline.cursorTo(rl, 1, 1);

setImmediate(() => {
	rl.write('abbe ivanni timewatse yavvaralu saar.\n');
});

setTimeout(() => {
	rl.question('What\'s your name? ', (answer) => {
	  did.p(`${answer} is you, you is ${answer}.`);
	  did.p('Mind = Blown');
	  rl.close();
	});
}, 2000);
*/
/*
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var i = 0;
setInterval(() => {
	readline.cursorTo(rl, i, i);
	rl.write('\\');
	i++
}, 500);
*/














