const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.querySelector('img');

    imgPopup.classList.add('popup'); //пока модал окно только внутри js
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path); //то что мы вытащили из ссылок
        }

        if (target && target.matches('div.popup')) { //пользователь кликнул на подложку
            imgPopup.style.display = 'none';
        }
    });
};

export default images;