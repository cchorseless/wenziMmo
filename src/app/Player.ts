

class Player extends Creature {

    public playerName: string;
    public playerAccount: string;
    public playerPassword:string;
    public userOnlyid: Int64;

    public job:number;
    public sex:number;

    private _playerListView: any = [];
    private _monsterListView: any = [];
    private _npcListView: any = [];

    constructor() {
        super();
    }

    public init() {

    }

    public addViewObj(obj: any, type: number): void {
        switch (type) {
            case CRET_TYPE.CRET_PLAYER:
                this._playerListView.push(obj);
                App.GameEngine.outputCretInfo('玩家', type, this._playerListView.length);
                //App.GameEngine.outputSystemInfo('玩家：' + (obj as Player).name + '(' + (obj as Player).onlyid + ')' + '进入你的视野');
                break;
            case CRET_TYPE.CRET_MONSTER:
                this._monsterListView.push(obj);
                App.GameEngine.outputCretInfo('怪物', type, this._monsterListView.length)
                let monster = obj as Monster;
                //App.GameEngine.outputSystemInfo('怪物 lv' + monster.level + '：' + monster.name + '(' + monster.onlyid + ')[' + monster.x + ',' + monster.y + '] 进入你的视野');
                break;
            case CRET_TYPE.CRET_NPC:
                this._npcListView.push(obj);
                let npc = obj as Monster;
                App.GameEngine.outputCretInfo('NPC', type, this._npcListView.length)
                //App.GameEngine.outputSystemInfo('<font color="#00CD00">NPC：' + npc.name + '(' + npc.onlyid + ')[' + npc.x + ',' + npc.y + '] 进入你的视野</font>');
                break;
            default:
                break;
        }

    }

    public removeViewObj(onlyid: number, type: number): void {
        let list: any = [];
        let name: string = '';
        switch (type) {
            case CRET_TYPE.CRET_PLAYER:
                list = this._playerListView;
                name = '玩家';
                break;
            case CRET_TYPE.CRET_MONSTER:
                list = this._monsterListView;
                name = '怪物';
                break;
            case CRET_TYPE.CRET_NPC:
                list = this._npcListView;
                name = 'NPC';
                break;
            default:
                break;
        }

        for (let i = 0; i < list.length; ++i) {
            if (list[i].onlyid == onlyid) {
                //App.GameEngine.outputSystemInfo('怪物：' + (list[i] as Monster).name + '(' + (list[i] as Monster).onlyid + ')' + '离开你的视野');
                list[i] = null;
                list.splice(i, 1);
                break;
            }
        }
        //App.GameEngine.outputSystemInfo('您视野中的' + name + '数量：' + this._monsterListView.length);
        App.GameEngine.outputCretInfo(name, type, list.length);
    }

    public clearViewObj() {
        for (let obj in this._playerListView) {
            obj = null;
        }
        this._playerListView = [];

        for (let obj in this._monsterListView) {
            obj = null;
        }
        this._monsterListView = [];

        for (let obj in this._npcListView) {
            obj = null;
        }
        this._npcListView = [];

        ////App.MainPanel.clearListView();
    }
}