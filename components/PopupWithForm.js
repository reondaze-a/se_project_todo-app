import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this._submitHandler = submitHandler;
        this._form = this._popupElement.querySelector("form");
        this._inputList = this._form.querySelectorAll(".popup__input");
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._submitHandler(inputValues);
            this.close();
        });
    }
    
}