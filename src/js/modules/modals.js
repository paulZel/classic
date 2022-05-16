

const modals = () => {
    //модальных окон много чтобы каждый раз не прописывать один и тот же алгоритм, мы  сначала напишем общий алгоритм

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),//все модальные окна со станицы
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { //проверка на обьект ивента
                    e.preventDefault(); //чтобы не перезагружалась страница на нажатия ссылки <a>
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "block"; //модальное окно уже показывается на странице
                //чтобы не скролилась страница при открытом модальном окне
                document.body.style.overflow = "hidden";
                //document.body.classList.add('modal-open'); //можем использувать анимации и бутстрап css
                document.body.style.marginRight = `${scroll}px`;
        });

            
        });

        close.addEventListener('click', () => { //обект события нам здесь не нужен
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none"; 
            document.body.style.overflow = "";
            //document.body.classList.remove('modal-open');

            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                //document.body.classList.remove('modal-open');

                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px'; //задаем параметры чтобы блог действительно существовал на странице
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        //этот блок готов и мы можем поместить его на страницу
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; //от полной ширины отнимаем пединги и главный контент (не включается прокрутка)
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    //showModalByTime('.popup', 60000);
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false); //подвязываем через кнопку одно модальное окно к другому
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;