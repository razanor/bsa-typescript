import FighterValues from './helpers/interfaces';

interface IFighter {
    randomNumber(min: number, max: number): number,
    getHitPower(): number,
    getBlockPower(): number
}

class Fighter implements IFighter {
    public name: string;
    public health: number;
    public attack: number;
    public defense: number;
    public source: string;

    constructor({ name, health, attack, defense, source }: FighterValues) {
        this.name = name;
        this.health = health || 0;
        this.attack = attack || 0;
        this.defense = defense || 0;
        this.source = source;
    }

    randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    getHitPower() {
        const criticalHitChance = this.randomNumber(1, 2);
        return this.attack * criticalHitChance;
    }

    getBlockPower() {
        const dodgeChance = this.randomNumber(1, 2);
        return this.defense * dodgeChance;
    }
}

export default Fighter;