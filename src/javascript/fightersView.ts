import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  static modalOverley = document.getElementById('modal-overlay');
  static inputHealth = document.getElementById('input-health');
  static inputAttack = document.getElementById('input-attack');
  static updateSkillsBtn = document.querySelector('.update-skills');
  static skillsModal = document.querySelector('.skills-modal');
  static fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
    FightersView.modalOverley.addEventListener('click', event => this.handleModalOverlayClick(event), false);
  }

  showModal(fighter) {
    const { health, attack, _id } = fighter;
    

    FightersView.modalOverley.style.visibility = 'visible';
    FightersView.skillsModal.classList.add('open');

    FightersView.inputHealth.value = health;
    FightersView.inputAttack.value = attack;
    FightersView.updateSkillsBtn.dataset.id = _id;

  }

  handleModalOverlayClick(event) {
    const target = event.target;

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
      target.parentNode.parentNode.style.visibility = 'hidden';
    }
  }

  async handleFighterClick(event, fighter) {
    try {
      const { _id } = fighter;

      if (!FightersView.fightersDetailsMap.has(_id)) {
        const fighterWithDetails = await fighterService.getFighterDetails(_id);     
        FightersView.fightersDetailsMap.set(_id, fighterWithDetails);
      }
      if (event.target.className != 'checked-fighter') {
        this.showModal(FightersView.fightersDetailsMap.get(_id));
      }
    } catch {
      console.warn(error);
    }
  }
}

export default FightersView;