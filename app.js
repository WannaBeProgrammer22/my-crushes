const addForm = document.querySelector('.add');
const editForm = document.querySelector('.edit');
const crushes = document.querySelector('.crushes');
let currentEditValue = '';

const generateTemplate = todo => {
  return `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <span>
      <i class="far fa-edit edit"></i>
      <i class="far fa-trash-alt delete"></i>
    </span>
  </li>
  `;
}

// add crush in hmtl
const addCrush = template => { crushes.innerHTML += template; };

// delete
const deleteCrush = element => { element.remove(); };

// edit
const editCrush = newValue => {
  let editElement = Array.from(crushes.children)
    .filter(item => {
      return item.textContent.toLowerCase().trim() === currentEditValue.toLowerCase();
    });

  editElement = editElement.shift();
  editElement.firstElementChild.textContent = newValue;

};

// onsubmit add form
addForm.addEventListener('submit', e => {
  e.preventDefault();

  let newTodo = addForm.add.value;

  if (newTodo.length) {
    newTodo = generateTemplate(newTodo);
    addCrush(newTodo);
    addForm.reset();
  }

});

// click event icons edit delete
crushes.addEventListener('click', e => {
  const element = e.target;

  // onclick delete icon
  if (element.classList.contains('delete')) {
    const parentElement = element.parentElement.parentElement;
    deleteCrush(parentElement);
  }

  // onclick edit icon show edit form
  if (element.classList.contains('edit')) {
    editForm.classList.remove('d-none');
    editForm.edit.value = element.parentElement.parentElement.textContent.trim();
    currentEditValue = editForm.edit.value;
    editForm.edit.focus();
  }
});

// submit edit
editForm.addEventListener('submit', e => {
  e.preventDefault();
  const newEditValue = editForm.edit.value;
  editCrush(newEditValue);

  currentEditValue = '';
  editForm.classList.add('d-none');
});

// if escape on edit input hide the form
editForm.edit.addEventListener('keyup', e => {
  if (e.key === 'Escape') {
    editForm.classList.add('d-none');
  }
});