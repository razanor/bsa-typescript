import FightersView from './fightersView';
import { fighterService } from './services/fightersService';
import { startGame } from './gameStarter';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');
  static startGameBtn = document.getElementById('start-game');

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
      App.startGameBtn.addEventListener('click', event => startGame(event), false);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;