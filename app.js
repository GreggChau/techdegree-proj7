
document.addEventListener('DOMContentLoaded', () => {
  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const letter = document.getElementsByClassName('letter');
  const show = document.getElementsByClassName('show');
  let missed = 0;
  const overlay = document.getElementById('overlay');
  const start = document.querySelector('.btn__reset');
  const phrases = ["no way", "I am one", "Win", "Get on", "GTR skyline", "kid game"];
  const charactors = getRandomPhraseAsArray(phrases);


  function getRandomPhraseAsArray(arr) {
    const i = Math.floor(Math.random() * 5);
    const charactor = phrases[i];
    const array = charactor.split("");
    return array;
  }

  function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      const ul = document.querySelector('ul');
      const li = document.createElement('li');
      const letter = arr[i];
      li.textContent = letter.toLowerCase();
      ul.appendChild(li);
      if (letter === ' ') {
        li.className = ' ';
      } else {
        li.className = 'letter';
      }
    }
  }



  function checkLetter(target) {
    for (let i = 0; i < letter.length; i += 1) {
      if (target.textContent === letter[i].textContent) {
        letter[i].className += ' show';
        const rightLetter = letter[i].textContent;
        return rightLetter;
      }
    }
    for (let i = 0; i < letter.length; i += 1) {
      if (target.textContent !== letter[i].textContent) {
        return null;
      }
    }
  }


  function addResetButton() {
    const reset = document.createElement('a');
    reset.textContent = 'Restart';
    reset.className = 'btn__reset';
    overlay.removeChild(start);
    overlay.appendChild(reset);
    reset.addEventListener('click', () => {
      location.reload();
    })
  }

  function checkWin() {
    if (show.length === letter.length) {
      overlay.style.display = 'flex';
      overlay.className = 'win';
      addResetButton();
    } else if (missed >= 5) {
      overlay.style.display = 'flex';
      overlay.className = 'lose';
      addResetButton();
    }
  }

  addPhraseToDisplay(charactors);
  start.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON'){
      e.target.className = "chosen";
      e.target.disabled = true;
      const letterFound = checkLetter(e.target);
      const ol = document.querySelector('ol');
      const li = document.getElementsByClassName('tries');
      console.log(li);
      if (letterFound == null) {
        ol.removeChild(li[0]);
        missed += 1;
      }
      checkWin();
    }
  });



});
