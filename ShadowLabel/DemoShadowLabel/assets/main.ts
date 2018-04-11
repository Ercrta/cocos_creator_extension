const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property(cc.Label)
    lab_js: cc.Label = null;

    @property(cc.Label)
    lab_ts: cc.Label = null;

    public onLoad(): void {
        this.node.getChildByName("btn").on(cc.Node.EventType.TOUCH_START, () => {
            this.lab_js.string = "6666";
            this.lab_ts.string = "6666";
        });
    }
}
