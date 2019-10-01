(function() {
  'use strict';

  const Select = function(element, options) {
    this.element = element;
    this.options = options;
    
    let customSelect = function() {
      let select = document.createElement('DIV')
      select.classList.add('select')

      let cursor = document.createElement('DIV')
      cursor.classList.add('select_cursor')
      select.appendChild(cursor)

      let tags = document.createElement('DIV')
      tags.classList.add('select_tags')
      select.appendChild(tags)

      let single = document.createElement('SPAN')
      single.classList.add('select_placeholder')
      single.textContent = 'Выберите опцию'
      tags.appendChild(single)    

      let listWrapper = document.createElement('DIV')
      listWrapper.classList.add('select_listWrapper')   
      select.appendChild(listWrapper)

      let list = document.createElement('UL')
      list.classList.add('select_list')   
      listWrapper.appendChild(list)

      return select
    }

    let option = function(elem, select) {
      while (elem.options.length) {
        let option = document.createElement('LI')
        option.classList.add('select_option')
        option.dataset.value = elem.options[0].value
        option.textContent = elem.options[0].textContent
        select.querySelector('.select_list').appendChild(option)
        elem.remove(elem.options[0])
      }

      let newOption = document.createElement('OPTION')
      newOption.setAttribute('selected', 'selected')
      newOption.setAttribute('value', '')
      elem.appendChild(newOption)
    }

    let clickCallback = function(e) {
      e.target.closest('.select').classList.toggle('select__active')
      let option = e.target.closest('.select_option')
      if (option) {
        if (e.target.closest('.select_option__selected')) {
          e.target.classList.remove('select_option__selected')
          select.querySelector('.select_placeholder').style.display = ''
          select.querySelector('.select_tags').removeChild(select.querySelector('.select_single'))
          elem.querySelector('option').setAttribute('value', '')
        } else {
          let options = option.parentNode.querySelectorAll('.select_option')
          for (let i = 0; i < options.length; i++) {
            options[i].classList.remove('select_option__selected')
          }
          option.classList.add('select_option__selected')

          let single = select.querySelector('.select_single') || document.createElement('DIV')
          single.className = 'select_single'
          single.textContent = option.textContent
          select.querySelector('.select_placeholder').style.display = 'none'
          select.querySelector('.select_tags').appendChild(single)

          elem.querySelector('option').setAttribute('value', option.dataset.value)
        }
      }
    }

    if (element.toString() === '[object NodeList]') {
      for (let i = 0; i < element.length; i++) {
        let select = customSelect()
        let elem = element[i]
        elem.classList.add('select__base')

        option(elem, select)

        elem.parentNode.insertBefore(select, element[i].nextSibling)

        select.addEventListener('click', function(e) {
          e.target.closest('.select').classList.toggle('select__active')
          let option = e.target.closest('.select_option')
          if (option) {
            if (e.target.closest('.select_option__selected')) {
              e.target.classList.remove('select_option__selected')
              select.querySelector('.select_placeholder').style.display = ''
              select.querySelector('.select_tags').removeChild(select.querySelector('.select_single'))
              elem.querySelector('option').setAttribute('value', '')
            } else {
              let options = option.parentNode.querySelectorAll('.select_option')
              for (let i = 0; i < options.length; i++) {
                options[i].classList.remove('select_option__selected')
              }
              option.classList.add('select_option__selected')
  
              let single = select.querySelector('.select_single') || document.createElement('DIV')
              single.className = 'select_single'
              single.textContent = option.textContent
              select.querySelector('.select_placeholder').style.display = 'none'
              select.querySelector('.select_tags').appendChild(single)

              elem.querySelector('option').setAttribute('value', option.dataset.value)
            }
          }
        })
      }
    } else if (element.toString() === '[object HTMLSelectElement]') {
      let select = customSelect()
      option(element, select)
      element.classList.add('select__base')

      element.parentNode.insertBefore(customSelect(), element.nextSibling)
    }

  };

  window.Select = Select;
})();
