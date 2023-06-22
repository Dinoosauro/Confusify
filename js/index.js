let invisible = [" ", "­", "͏", "ᅟ", "ᅠ", "឴", "឵", "᠎", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "​", "‌", "‍", " ", " ", "⁠", "⁡", "⁢", "⁣", "⁤", "⁪", "⁫", "⁬", "⁭", "⁮", "⁯", "　", "⠀", "ㅤ", "ﾠ", "𝅳", "𝅴", "𝅵", "𝅶", "𝅷", "𝅸", "𝅹", "𝅺"] // Source: https://invisible-characters.com/
let confuse = [0, {}];
if (localStorage.getItem("readable") === "no") document.getElementById("characters").checked = false;
if (localStorage.getItem("invisible") !== null) document.getElementById("possibility").value = localStorage.getItem("invisible");
function fetch() {
    let http = new XMLHttpRequest();
    let isSafe = "";
    if (document.getElementById("characters").checked) isSafe = "safe";
    http.open("GET", `https://dinoosauro.github.io/Confusify/data/${isSafe}list.json`);
    http.onload = function () {
        confuse[1] = JSON.parse(http.responseText);
        confuse[0] = 1;
    }
    http.send();
}
document.getElementById("characters").oninput = function () {
    fetch();
}
fetch();
function applyLabel() {
    if (confuse[0] == 0) {
        setTimeout(function () {
            applyLabel();
        }, 200)
    } else {
        let result = changeText(document.getElementById("text").value);
        document.getElementById("label").textContent = result[0];
        document.getElementById("combination").textContent = result[1];
    }
}
function changeText(phrase) {
    let times = 1;
    let finalWord = "";
    for (let i = 0; i < phrase.length; i++) {
        if (typeof confuse[1][phrase[i]] === "undefined") continue;
        if (phrase[i] === " ") {
            finalWord += "  ";
            continue;
        }
        times *= Object.keys(confuse[1][phrase[i]]).length; // This isn't entirely correct, but it's just a fun stat. And it's easier to implement it this way.
        let random = Math.floor(Math.random() * Object.keys(confuse[1][phrase[i]]).length);
        finalWord += confuse[1][phrase[i]][random];
        if (document.getElementById("possibility").value !== 0 && Math.floor(Math.random() * 100) <= document.getElementById("possibility").value) {
            finalWord += invisible[Math.floor(Math.random() * invisible.length)];
        }
    }
    return [finalWord, times];
}
function dialog(show) {
    document.getElementById("dialog").open = show;
    if (show) document.getElementById("options").style.display = "none"; else document.getElementById("options").style.display = "inline";
}
if (window.location.href.indexOf("?input=") !== -1) {
    document.getElementById("text").value = decodeURIComponent(window.location.href.substring(window.location.href.indexOf("?input=") + 7));
    applyLabel();
}
function copy() {
    navigator.clipboard.writeText(document.getElementById("label").textContent).then(function() {
        alert("Copied!");
      });
}