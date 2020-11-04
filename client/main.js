let app = new Vue({
    el:'#app',
    data: {
        msg: 'Hello World',
        text: 'Pesan',
        targetPage: 'landing',
        username: ''
    }
})

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

