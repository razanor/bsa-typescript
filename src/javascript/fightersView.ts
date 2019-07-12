import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import FighterValues from './helpers/interfaces';

class FightersView extends View {
  handleClick: Function;

  constructor(fighters: FighterValues[]) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  static modalOverley = document.getElementById('modal-overlay') as HTMLElement;
  static inputHealth = document.getElementById('input-health') as HTMLInputElement;
  static inputAttack = document.getElementById('input-attack') as HTMLInputElement;
  static updateSkillsBtn = document.querySelector('.update-skills') as HTMLElement;
  static skillsModal = document.querySelector('.skills-modal') as HTMLElement;
  static fightersDetailsMap = new Map();

  private createFighters(fighters: FighterValues[]) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    fighterElements.forEach(fighter => {
      this.element.appendChild(fighter);
    });
    FightersView.modalOverley.addEventListener('click', event => this.handleModalOverlayClick(event), false);
  }

  private showModal(fighter: FighterValues) {
    const { health, attack, _id } = fighter;
    

    FightersView.modalOverley.style.visibility = 'visible';
    FightersView.skillsModal.classList.add('open');

    FightersView.inputHealth.value = String(health);
    FightersView.inputAttack.value = String(attack);
    FightersView.updateSkillsBtn.dataset.id = _id;
  }

  private handleModalOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.id == 'modal-overlay') {
      FightersView.skillsModal.classList.remove('open');      
      target.style.visibility = 'hidden';
    } else if (target.className == 'update-skills') {
      const updatedSkills = { 
        health: +FightersView.inputHealth.value,
        attack: +FightersView.inputAttack.value 
      };
      const updatedFighter = { ...FightersView.fightersDetailsMap.get(target.dataset.id), ...updatedSkills };
      FightersView.fightersDetailsMap.set(target.dataset.id, updatedFighter);
      FightersView.skillsModal.classList.remove('open');      
      (<HTMLElement> target.parentNode!.parentNode).style.visibility = 'hidden';
    }
  }

  private async handleFighterClick(event: MouseEvent, fighter: FighterValues) {
    try {
      const { _id } = fighter;

      if (!FightersView.fightersDetailsMap.has(_id)) {
        const fighterWithDetails = await fighterService.getFighterDetails(_id);     
        FightersView.fightersDetailsMap.set(_id, fighterWithDetails);
      }
      if ((<HTMLElement>event.target)!.className != 'checked-fighter') {
        this.showModal(FightersView.fightersDetailsMap.get(_id));
      }
    } catch {
      console.warn(Error);
    }
  }
}

export default FightersView;