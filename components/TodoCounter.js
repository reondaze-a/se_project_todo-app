class TodoCounter {
    constructor(todos, selector) {
      this._element = document.querySelector(selector);
      this._completed = todos.filter((todo) => todo.completed).length;
      this._total = todos.length;
      document.addEventListener("todoCompleted", (evt) => {
        this._updateCompleted(evt.detail.completed);
      });
      document.addEventListener("todoDeleted", (evt) => {
        if (evt.detail.completed) {
          this._updateCompleted(false);
        }
        this.updateTotal(evt.detail.increment);
      });
      this._updateText();
    }

    _updateCompleted(increment) {
        if (increment) {
            this._completed += 1;
        } else {
            this._completed -= 1;
        }
        this._updateText();
    };
    updateTotal(increment) {
        if (increment) {
            this._total += 1;
        } else {
            this._total -= 1;
        }
        this._updateText();
    };
  
    _updateText() {
      this._element.textContent = `${this._completed} of ${this._total} tasks completed`;
    }
  }
  
  export default TodoCounter;