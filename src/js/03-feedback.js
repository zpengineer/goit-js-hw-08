import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea')
}

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
saveUserData();

refs.form.addEventListener('input', e => {

    formData[e.target.name] = e.target.value;

});

function onFormSubmit(e) {
    e.preventDefault();

    const userData = localStorage.getItem(STORAGE_KEY);
    const userParseJSON = JSON.parse(userData);

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(userParseJSON);
}

function onTextareaInput() {
  
    const userDataJSON = JSON.stringify(formData);

    localStorage.setItem(STORAGE_KEY, userDataJSON);
}

function saveUserData() {
    const userData = localStorage.getItem(STORAGE_KEY);

    const { form } = refs;
    const setElemValue = form.elements;

    if (userData) {

        const userParseJSON = JSON.parse(userData);

        setElemValue.email.value = userParseJSON.email;
        setElemValue.message.value = userParseJSON.message;
    }
}