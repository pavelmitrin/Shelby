/* Swiper  on index.html*/
const swiper = new Swiper('.swiper', {
	loop: true,
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	speed: 400,
	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
	slideToClickedSlide: false,
	allowTouchMove: false,
});

/* Swiper  on catalog.html*/
const productPage = new Swiper('.product__images', {
	// loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	speed: 400,
	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
	slideToClickedSlide: false,
	allowTouchMove: false,
});


/* Typed */
if (document.querySelector('.element') != null) {
	let options = { strings: ["", "когда прогулка в парке действительно в радость", "пожалуй, лучшие детские игровые проcтранства", "когда игры для детей в саду действительно увлекательны"], typeSpeed: 60, backSpeed: 40, loop: !0, backDelay: 800 },
	typed = new Typed(".element", options);
};


/* Input range */
function range(item) {
	let selector = item.nextElementSibling;
	let selectorValue = selector.querySelector('.selector__value');

	selectorValue.innerHTML = item.value;
	if (item.closest('#body_2')) {
		selector.style.left = (item.value / 300000) + '%';
	} else if (item.closest('#body_3')) {
		if (+item.value === 1) {
			selector.style.left = `calc(${(100 / 11 * (+item.value - 1))}% + 12.5px)`;
		} else if (+item.value === 12) {
			selector.style.left = `calc(${(100 / 11 * (+item.value - 1))}% - 8px)`;
		} else {
			selector.style.left = (100 / 11 * (+item.value - 1)) + '%';
		}
	}
}


/* maskedinput plugin */
$.fn.setCursorPosition = function (pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};

/* validation */

$("#formTel").click(function () {
	$(this).setCursorPosition(3);
}).mask("+7 999 999 99 99");
$("#formTel").mask("+7 999 999 99 99");

$("#connectionCallTel").click(function () {
	$(this).setCursorPosition(3);
}).mask("+7 999 999 99 99");
$("#formTel").mask("+7 999 999 99 99");

$("#buyFormTel").click(function () {
	$(this).setCursorPosition(3);
}).mask("+7 999 999 99 99");
$("#formTel").mask("+7 999 999 99 99");



/* open buttons */

let buttonOpen = document.querySelectorAll('.btn-open');

buttonOpen.forEach(el => {
	el.addEventListener('click', () =>  {
		el.previousElementSibling.classList.toggle('hidden');
	})
})


// Получаем массив с данными каталога
async function f() {
	let DB = await(await fetch('../files/catalog.json')).json();

	const headercatalog = document.getElementById('headerCatalog');
	const footerCatalog = document.getElementById('footerCatalog');
	for (const key in DB) {
		const catalogHeaderLink = `<a href="/catalog/${key}.html" class="header__second-link">${DB[`${key}`][0].categoryName}</a>`;
		const catalogFooterLink = `<a href="/catalog/${key}.html" class="footer-links__link">${DB[`${key}`][0].categoryName}</a>`;
		
		headercatalog.insertAdjacentHTML('beforeend', catalogHeaderLink);		
		footerCatalog.insertAdjacentHTML('beforeend', catalogFooterLink);
	
		// catalog
		const catalogProduct = `
		<a href="catalog/${key}.html" class="catalog__item item">
		<div class="item__img">
			<img src="${DB[`${key}`][0].categoryPictute}" alt="">
		</div>
		<div class="item__text">
			<h4 class="item__title">${DB[`${key}`][0].categoryName} (${key})</h4>
			<p class="item__description">${DB[`${key}`][0].categorySubtitle}</p>
		</div>
		</a>
		`;

		if (document.getElementById('catalogItem')) {
			const catalog = document.getElementById('catalogItem');
			catalog.insertAdjacentHTML('beforeend', catalogProduct);
		}

		
		if (document.getElementById('equipmentProducts')) {
			const equipmentProducts = document.getElementById('equipmentProducts');
			for (let index = 1; index < DB[`${key}`].length; index++) {
				const el = DB[`${key}`][index];
				const product = `<div class="products__item">
				<a href="#product" class="product popup-link">
					<div class="product__img">
						<img src="../img/catalog/${key}/${DB[`${key}`][index].article}/1.webp" alt="">
					</div>
					<div class="product__text">
						<h4 class="product_title">${DB[`${key}`][index].name}</h4>
						<p class="product__article">Арт. ${DB[`${key}`][index].article}</p>
					</div>
					<button type="button">Подробнее</button>
					</a>
					<a href="#" target="_blank" class="products__item-dwg">Скачать DWG</a>
				</div>`;
				if (el.status == 'true') {
					equipmentProducts.insertAdjacentHTML('beforeend', product);
					function calc() {
						const popupLinks = document.querySelectorAll('.popup-link');
						const body = document.querySelector('body');
						const lockPadding = document.querySelectorAll('.lock-padding');
						let unlock = true;
						// checkCart();

						const timeout = 800;

						if (popupLinks.length > 0) {


							popupLinks.forEach((el => {
								el.addEventListener('click', (e) => {
									const popupName = el.getAttribute('href').replace('#', '');
									const curentPopup = document.getElementById(popupName);	
									popupOpen(curentPopup);
									e.preventDefault();
								})
							}))

						}

						const popupCloseIcon = document.querySelectorAll('.close-modal');
						if (popupCloseIcon.length > 0) {
							for (let index = 0; index < popupCloseIcon.length; index++) {
								const el = popupCloseIcon[index];
								el.addEventListener('click', function (e) {
									popupClose(el.closest('.modal'));
									e.preventDefault();
								});
							}
						}

						function popupOpen(curentPopup) {
							if (curentPopup && unlock) {
								const popupActive = document.querySelector('.modal.open');
								if (popupActive) {
									popupClose(popupActive, false);
								} else {
									bodyLock();
								}
								curentPopup.classList.add('open');

								curentPopup.addEventListener('click', function (e) {
									// console.log(e.target);
									// console.log(e.target.getAttribute('src'));
									if (!e.target.closest('.modal__content') && e.target.getAttribute('src') !== '../img/catalog/arrows_circle_remove.svg' && !e.target.closest('button')) {	//
										popupClose(e.target.closest('.modal'));
									}
								})

								if (curentPopup.id == 'calculation') {
									checked();
									changeModalBody();
								}

								
								
							};
						}
						function popupClose(popupActive, doUnlock = true) {
							if (unlock) {
								popupActive.classList.remove('open');
								
								if (doUnlock) {
									bodyUnLock();
									
								}
							}
							// checkCart();
						}
						function bodyLock() {
							const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

							if (lockPadding.length > 0) {
								for (let index = 0; index < lockPadding.length; index++) {
									const el = lockPadding[index];
									el.getElementsByClassName.PaddingRight = lockPaddingValue;
								}
							}
							body.style.paddingRight = lockPaddingValue;
							body.classList.add('_lock');

							unlock = false;
							setTimeout(function () {
								unlock = true;
							}, timeout)
						}
						function bodyUnLock() {
							setTimeout(function () {
								for (let index = 0; index < lockPadding.length; index++) {
									const el = lockPadding[index];
									el.style.paddingRight = '0px';
								}
								body.style.paddingRight = '0px';
								body.classList.remove('_lock');
							}, timeout);
							checkCart();
						}

						document.addEventListener('keydown', function (e) {
							if (e.which === 27) {
								const popupActive = document.querySelector('.modal.open');
								popupClose(popupActive);
							}
							checkCart();
						});
						(function () {
							//Проверяем поддержку
							if (!Element.prototype.closest) {
								//реализуем
								Element.prototype.closest = function (css) {
									var node = this;
									while (node) {
										if (node.matches(css)) return node;
										else node = node.parentElement;
									}
									return null;
								};
							}
						})();
						(function () {
							// Проверяем поддержку
							if (!Element.prototype.matches) {
								//определяем свойство
								Element.prototype.matches = Element.prototype.matchesSelector ||
									Element.prototype.webkitMatchesSelector ||
									Element.prototype.mozMatchesSelector ||
									Element.prototype.msMatchesSelector;
							}
						})();

						/* change modal body and submit form */
						function changeModalBody() {
							const form = document.getElementById('formCalculator');
							const modalPrev = document.getElementById('modal__back');
							const modalNext = document.getElementById('modal__next');
							const formSubmit = document.getElementById('form__button');

							let modalStep = form.querySelector('.modal__step'),
								modalTitle = form.querySelector('.modal__titles'),
								modalLastText = form.querySelector('.modal__lasts-text'),
								progressbar = form.querySelector('.modal__progressbar-progress'),
								modalBody = form.querySelectorAll('.form__item');

							let step = 1;

							modalNext.addEventListener('click', () => {

								if (step === 1) {
									let notChecked = [];

									const inputOptions = document.querySelectorAll(`#body_${step} .options__input`);

									inputOptions.forEach((el) => {
										if (!el.checked) {
											notChecked.push(el);
										}
									})
									if (inputOptions.length != notChecked.length) {
										document.querySelector(`#body_${step} .options`).classList.remove('_error');
									} else {
										document.querySelector(`#body_${step} .options`).classList.add('_error');
									}
								}
								if (step < 4 && !(document.querySelector(`#body_1 .options`).classList.contains('_error'))) {
									step++;
									progressbar.style.width = (step - 1) * 33.333 + '%';
									modalBody.forEach((el) => {
										el.classList.remove('active');
										if (el.closest(`#body_${step}`)) {
											el.classList.add('active');
										}
									})

									if (step === 4) {
										modalTitle.classList.add('hidden');
										modalLastText.classList.add('visible');
										modalNext.classList.add('hidden');
										formSubmit.classList.add('visible');
									} else {
										modalStep.textContent = step;
									}

								}

							})


							modalPrev.addEventListener('click', () => {

								if (step > 1) {
									step--;
									progressbar.style.width = (step - 1) * 33.333 + '%';
									modalBody.forEach((el) => {
										el.classList.remove('active');
										if (el.closest(`#body_${step}`)) {
											el.classList.add('active');
										}
									})
									modalStep.textContent = step;
									if (step <= 3) {
										modalTitle.classList.remove('hidden');
										modalLastText.classList.remove('visible');
										modalNext.classList.remove('hidden');
										formSubmit.classList.remove('visible');
									}
								}
							})

							formSubmit.addEventListener('click', (e) => {
								let error = validateCalculatorForm();

								if (error === 0) {
									form.submit();
								} else {
									e.preventDefault();
								}
							})
						}



						/* validate calculation form */

						function checked() {
							let calculatorRadio = document.querySelectorAll('.options__input[name="typeObject"]');

							calculatorRadio.forEach((el) => {
								el.addEventListener('change', () => {
									calculatorRadio.forEach((item) => {
										item.nextElementSibling.classList.remove('checked');
									})
									el.nextElementSibling.classList.add('checked');
								})
							})
						}


						function validateCalculatorForm() {

							const form = document.getElementById('formCalculator');

							let error = 0;
							let formReq = document.querySelectorAll('._req');

							for (let i = 0; i < formReq.length; i++) {
								const el = formReq[i];

								formRemoveError(el);

								if (el.classList.contains('formEmail')) {
									if (emailTest(el)) {
										formAddError(el);
										error++;
									}
								} else if (el.classList.contains('formTel')) {
									if (el.value == '') {
										formAddError(el);
										error++;
									}
								} else if (el.classList.contains('formName')) {
									if (el.value == '') {
										formAddError(el);
										error++;
									}
								}

							}

							return error;
						}

						function formAddError(el) {
							el.parentElement.classList.add('_error');
							el.classList.add('_error');
						}
						function formRemoveError(el) {
							el.parentElement.classList.remove('_error');
							el.classList.remove('_error');
						}
						function emailTest(el) {
							return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(el.value);
						}
					}
					calc();
				}
			}
		}

	}

	//	catalog product popup
	const popupLinks = document.querySelectorAll('.popup-link');
	if (popupLinks.length !== 0) {
		popupLinks.forEach(el => {
			el.addEventListener('click', () => {
				if (el.querySelector('.product__article')) {
					let art = el.querySelector('.product__article').textContent.replace(/Арт. /, '');
					
					for (const key in DB) {
						for (let index = 1; index < DB[`${key}`].length; index++) {
							const element = DB[`${key}`][index];
							
							if (element.article == art) {
								const popup = document.getElementById('product');
								let popupSlider = popup.querySelector('.swiper-wrapper');
								let popupTitle = popup.querySelector('.desc__title');
								let popupArticle = popup.querySelector('.desc__article');
								let popupOptions = popup.querySelector('.desc__options ul');
								let popupDescriptions = popup.querySelector('.desc__descriptions');
	
								clearPopup();
	
								element.pictures.forEach(picture => {
									const slide = `
										<div class="swiper-slide">
											<img src="${picture}" alt="">
										</div>
									`;
									popupSlider.insertAdjacentHTML('beforeend', slide)
								})
	
								popupTitle.textContent = element.name;
								popupArticle.textContent = `Арт. ${element.article}`;
	
								element.options.forEach(option => {
									const optionItem = `<li>${option}</li>`;
									popupOptions.insertAdjacentHTML('beforeend', optionItem);
								})
								
								element.description.forEach(option => {
									const descriptionItem = `<p>${option}</p>`;
									popupDescriptions.insertAdjacentHTML('beforeend', descriptionItem);
								})
	
								function clearPopup() {
									popupSlider.innerHTML = '';
									popupTitle.innerHTML = '';
									popupArticle.innerHTML = '';
									popupOptions.innerHTML = '';
									popupDescriptions.innerHTML = '';
								}
							}
						}
					}

					
				}
			})
		})
	}

	// Buy list
	const buyButton = document.querySelector('.desc__price.popup-link');
	const buyPage = document.getElementById('buy');
	let cartProducts = buyPage.querySelector('.cart__products');
	let buyList = [];
	const buyIcon = document.querySelector('#buyCart');


	if (localStorage.getItem('buyList')) {
		buyList = (JSON.parse(localStorage.getItem('buyList')));
		buyList.forEach(product => renderBuyList(product));

	}



	buyButton.addEventListener('click', addBuyProduct)
	cartProducts.addEventListener('click', removeBuyProduct)
	cartProducts.addEventListener('click', changeCount)
	
	

	function addBuyProduct() {
		const article = buyButton.previousElementSibling.textContent.replace(/Арт. /, '');
		let productDB;
		

		for (const key in DB) {
			for (let index = 1; index < DB[`${key}`].length; index++) {
				const element = DB[`${key}`][index];
				if (element.article === article) {
					productDB = element;
				}
				
			}
		}

		let picture = productDB.pictures[0];
		let name = productDB.name;

		const newProduct = {
			name: name,
			count: 1,
			picture: picture,
			article: article
		}

		if (buyList.length !== 0) {
			let rep = 0;
			buyList.forEach((product, index) => {

				if (product.article === article) {
					buyList[index].count = buyList[index].count + 1;
					rep = rep+1;
					// console.log(rep);
					// for (let index = 0; index < cartProducts.children.length; index++) {
					// 	const element = cartProducts.children[index];
					// 	if (element.querySelector('.cart__article').textContent.replace(/Арт. /, '') == article) {
					// 		element.querySelector('.amount__Score').value = parseInt(element.querySelector('.amount__Score').value) + 1;
					// 	}
						
					// }

				} 
				
			})
			if (rep === 0) {
				buyList.push(newProduct);
			}
			cartProducts.innerHTML = '';
			saveToLocalStorage();
			buyList.forEach(el => renderBuyList(el));
		} else {
			buyList.push(newProduct);
			saveToLocalStorage();

			renderBuyList(newProduct);
		}

		// buyList.push(newProduct);
		// saveToLocalStorage();

		// renderBuyList(newProduct);
		checkCart();
	}
	function removeBuyProduct(e) {
		if (e.target.closest('button') !== null && e.target.closest('button').classList.contains('cart__remove')) {
			const productRemove = e.target.closest('.cart__product');
			// console.log(productRemove);
			const productRemoveArticle = productRemove.querySelector('.cart__article').value.replace(/Арт. /, '');
			
			buyList = buyList.filter((item) => item.article != productRemoveArticle);
			saveToLocalStorage();
			
			productRemove.remove();
		}
		checkCart();
	}
	function saveToLocalStorage() {
		buyList = buyList.filter((product) => product.count != 0)
		localStorage.setItem('buyList', JSON.stringify(buyList));
		checkCart();
	}
	function renderBuyList(product) {
		const count = product.count;
		
		const cartProduct = `
			<div class="cart__product">
				<div class="cart__preview">
					<img src="${product.picture}" alt="">
				</div>
				<div class="cart__inform">
					<div class="cart__data">
						<h4 class="cart__name">${product.name}</h4>
						<input type="text"  class="cart__article" value="Арт. ${product.article}" readonly>
					</div>
	
					<div class="cart__amount">
					<button type="button" class="amountMinus"><img src="../img/catalog/arrows_circle_minus.svg" alt=""></button>
					<input class="amount__Score" value="${product.count}" readonly>
					<button type="button" class="amountPlus"><img src="../img/catalog/arrows_circle_plus.svg" alt=""></button>
					</div>
	
					<button type="button" class="cart__remove"><img src="../img/catalog/arrows_circle_remove.svg" alt=""></button>
					
				</div>
			</div>
		`;
		checkCart();
		cartProducts.insertAdjacentHTML('beforeend', cartProduct);
		
	}
	function changeCount(e) {
		const tapProduct = e.target.closest('.cart__product');
		const article = tapProduct.querySelector('.cart__article').value.replace(/Арт. /, '');
		if (e.target.closest('button') !== null && e.target.closest('button').classList.contains('amountMinus')) {
			
			buyList.forEach((product) => {
				if (product.article === article) {
					product.count--;
					if (product.count === 0) {
						tapProduct.remove();
					}
				}
			})
			saveToLocalStorage();
			cartProducts.innerHTML = '';
			buyList.forEach(product => renderBuyList(product));
			
		}
		if (e.target.closest('button') !== null && e.target.closest('button').classList.contains('amountPlus')) {
			buyList.forEach((product) => {
				if (product.article === article) {
					product.count++;
				}
			})
			saveToLocalStorage();
			cartProducts.innerHTML = '';
			buyList.forEach(product => renderBuyList(product));
		}
		checkCart();
	}

	function checkCart() {
		if (buyList.length !== 0 ) { // buyPage.classList.contains('open')
			buyIcon.classList.remove('none');
		} else {
			buyIcon.classList.add('none');
		}
	}
	
};

f();


submitBuyForm();

function submitBuyForm() {
	const form = document.querySelector('#buyForm');
	const btnSubmitForm = document.querySelector('#buyFormSubmit');

	if (form) {
		btnSubmitForm.addEventListener('click', (e) => {
			let error = validateBuyForm();
			if (error === 0) {
				// form.submit();
				e.preventDefault();
			} else {
				e.preventDefault();
			}
		})
	}
}

function validateBuyForm() {
	const form = document.querySelector('#buyForm');

	let error = 0;
	let inputFields = form.querySelectorAll('._req');

	for (let i = 0; i < inputFields.length; i++) {
		const el = inputFields[i];
		formRemoveError(el);

		if (el.id == 'buyFormName') {
			if (el.value == '') {
				formAddError(el);
				error++;
			}
		} else if (el.id == 'buyFormOrgan') {
			if (el.value == '') {
				formAddError(el);
				error++;
			}
		} else if (el.id == 'buyFormEmail') {
			if (emailTest(el)) {
				formAddError(el);
				error++;
			}
		}

	}
	return error;
}

function formAddError(el) {
	el.parentElement.classList.add('_error');
	el.classList.add('_error');
}
function formRemoveError(el) {
	el.parentElement.classList.remove('_error');
	el.classList.remove('_error');
}
function emailTest(el) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(el.value);
}
