function populateCards(value) {
    const numbers = [];
    numbers.length = 0;
    for (var i = 1; i <= value; i++) {
      numbers.push(i.toString());
    }
  
    removeElementsByClass("card");
  
    let displayNumbers = numbers.toString().split(",");
    shuffle(displayNumbers);
    for (var n in displayNumbers) {
      const newElement = document.createElement("div");
      newElement.id = displayNumbers[n];
      newElement.className = "card";
      newElement.style =
        "-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;";
      newElement.innerHTML = displayNumbers[n];
      document.body.appendChild(newElement);
      document.querySelector(".cardArea").appendChild(newElement);
      document
        .getElementById(newElement.id)
        .addEventListener("click", function () {
          match(this.id, numbers, displayNumbers);
        });
    }
  }
  
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
  
  