const elInputEmail = document.querySelector(".js-email")
const elInputPassword = document.querySelector(".js-password")
const elForm = document.querySelector(".js-form")
const elEye = document.querySelector(".koz-btn")




elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    fetch('http://192.168.100.12:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: elInputEmail.value,
            password: elInputPassword.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token)
                location.replace("index.html")
            }
        })
        .catch((err) => console.log(err))
})


elEye.addEventListener("click", function () {
    elInputPassword.type == "password" ? elInputPassword.type = "text" : elInputPassword.type = "password"
})