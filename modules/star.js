function CreateStar(starId, starWidth = 20, starHeight = 20) {
  const defaultImage = '../assets/star.png';
  const selectedImage = '../assets/star-seleted.png';
  const att = document.createAttribute("action");
  att.value = "unSelected";
  let styles =  `width: ${starWidth}px;height: ${starHeight}px;`;
  styles = styles + 'margin: 10px;cursor:pointer;';
  this.startId = starId;
  this.startSeleted = false;
  this.starElement = document.createElement('img');
  this.starElement.setAttribute('style', styles);
  this.starElement.setAttribute('id', starId);
  this.starElement.setAttribute('src', defaultImage);
  this.starElement.setAttributeNode(att);
  this.getStar = function() {
    return this.starElement;  
  };
  this.starElement.addEventListener('mouseover', () => {
    if (!this.startSeleted) {
      this.starElement.setAttribute('src', selectedImage);
      this.starElement.setAttribute('action', 'hoverOver');
    }
  });
  this.starElement.addEventListener('mouseout', () => {
    if (!this.startSeleted) {
      this.starElement.setAttribute('src', defaultImage);
      this.starElement.setAttribute('action', 'hoverOut');
    } 
  });
  this.starElement.addEventListener('click', () => {
    this.toggleState();    
  });
  this.toggleState = function() {
    this.startSeleted = !this.startSeleted;
    if (this.startSeleted) {
      this.starElement.setAttribute('src', selectedImage);
      this.starElement.setAttribute('action', 'selected');
    } else {
      this.starElement.setAttribute('src', defaultImage);
      this.starElement.setAttribute('action', 'unSelected');
    }   
  }
  this.setState = function(value) {
    this.startSeleted = value;
    if (this.startSeleted) {
      this.starElement.setAttribute('src', selectedImage);
      this.starElement.setAttribute('action', 'selected'); 
    } else {
      this.starElement.setAttribute('src', defaultImage);
      this.starElement.setAttribute('action', 'unSelected'); 
    } 
  }
  this.setHoverState = function(value) {
    if (value) {
      this.starElement.setAttribute('src', selectedImage);
      this.starElement.setAttribute('action', 'hoverOver'); 
    } else {
      this.starElement.setAttribute('src', defaultImage);
      this.starElement.setAttribute('action', 'hoverOut'); 
    } 
  }
  this.setStarState = function(status) {
    this.setState(status === 'active' ? true : false); 
  }     
}

export default CreateStar;