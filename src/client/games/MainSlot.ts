import ResourcesLoaderManager from './ResourcesLoaderManager';
import * as PIXI from 'pixi.js';

/**
 * Created by aniii526 on 17.03.2017.
 */
export default class MainSlot {
    public testServer: boolean = false;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    public mainStage: PIXI.Container;
    public ratio: number;
    public isMobile: boolean = true;
    public pixelRatio: number = 1;
    public w: number = 0;
    public h: number = 0;
    public soundsSettingsObject: any;
    public atlasPanel: PIXI.loaders.TextureDictionary | undefined;
    public panelNameRes: string = 'web_panel.json';
    public localStoragekeyMute: string = 'mute';
    public localStoragekeyVolume: string = 'volume';
    private loader: PIXI.extras.AnimatedSprite;
    private gameIsVisible: boolean = false;
    public factory: any;
    public nameGame: string = "";
    public nameProv: string = "Xplay";
    public startSlot(gameId: number, partnerid: number, currency: string, userid: string, demo: number, token: string, BackUrl: string = '', soundsSettingsObject: any = null): void {
        this.soundsSettingsObject = soundsSettingsObject;
        this.checkMobile();
        this.initPixi();
        this.initEventResize();

        this.loadTexturesButtons();
    }
    private loadTexturesButtons() {
        // загрузчик ресурсов

        console.log('загрузчик ресурсов');
        const resLoadManager = new ResourcesLoaderManager();
        resLoadManager.create().then(() => {
            this.completeInitCommad();
        });
    }
    private checkMobile() {
    }
    public initPixi(): void {
        let size: number[] = [500, 500];
        this.ratio = size[0] / size[1];
        this.renderer = PIXI.autoDetectRenderer(size[0], size[1], { /*backgroundColor: 0x1099bb,*/ antialias: false });
        // this.renderer.view.style.position = 'absolute';
        // this.renderer.view.style.left = '50%';
        // this.renderer.view.style.top = '50%';
        document.body.appendChild(this.renderer.view);
        this.renderer.view.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        // уродский хак, чтобы маска работала на мобильном устройстве
        /*if (this.renderer.maskManager as PIXI.MaskManager)
            (this.renderer.maskManager as PIXI.MaskManager).enableScissor = false;*/
        this.mainStage = new PIXI.Container();
    }
    public initEventResize(): void {
        if (!this.isMobile) {
            window.addEventListener('resize', () => { this.resize(); }, false);
            this.resize();
        } else {
        }
        this.animate(0);
    }
    public onOrientationChanged() {
        this.resize();
    }
    private animate(time: number) {
        // TWEEN.update(time);
        // start the timer for the next animation loop
        requestAnimationFrame((time: number) => this.animate(time));
        // this is the main render call that makes pixi draw your container and its children.
        this.renderer.render(this.mainStage);
    }
    public getTexturesForName(nameTextures: string, countTextures: number, nameResolution: string = '.png'): PIXI.Texture[] {
        let texrures: PIXI.Texture[] = [];
        let indexName: string = '';
        for (let i: number = 1; i <= countTextures; i++) {
            indexName = i.toString();
            let texture: PIXI.Texture = PIXI.utils.TextureCache[nameTextures + indexName + nameResolution];
            if (texture)
                texrures.push(texture);
        }
        return texrures;
    }
    public getTexture(name: string): PIXI.Texture {
        let texture: PIXI.Texture = PIXI.utils.TextureCache[name];
        if (!texture)
            throw new Error("Нет Текстуры для: " + name);
        else
            return texture;
    }
    public resize() {
        // ресайз возможно подвергнется тотальной переработке.
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        /*this.background.width = this.w;
        this.background.height = this.h;*/

        // это может повлиять на производительность
        // возможно появится необходимость вернуть нижний вариант.
        /*this.renderer.view.width = (this.w / this.pixelRatio);
        this.renderer.view.height = (this.h / this.pixelRatio);
        //this.renderer.view.style.width = (this.w / this.pixelRatio) + "px";
        //this.renderer.view.style.height = (this.h / this.pixelRatio) + "px";    //this part adjusts the ratio:
        this.renderer.resize(this.w, this.h);*/

        if (this.mainStage) {
            let scale: number = Math.min(this.w / 500, this.h / 500);
            if (this.isMobile) {
                // this.slotPanel.scale.x = this.panel.scale.y = scale;
                // ((Constants.ASSETS_WIDTH - 1200 / 2) * scale) - смещает панель в право, так как кнопки в мобильной панели будут смещены в отрицательную сторону
                // this.slotPanel.x = (w - Constants.ASSETS_WIDTH * scale) / 2 + (((Constants.ASSETS_WIDTH - 1270) / 2) * scale);
                // this.slotPanel.y = (h - Constants.ASSETS_HEIGHT * scale) / 2;
            } else {
                this.mainStage.scale.x = this.mainStage.scale.y = scale;
                // this.mainStage.x = (this.w - (Constants.ASSETS_WIDTH * scale)) / 2;
                // this.mainStage.y = (this.h - (Constants.ASSETS_HEIGHT * scale)) / 2;

                this.renderer.view.width = (500 * scale);
                this.renderer.view.height = (500 * scale);
                this.renderer.view.style.left = (this.w - this.renderer.view.width) / 2 + "px";
                this.renderer.view.style.top = (this.h - this.renderer.view.height) / 2 + "px";
                // this.renderer.view.style.width = (this.w / this.pixelRatio) + "px";
                // this.renderer.view.style.height = (this.h / this.pixelRatio) + "px";    //this part adjusts the ratio:
                this.renderer.resize(this.renderer.view.width, this.renderer.view.height);
            }
        }
    }
    public completeInitCommad(): void {
        console.log('загрузилось!!!');
    }
}
