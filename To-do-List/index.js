// seleção de elementos
const texto = document.querySelector('input');
const btnInsert = document.querySelector('.divInsert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');

// * Base de dados * //
let itensDB = [];


btnDeleteAll.onclick = () => {
  itensDB = [];
  updateDB();
};


// * Ao pressionar a tecla enter * //
texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  };
});


btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB();
  };
};


const setItemDB = () => {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  };

  itensDB.push({ 'item': texto.value, 'status': '' });
  updateDB();
}




// * Armazena e atualiza a base de dados * //

const updateDB = () => {
  localStorage.setItem('todolist', JSON.stringify(itensDB));
  loadItens();
};

const loadItens = () => {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? [];
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i);
  });
};

// * END armazena e atualiza a base de dados * //




const insertItemTela = (text, status, i) => {
  const li = document.createElement('li');

  li.innerHTML = `
      <div class="divLi">
        <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});"/>
        <span data-si=${i}>${text}</span>
        <button onclick="removeItem(${i})" data-i=${i}><i class="bx bx-trash"></i></button>
      </div>
    `;

  ul.appendChild(li);

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through');
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through');
  };

  texto.value = ''
};


const done = (chk, i) => {
  if (chk.checked) {
    itensDB[i].status = 'checked';
  } else {
    itensDB[i].status = ''
  };

  updateDB();
};


const removeItem = (i) => {
  itensDB.splice(i, 1);
  updateDB();
};






