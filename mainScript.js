const http = require('http');
const server = http.createServer(engine);
const fs = require('fs');
const crypto = require('crypto');
const url = require('url');
const repl = require('repl');

const code = ['omega', 'alpha', 'theta', 'sigma', 'beta', 'phi'];
var currentURL;

server.listen(3000, () => {
	console.log('listening to port 3000...');
});

function engine(req, resp)	{
	currentURL = url.parse(req.url);

	if (currentURL.path === '/user/add') {
		var usersTrail = {ID: '', key: ''};
		console.log('use .create_user <user_name>');
		const replServer = repl.start('$--> ');
		replServer.defineCommand('create_user', {
			help: 'used to create new user', 
			action(name)	{
				if(name)	{
					usersTrail.ID = name;
					usersTrail.key = '';
					console.log('use .key <key> for ' + 
						usersTrail.ID);
				}else	console.log('Empty values not allowed.');
			}
		});
		replServer.defineCommand('key', {
			help: 'used to create passkey for the user', 
			action(key)	{
				if(key && usersTrail.ID)	{
					usersTrail.key = key;
					addUser(usersTrail);
					console.log('User created.');
					usersTrail = {ID: '', key: ''};
				}else if(!usersTrail.ID)	{
					console.log('Enter Username first.');
				}else	console.log('Empty values not allowed.');
			}
		})
	}else if(currentURL.path === '/user/login')	{
		var usersTrail = {ID: '', key: ''};
		console.log('use .user <user_name>');
		const replServer = repl.start('$--> ');
		replServer.defineCommand('user', {
			help: 'used to enter username', 
			action(name)	{
				if(name)	{
					usersTrail.ID = name;
					usersTrail.key = '';
					console.log('use .key <key> for ' + 
						usersTrail.ID);
				}else	console.log('Empty values not allowed.');
			}
		});
		replServer.defineCommand('key', {
			help: 'used to enter passkey for the user', 
			action(key)	{
				if(key && usersTrail.ID)	{
					usersTrail.key = key;
					checkUser(usersTrail, (name) => {
						if(name)	{
							usersTrail = {ID: '', key: ''};
							console.log('Logged in as ' + name);
						}
						else	{
							console.log('Login failed.')
							usersTrail = {ID: '', key: ''};
						}
					});
				}else if(!usersTrail.ID)	{
					console.log('Enter Username first.');
				}else	console.log('Empty values not allowed.');
			}
		});
	}else if(currentURL.path === '/doctor/list')	{
		getExistingDoctors((doctors) => {
			console.log(doctors);
		});
	}else if(currentURL.path === '/doctor/add')	{
		var doctorTrail = {name: '', hosp: '', dept: '', 
		timings: Buffer.alloc(12,0)};
		console.log('use .add_doctor <name>');
		const replServer = repl.start('$--> ');
		replServer.defineCommand('add_doctor', {
			help: 'used to add doctor', 
			action(name)	{
				if(name)	{
					doctorTrail.name = name;
					console.log(doctorTrail);
				}else	console.log('Empty values not allowed.');
			}
		});
		replServer.defineCommand('hosp', {
			help: 'used to assign hospital to the doctor', 
			action(hosp)	{
				if(hosp && doctorTrail.name)	{
					doctorTrail.hosp = hosp;
					console.log(doctorTrail);
				}else if(!doctorTrail.name)	{
					console.log('Enter name first.');
				}else	console.log('Empty values not allowed.');
			}
		});
		replServer.defineCommand('dept', {
			help: 'used to assign department to the doctor', 
			action(dept)	{
				if(dept && doctorTrail.name)	{
					doctorTrail.dept = dept;
					console.log(doctorTrail);
				}else if(!doctorTrail.name)	{
					console.log('Enter name first.');
				}else	console.log('Empty values not allowed.');
			}
		});
		replServer.defineCommand('timings', {
			help: 'syntax of timings', 
			action()	{
				for(var i=0; i<12; i++)	{
					console.log((i+10) + '.00 - ' + 
						(i+11) + '.00 => ' + 
						String.fromCharCode(97+i));
				}
			}
		});
		replServer.defineCommand('timingSet', {
			help: 'used to assign timings of the doctor', 
			action(timing)	{
				if(timing && doctorTrail.name)	{
					try	{
						doctorTrail.timings = Buffer.alloc(12, 0);
						var timings = timing.split('');
						for(var i=0; i<timings.length; i++)	{
							var position = 
								timings[i].charCodeAt(0) - 97;
							if(0<=position && position<12) {
								doctorTrail.timings[position] = 1;
							}else	throw new Error('SyntaxError');
						}
						console.log(doctorTrail);
					}catch(err)	{
						console.log(err.message + 
							': use .timings for proper syntax.');
					}
				}else if(!doctorTrail.name)	{
					console.log('Enter name first.');
				}else	console.log('Empty values not allowed.');
			}
		});
		replServer.defineCommand('create_doctor', {
			help: 'finilize and create doctor', 
			action()	{
				addDoctor(doctorTrail);
				doctorTrail = {name: '', hosp: '', dept: '', 
					timings: Buffer.alloc(12,0)};
				console.log('Doctor added.');
			}
		});
	}
}

function addUser(user)	{
	user.ID = enc(0, user.ID);
	user.key = enc(1, user.key);
	var line = '\r\n' + user.ID + ' $.. ' + user.key;
	fs.appendFile('userList', line, () => {});
}

function checkUser(user, callback)	{
	getExistingUsers((users) => {
		for(var i = 0; i < users.length; i++)	{
			if(user.ID === users[i].ID) {
				if(user.key === users[i].key)	{
					callback(user.ID);
					return(true);
				}
			}
		}
		callback('');
	});
}

function getExistingUsers(callback)	{
	var users = [];
	fs.readFile('userList', (err, data) => {
		var list = data.toString().split('\r\n');
		for(var i = 0; i < list.length; i++) {
			var pair = list[i].split(' $.. ');
			pair[0] = decrypt(0, pair[0]);
			pair[1] = decrypt(1, pair[1]);
			users.push({ID: pair[0], key: pair[1]});
		}
		callback(users);
	});
}

function addDoctor(doctor)	{
	doctor.name = enc(2, doctor.name);
	doctor.hosp = enc(3, doctor.hosp);
	doctor.dept = enc(4, doctor.dept);
	var timing = '';
	for(var i=0; i<12; i++)	{
		timing += doctor.timings[i];
	}
	timing = enc(5, timing);
	var line = '\r\n' + doctor.name + ' $.. ' + doctor.hosp + 
	' $.. ' + doctor.dept + ' $.. ' + timing;
	fs.appendFile('doctorList', line, () => {});
}

function getExistingDoctors(callback)	{
	var doctors = [];
	fs.readFile('doctorList', (err, data) => {
		var list = data.toString().split('\r\n');
		for(var i = 0; i < list.length; i++) {
			var pair = list[i].split(' $.. ');
			pair[0] = decrypt(2, pair[0]);
			pair[1] = decrypt(3, pair[1]);
			pair[2] = decrypt(4, pair[2]);
			pair[3] = decrypt(5, pair[3]);
			var timingSplit = pair[3].split('');
			var timingS = [];
			for(var i0=0; i0<12; i0++)	{
				if(timingSplit[i0] == 1)	{
					if(timingS.length===0 || 
						timingS[timingS.length-1].end !== 22)
						timingS.push({start: 10+i0, end: 22});
				}else	{
					if(timingS.length!==0 && 
						timingS[timingS.length-1].end === 22)
						timingS[timingS.length-1].end = 10+i0;
				}
			}

			pair[3] = '';
			for(var i0=0; i0<timingS.length; i0++)	{
				if(i0!==0)	pair[3] += ' + ';
				pair[3] += timingS[i0].start + '.00-' + 
							timingS[i0].end + '.00';
			}
			doctors.push({name: pair[0], hosp: pair[1], 
				dept: pair[2], timings: pair[3]});
		}
		callback(doctors);
	});
}

function enc(position, input)	{
	var cipher = crypto.createCipher('aes192', code[position]);
	return(cipher.update(input, 'utf8', 'hex') + 
		cipher.final('hex'));
}

function decrypt(position, input)	{
	var decipher = crypto.createDecipher('aes192', 
		code[position]);
	return(decipher.update(input, 'hex', 'utf8') + 
		decipher.final('utf8'));
}