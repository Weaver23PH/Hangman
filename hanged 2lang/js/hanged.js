document.addEventListener("DOMContentLoaded", function () {
        const guessedWord = document.getElementById("guesses");
        const usedLetters = document.getElementById("usedLetters");
        const canvas = document.getElementById("drawing");
        const attemptsBox = document.getElementById("attempts");
        const languageSwitch = document.getElementById("language");
        const overboard = document.getElementsByClassName("overboard")[0];
        const hangedHead = document.querySelector("#hanged h1");
        const wordGuessed = document.querySelector("#word h3");
        const usedBox = document.querySelector("#usedLettersBox h1");

        var languageVersion = {
            ENG: {
                overboard: "HANGMAN the game",
                hanged: "Hangman",
                word: "Guessed Word",
                used: "Used Letters",
                enter: "press Enter to start",
                att: "Attempts: ",
                itWas: "The word was: ",
                dictionary: ["absolute", "destruction", "dictionary", "abacus", "weird", "accommodate", "handkerchief", "indict", "cemetery", "conscience", "rhythm", "playwright", "embarrass", "millennium", "pharaoh", "liaison", "convalesce", "supersede", "ecstasy", "harass", "maintenance", "pronunciation", "occurred", "recommend", "deductible"]
            },
            PL: {
                overboard: "WISIELEC",
                hanged: "wisielec",
                word: "Zgadywane Slowo",
                used: "Wybrane Litery",
                enter: "nacisnij enter by zaczac",
                att: "Szanse: ",
                itWas: "Slowo to: ",
                dictionary: ["eremita", "kompulsywny", "eponim", "konformizm", "oportunizm", "dewiacja", "anomia", "historiozofia", "szowinizm", "powinowactwo", "dysydent", "innowierca", "somnambulizm", "pretensjonalny", "partykularny", "fircyk", "lekkoduch", "felerysta", "dyscyplina", "apoteoza", "hummus", "monizm", "spirytualizm", "manicheizm", "parentela", "eskapizm", "autowaloryzacja", "dekompensacja", "demagogia", "dyskurs", "antropomorfizm", "soteriologia", "fideizm", "antyracjonalizm", "egzegeza", "ekumena", "antynomia", "luminarz", "wykusz", "cezura", "empora", "pensum", "sztylpy", "konfabulacja", "konwersja", "kwarta", "pinta", "embargo", "aseptyczny", "apopleksja", "hipnopedia", "surogat", "tanatologia", "neurastenia", "stupor", "repulsywny", "egalitaryzm", "eteryczny", "inklinacja", "deratyzacja", "krezus", "bigoteria", "rekurencja", "inercja", "endemia", "kontestacja"]
            }
        };

        var chosenKeys = "";
        var chosenWord = "";
        var wordArray = [];
        var attempts = 10;
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 15;
        ctx.strokeStyle = "white";
        var version = languageVersion.ENG;
        var dictionary = version.dictionary;
        guessedWord.innerText = version.enter;
        overboard.innerText = version.overboard;
        hangedHead.innerText = version.hanged;
        wordGuessed.innerText = version.word;
        usedBox.innerText = version.used;

        changeLang();


        function changeLang() {
            for (i = 0; i < languageSwitch.children.length; i++) {
                languageSwitch.children[i].addEventListener("click", changeLang);
            }
            if (this === languageSwitch.children[0]) {
                version = languageVersion.PL;
                dictionary = version.dictionary;
                guessedWord.innerText = version.enter;
                overboard.innerText = version.overboard;
                hangedHead.innerText = version.hanged;
                wordGuessed.innerText = version.word;
                usedBox.innerText = version.used;
                return version;
            } else if ((this === languageSwitch.children[1])) {
                version = languageVersion.ENG;
                dictionary = version.dictionary;
                guessedWord.innerText = version.enter;
                overboard.innerText = version.overboard;
                hangedHead.innerText = version.hanged;
                wordGuessed.innerText = version.word;
                usedBox.innerText = version.used;
                return version;
            }
            return dictionary;
        }

        function runner() {
            guessedWord.innerText = version.enter;
            document.removeEventListener("keydown", guessLetter);
            document.addEventListener("keydown", guessLetter);
        }

        function setupBoard() {
            wordArray = [];
            usedLetters.innerText = " ";
            chosenKeys = "";
            attempts = 10;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            chosenWord = dictionary[Math.round(Math.random() * dictionary.length)].split("");
            //    attempts = chosenWord.length;
            attemptsBox.innerText = version.att + attempts;
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
                solver(chosenWord, keyChoice, wordArray);
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
                attemptsBox.innerText = version.att + attempts;
                drawHangedman();
            }

            guessedWord.innerText = wordArray.join("");
            if (wordArray.join("") === chosenWord.join("")) {
                guessedWord.innerText = version.itWas + chosenWord.join("") + ". " + version.enter;
                if (key === "Enter") {
                    runner();
                }
            }
            if (attempts <= 0) {
                guessedWord.innerText = version.itWas + chosenWord.join("") + ". " + version.enter;
                if (key === "Enter") {
                    runner();
                }
            }
        }

        function drawHangedman() {
            ctx.beginPath();
            switch (attempts) {
                case 9:
                    ctx.moveTo(100, 0);
                    ctx.lineTo(250, 0);
                    ctx.stroke();
                    break;
                case 8:
                    ctx.moveTo(250, 0);
                    ctx.lineTo(250, 300);
                    ctx.stroke();
                    break;
                case 7:
                    ctx.moveTo(200, 0);
                    ctx.lineTo(250, 25);
                    ctx.stroke();
                    break;
                case 6:
                    ctx.moveTo(150, 0);
                    ctx.lineTo(150, 25);
                    ctx.stroke();
                    break;
                case 5:
                    ctx.arc(150, 65, 40, 0, 2 * Math.PI);
                    ctx.stroke();
                    break;
                case 4:
                    ctx.moveTo(150, 105);
                    ctx.lineTo(150, 200);
                    ctx.stroke();
                    break;
                case 3:
                    ctx.moveTo(150, 110);
                    ctx.lineTo(100, 120);
                    ctx.stroke();
                    break;
                case 2:
                    ctx.moveTo(150, 110);
                    ctx.lineTo(200, 120);
                    ctx.stroke();
                    break;
                case 1:
                    ctx.moveTo(150, 200);
                    ctx.lineTo(100, 250);
                    ctx.stroke();
                    break;
                case 0:
                    ctx.moveTo(150, 200);
                    ctx.lineTo(200, 250);
                    ctx.stroke();
                    break;
            }
            ctx.closePath();
        }

        runner();
    }
);