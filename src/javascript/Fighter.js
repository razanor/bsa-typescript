class Fighter {
    constructor({ name, health, attack, defense, source }) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.source = source;
    }

    randomNumber(min, max) {
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