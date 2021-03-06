document.addEventListener("DOMContentLoaded", function () {
    const guessedWord = document.getElementById("guesses");
    const usedLetters = document.getElementById("usedLetters");
    const canvas = document.getElementById("drawing");
    const attemptsBox = document.getElementById("attempts");
    const dictionary =  ["eremita", "kompulsywny", "eponim", "konformizm", "oportunizm", "dewiacja", "anomia", "historiozofia", "szowinizm", "powinowactwo", "dysydent", "innowierca", "somnambulizm", "pretensjonalny", "partykularny", "fircyk", "lekkoduch", "felerysta", "dyscyplina", "apoteoza", "hummus", "monizm", "spirytualizm", "manicheizm", "parentela", "eskapizm", "autowaloryzacja", "dekompensacja", "demagogia", "dyskurs", "antropomorfizm", "soteriologia", "fideizm", "antyracjonalizm", "egzegeza", "ekumena", "antynomia", "luminarz", "wykusz", "cezura", "empora", "pensum", "sztylpy", "konfabulacja", "konwersja", "kwarta", "pinta", "embargo", "aseptyczny", "apopleksja", "hipnopedia", "surogat", "tanatologia", "neurastenia", "stupor", "repulsywny", "egalitaryzm", "eteryczny", "inklinacja", "deratyzacja", "krezus", "bigoteria", "rekurencja", "inercja", "endemia", "kontestacja"];
    var chosenKeys = "";
    var chosenWord = "";
    var wordArray = [];
    var attempts = 10;
    guessedWord.innerText = "nacisnij enter by zaczac";
    var ctx = canvas.getContext("2d");

    function runner() {
        guessedWord.innerText = "nacisnij enter by zaczac";
        document.removeEventListener("keydown", guessLetter);
        document.addEventListener("keydown", guessLetter);
    }

    function setupBoard() {
        wordArray = [];
        usedLetters.innerText = " ";
        chosenKeys = "";
        attempts = 10;
        console.log(attempts);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        chosenWord = dictionary[Math.round(Math.random() * dictionary.length)].split("");
        //    attempts = chosenWord.length;
        attemptsBox.innerText = "Szanse: " + attempts;
        for (i = 0; i < chosenWord.length; i++) {
            wordArray.push(" _ ");
        }
        guessedWord.innerText = wordArray.join("");

        return attempts;
    }

    function guessLetter(event) {
        var keyChoice = event.key;
        console.log(attempts);
        if (keyChoice === "Enter") {
            setupBoard();
        } else {
            chosenKeys += (keyChoice + " ");
            usedLetters.innerText = chosenKeys;
            solver(chosenWord, keyChoice, wordArray, attempts);
        }
    }

    function solver(chosenWord, key, wordArray) {
        for (i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === key) {
                wordArray[i] = key;
            }
        }
        if (chosenWord.includes(key) === false) {
            attempts--;
            if (attempts < 0) {
                attempts = 0;
            }
            attemptsBox.innerText = "Szanse: " + attempts;
            drawHangedman();
        }

        guessedWord.innerText = wordArray.join("");
        if (wordArray.join("") === chosenWord.join("")) {
            guessedWord.innerText = "Slowo to: " + chosenWord.join("") + ". nacisnij enter by zaczac";
            if (key === "Enter") {
                runner();
            }
        }
        if (attempts <= 0) {
            guessedWord.innerText = "Slowo to: " + chosenWord.join("") + ". nacisnij enter by zaczac";
            if (key === "Enter") {
                runner();
            }
        }
    }

    function drawHangedman() {
        ctx.lineWidth = 15;
        ctx.strokeStyle = "white";
        if (attempts > 0) {
            ctx.beginPath();
            if (attempts === 9) {
                ctx.moveTo(100, 0);
                ctx.lineTo(250, 0);
                ctx.stroke();
            }
            if (attempts === 8) {
                ctx.moveTo(250, 0);
                ctx.lineTo(250, 350);
                ctx.stroke();
            }
            if (attempts === 7) {
                ctx.moveTo(200, 0);
                ctx.lineTo(250, 25);
                ctx.stroke();
            }
            if (attempts === 6) {
                ctx.moveTo(150, 0);
                ctx.lineTo(150, 25);
                ctx.stroke();
            }
            if (attempts === 5) {
                ctx.arc(150, 65, 40, 0, 2 * Math.PI);
                ctx.stroke();
            }
            if (attempts === 4) {
                ctx.moveTo(150, 105);
                ctx.lineTo(150, 200);
                ctx.stroke();
            }
            if (attempts === 3) {
                ctx.moveTo(150, 110);
                ctx.lineTo(100, 120);
                ctx.stroke();
            }
            if (attempts === 2) {
                ctx.moveTo(150, 110);
                ctx.lineTo(200, 120);
                ctx.stroke();
            }
            if (attempts === 1) {
                ctx.moveTo(150, 200);
                ctx.lineTo(100, 250);
                ctx.stroke();
            }
            if (attempts === 0) {
                ctx.moveTo(150, 200);
                ctx.lineTo(200, 250);
                ctx.stroke();
                attempts = 0;
            }
            ctx.closePath();
        } else if (attempts <= 0) {
            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.lineTo(250, 0);
            ctx.stroke();
            ctx.moveTo(250, 0);
            ctx.lineTo(250, 350);
            ctx.stroke();
            ctx.moveTo(150, 0);
            ctx.lineTo(150, 25);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(150, 65, 40, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.moveTo(150, 105);
            ctx.lineTo(150, 200);
            ctx.stroke();
            ctx.moveTo(150, 110);
            ctx.lineTo(100, 120);
            ctx.stroke();
            ctx.moveTo(150, 110);
            ctx.lineTo(200, 120);
            ctx.stroke();
            ctx.moveTo(150, 200);
            ctx.lineTo(100, 250);
            ctx.stroke();
            ctx.moveTo(150, 200);
            ctx.lineTo(200, 250);
            ctx.stroke();
            attempts = 0;
            ctx.closePath();
        }
    }


    runner();
});