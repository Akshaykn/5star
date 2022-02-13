import StarComponent from './modules/StarComponent.js';
 
const textArea = document.getElementsByTagName('textarea')[0];

customElements.define('star-component', StarComponent);

const ratings = document.querySelector("star-component");

ratings.addEventListener("ratingsEvent", (event) => {
  onRatingsEvent(event);
});

function onRatingsEvent(event) {
  const ratings = event.detail.ratings;
  textArea.setAttribute('placeholder', `Please informs us why you selected ${ratings} star(s).`);
}
