(() => {
  const listForTable = [];
  const facultyArray = ['Гриффиндор', 'Пуффендуй', 'Когтевран', 'Слизерин'];
  const students = [];

  function getId() {
    return new Date().valueOf();
  }

  function createTitle(name) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = name;
    appTitle.style.fontSize = '72px';
    appTitle.classList.add('text-center', 'mb-5');
    return appTitle;
  }

  function createDropdownItem(name) {
    const dropdownItem = document.createElement('a');
    dropdownItem.text = name;
    dropdownItem.style.cursor = 'pointer';
    dropdownItem.classList.add('dropdown-item');
    return dropdownItem;
  }

  function selectInDropdown(dropdownBody) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.addEventListener('click', (e) => {
      const targetItem = e.target;
      if (targetItem.closest('.dropdown-item')) {
        dropdownBody.textContent = targetItem.closest('.dropdown-item').textContent;
      }
    });
  }

  function openDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdown.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });
    selectInDropdown(dropdown.firstElementChild);
  }

  function createDropdownFilter() {
    const labelText = ['Фио', 'Дата рождения', 'Год начала обучения', 'Год окончания обучения', 'Факультет'];
    const dropdown = document.createElement('div');
    const inputFilter = document.createElement('input');
    const btn = document.createElement('button');
    const dropdownMenu = document.createElement('div');
    const dropdownWrap = document.createElement('div');
    const label = document.createElement('div');
    const inputFilterWrap = document.createElement('div');

    label.textContent = 'Искать по :';
    label.style.fontWeight = 'bold';
    label.style.textAlign = 'right';
    btn.type = 'button';
    btn.textContent = 'Фио';
    btn.style.minWidth = '211px';
    inputFilter.style.right = '100px';
    inputFilter.style.top = '50%';
    inputFilterWrap.style.width = '100%';

    inputFilter.classList.add('form-control', 'filter-input');
    dropdown.classList.add('dropdown');
    btn.classList.add('btn', 'btn-secondary', 'dropdown-btn', 'mr-5');
    label.classList.add('mr-3');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownWrap.classList.add('d-flex', 'align-items-center', 'mb-5');
    inputFilterWrap.classList.add('input-filter-wrap', 'd-flex', 'btn-filter');
    labelText.forEach((text) => dropdownMenu.append(createDropdownItem(text)));

    inputFilterWrap.append(inputFilter);
    dropdownWrap.append(label);
    dropdownWrap.append(dropdown);
    dropdownWrap.append(inputFilterWrap);
    dropdown.append(btn);
    dropdown.append(dropdownMenu);

    return dropdownWrap;
  }

  // строка для tableBody
  function createTableRow() {
    return document.createElement('tr');
  }

  // Стрелка фильтрации
  function createArrowFilter(classEl) {
    const span = document.createElement('span');
    span.classList.add(classEl, 'position-absolute', 'd-none');
    span.textContent = '^';
    span.style.top = '30%';
    span.style.left = '5%';
    return span;
  }

  // th для шапки таблицы
  function createThTable(text, i) {
    const th = document.createElement('th');
    th.textContent = text;
    th.style.textAlign = 'center';
    th.setAttribute('scope', 'col');
    th.style.cursor = 'pointer';
    th.classList.add('position-relative', `th-${i}`);
    th.append(createArrowFilter(`arrow-${i}`));
    return th;
  }

  // td для тела таблицы
  function createTdForBody(text) {
    const td = document.createElement('td');
    td.textContent = text;
    td.style.textAlign = 'center';
    return td;
  }

  function crateTableHead(array) {
    const tableHead = document.createElement('thead');
    const tr = document.createElement('tr');
    array.forEach((text, i) => tr.append(createThTable(text, i)));
    tableHead.append(tr);
    return tableHead;
  }

  function createItemForBody() {
    const items = [];
    listForTable.forEach((student, i) => {
      items.push(createTableRow());
      Object.values(student).forEach((el, index) => {
        if (Object.keys(student)[index] !== 'id') {
          items[i].append(createTdForBody(el, i));
        }
      });
    });
    return items;
  }

  function createTable() {
    const labelText = ['ФИО', 'Дата рождения', 'Годы обучения', 'Факультет'];
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    createItemForBody().forEach((student) => tableBody.append(student));
    table.classList.add('table', 'table-striped');

    table.append(crateTableHead(labelText));
    table.append(tableBody);
    return table;
  }

  function addClassesTable() {
    const tbody = document.querySelector('tbody');
    const trArr = tbody.querySelectorAll('tr');
    for (let i = 0; i < trArr.length; i++) {
      for (let k = 0; k < trArr[i].childNodes.length; k++) {
        if (trArr[i].childNodes[k] === trArr[i].childNodes[0]) {
          trArr[i].childNodes[0].classList.add('field__fio');
        } else if (trArr[i].childNodes[k] === trArr[i].childNodes[1]) {
          trArr[i].childNodes[1].classList.add('field__dob');
        } else if (trArr[i].childNodes[k] === trArr[i].childNodes[2]) {
          trArr[i].childNodes[2].classList.add('field__start-training');
        } else if (trArr[i].childNodes[k] === trArr[i].childNodes[3]) {
          trArr[i].childNodes[3].classList.add('field__fac');
        }
      }
    }
  }
  function insertSpanInDateStart(start, end, inBrackets) {
    const startStr = `<span class="start-date-training">${start.string.slice(start.pos, start.pos + start.len)}</span>`;
    const endStr = `<span class="end-date-training">${end.string.slice(end.pos, end.pos + end.len)}</span>`;
    return `${startStr}-${endStr}${inBrackets}`;
  }

  function wrapInTableDateTraining() {
    const dateStartTraining = document.querySelectorAll('.field__start-training');
    dateStartTraining.forEach((el) => {
      const valEnd = el.textContent.split('-')[1].split('(')[0];
      const valStart = el.textContent.split('-')[0];
      let inBrackets = el.textContent.split('-')[1].split('(')[1];
      inBrackets = `(${inBrackets}`;
      const spanPosition = [
        {
          string: el.innerText,
          pos: el.innerText.search(valStart),
          len: valEnd.length,
        },
        {
          string: el.innerText,
          pos: el.innerText.search(valEnd),
          len: valEnd.length,
        },
      ];
      el.innerHTML = insertSpanInDateStart(spanPosition[0], spanPosition[1], inBrackets);
    });
  }

  function addItemInTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    createItemForBody().forEach((student) => tableBody.append(student));
    addClassesTable();
    wrapInTableDateTraining();
  }

  function getCurrentDate(day = false, month = false, year = false) {
    const now = new Date();
    if (month) return now.getMonth();
    if (day) return now.getDay();
    if (year) return now.getFullYear();
    return {
      day: now.getDay(),
      month: now.getMonth(),
      year: now.getFullYear(),
    };
  }

  function validateDb() {
    const dbInput = document.getElementById('dbInput');
    const span = dbInput.nextElementSibling;
    const year = dbInput.value.trim().substring(0, 4);
    const nowYear = getCurrentDate(false, false, true);
    dbInput.parentElement.append(span);
    if (year < 1900 || year > nowYear) {
      span.classList.add('show');
      return true;
    }
    span.classList.remove('show');
    return false;
  }

  function calcYears(date, ms = false) {
    const student = {
      birthDate: {
        year: parseInt(date.substring(0, 4), 10),
        month: parseInt(date.substring(5, 7), 10),
        day: parseInt(date.substring(8, 10), 10),
      },
      formatDate() {
        return `${this.birthDate.day < 10 ? '0' : ''}${this.birthDate.day}.${this.birthDate.month < 10 ? '0' : ''}${this.birthDate.month}.${this.birthDate.year}`;
      },
      getAge() {
        const now = new Date();
        const born = new Date(
          this.birthDate.year,
          this.birthDate.month + 1,
          this.birthDate.day,
        );
        const diffInMilliseconds = now.getTime() - born.getTime();
        if (ms) {
          return diffInMilliseconds;
        }
        return Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24 / 365.25);
      },
    };
    if (ms) {
      return +student.getAge();
    }
    return `${student.formatDate()}(${student.getAge()})`;
  }

  function calcStartTraining(yearStartTraining) { // год начала обучения
    // eslint-disable-next-line prefer-const
    let { year: currentYear, month: currentMonth } = getCurrentDate();
    currentMonth += 1;
    let diffYears = +currentYear - +yearStartTraining;
    const yearEndTraining = +yearStartTraining + 4;
    if (+currentMonth >= 9) {
      diffYears += 1;
    }
    if (+diffYears > 4) {
      return `${`${+yearStartTraining}-${yearEndTraining}`}(закончил)`;
    }
    return `${`${+yearStartTraining}-${yearEndTraining}`}(${diffYears === 0 ? 1 : diffYears}курс)`;
  }

  function clearForm() {
    const inputs = document.querySelectorAll('.input-form');
    setTimeout(() => {
      inputs.forEach((el) => { el.value = ''; });
    }, 50);
  }

  function createInput(labelText, id, type = 'text') {
    const wrap = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    span.textContent = 'Заполните правильно поле';
    span.style.color = 'red';
    span.classList.add('animated', 'fade');
    wrap.classList.add('form-group', 'd-flex', 'form-input');
    label.textContent = labelText;
    label.style.minWidth = '208px';
    input.classList.add('form-control', 'position-relative', 'input-form');
    input.id = id;
    input.type = type;
    input.required = true;
    input.style.transition = '300ms';
    if (input.type === 'number') {
      input.value = getCurrentDate(false, false, true);
      input.setAttribute('min', '2000');
      input.setAttribute('max', getCurrentDate(false, false, true));
    }
    label.append(input);
    wrap.append(label);
    input.after(span);
    return wrap;
  }

  // создаём форму для добавления студентов

  function validInputStartTraining() {
    const startTeachInput = document.querySelector('#startTeachInput');
    const dataInput = startTeachInput.value.trim();
    const span = startTeachInput.nextElementSibling;
    const year = getCurrentDate(false, false, true);
    if (dataInput > year || dataInput < 2000 || dataInput === '') {
      span.classList.add('show');
      span.textContent = `от 2000г до ${getCurrentDate(false, false, true)}г`;
      return true;
    }
    if (span.classList.contains('show')) span.classList.remove('show');
    return false;
  }

  function closeOutElement(ul, input) {
    document.addEventListener('click', (e) => {
      if (e.target !== ul && e.target !== input && !e.target.classList.contains('btn-submit')) {
        ul.classList.add('d-none');
      }
    });
  }

  function createLiElement(text) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'list-group-item-action');
    li.style.cursor = 'pointer';
    li.textContent = text;
    return li;
  }

  function tooltipList(list, input) {
    const ul = document.createElement('ul');
    const currentInput = input.firstElementChild.firstElementChild;
    ul.classList.add('list-group', 'position-absolute', 'list-faculty', 'd-none');
    ul.style.top = '46%';
    ul.style.left = '60%';
    list.forEach((el) => ul.append(createLiElement(el)));
    input.append(ul);
    input.addEventListener('click', () => {
      ul.classList.toggle('d-none');
    });
    ul.addEventListener('click', (e) => {
      if (e.target.closest('li')) {
        currentInput.value = e.target.textContent;
        ul.classList.remove('d-none');
        currentInput.nextElementSibling.classList.remove('show');
      }
    });
    closeOutElement(ul, currentInput);
  }

  function createForm() {
    const form = document.createElement('form');
    const formGroup = document.createElement('div');
    const groupOne = document.createElement('div');
    const groupTwo = document.createElement('div');
    const btn = document.createElement('button');

    btn.classList.add('btn', 'btn-primary', 'btn-submit');
    btn.textContent = 'Добавить';
    btn.type = 'submit';
    const nameInput = createInput('Имя', 'nameInput');
    const surnameInput = createInput('Фамилия', 'surnameInput');
    const lastnameInput = createInput('Отчество', 'lastNameInput');
    const dbInput = createInput('Дата рождения', 'dbInput', 'date');
    const startTeachInput = createInput('Год начала обучения', 'startTeachInput', 'number');
    const facultyInput = createInput('Факультет', 'facultyInput');
    tooltipList(facultyArray, facultyInput);
    form.addEventListener('submit', (e) => e.preventDefault());
    groupOne.classList.add('d-flex');
    groupTwo.classList.add('d-flex');
    nameInput.classList.add('mr-3');
    surnameInput.classList.add('mr-3');
    dbInput.classList.add('mr-3');
    startTeachInput.classList.add('mr-3');
    form.classList.add('mb-5');
    groupOne.append(nameInput, surnameInput, lastnameInput);
    groupTwo.append(dbInput, startTeachInput, facultyInput);
    formGroup.append(groupOne, groupTwo, btn);
    form.append(formGroup);

    return form;
  }
  function invalidInputs() {
    const inputs = document.querySelectorAll('.input-form');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        inputs[i].classList.add('bg-danger');
        setTimeout(() => {
          inputs.forEach((input) => input.classList.remove('bg-danger'));
        }, 500);
      }
    }
  }

  function validateForm() {
    const inputs = document.querySelectorAll('.input-form');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        return true;
      }
    }
    return false;
  }

  function getFio(name, surname, lastName) {
    const correctName = name[0].toUpperCase() + (name.slice(1).toLowerCase());
    const correctSurname = surname[0].toUpperCase() + (surname.slice(1)).toLowerCase();
    const correctLastName = lastName[0].toUpperCase() + (lastName.slice(1).toLowerCase());
    const fio = `${correctSurname} ${correctName} ${correctLastName}`;
    return fio;
  }

  function capitalize(text) {
    return text[0].toUpperCase() + (text.slice(1).toLowerCase());
  }

  function validFacultyInput(nameFaculty) {
    const inputFaculty = document.getElementById('facultyInput');
    const validFaculty = capitalize(nameFaculty);
    const ul = document.querySelector('.list-faculty');
    for (let i = 0; i < facultyArray.length; i++) {
      if (facultyArray[i] === validFaculty) {
        inputFaculty.nextElementSibling.classList.remove('show');
        return false;
      }
      if (inputFaculty[i] !== validFaculty) {
        inputFaculty.nextElementSibling.textContent = 'выберите из доступных';
        inputFaculty.nextElementSibling.classList.add('show');
      }
    }
    ul.classList.remove('d-none');
    return true;
  }

  function createDataStudent() {
    const btn = document.querySelector('.btn-submit');
    const nameInput = document.getElementById('nameInput');
    const surnameInput = document.getElementById('surnameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const dbInput = document.getElementById('dbInput');
    const startTeachInput = document.getElementById('startTeachInput');
    const facultyInput = document.getElementById('facultyInput');
    btn.addEventListener('click', () => {
      // eslint-disable-next-line max-len
      if (validateDb() || validateForm() || validInputStartTraining() || validFacultyInput(facultyInput.value.trim())) {
        invalidInputs();
      } else {
        const formData = {
          name: nameInput.value.trim(),
          surname: surnameInput.value.trim(),
          lastName: lastNameInput.value.trim(),
          // eslint-disable-next-line max-len
          fio: getFio(nameInput.value.trim(), surnameInput.value.trim(), lastNameInput.value.trim()),
          dateOfBirth: calcYears(dbInput.value.trim()),
          msDateOfBirth: calcYears(dbInput.value.trim(), true),
          calcStartTraining: calcStartTraining(startTeachInput.value.trim()),
          dateStartTraining: +startTeachInput.value.trim().split('-')[0],
          faculty: facultyInput.value.trim(),
          id: getId(),
        };
        students.push(formData);
        listForTable.push({
          fio: formData.fio,
          dateOfBirth: formData.dateOfBirth,
          calcStartTraining: formData.calcStartTraining,
          faculty: formData.faculty,
        });
        addItemInTable();
        clearForm();
      }
    });
  }

  function updateTableAfterSort(sortStudents) {
    listForTable.length = 0;
    sortStudents.forEach((sortStudent) => {
      listForTable.push({
        fio: sortStudent.fio,
        dateOfBirth: sortStudent.dateOfBirth,
        calcStartTraining: sortStudent.calcStartTraining,
        faculty: sortStudent.faculty,
      });
    });
  }

  function sortTable() {
    const tableHeader = document.querySelector('tr');
    const thead = document.querySelector('thead');
    const arrowsSort = thead.querySelectorAll('span');
    tableHeader.addEventListener('click', (e) => {
      arrowsSort.forEach((el) => {
        if (el.classList.contains('d-none') && listForTable.length > 1) {
          el.classList.remove('d-none');
        }
      });
      if (e.target && listForTable.length > 1) {
        if (e.target.textContent === 'ФИО^') {
          if (!e.target.classList.contains('text-info')) {
            e.target.lastChild.style.transform = 'rotate(0deg)';
            e.target.classList.add('text-info');
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((a.surname > b.surname) ? 1 : ((b.surname > a.surname) ? -1 : 0)));
          } else {
            e.target.classList.remove('text-info');
            e.target.lastChild.style.transform = 'rotate(180deg)';
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((b.surname > a.surname) ? 1 : ((a.surname > b.surname) ? -1 : 0)));
          }
        } else if (e.target.textContent === 'Факультет^') {
          if (!e.target.classList.contains('text-info')) {
            e.target.lastChild.style.transform = 'rotate(0deg)';
            e.target.classList.add('text-info');
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((a.faculty > b.faculty) ? 1 : ((b.faculty > a.faculty) ? -1 : 0)));
          } else {
            e.target.classList.remove('text-info');
            e.target.lastChild.style.transform = 'rotate(180deg)';
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((b.faculty > a.faculty) ? 1 : ((a.faculty > b.faculty) ? -1 : 0)));
          }
        } else if (e.target.textContent === 'Дата рождения^') {
          if (!e.target.classList.contains('text-info')) {
            e.target.lastChild.style.transform = 'rotate(0deg)';
            e.target.classList.add('text-info');
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((a.msDateOfBirth > b.msDateOfBirth) ? 1 : ((b.msDateOfBirth > a.msDateOfBirth) ? -1 : 0)));
          } else {
            e.target.classList.remove('text-info');
            e.target.lastChild.style.transform = 'rotate(180deg)';
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((b.msDateOfBirth > a.msDateOfBirth) ? 1 : ((a.msDateOfBirth > b.msDateOfBirth) ? -1 : 0)));
          }
        } else if (e.target.textContent === 'Годы обучения^') {
          if (!e.target.classList.contains('text-info')) {
            e.target.lastChild.style.transform = 'rotate(0deg)';
            e.target.classList.add('text-info');
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((a.dateStartTraining > b.dateStartTraining) ? 1 : ((b.dateStartTraining > a.dateStartTraining) ? -1 : 0)));
          } else {
            e.target.classList.remove('text-info');
            e.target.lastChild.style.transform = 'rotate(180deg)';
            // eslint-disable-next-line max-len,no-nested-ternary
            students.sort((a, b) => ((b.dateStartTraining > a.dateStartTraining) ? 1 : ((a.dateStartTraining > b.dateStartTraining) ? -1 : 0)));
          }
        }
      }
      updateTableAfterSort(students);
      addItemInTable();
    });
  }

  // сбрасываем тег mark если происходит смена фильтра
  function resetFilter() {
    const btnFilter = document.querySelector('.dropdown-btn');
    btnFilter.addEventListener('click', (e) => {
      const fio = document.querySelectorAll('.field__fio');
      const dob = document.querySelectorAll('.field__dob');
      const startTraining = document.querySelectorAll('.start-date-training');
      const endTraining = document.querySelectorAll('.end-date-training');
      const faculty = document.querySelectorAll('.field__fac');
      // eslint-disable-next-line default-case
      switch (e.target.textContent) {
        case 'Фио':
          // eslint-disable-next-line no-return-assign
          fio.forEach((el) => el.innerHTML = el.textContent);
          break;
        case 'Дата рождения':
          // eslint-disable-next-line no-return-assign
          dob.forEach((el) => el.innerHTML = el.textContent);
          break;
        case 'Год начала обучения':
          // eslint-disable-next-line no-return-assign
          startTraining.forEach((el) => el.innerHTML = el.textContent);
          break;
        case 'Год окончания обучения':
          // eslint-disable-next-line no-return-assign
          endTraining.forEach((el) => el.innerHTML = el.textContent);
          break;
        case 'Факультет':
          // eslint-disable-next-line no-return-assign
          faculty.forEach((el) => el.innerHTML = el.textContent);
          break;
      }
    });
  }

  function insertMark(string, pos, len) {
    return `${string.slice(0, pos)}<mark>${string.slice(pos, pos + len)}</mark>${string.slice(pos + len)}`;
  }
  function tableHideAndShow(val, nodeArr, startDate = false, endDate = false) {
    if (val !== '') {
      let startTraining;
      let endTraining;
      let inBracket;
      let str;
      nodeArr.forEach((el) => {
        if (startDate || endDate) {
          // eslint-disable-next-line prefer-destructuring
          inBracket = el.textContent.split('-')[1].split('(')[1];
          // eslint-disable-next-line prefer-destructuring
          startTraining = el.textContent.split('-')[0];
          // eslint-disable-next-line prefer-destructuring
          endTraining = el.textContent.split('-')[1].split('(')[0];
        }
        if (el.textContent.indexOf(val) === -1) {
          if (startDate && startTraining.search(val) === -1 && inBracket.search('закончил') === -1) {
            el.parentElement.classList.remove('d-none');
          }
          el.parentElement.classList.add('d-none');
          el.innerHTML = el.innerText;
        } else {
          if (startDate && startTraining.search(val) !== -1) {
            el.parentElement.classList.remove('d-none');
            str = startTraining;
            el.innerHTML = `${insertMark(str, el.innerText.search(val), val.length)}-${endTraining}(${inBracket}`;
          }
          if (endDate && endTraining.search(val) !== -1 && inBracket.search('закончил') !== -1) {
            el.parentElement.classList.remove('d-none');
            str = endTraining;
            el.innerHTML = `${startTraining}-${insertMark(str, el.innerText.search(val), val.length)}(${inBracket}`;
          }
          if (!startDate && !endDate) {
            el.parentElement.classList.remove('d-none');
            str = el.innerText;
            el.innerHTML = insertMark(str, el.innerText.search(val), val.length);
          }
        }
      });
    } else {
      nodeArr.forEach((el) => {
        if (endDate) el.parentElement.classList.remove('d-none');
        if (startDate) el.parentElement.classList.remove('d-none');
        el.parentElement.classList.remove('d-none');
        el.innerHTML = el.innerText;
      });
    }
  }

  function filterTable() {
    const inputFilter = document.querySelector('.filter-input');
    inputFilter.addEventListener('input', () => {
      const textFilter = document.querySelector('.dropdown-btn').textContent;
      const val = inputFilter.value.trim();
      const fio = document.querySelectorAll('.field__fio');
      const dob = document.querySelectorAll('.field__dob');
      const faculty = document.querySelectorAll('.field__fac');
      const fullDateYearsTraining = document.querySelectorAll('.field__start-training');
      if (textFilter === 'Фио') {
        tableHideAndShow(val, fio);
      } else if (textFilter === 'Дата рождения') {
        tableHideAndShow(val, dob);
      } else if (textFilter === 'Год начала обучения') {
        tableHideAndShow(val, fullDateYearsTraining, true);
      } else if (textFilter === 'Факультет') {
        tableHideAndShow(val, faculty);
      } else if (textFilter === 'Год окончания обучения') {
        tableHideAndShow(val, fullDateYearsTraining, false, true);
      }
    });
  }
  // инстанс
  function createTodoApp(container, title = 'Таблица студентов') {
    container.append(createTitle(title));
    container.append(createForm());
    container.append(createDropdownFilter());
    container.append(createTable());
    openDropdown();
    createDataStudent();
    sortTable();
    filterTable();
    resetFilter();
  }
  window.createTodoApp = createTodoApp;
})();
