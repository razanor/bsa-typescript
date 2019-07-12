import View from './view';
import FighterValues from './helpers/interfaces';

interface IFighterView {
  createFighter(fighter: FighterValues, handleClick: Function): void,
  createName(name: string): HTMLElement,
  createCheckbox(id: string): HTMLElement
};

class FighterView extends View implements IFighterView {
  constructor(fighter: FighterValues, handleClick: Function) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter: FighterValues, handleClick: Function) {
    const { name, source, _id } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source, 'fighter-image');
    const checkboxElement = this.createCheckbox(_id);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.appendChild(imageElement);
    this.element.appendChild(nameElement);
    this.element.appendChild(checkboxElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name: string) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createCheckbox(id: string) {
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