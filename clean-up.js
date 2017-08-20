const del = require('del');

del(['db.json', 'build/*.js']).then(paths => {
	console.log('Clean up completed');
});