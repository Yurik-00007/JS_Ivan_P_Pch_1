'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');
	// console.log(tabs);
	// console.log(tabsContent);
	// console.log(tabsParent);

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');

	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}

			});
		}
	});

	//Timer

	const deadline = '2022-02-27';
	// const z = new Date(deadline);
	// console.log(typeof(z));

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZiro(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),

			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);
			if (t.total <= 0) {
				days.innerHTML = 0;
				hours.innerHTML = 0;
				minutes.innerHTML = 0;
				seconds.innerHTML = 0;
				clearInterval(timeInterval);

			} else {

				days.innerHTML = getZiro(t.days);
				hours.innerHTML = getZiro(t.hours);
				minutes.innerHTML = getZiro(t.minutes);
				seconds.innerHTML = getZiro(t.seconds);
				// console.log(t.total);
			}



		}

	}
	setClock('.timer', deadline);


	//Model

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');
	// modalCloseBtn = document.querySelector('[data-close]');

	// console.log(modalTrigger);

	modalTrigger.forEach(i => {
		i.addEventListener('click', openModal);
		// modal.classList.add('show');
		// modal.classList.remove('hide');

	});

	function openModal() {
		// modal.classList.toggle('show');
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modelTimerId);
	}

	function closeModal() {
		document.body.style.overflow = '';
		// modal.classList.add('hide');
		// modal.classList.remove('show');
		modal.classList.toggle('show');
	}

	// modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modelTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if ((window.pageYOffset + document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}

	}

	window.addEventListener('scroll', showModalByScroll);
	// Используем классы для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			// ...classes это рест оператор
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes; //будет массив и работать нужно как с массивом
			this.parent = document.querySelector(parentSelector); //указываем родителя, куда будут помещаться эти карточки
			this.transfer = 27; //фиксированый курс 
			this.changeToUAH();
			// вызываем метод который изменяет валюту и возвращает значение this.price

		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));

			}

			element.innerHTML = //делаем обект универсальным, вставляе атрибуты
				`
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            
            `;
			this.parent.append(element);
		}

	}

	const getResource = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	// getResource('http://localhost:3000/menu',)
	// .then(data =>{
	//     data.forEach(({img, altimg, title, descr, price}) =>{
	//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	//     });
	// });

	axios.get('http://localhost:3000/menu')
		.then(data => {
			// console.log(data);
			data.data.forEach(({
				img,
				altimg,
				title,
				descr,
				price
			}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// const div1 = new MenuCard(
	//     "img/tabs/vegy.jpg",
	//     "vegy",
	//     'Меню "Фитнес"',
	//     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	//     9,
	//     '.menu .container',
	//     'menu__item',
	//     'big'
	// );
	// div1.render();

	// const div2 = new MenuCard(
	//     "img/tabs/elite.jpg",
	//     "elite",
	//     'Меню “Премиум”',
	//     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	//     14,
	//     '.menu .container'
	// );
	// div2.render();

	// const div3 = new MenuCard(
	//     "img/tabs/post.jpg",
	//     "post",
	//     'Меню "Постное"',
	//     'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие           продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное           количество белков за счет тофу и импортных вегетарианских стейков.',
	//     21,
	//     '.menu .container'

	// );
	// div3.render();

	// getResource('http://localhost:3000/menu',)
	// .then(data => createCard(data));

	//     function createCard(data){
	//         data.forEach(({img, altimg, title, descr, price}) =>{
	//             const element = document.createElement('div');
	//             price*=27;

	//             element.classList.add('menu__item');

	//             element.innerHTML= `
	//                 <img src=${img} alt=${altimg}>
	//                 <h3 class="menu__item-subtitle">${title}</h3>
	//                 <div class="menu__item-descr">${descr}</div>
	//                 <div class="menu__item-divider"></div>
	//                 <div class="menu__item-price">
	//                     <div class="menu__item-cost">Цена:</div>
	//                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
	//                 </div>
	//             `; 

	//             document.querySelector('.menu .container').append(element);

	//         });
	//     }

	//Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
			form.insertAdjacentElement('afterend', statusMessage);


			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');


			const formData = new FormData(form);

			// const object = {};
			// formData.forEach(function (value, key) {
			//     object[key] = value;
			// });

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			console.log(json);

			const obj = {
				a: 23,
				b: 50
			};
			const w = Object.entries(obj);
			console.log(Object.fromEntries(w));




			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});

			// request.addEventListener('load', () => {
			//     if (request.status === 200) {
			//         console.log(request.response);
			//         showThanksModal(message.success);
			//         form.reset();
			//         statusMessage.remove();
			//     } else {
			//         showThanksModal(message.failure);

			//     }
			// });


		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
        <div class="modal__content">
       
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
            
            </div>`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// fetch('https://jsonplaceholder.typicode.com/posts', {
	//     method:'POST',
	//     body:JSON.stringify ({name:'Alex'}),
	//     headers:{
	//         'Content-type':'application/json'
	//     }
	// })
	//     .then(response => response.json())
	//     .then(json => console.log(json));

	//     // const request1= new XMLHttpRequest();
	//     // console.log(request1.open('GET','https://jsonplaceholder.typicode.com/todos/1'));

	// fetch('http://localhost:3000/menu')
	//     .then(data => data.json());
	//     //  .then(res => console.log(res)); 

	//Slider

	const sliders = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'), //обратиться и установить позицию relativ
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1,
		offset = 0; // отступ

	function currVal(slideIndex) {
		if (sliders.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}



	if (sliders.length < 10) {
		total.textContent = `0${sliders.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = sliders.length;
		current.textContent = slideIndex;
	}



	slidesField.style.width = 100 * sliders.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';



	sliders.forEach(slide => {
		slide.style.width = width;

	});

	slider.style.position = 'relative'; // теперь все элементы КОТОРЫЕ  будут абсолютно спазиционированы внутри слайдера будут нормально отображаться
	// создать большую обертку со всех точек и както ее застилизовать 
	const indicators = document.createElement('ol'), //не div а order list
		dots = [];

	function dotsVal() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < sliders.length; i++) {
		const dot = document.createElement('li'); // list item
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (sliders.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}


		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == sliders.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		currVal(slideIndex);

		dotsVal();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {

			offset = deleteNotDigits(width) * (sliders.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}


		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = sliders.length;
		} else {
			slideIndex--;
		}

		currVal(slideIndex);

		dotsVal();

	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			currVal(slideIndex);

			dotsVal();


		});
	});


	// showSlides(slideIndex);

	// if(sliders.length<10){
	//     total.textContent=`0${sliders.length}`;
	// }else{
	//     total.textContent=`${sliders.length}`;
	// }


	// function showSlides(n) {
	//     if (n > sliders.length) {
	//         slideIndex = 1;
	//     }
	//     if (n < 1) {
	//         slideIndex = sliders.length;
	//     }

	//     sliders.forEach(item => item.style.display = 'none');

	//     sliders[slideIndex-1].style.display = 'block';

	//     if(slideIndex<10){
	//         current.textContent=`0${slideIndex}`;
	//     }else{
	//         current.textContent=`${slideIndex}`;
	//     }


	// }

	// function plusSlides(n){
	//     showSlides(slideIndex += n);

	// }

	// prev.addEventListener('click', ()=>{
	//     plusSlides(-1);
	// });

	// next.addEventListener('click', ()=>{
	//     plusSlides(1);
	// });

	// Калькулятор

	const result = document.querySelector('.calculating__result span');



	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}


	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
				// console.log(elem.getAttribute('data-ratio'));
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '______';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
		// console.log(sex, height, weight, age, ratio);

	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
				calcTotal();
			});
		});

	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +(input.value);
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});

	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');




});