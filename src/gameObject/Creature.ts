/**
 * 基本游戏类型
 */

class Ability {
    public nowhp: number = 0;
    public maxhp: number = 0;
    public nowmp: number = 0;
    public maxmp: number = 0;
    public nowexp: number = 0;
    public maxexp: number = 0;
    public minatk: number = 0;
    public maxatk: number = 0;
    public mindef: number = 0;
    public maxdef: number = 0;
    public constructor() {

    }
}


class Creature {
    public name: string;
    public level: number;
    public hp: number;
    public mp: number;
    public lifestate: number;
    public onlyid: number;
    public mapid: number;
    public mapname: string;
    public x: number;
    public y: number;
    public dir: number;
    public ability: Ability;

    public constructor() {
        this.ability = new Ability();
    }

    public changeHp(nowhp: number, maxhp: number = 0) {
        if (maxhp > 0) {
            this.ability.maxhp = maxhp;
            if (nowhp > 0) {
                this.ability.nowhp = nowhp;
            }
        } else {
            this.ability.nowhp = nowhp;
        }


        if (this.onlyid == App.GameEngine.mainPlayer.onlyid) {
            ////App.MainPanel.bloodBtn.text = '血量:(' + this.ability.nowhp + '/' + this.ability.maxhp + ')';
        }

    }

    public changeExp(nowexp: number, maxexp: number = 0) {
        this.ability.nowexp = nowexp;
        if (maxexp > 0) {
            this.ability.maxexp = maxexp;
        }

        if (this.onlyid == App.GameEngine.mainPlayer.onlyid) {
            ////App.MainPanel.expBtn.text = '经验:(' + this.ability.nowexp + '/' + this.ability.maxexp + ')';
        }
    }

    public changeAtk(minatk: number, maxatk: number) {
        this.ability.minatk = minatk;
        this.ability.maxatk = maxatk;
        if (this.onlyid == App.GameEngine.mainPlayer.onlyid) {
            ////App.MainPanel.atkBtn.text = '战力:' + this.ability.maxatk;
        }
    }

    public changeFight(fight: number) {
        ////App.MainPanel.atkBtn.text = '战力:' + fight;
    }
}