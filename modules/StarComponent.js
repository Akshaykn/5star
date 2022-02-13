import { StarComponentProvider } from './stars.js';

class StarComponent extends HTMLElement {
    createdElement = null;
    static get observedAttributes() {
      return ['ratingsevent'];
    }     
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.createdElement = document.createElement('div');
      const createdId = `divId${new Date().getTime()}`;
      this.createdElement.setAttribute('id', createdId);
      this.createdElement.setAttribute("class", "startContainer");
      this.createdElement.setAttribute("style", "display: flex;width:  400px;height: 100px;flex-direction: row;align-items: center;justify-content: center;");
      this.shadowRoot.appendChild(this.createdElement);
    }
    connectedCallback() {
      const starComponentProvider = StarComponentProvider();
      starComponentProvider.configureStar(this.createdElement);
      this.createdElement.addEventListener('ratingsEvent', (value) => {
        const ratingsEvent = new CustomEvent('ratingsEvent', {
          detail: {
            ratings: value.detail.ratings,
          },
          bubbles: true,
        });
        this.dispatchEvent(ratingsEvent);  
      });
    }
  }

  export default StarComponent;
