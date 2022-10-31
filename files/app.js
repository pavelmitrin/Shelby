/* var fs = require('fs'); */
import * as fs from 'fs';
/* var path = require('path'); */
import * as path from 'path';


let allProducts = {};


var getFiles = function (dir, files_) {

	files_ = files_ || [];
	var files = fs.readdirSync(dir);
	for (var i in files) {
		var name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files_);
		} else {
			files_.push(name);
		}
	}
	return files_;
};

let catalog = getFiles('/home/pavel/Documents/schelby_src/src/img/catalog'),
		categoriesName = [],
		productArticles = [],
		productPictures = [],
		productOptions = [],
		productDescriptions = [],
		productsPath = [];

let passing = [];

catalog.forEach(el => {
	let from = el.search('/img'); 
	let to = el.lenght; 

	let names = categotyName(el);

	if (names !== null) {
		passing.push(names);
	}

	productsPath.push(el.substring(from, to)); 	
	
});


passing.forEach(element => {
	if (!categoriesName.includes(element[0]) && !categoriesName.includes('/')) {
		categoriesName.push(element[0]);
	}
})


passing = [];


categoriesName.forEach((item, index)=> {
	item = item.replace(/\//g, '');
	categoriesName[index] = item;
	allProducts[`${item}`] = [];


	productsPath.forEach(el => {
		// console.log(item);
		let it = item.replace(/\(/, '\\(');
		it = it.replace(/\)/, '\\)');

		

		let from = 'fff';		//	new RegExp('\\/' + it + '\\/');
		let to = /\/[A-Z]+\d{4}.+?/g;		
		// let to = new RegExp('\\/' + it + '\\/[a-zA-Z0-9].+?\\/')

		
		let pppp = el.match(to);
		if (pppp != null) {
			console.log(pppp);

		}

		
		
	// if (el.search(to) != -1 && el.search(from) != -1)  {
		// allProducts[`${item}`].push(`${new CreateProduct(`${el.search(from, to)}`)}`)
		// console.log(el.search(from));
		// console.log(el.search(to));

		// console.log(el.substring(from, to));

	// }

		// allProducts[`${item}`].push();
		// /`${item}`/.test(el)
	})

})

// console.log(categoriesName);



function contains(arr, elem) {
	arr.forEach(item => {
		if (item === elem) {
			return true;
		} else {
			return false;
		}
	})
}

// let data = JSON.stringify(catalog);
// fs.writeFile('./catalog.json', data, function (err) {
// 	if (err) return console.log(err);
// });

function categotyName(el) {
	return el.match(/\/[A-Z]+?\//g);    		// Если будут полные названия категорий на русском в папке 
}




/* console.log(categoriesName); */

//	categoriesName - done




function CreateProduct (articles) {
	this.article = `${articles}`;

}