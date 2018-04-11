/**
 * Cocos版本:1.6.2
 * 參考資料：
 * 能否加文字或節點阴影组件
 * http://forum.cocos.com/t/topic/57497
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShadowLabelTS extends cc.Label {
    /** 阴影文字 */
    private shadeLabel: cc.Label = null;

    public _updateNodeSize(): void {
        let pt: any = cc.Label.prototype;
        pt._updateNodeSize.call(this);
        this.onLabelChange();
    }

    public onLoad(): void {
        let pt: any = cc.Label.prototype;
        pt.onDisable.call(this);
    }

    public onDisable(): void {
        let pt: any = cc.Label.prototype;
        pt.onDisable.call(this);
        if (this.shadeLabel) {
            this.shadeLabel.node.active = false;
        }
    }

    public onEnable(): void {
        let pt: any = cc.Label.prototype;
        pt.onEnable.call(this);
        if (CC_JSB) {
            // this._sgNode.enableShadow(this.shadowOffset, cc.size(this.shadowOffset.x, this.shadowOffset.y));
        } else {
            if (this.shadeLabel) {
                this.shadeLabel.node.active = true;
            } else {
                let shadeLabelNode: cc.Node = this.node.getChildByName("shadow_label");
                if (!shadeLabelNode) {
                    shadeLabelNode = new cc.Node();
                    shadeLabelNode.setPosition(10, -10);
                    shadeLabelNode.color = cc.color(0, 0, 0);
                    this.node.addChild(shadeLabelNode, -8, "shadow_label");
                }

                this.shadeLabel = shadeLabelNode.getComponent(cc.Label);
                if (!this.shadeLabel) {
                    this.shadeLabel = shadeLabelNode.addComponent(cc.Label);
                }
                this.onLabelChange();
            }
        }
    }

    /** 刷新阴影数据 */
    private onLabelChange(): void {
        if (CC_JSB) {
            return;
        }
        if (this.shadeLabel) {
            this.shadeLabel.string = this.string;
            this.shadeLabel.horizontalAlign = this.horizontalAlign;
            this.shadeLabel.verticalAlign = this.verticalAlign;
            this.shadeLabel.fontSize = this.fontSize;
            this.shadeLabel.fontFamily = this.fontFamily;
            this.shadeLabel.lineHeight = this.lineHeight;
            this.shadeLabel.overflow = this.overflow;
            this.shadeLabel.enableWrapText = this.enableWrapText;
            this.shadeLabel.font = this.font;
            this.shadeLabel.isSystemFontUsed = this.isSystemFontUsed;
        }
    }
}