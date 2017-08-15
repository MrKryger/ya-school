var cFio = document.querySelector('[name=fio]');
var cEmail = document.querySelector('[name=email]');
var cPhone = document.querySelector('[name=phone]');
var container = document.querySelector('#resultContainer');
var submitButton = document.getElementById('submitButton');

var vEmail = /^([a-zA-Z0-9_.-])+@+(ya|ndex)+\.((ru|ua|by|kz|com)$)+/;

window.MyForm = {
    'validate': function () {
        var result = {
            fio: cFio.value.split(' ').length === 3,
            email: vEmail.test(cEmail.value),
            phone: validatePhone(cPhone.value) < 31
        };
        var arr = [];

        if (result.fio == true) {
            cFio.classList.remove('error');
        } else {
            // arr.fio = 'fio';
            arr.push('fio');
            cFio.classList.add('error');
        }
        if (result.email == true) {
            cEmail.classList.remove('error');
        } else {
            arr.push('email');
            cEmail.classList.add('error');
        }
        if (result.phone == true) {
            cPhone.classList.remove('error');
        } else {
            arr.push('phone');
            cPhone.classList.add('error')
        }

        return {
            isValid: Object.keys(result).every(name => result[name] === true
        ),
        errorFields: arr
    }
    },
    'getData': function () {
        return {
            fio: cFio.value,
            email: cEmail.value,
            phone: cPhone.value
        };
    },
    'setData': function (object) {
        if (object) {
            cFio.value = object.fio;
            cEmail.value = object.email;
            cPhone.value = object.phone;
        }
    },
    'submit': function () {
        window.data = MyForm.getData();
        MyForm.setData(data);
        var valid = MyForm.validate();
        if (valid.isValid) {
            submitButton.setAttribute('disabled', 'disabled');

            var request = new XMLHttpRequest();
            request.open('GET', random(), true);
            request.onload = function () {
                if ((request.readyState == 4) && (request.status == 200)) {
                    var server = JSON.parse(request.responseText)
                    if (server.status === 'success') {
                        container.className = 'success';
                        container.textContent = 'Success';
                    } else if (server.status === 'error') {
                        container.className = 'error';
                        container.textContent = server.reason;
                    } else if (server.status === 'progress') {
                        container.className = 'progress';
                        container.textContent = 'progress';
                        setTimeout(MyForm.submit, server.timeout)
                    }
                }
            };
            request.send();
        }
    }
};

submitButton.onclick = function () {
    MyForm.submit();
    return false;
};
//валидация phone
$('[name=phone]').mask("+7(999)999-99-99");
function validatePhone(phones) {
    return phones.match(/[0-9]/g).reduce((a, b) => +a + +b
)}

// рандомные функции для тестов
var json = ['success.json','error.json','progress.json'];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function random() {
    return json[getRandomInt(0, json.length)];
}


// Добавление пользователя при наличии сервера
// function CreateUser(data) {
//     $.ajax({
//         url: 'api/users',
//         contentType: "application/json",
//         method: "POST",
//         data: JSON.stringify(data),
//         success: function (server) {
//
//             if (server.status === 'success') {
//                 container.className = 'success';
//                 container.textContent = 'Success';
//             } else if (server.status === 'error') {
//                 container.className = 'error';
//                 container.textContent = server.reason;
//             } else if (server.status === 'progress') {
//                 container.className = 'progress';
//                 container.textContent = 'progress';
//                 setTimeout(MyForm.submit, server.timeout)
//             }
//         }
//     });
// }


