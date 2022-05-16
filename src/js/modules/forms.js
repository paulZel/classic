import checkNumInputs from './checkNumInputs';

const forms = (state) => { //собирет информацию и отправлеет на сервер
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
          

    checkNumInputs('input[name="user_phone"]');
    

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };
 
    const postData = async (url, data) => { //внутри фун есть асинхр опрерации
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, { //булет записыв тут promise каторый вернет серевер Нужно дождатся выполенения запроса
            method: "POST",
            body: data
        });
        return await res.text(); //js ждет выполенеие этой операции
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => { //отправляя форму она перезагружается это нужно отменить для adjax 
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); //помещаем сюда нужную форму
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData).then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 5000);
            });
        });
    });
};

export default forms;