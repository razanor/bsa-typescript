import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { name, source, _id } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source, 'fighter-image');
    const checkboxElement = this.createCheckbox(_id);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement, checkboxElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createCheckbox(id) {
    const attributes = { type: "checkbox", ["data-id"]: id };
    const checkboxElement = this.createElement({
      tagName: 'input',
      className: 'checked-fighter',
      attributes
    });

    return checkboxElement;
  }
}

export default FighterView;