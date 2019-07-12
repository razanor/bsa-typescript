import FighterValues from './helpers/interfaces';

interface IFighter {
    getHitPower(): number,
    getBlockPower(): number
}

class Fighter implements IFighter {
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;

    constructor({ name, health, attack, defense, source }: FighterValues) {
        this.name = name;
        this.health = health || 0;
        this.attack = attack || 0;
        this.defense = defense || 0;
        this.source = source;
    }

    getHitPower() {
        const criticalHitChance = this.randomNumber(1, 2);
        return this.attack * criticalHitChance;
    }

    getBlockPower() {
        const dodgeChance = this.randomNumber(1, 2);
        return this.defense * dodgeChance;
    }

    private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

export default Fighter;