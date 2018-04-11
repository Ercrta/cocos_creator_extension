cc.Class({
    extends: cc.Label,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    _updateNodeSize: function () {
        let pt = cc.Label.prototype;
        pt._updateNodeSize.call(this);
        this.onLabelChange();
    },
    onLoad: function () {
        let pt = cc.Label.prototype;
        pt.onDisable.call(this);
    },
    onDisable: function () {
        let pt = cc.Label.prototype;
        pt.onDisable.call(this);
        if (this.shadeLabel) {
            this.shadeLabel.node.active = false;
        }
    },
    onEnable: function () {
        let pt = cc.Label.prototype;
        pt.onEnable.call(this);
        if (CC_JSB) {
            // this._sgNode.enableShadow(this.shadowOffset, cc.size(this.shadowOffset.x, this.shadowOffset.y));
        } else {
            if (this.shadeLabel) {
                this.shadeLabel.node.active = true;
            } else {
                let shadeLabelNode = this.node.getChildByName("shadow_label");
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
    },
    /** 刷新阴影数据 */
    onLabelChange: function () {
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
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
