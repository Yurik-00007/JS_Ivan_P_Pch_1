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
     
            }else{

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
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
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
    const div1 = new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    );
    div1.render();

    const div2 = new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container'
    );
    div2.render();

    const div3 = new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие           продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное           количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container'

    );
    div3.render();

    //Forms

    const forms = document.querySelectorAll('form');
    console.log(forms);

    const message = {
        loading:'img/form/spinner.svg',
        success : 'Спасибо! Скоро мы свяжемся',
        failure : 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e) =>{
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src=message.loading;
            statusMessage.style.cssText=`
                display: block;
                margin: 0 auto;
            `;
            console.log(form.insertAdjacentElement('afterend',statusMessage));
            form.insertAdjacentElement('afterend',statusMessage);


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');
            const formData =  new FormData(form);

            const object = {};
            formData.forEach(function(value,key){
                object[key]=value;
            });

            const json = JSON.stringify(object);


            request.send(json);
            request.addEventListener('load',() => {
                if(request.status ===200){
                    console.log(request.response);  
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();                    
                }else{
                    showThanksModal(message.failure);

                }
            });


        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
        <div class="modal__content">
       
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
            
            </div>`;
        
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() =>{
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            },4000); 


    }


});