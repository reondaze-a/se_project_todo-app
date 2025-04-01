import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig, tts } from "../utils/constants.js";
import Todo from "../components/Todo.js"
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';


const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
// const todosList = document.querySelector(".todos__list");
const validator = new FormValidator(validationConfig, addTodoForm);
const newTodosList = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    newTodosList.addItem(todo);
  },
  containerSelector: ".todos__list"
});
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function generateTodo(item) {
  const todo = new Todo(item, tts);
  return todo.getView();
}

const PopupWithFormAddTodo = new PopupWithForm(
  "#add-todo-popup",
  (values) => {
    const name = values.name;
    const dateInput = values.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const todo = generateTodo({ id: uuidv4(), name, completed: false, date });
    newTodosList.addItem(todo);
    todoCounter.updateTotal(true);
    validator.resetValidation();
  }
);

PopupWithFormAddTodo.setEventListeners();

addTodoButton.addEventListener("click", () => {
  PopupWithFormAddTodo.open();
});

newTodosList.renderItems();

validator.enableValidation();

