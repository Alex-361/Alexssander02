describe('Teste da lista de tarefas', () => {
  let addTaskBtn;
  let taskInput;
  let taskList;

  beforeEach(() => {
      // Configura o DOM para cada teste
      document.body.innerHTML = `
          <input type="text" id="task-input" />
          <button id="add-task-btn">Adicionar</button>
          <ul id="task-list"></ul>
      `;

      // Carrega o arquivo app.js
      require('./app.js');

      addTaskBtn = document.getElementById('add-task-btn');
      taskInput = document.getElementById('task-input');
      taskList = document.getElementById('task-list');
  });

  test('Deve adicionar uma tarefa à lista', () => {
      taskInput.value = 'Estudar Jest';
      addTaskBtn.click();

      // Verifica se a tarefa foi adicionada à lista
      expect(taskList.children.length).toBe(1);
      expect(taskList.children[0].textContent).toContain('Estudar Jest');
  });

  test('Deve remover uma tarefa da lista', () => {
      taskInput.value = 'Tarefa a ser removida';
      addTaskBtn.click();

      // Simula clique no botão "Excluir"
      const deleteBtn = taskList.querySelector('.delete-btn'); 
      deleteBtn.click();

      // Verifica se a tarefa foi removida
      expect(taskList.children.length).toBe(0);
  });

  test('Não deve adicionar tarefa vazia', () => {
      addTaskBtn.click();
      expect(taskList.children.length).toBe(0);
  });

  test('Deve adicionar e remover três tarefas', () => {
      taskInput.value = 'Tarefa 1';
      addTaskBtn.click();
      taskInput.value = 'Tarefa 2';
      addTaskBtn.click();
      taskInput.value = 'Tarefa 3';
      addTaskBtn.click();

      expect(taskList.children.length).toBe(3);

      // Remove todas as tarefas
      const deleteBtns = taskList.querySelectorAll('.delete-btn');
      deleteBtns.forEach(btn => btn.click());

      expect(taskList.children.length).toBe(0);
  });
});
