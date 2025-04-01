import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig, tts } from "../utils/constants.js";
import Todo from "../components/Todo.js"
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const newTodosList = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list"
});
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function generateTodo(item) {
  const todo = new Todo(item, tts);
  return todo.getView();
}

const renderTodo = (item) => {
  const todo = generateTodo(item);
  newTodosList.addItem(todo);
} 

const popupWithFormAddTodo = new PopupWithForm(
  "#add-todo-popup",
  (values) => {
    const name = values.name;
    const dateInput = values.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    renderTodo({ id: uuidv4(), name, completed: false, date });
    todoCounter.updateTotal(true);
    validator.resetValidation();
  }
);

const addTodoForm = popupWithFormAddTodo.getForm();
const validator = new FormValidator(validationConfig, addTodoForm);
const addTodoButton = document.querySelector(".button_action_add");

popupWithFormAddTodo.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupWithFormAddTodo.open();
});

newTodosList.renderItems();

validator.enableValidation();

