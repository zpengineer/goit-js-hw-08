import throttle from "lodash.throttle";

class Feedback{

    static STORAGE_KEY = "feedback-form-state";
    static formData = {};

    constructor(form, textarea) {
        this.$form = document.querySelector(form);
        this.$textarea = document.querySelector(textarea);
        this.addFormEvents();
        this.saveUserData();
    }

    addFormEvents() {
        let formSubmitArrowFunc = this.onFormSubmit.bind(this);
        let formInputArrowFunc = this.onTextareaInput.bind(this);

        this.$form.addEventListener('submit', formSubmitArrowFunc);
        this.$form.addEventListener('input', throttle(formInputArrowFunc, 500));

        this.$form.addEventListener('input', e => {

            Feedback.formData[e.target.name] = e.target.value;

        });
    }

    saveUserData() {
        const userData = localStorage.getItem(Feedback.STORAGE_KEY);

        const setElemValue = this.$form.elements;

        if (userData) {

            const userParseJSON = JSON.parse(userData);

            setElemValue.email.value = userParseJSON.email;
            setElemValue.message.value = userParseJSON.message;
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        const userData = localStorage.getItem(Feedback.STORAGE_KEY);
        const userParseJSON = JSON.parse(userData);

        e.currentTarget.reset();
        localStorage.removeItem(Feedback.STORAGE_KEY);

        console.log(userParseJSON);
    }

    onTextareaInput = () => {
        const userDataJSON = JSON.stringify(Feedback.formData);

        localStorage.setItem(Feedback.STORAGE_KEY, userDataJSON);
    }
    

}

const userFeedback = new Feedback('.feedback-form', '.feedback-form textarea');

console.log(userFeedback);