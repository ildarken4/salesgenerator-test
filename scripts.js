const modalTrigger = document.querySelector('.modal-trigger');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const popup = document.querySelector('.popup');

// открытие модалки
modalTrigger.addEventListener('click', function() {
    modal.classList.add('show');

})

// Закрытие модалки по кнопке
closeButton.addEventListener('click', function() {
    modal.classList.remove('show');

})

// Клик вне попап для закрытия модалки
document.addEventListener('mouseup', function (e){
    if (!popup.contains(e.target)) {
        modal.classList.remove('show');
    }
});

// валидация номера телефона и маска
function validateAndFormatPhone(input) {
    let cleanedPhoneNumber = input.value.replace(/[^\d]/g, '');
    cleanedPhoneNumber = '+7' + cleanedPhoneNumber.substring(1);
    if (cleanedPhoneNumber.length > 12) {
        cleanedPhoneNumber = cleanedPhoneNumber.slice(0, 12);
    }
    let formattedPhone = '';
    for (let i = 0; i < cleanedPhoneNumber.length; i++) {
        if (i === 2) {
            formattedPhone += ' (' + cleanedPhoneNumber[i];
        } else if (i === 4 && cleanedPhoneNumber[i - 1] !== '(') {
            formattedPhone += cleanedPhoneNumber[i] + ') ';
        } else if (i === 8 || i === 10) {
            formattedPhone += '-' + cleanedPhoneNumber[i];
        } else {
            formattedPhone += cleanedPhoneNumber[i];
        }
    }

    input.value = formattedPhone;
}

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(event) {
    const inputChar = event.data;
    if (inputChar !== null && inputChar !== undefined && isNaN(inputChar)) {
        phoneInput.value = phoneInput.value.slice(0, -1);
    }
    const keyCode = event.keyCode;
    if (keyCode === 8) {
        return;
    }
    validateAndFormatPhone(phoneInput);
});


// Проверка и отправка данных формы

const submitButton = document.querySelector('.submit');
const emailInput = document.getElementById('email');

function formatPhone(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedPhoneNumber.length >= 11 && cleanedPhoneNumber.startsWith('7')) {
        const formattedPhone = cleanedPhoneNumber.substring(1);
        return '+7' + formattedPhone;
    } else {
        return phoneNumber;
    }
}



submitButton.addEventListener('click', function() {
    event.preventDefault();

    const phoneNumber = phoneInput.value;
    const expectedLength = 18;
    if (phoneNumber.length < expectedLength) {
        phoneInput.classList.add('error') 
    } else {
        phoneInput.classList.remove('error')
        
        const email = emailInput.value;
        const phone = phoneInput.value;
        const formattedPhone = formatPhone(phone);

        const data = {
            email: email,
            phone: formattedPhone
        };

        console.log('data: ', data);

        fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully');
                
            } else {
                console.error('Error sending email');
                
            }
        })
        .catch(error => {
            console.error('Error sending email:', error);
            
        });

        emailInput.value = '';
        phoneInput.value = '';
    }
})