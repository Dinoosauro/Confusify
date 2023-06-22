function load() {
    document.getElementById("start").innerHTML = "We're starting to convert the script. This may take some time, especially if you want to generate a safe list.";
    let http = new XMLHttpRequest();
    http.open("GET", `data/list.txt`);
    http.onload = function () {
        let confusableItem = {};
        let file = http.responseText.split("\n");
        for (let i = 0; i < file.length; i++) {
            if (file[i].indexOf("(") === -1 || file[i].startsWith("#") || file[i].indexOf("→") === -1) continue;
            let values = file[i].substring(file[i].indexOf("( ") + 2);
            let items = [values.substring(0, 1), values.substring(4, 5)];
            let support = [true, true];
            if (document.getElementById("check").checked) support = [characterIsSupported(items[1]), characterIsSupported(items[0])];
            if (typeof confusableItem[items[0]] === "undefined" && support[0]) confusableItem[items[0]] = [items[1]]; else if (support[0]) confusableItem[items[0]].push(items[1])
            if (typeof confusableItem[items[1]] === "undefined" && support[1]) confusableItem[items[1]] = [items[0]]; else if (support[1]) confusableItem[items[1]].push(items[0]);
        }
        let blob = new Blob([JSON.stringify(confusableItem)], { type: "text/plain" });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "list.json";
        a.click();
        window.URL.revokeObjectURL(url);
    }
    http.send();
}
    // Function from: https://stackoverflow.com/questions/1911000/detecting-individual-unicode-character-support-with-javascript
    function characterIsSupported(character, font = getComputedStyle(document.body).fontFamily, recursion = false) {
        // If you want to create a normal list with all characters, just write "return true" and delete everything else of this function.
        let testCanvas = document.createElement("canvas");
        let referenceCanvas = document.createElement("canvas");
        testCanvas.width = referenceCanvas.width = testCanvas.height = referenceCanvas.height = 150;
        let testContext = testCanvas.getContext("2d");
        let referenceContext = referenceCanvas.getContext("2d");
        testContext.font = referenceContext.font = "100px " + font;
        testContext.fillStyle = referenceContext.fillStyle = "black";
        testContext.fillText(character, 0, 100);
        referenceContext.fillText('\uffff', 0, 100);
        if (!recursion && characterIsSupported('\ufffe', font, true)) {
            testContext.fillStyle = referenceContext.fillStyle = "black";
            testContext.fillRect(10, 10, 80, 80);
            referenceContext.fillRect(10, 10, 80, 80);
        }
        return testCanvas.toDataURL() != referenceCanvas.toDataURL();
    }