import FightersView from './fightersView';
import { fighterService } from './services/fightersService';
import { startGame } from './gameStarter';

interface IApp {
  startApp(): Promise <void>;
};

class App implements IApp {
  private rootElement = document.getElementById('root') as HTMLElement;
  private loadingElement = document.getElementById('loading-overlay') as HTMLElement;
  private startGameBtn = document.getElementById('start-game') as HTMLElement;

  constructor() {
    this.startApp();
  }

  async startApp() {
    try {
      this.loadingElement.style.visibility = 'visible';
      
      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      this.rootElement.appendChild(fightersElement);
      this.startGameBtn.addEventListener('click', event => startGame(), false);
    } catch (error) {
      console.warn(error);
      this.rootElement.innerText = 'Failed to load data';
    } finally {
      this.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;