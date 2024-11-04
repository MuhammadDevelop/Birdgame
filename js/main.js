let movie__speed = 3, grative = 0.5;
let img = document.getElementById("bird-1");
let bird = document.querySelector(".bird");
let bird__props = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();
let score__val = document.querySelector(".score_val");
let massege = document.querySelector(".masege");
let score__tit = document.querySelector(".score__title");

let game__state = "Start";
img.style.display = "none";
massege.classList.add("massegeStyle");
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && game__state !== "Play") {
        document.querySelectorAll(".pipe__sprite").forEach((e) => {
            e.remove();
        });
        img.style.display = "block";
        bird.style.top = "40vh";
        game__state = "Play";
        massege.innerHTML = "";
        score__tit.innerHTML = "Score :";
        score__val.innerHTML = "0";
        massege.classList.remove("massegeStyle");
        play();
    }
});

function play() {
    function movie() {
        if (game__state != "Play") return;

        let pipe__sprite = document.querySelectorAll(".pipe__sprite");
        pipe__sprite.forEach((element) => {
            let pipe__sprite__props = element.getBoundingClientRect();
            bird__props = bird.getBoundingClientRect();
            if (pipe__sprite__props.right <= 0) {
                element.remove();
            } else {
                if (
                    bird__props.left < pipe__sprite__props.left + pipe__sprite__props.width &&
                    bird__props.left + bird__props.width > pipe__sprite__props.left &&
                    bird__props.top < pipe__sprite__props.top + pipe__sprite__props.height &&
                    bird__props.top + bird__props.height > pipe__sprite__props.top
                ) {
                    game__state = "End";
                    massege.innerHTML = "Game Over".fontcolor("red") + "<br> Press Enter to Restart";
                    massege.classList.add("massegeStyle");
                    img.style.display = "none";
                    return;
                } else {
                    if (
                        pipe__sprite__props.right < bird__props.left &&
                        pipe__sprite__props.right + movie__speed >= bird__props.left &&
                        element.increase__score == "1"
                    ) {
                        score__val.innerHTML = +score__val.innerHTML + 1;
                    }
                    element.style.left = pipe__sprite__props.left - movie__speed + "px";
                }
            }
        });
        requestAnimationFrame(movie);
    }
    requestAnimationFrame(movie);

    let bird__dy = 0;
    function apply__gravity() {
        if (game__state != "Play") return;
        bird__dy = bird__dy + grative;
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp" || e.key == " ") {
                img.src = "image/bird.png";
                bird__dy = -7.6;
            }
        });
        document.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp" || e.key == " ") {
                img.src = "image/bird.png";
            }
        });
        if (bird__props.top <= 0 || bird__props.bottom >= background.bottom) {
            game__state = "End";
            massege.style.left = "28vw";
            window.location.reload();
            massege.classList.remove("massegeStyle");
            return;
        }
        bird.style.top = bird__props.top + bird__dy + "px";
        bird__props = bird.getBoundingClientRect();
        requestAnimationFrame(apply__gravity);
    }
    requestAnimationFrame(apply__gravity);

    let pipe__seperetion = 0;
    let pipe__gap = 35;
    function cretate__pipe() {
        if (game__state != "Play") return;
        if (pipe__seperetion > 115) {
            pipe__seperetion = 0;
            let pipe__posi = Math.floor(Math.random() * 43) + 8;
            let pipe__sprite__inv = document.createElement("div");
            pipe__sprite__inv.className = "pipe__sprite";
            pipe__sprite__inv.style.top = pipe__posi - 70 + "vh";
            pipe__sprite__inv.style.left = "100vw";
            document.body.appendChild(pipe__sprite__inv);

            let pipe__sprite = document.createElement("div");
            pipe__sprite.className = "pipe__sprite";
            pipe__sprite.style.top = pipe__posi + pipe__gap + "vh";
            pipe__sprite.style.left = "100vw";
            pipe__sprite.increase__score = "1";
            document.body.appendChild(pipe__sprite);
        }
        pipe__seperetion++;
        requestAnimationFrame(cretate__pipe);
    }
    requestAnimationFrame(cretate__pipe);
}
