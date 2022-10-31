// TODO: article
// TODO: pictures


/* var fs = require('fs'); */
import * as fs from 'fs';
/* var path = require('path'); */
import * as path from 'path';

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


let PathFromStart = getFiles('../img/catalog'),
	allPath = [];

	PathFromStart.forEach(el => {
	el = el.replace('../img/catalog/', '' );
	allPath.push(el);
})

let categoryName = [];
let productsArticle = [];
let done = {};
function FullProduct(article) {
	this.name = '';
	this.article = article;
	this.pictures = [];
	this.options = [];
	this.description = [];
}



allPath.forEach(el => {
/* categoryName */	
	let from = 0,
			to = el.search(/\//);
	if (el.substring(from, to) !== '') {
		categoryName.push(el.substring(from, to));
	}

/* articles */
	from = el.substring(from, to);
	to = /[A-Z]+?\d{4}/;
	if (el.match(to) !== null) {
		productsArticle.push(el.match(to)[0]);
	}
})


categoryName = categoryName.filter((value, index, self) => self.indexOf(value) === index);
productsArticle = productsArticle.filter((value, index, self) => self.indexOf(value) === index);


categoryName.forEach(el => {
	done[`${el}`] = [];
})

productsArticle.forEach((elem, index) => {
	categoryName.forEach(el => {
		if (elem.search(el) != -1) {
			done[`${el}`].push(new FullProduct(elem));
		}
	})
	
})
/* pictures */
categoryName.forEach(el => {
	done[`${el}`].forEach(category => {
		PathFromStart.forEach(e => {
			if (e.search(category.article) != -1) {
				category.pictures.push(e);
			}
		})
	})
})

console.log(done);
// console.log(PathFromStart);
// console.log(done.SHR[5].pictures);

