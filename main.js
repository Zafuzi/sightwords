const sightWords = ["play", "has", "is", "cat", "go", "here", "in", "see"]
var winWord = "";

function play() {
    var sound = new Howl({
        src: ["./sounds/" + winWord + ".mp3"],
    });
    sound.play();
}

function newWord() {
    let king = document.createElement("img");
        king.src = "King.png"
        king.id = "king"
        document.body.append(king);

    let bg = document.querySelector('#button-grid')
            bg.classList.add("transparent");
            bg.classList.remove("opaque");

    setTimeout(() => {
        king.classList.remove("transparent");
        king.classList.add("opaque");
    }, 300)
    setTimeout(() => {
        king.classList.add("transparent");
        king.classList.remove("opaque");
    }, 1500)
    setTimeout(() => {
        king.remove();
    }, 1600)
    setTimeout(() => {
        start(true);
    }, 2000);
}

function start(fade) {
    sound = new Howl({
        src: ["./sounds/nothing.mp3"],
    });
    if(fade) {
        let bg = document.querySelector('#button-grid')
            bg.classList.remove("transparent");
            bg.classList.add("opaque");
    
        let startBTN = document.querySelector("#start");
            startBTN.classList.add("transparent");
            startBTN.style.top  = "0px";
    }
    let word = pickRandomWord();
    winWord = word;
    setTimeout(() => {
        var sound = new Howl({
            src: ["./sounds/" + word + ".mp3"],
        });
        sound.play();
    }, 500)

    let a = [];
    a.push({
        word: word
    });
    for (let i = 0; a.length < 3; i++) {
        let w;
        w = pickRandomWord();
        let notInArray = true
        for(let k = 0; k < a.length; k++) {
            if(w == a[k].word) notInArray = false;
        }
        if (w != word && notInArray) {
            a.push({
                word: w
            })
        }
    }
    a = shuffle(a);
    replicate("tpl_words", a, (e, d, i) => {
        e.addEventListener("click", ec => {
            let sound;
            if(d.word == winWord){
                sound = new Howl({
                    src: ["./sounds/win.mp3"],
                });
                newWord();
            } else {
                sound = new Howl({
                    src: ["./sounds/lose.mp3"],
                });
            }
            sound.play();
        })
    });
    console.log(word);
}

function pickRandomWord() {
    let rand = Math.floor(Math.random() * (sightWords.length));
    console.log(rand)
    return sightWords[rand];
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}