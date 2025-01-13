document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let currentIndex = 0; //putting the card at index 0 as active card
  let hasDragged = false; //intially dragging is false

  function changeCard(next) {
    if (hasDragged) return; //if dragging is true during setimout function prevents from entering the code

    hasDragged = true;
    setTimeout(() => {
      hasDragged = false; //once dragged limiting next drag after 300ms only. Cards got buggy due to no limit on dragging
    }, 300);

    cards[currentIndex].classList.remove("active"); //after we drag we remove the active class from current index card

    currentIndex =
      (currentIndex + (next ? 1 : -1) + cards.length) % cards.length; //if we have dragged downward we add -1 and vice versa.

    cards[currentIndex].classList.add("active"); //then we add the active class to new current index

    setCardPositions();
  }

  function setCardPositions() {
    const topIndex = (currentIndex - 1 + cards.length) % cards.length;
    const bottomIndex = (currentIndex + 1) % cards.length;

    cards.forEach((card) => {
      card.classList.remove("next", "prev");
    });

    cards[topIndex].classList.add("prev");
    cards[currentIndex].classList.add("active");
    cards[bottomIndex].classList.add("next");
  }

  setCardPositions();

  let startYposition = 0;

  let downListener = (e) => {
    startYposition = e.clientY; //we get the mouse clicked position
  };

  let upListener = (e) => {
    let lastYposition = e.clientY; //we get the mouse release position
    let differenceInPosition = startYposition - lastYposition; //and we find the difference between when mouse clicked and mouse released
    console.log(differenceInPosition);

    if (Math.abs(differenceInPosition) > 30) {
      //ensuring that this threshold needs to be moved for drag to be registeresd
      if (differenceInPosition > 0) {
        //if the difference is positive we have dragged upward
        changeCard(true);
      } else {
        changeCard(false);
      }
    }
  };

  window.addEventListener("mousedown", downListener);
  window.addEventListener("mouseup", upListener);
});
