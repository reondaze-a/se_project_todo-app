class Todo {
    constructor(data, selector) {
        this._id = data.id
        this._name = data.name
        this._completed = data.completed
        this._date = data.date
        this._selector = selector
    }

    _getTemplate(selector) {
        return document.querySelector(selector)
            .content
            .querySelector(".todo")
            .cloneNode(true);
    }

    _setEventListeners() {
        this._todoDeleteBtn.addEventListener("click", () => {
            this._element.remove();
            document.dispatchEvent(new CustomEvent("todoDeleted", {
                detail: {
                    increment: false,
                    completed: this._completed
                }
            }))
        });

        this._todoCheckboxEl.addEventListener("change", () => {
            this._completed = this._todoCheckboxEl.checked;
            document.dispatchEvent(new CustomEvent("todoCompleted", {
                detail: {
                    completed: this._completed
                }
            }))
        })
    }

    _setDueDate() {
        const dueDate = new Date(this._date)
        if (!isNaN(dueDate)) {
            this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}`;
          }
    }

    getView() {
        this._element = this._getTemplate(this._selector);
        this._todoNameEl = this._element.querySelector(".todo__name");
        this._todoCheckboxEl = this._element.querySelector(".todo__completed");
        this._todoLabel = this._element.querySelector(".todo__label");
        this._todoDate = this._element.querySelector(".todo__date");
        this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");

        this._todoNameEl.textContent = this._name;
        this._todoCheckboxEl.checked = this._completed;
        this._todoCheckboxEl.id = `todo-${this._id}`;
        this._todoLabel.setAttribute("for", `todo-${this._id}`); 
        this._setEventListeners();
        this._setDueDate();

        return this._element;
    }

}

export default Todo;