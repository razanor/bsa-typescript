import View from './view';
import FighterValues from './helpers/interfaces';

class FighterView extends View {
  constructor(fighter: FighterValues, handleClick: Function) {
    super();

    this.createFighter(fighter, handleClick);
  }

  private createFighter(fighter: FighterValues, handleClick: Function) {
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

  private createName(name: string) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  private createCheckbox(id: string) {
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