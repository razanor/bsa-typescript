import View from './view';

class FightArea extends View {
    constructor(action, firstImg, secondImg) {
        super();
        
        if (action == 'create')
            this.createFightArea(firstImg, secondImg);
        if (action == 'delete')
            this.deleteFightArea();
    }

    static rootElement = document.getElementById('root');
    static startBtn = document.querySelector('#start-game');

    createFightArea(firstImg, secondImg) {
        document.querySelector('.fighters').style.display = 'none';
        FightArea.startBtn.style.display = 'none';

        this.element = this.createElement({ tagName: 'div', className: 'fight-area' });

        const toMainMenuBtn = this.createButton('go-to-main-menu', 'Home');

        const firstFighterDiv = this.createElement({ tagName: 'div', className: 'fighter-big'});
        const secondFighterDiv = this.createElement({ tagName: 'div', className: 'fighter-big'});

        firstFighterDiv.innerHTML = this.createHealthIndicator('blue', 'first-fighter-health');
        firstFighterDiv.append(this.createImage(firstImg, 'fighter-image-big'));

        secondFighterDiv.innerHTML = this.createHealthIndicator('green', 'second-fighter-health');
        secondFighterDiv.append(this.createImage(secondImg, 'fighter-image-big', 'fighter2-image-big'));

        this.element.append(toMainMenuBtn, firstFighterDiv, secondFighterDiv);
        FightArea.rootElement.appendChild(this.element);
    }

    createHealthIndicator(color, id) {
        const healthBar = `<div class="w3-light-grey w3-round">
        <div class="w3-container w3-${color} w3-round" id="${id}"
        style="width:100%; margin-bottom: 60px;">Full health</div></div>`; 

        return healthBar;
    }

    deleteFightArea() {
        const selectedFighters = document.querySelectorAll('.checked-fighter:checked');
        [...selectedFighters].forEach( el => { el.checked = false; })
        document.querySelector('.fighters').style.display = 'flex';
        FightArea.startBtn.style.display = 'inline';
        document.querySelector('.fight-area').remove();
    }
}

export default FightArea;