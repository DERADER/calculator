const calcNumbers = document.querySelectorAll('.calc__btn'),
      calcOperatos = document.querySelectorAll('[data-operators]'),
      calcTools = document.querySelectorAll('[data-tools]'),
      calcHistory = document.querySelector('.calc__history');


let a = '',  //first number
    b = '',  // secont number
    sign = '', // operation 
    finish = false;


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', '*', '/'];

//output

const out = document.querySelector('.calc__total span');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('[data-clear]').addEventListener('click', (e) => {
    clearAll();
});

function oper() {
    calcNumbers.forEach(item => {
        item.addEventListener('click', (e) => {
            const key = e.target.textContent;
            if (actions.includes(key)) {
                sign = key;
                out.textContent = sign;
                return;
            }
        });
    });
}


calcNumbers.forEach(item => {
    item.addEventListener('click', (e) => {
        // нажата не кнопка
        if (!e.target.classList.contains('calc__btn')) {
            return;
        }
        // нажата кнопка clearAll ac
        if (e.target.classList.contains('calc__clear')) {
            return;
        }
        out.textContent = '';
        // //получаю нажатую кнопку
        const key = e.target.textContent;
        // // если нажата 0-9 или точка
        if (digit.includes(key)) {
            if (b === "" && sign === "") {
                a += key;
                out.textContent = a;
            }
            else if (a !== "" && b !== "" && finish) {
                b = key;
                finish = false;
                out.textContent = b;

            } else {
                b += key;
                out.textContent = b;
            }
            return;
        }
        // если нажата +, - , *, /
        if (actions.includes(key)) {
            sign = key;
            out.textContent = sign;
        }

        if (key === '=') {
            if (b === "") {
                b = a;
            }
            switch(sign) {
                case "+":
                    a = (+a) + (+b);
                    break;
                case "-":
                    a = a - b;
                    break;
                case "*":
                    a = a * b;
                    break;
                case "/":
                    if (b === '0') {
                        out.textContent = 'Ошибка';
                        a = "";
                        b = "";
                        sign = "";
                        return;
                    }
                    a = a / b;
                    break;
            }
            finish = true;
            out.textContent = a;
        }
    });

});