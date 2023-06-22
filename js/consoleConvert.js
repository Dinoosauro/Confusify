let confuse = JSON.parse(require("fs").readFileSync("node/list.json", "utf8"));
let phrase = process.argv[2];
let finalWord = ""
for (let i = 0; i < phrase.length; i++) {
    console.log(confuse[phrase[i]]);
    if (typeof confuse[phrase[i]] === "undefined") continue;
    if (phrase[i] === " ") {
        finalWord += "  ";
        continue;
    }
    let random = Math.floor(Math.random() * Object.keys(confuse[phrase[i]]).length);
    console.log(random);
    finalWord += confuse[phrase[i]][random];
}
console.log(finalWord);