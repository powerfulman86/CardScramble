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
  
  const result = document.getElementById("result");
  const score = document.getElementById("score");
  var total = 0;
  const restart = document.getElementById("restart");
  const reveal = document.getElementById("reveal");
  const startArea = document.getElementById("startArea");
  
  function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
  }
  
  CountDownTimer.prototype.start = function () {
    if (this.running) {
      return;
    }
    this.running = true;
    var start = Date.now(),
      that = this,
      diff,
      obj;
  
    (function timer() {
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
  
      if (diff > 0) {
        setTimeout(timer, that.granularity);
      } else {
        diff = 0;
        that.running = false;
        blackout();
      }
  
      obj = CountDownTimer.parse(diff);
      that.tickFtns.forEach(function (ftn) {
        ftn.call(this, obj.minutes, obj.seconds);
      }, that);
    })();
  };
  
  CountDownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === "function") {
      this.tickFtns.push(ftn);
    }
    return this;
  };
  
  CountDownTimer.prototype.expired = function () {
    return !this.running;
  };
  
  CountDownTimer.parse = function (seconds) {
    return {
      minutes: (seconds / 60) | 0,
      seconds: seconds % 60 | 0,
    };
  };
  
  function blackout() {
    const x = document.getElementsByClassName("card");
    for (var i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "black";
      x[i].style.pointerEvents = "auto";
    }
  }
  
  function disablecards() {
    const x = document.getElementsByClassName("card");
    for (var i = 0; i < x.length; i++) {
      x[i].style.pointerEvents = "none";
    }
  }
  
  function revealCards() {
    const x = document.getElementsByClassName("card");
    for (var i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "#ccc";
    }
  }
  
  window.onload = function () {
    const display = document.querySelector("#time"),
      timer = new CountDownTimer(5),
      timeObj = CountDownTimer.parse(5);
  
    format(timeObj.minutes, timeObj.seconds);
  
    timer.onTick(format);
  
    document.querySelector("button.start").addEventListener("click", function () {
      timer.start();
      revealCards();
      startArea.classList.add("hidden");
    });
  
    function format(minutes, seconds) {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
    }
  };
  
  function startGame() {
    const countdown = 10,
      display = document.querySelector("#time");
    startTimer(countdown, display);
  }
  
  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
  
  function match(clicked_id, numbers, displayNumbers) {
    if (clicked_id === numbers[0]) {
      document.getElementById(clicked_id).style.backgroundColor = "#ccc";
      numbers.shift();
      total = total + 100 / displayNumbers.length;
      score.innerHTML = total;
      if (numbers.length === 0) {
        disablecards();
        result.innerHTML = "Winner Winner Chicken Dinner!";
        result.style.color = "green";
        restart.classList.remove("hidden");
      }
    } else {
      disablecards();
      score.innerHTML = total;
      result.innerHTML = "Game over! Try again";
      result.style.color = "red";
      restart.classList.remove("hidden");
      reveal.classList.remove("hidden");
    }
  }