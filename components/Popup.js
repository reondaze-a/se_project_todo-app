export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
        this._handleEscapeCloseBound = this._handleEscapeClose.bind(this);
    }

    open() {
        this._popupElement.classList.add("popup_visible");
    }

    close() {
        this._popupElement.classList.remove("popup_visible");
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_visible")) {
                this.close();
            } 
        });
        
        this._popupCloseBtn.addEventListener("click", () => {
            this.close();
        });

        document.addEventListener("keydown", this._handleEscapeCloseBound);
    }

    _handleEscapeClose(evt) {
        if (evt.key === "Escape") {
                this.close();
            }
    }


}