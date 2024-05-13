const email = document.getElementById('email')
const password = document.getElementById('password')
const showBtn = document.querySelector('#show-btn');
const loginBtn = document.querySelector('#login-btn');
const hide = document.querySelector('.show-invalid')
const getItem = JSON.parse(localStorage.getItem('user'))

console.log(getItem)

// const userData = {
//     "email": "sufiib165@gmail.com",
//     "password": "sufi123"
// };

// localStorage.setItem('user',JSON.stringify(userData))


loginBtn.addEventListener('click',function(){
    if(email.value === getItem['email'] && password.value === getItem['password']){
        hide.classList.add('hide')
        window.location.href = '../Web-Task/webTask.html'
    }else{
       hide.classList.remove('hide')
    }
})

showBtn.addEventListener('click',function(){
    if(password.type === 'password'){
        password.type = 'text'
    }else{
        password.type = 'password'
    }
})
