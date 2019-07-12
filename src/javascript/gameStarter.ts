import FightersView from './fightersView';
import Fighter from './Fighter';
import FightArea from './fightArea';

interface FighterObject {
 attack: number,
 defense: number,
 health: number,
 name: string,
 source: string,
 getHitPower(): number,
 getBlockPower(): number
};

function delay() {
    return new Promise(resolve => { 
        setTimeout(() => {
        resolve ();
        }, 1000);
    });
}

async function winnerAnnouncement(winner: string) {
    const figthArea = document.querySelector('.fight-area');
    const winnerTitle = document.createElement('p');
    winnerTitle.innerText = `${winner} won!`
    winnerTitle.classList.add('winner-title');
    figthArea!.appendChild(winnerTitle);
    await delay();    
    winnerTitle.style.transform = 'translate(-50%, -50%)';
}

function healthLeft(domElement: HTMLElement, left: any, initial: any) {
    domElement.innerText = String(left < 0 ? 0 : left);
    domElement.style.width = `${Math.floor((left / initial) * 100)}%`;
}

function lastUIupdate(domElement: HTMLElement, initial: number, className: string) {
    healthLeft(domElement, 0, initial);
    domElement.classList.remove(className);
}

function damageScore(attack: number, defence: number) {
    let damage = attack - defence;
    if (damage < 0) damage = 0;
    return damage;
}

function hit(attacker: FighterObject, defender: FighterObject) {
    return new Promise(resolve => { 
        setTimeout(() => {
            defender.health -= damageScore(attacker.getHitPower(), defender.getBlockPower());
        resolve (defender.health);
        }, 1000);
    });
}

async function fight(first: FighterObject, second: FighterObject) {
    const initialFirstHealth = first.health;
    const initialSecondHealth = second.health;
    let winner = null;

    new FightArea("create", first.source, second.source);

    const firstFighterHealth = document.getElementById('first-fighter-health');
    const secondFighterHealth = document.getElementById('second-fighter-health');

    while (1) {
        if (first.health <= 0) {
            lastUIupdate(firstFighterHealth!, initialFirstHealth, 'w3-blue');
            winner = second.name;
            break ;
        }
        if (second.health <= 0) {
            lastUIupdate(secondFighterHealth!, initialSecondHealth, 'w3-green');
            winner = first.name;
            break ;
        }
        const secondHealthLeft = await hit(first, second);
        healthLeft(secondFighterHealth!, secondHealthLeft, initialSecondHealth);

        const firstHealthLeft = await hit(second, first);
        healthLeft(firstFighterHealth!, firstHealthLeft, initialFirstHealth);
    }
    winnerAnnouncement(winner!);
    const toMainMenuBtn = document.querySelector('.go-to-main-menu') as HTMLElement;
    toMainMenuBtn!.style.visibility = 'visible';
    toMainMenuBtn.addEventListener('click', event => new FightArea('delete'), false);
}

function startGame() {
    const selectedFighters = document.querySelectorAll('.checked-fighter:checked');
        
    if (selectedFighters.length != 2) {
        alert(`You have to select 2 players to start fight. You selected - ${selectedFighters.length}`);
        return ;
    }
    const [ firstId, secondId ] = [...selectedFighters].map((el) => el.getAttribute('data-id'));
    const firstFighter = FightersView.fightersDetailsMap.get(firstId);
    const secondFighter = FightersView.fightersDetailsMap.get(secondId);
    fight(new Fighter(firstFighter), new Fighter(secondFighter));
}

export { startGame }