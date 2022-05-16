const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

          function hideTabContent () {
            content.forEach(item => {
                item.style.display = "none";
            });

            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
          }

          function showTabContent (i = 0) {
            content[i].style.display = display; //если нужно none, inline, flex заменяем
            tab[i].classList.add(activeClass);
          }

          //В css скрытия может и небыть или что то пошло не так, изначально инициализируем эти функции
          hideTabContent();
          showTabContent(); //можно здесь поставить 0, но красивее выше

          //блок каторый обьеденяет все табы
          header.addEventListener('click', (e) => { //навешываем обработчик на общую область содержащую все табы
            const target = e.target;
            //проверяем что действительно кликнули в таб, не важно в какой
            if (target && //что этот елемент кликабельный
                (target.classList.contains(tabSelector.replace(/\./, ""))|| target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) { //проверяем кликнул ли действительно пользователь в определенный таб, могут быть пробелы между табами
            //Так как в tabSelector мы получаем класс нужно убрать точку 
            
            //дальше перебераем табы и их номера по порядку
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i); //если номер по порядку 2, значит действие с 3 елементом
                }
            });
            }
          });
};

export default tabs;