import CreateStar  from "./star.js";
function StarComponentProvider() {
  let noOfStars = 5;
  const config = { 
    attributes: true,
    childList: true,
    subtree: true, 
  };
  let starArr = [];
  let container = null;
  
  const createStars = function() {
    const starArrays = new Array(noOfStars).fill('star').map((star, index) => {
      return new CreateStar(`${star}${index}`, 50 , 50);    
    });
    return starArrays;   
  }
   
  const addStars = function(containerElement) {
    starArr = createStars();
    starArr.forEach((star) => {
      containerElement.appendChild(star.getStar());    
    });
  }

  const SetContainer = function(startContainerEle) {
    const starContainer = startContainerEle;
    return starContainer;
  }
  
  const getIndex = function(value) {
    return value.replace(/[a-z]/g, '');
  }

  const onSelectStar = function(id) {
    starArr.forEach((star, index) => {
      if (index < getIndex(id)) {
        star.setStarState('active');
      }
    });
    updateRatings();
  }

  const onUnSelectStar = function(id) {
    starArr.forEach((star, index) => {
      if (getIndex(id) <= index) {
        if (star.startSeleted) { 
          star.setStarState('in-active');
        }  
      }
    });
    updateRatings();
  }

  const onHoverStar = function(id) {
    starArr.forEach((star, index) => {
      if (index < getIndex(id) && !star.startSeleted) {
        star.setHoverState(true);
      }
    });
  }

  const onHoverOutStar = function(id) {
    starArr.forEach((star, index) => {
      if (index < getIndex(id) && !star.startSeleted) {
        star.setHoverState(false);
      }
    });
  }
  
  const modifyStarState = function(value, id) {
    switch(value) {
      case 'selected': onSelectStar(id); 
                      break;
      case 'unSelected': onUnSelectStar(id);
                      break;
      case 'hoverOver': onHoverStar(id);
                      break;
      case 'hoverOut':  onHoverOutStar(id);
                      break;
    }
  }
 
  const updateRatings = function() {
    const totalRatings = starArr.reduce((acc, star) => {
      if (star.startSeleted) {
        acc = acc + 1;  
      }
      return acc;
    }, 0);
    const ratingsEvent = new CustomEvent('ratingsEvent', {
      detail: {
        ratings: totalRatings,
      },
    });
    container.dispatchEvent(ratingsEvent);
  }

  const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
      if (mutation.type === 'attributes' &&
        mutation.attributeName === 'src' &&
        mutation.target.nodeName === "IMG") {
          const currentHoverActive =  mutation.target;
          modifyStarState(currentHoverActive.attributes.action.nodeValue, currentHoverActive.id);
      }
    }
  }

  const configureMutationalObserver = function(domNode) {
    const observer = new MutationObserver(callback);
    observer.observe(domNode, config);
  }

  const configureStar = function(id) {
    container = SetContainer(id);
    addStars(container);
    configureMutationalObserver(container);
  };
  
  return { 
    configureStar 
  };  
}

export { StarComponentProvider };