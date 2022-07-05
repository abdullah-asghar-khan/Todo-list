const todoCard = ({ description, index }) => {
    const liEl = document.createElement('li');
    liEl.classList.add('todo-wrapper');
    liEl.id = `todo-${index}`;
    liEl.innerHTML = `
        <div class='left-align'>
          <div>
            <input type="checkbox" class='checkbox' id="check-${index}" />
          </div>
          <div class='description-wrapper'>
            <p class='description'>${description}</p>
          </div>
        </div>
        <div class='more-delete-wrapper'>
            <ion-icon class='more-icon ionic' name="ellipsis-vertical-outline"></ion-icon>
        </div>
          `;
    return liEl;
  };
  
  export default todoCard;