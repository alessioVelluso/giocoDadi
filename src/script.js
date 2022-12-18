const startSection = document.querySelector('.start');
const SVGlogo = document.querySelector('#diceLogo'); //more on load event
const gameSection = document.querySelector('.running');
gameSection.classList.remove('running');

const resultElement = gameSection.querySelector('.result'),
    resultElementNumber = resultElement.querySelector('#found'),
    resultElementAttempts = resultElement.querySelector('#attempts');
const numbersInput = document.getElementById('numInput');
const searchAppender = document.querySelector('.to-find #numbersToFind');
const rollButton = document.getElementById('roll');
const stopButton = document.querySelectorAll('.controls button');


const leftSqr = document.querySelector('.s-left'),
     leftDice = leftSqr.querySelector('object');
const rightSqr = document.querySelector('.s-right'),
    rightDice = rightSqr.querySelector('object');

var d1, d2, sum = 0, tentativi = 0;
var looper, blocked, rollAnim;
const specialChar = [':', ';', '-', '_', '?', "'", '"', '!', '^', '(', ')','[', ']', '{', '}','+', '<', '>', '|', "\\", '/', '£', '$', '%', '&', '=', '*', '@', '#', 'ç', '§']




const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min)
}
const getRandomRgb = () => {
    const r = getRandomNumber(0, 256);
    const g = getRandomNumber(0, 256);
    const b = getRandomNumber(0, 256);
    return `rgb(${r}, ${g}, ${b})`
}



var GSAP = class {
    constructor(duration) {
        this.duration = duration
    }

    left = () => {gsap.from(leftSqr, {
        duration: this.duration,
        ease: "elastic.out(1, 0.3)",
        y: 200,
        rotation: 360,
        opacity: 0
    })};
    right = () => {gsap.from(rightSqr, {
        duration: this.duration,
        ease: "elastic.out(1, 0.3)",
        y: -200,
        rotation: -360,
        opacity: 0
    })};
}

var animations = new GSAP(2);


const SVGsColors = {
    rolling: (upperLogo, bottomLogo) => {
        rollAnim = setInterval(() => {
            upperLogo.forEach(element => {
                element.style.fill = getRandomRgb()
            });
            bottomLogo.forEach(element => {
                element.style.fill = getRandomRgb()
            });
        }, 2000);
        
    },
    stopped: (upperLogo, bottomLogo) => {
        upperLogo.forEach(element => {
            element.style.fill = '#48d8ff'
        });
        bottomLogo.forEach(element => {
            element.style.fill = '#ff9086'
        });
    }
}



const changeSection = () => {
    startSection.classList.toggle('n-display');
    gameSection.classList.toggle('n-display');
    gameSection.classList.toggle('running')
}

const diceAnimation = (d1, d2) => {
    setTimeout(() => {
        leftDice.data=`./assets/numbers/${d1}.svg`
        rightDice.data=`./assets/numbers/${d2}.svg`
    });
    animations.left();
    animations.right();
} //Add correct numbers to the dices

let giocoDadi = (d1, d2, data, sum, tentativi) => {
    stopButton[0].style.opacity = '0';
    stopButton[0].classList.add('n-display');

    d1 = getRandomNumber(1, 7);
    d2 = getRandomNumber(1, 7);
    sum = d1 + d2;
    tentativi++;

    diceAnimation(d1, d2);

    console.log(`Tentativo ${tentativi}:`,'\n',
    `Primo dado: ${d1}`,'\n',
    `Secondo dado: ${d2}`,'\n',
    `La tua somma è ${sum}`,'\n',
    ' ', '\n');

    if(!data.includes(sum.toString())) {
        looper = setTimeout(() => {
            giocoDadi(d1, d2, data, sum, tentativi)
        }, 2000); //Self-loop the function till the condition is satisfied

    } else {
        console.log(`Trovato numero ${sum} in ${tentativi} tentativi`);
        clearTimeout(rollAnim);
        setTimeout(() => {
            resultElementNumber.innerText = sum;
            resultElementAttempts.innerText = tentativi;
            resultElement.style.transition = '300ms opacity ease';
            resultElement.style.opacity = '1';
            stopButton[0].style.opacity = '1';
            stopButton[0].classList.remove('n-display');
            tentativi = 0;
        }, 500); //Result text appears
        
    }

}





rollButton.addEventListener('click', () => {
    var inputData = numbersInput.value;
    var modifiedString = inputData.replaceAll(' ', '')
    var data = modifiedString.split(','); //Clears the input to be a condition
    searchAppender.innerHTML = `Numbers to find: <em>${data.toString().replaceAll(',', ', ')}</em>`
    
    if (/^[a-zA-Z]+$/.test(data)) {
        alert('Please insert only numbers');
        numbersInput.value = '';
        return;
    }; //When user use alphabetical char
    specialChar.forEach(char => {
        if (modifiedString.includes(char)) {
            alert('Only commas please ;)');
            numbersInput.value = '';
            blocked = true;
        }
    })

    data.forEach(number => {
        if (number < 2 || number > 12) {
            alert('Please insert numbers from 2 to 12');
            numbersInput.value = '';
            blocked = true;
        }
        
    });

    if (blocked) {
        blocked = false;
        return;
    } //When user uses prohibited numbers

    giocoDadi(d1, d2, data, sum, tentativi);
    changeSection();   
});


stopButton[0].addEventListener('click', () => {
    var d1, d2, sum = 0, tentativi = 0;
    var data = numbersInput.value.split(', ');

    resultElement.style.transition = 'none';
    resultElement.style.opacity = '0';
    giocoDadi(d1, d2, data, sum, tentativi);
});


stopButton[1].addEventListener('click', () => {
    resultElement.style.transition = 'none';
    resultElement.style.opacity = '0';
    numbersInput.value = '';
    
    clearTimeout(looper);
    clearTimeout(rollAnim)
    changeSection();

    
});


SVGlogo.addEventListener('load', () => {
    const upperLogo = Array.from(SVGlogo.contentDocument.querySelectorAll('.cls-1'));
    const bottomLogo = Array.from(SVGlogo.contentDocument.querySelectorAll('.cls-2'));
    
    rollButton.addEventListener('click', () => {
        var inputData = numbersInput.value;
        console.log(inputData);
        if (inputData == '') return;

        setInterval(SVGsColors.rolling(upperLogo, bottomLogo), 2000);
        
    });

    stopButton[1].addEventListener('click', () => {
        SVGsColors.stopped(upperLogo, bottomLogo);
    })
    
});