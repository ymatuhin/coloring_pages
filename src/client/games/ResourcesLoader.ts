import * as PIXI from 'pixi.js';
// import { PreloaderManager } from 'game/utils/preloader/PreloaderManager';
// import { InitCommand } from 'game/engine/InitCommand';
// import { Events } from 'game/engine/events/Events';
import * as WebFont from 'webfontloader';
/**
 * Created by aniii526 on 1.09.2017.
 */
export default class ResourcesLoader {
    protected loader: PIXI.loaders.Loader;
    protected fontFamilies: string[];
    constructor() {
    }
    public init(): Promise<any> {
        return new Promise(resolve => {
            this.loader = new PIXI.loaders.Loader();
            // панелька загружается всегда.
            // this.loader.add('assets/' + mainSlot.panelNameRes)
            this.loader.once("complete", (aloader: any, resources: any) => {
                /*WebFont.load({
                    custom: {
                        families: this.fontFamilies
                    },
                    active: () => {
                        // let qc: InitCommand = new InitCommand();
                        //qc.on(Events.EVENT_COMPLETE, () => { resolve(); });
                        //qc.execute();

                        resolve();

                        console.log('resolve');
                    }
                });*/

                resolve();
            });
            this.loader.on('progress', (loader, res) => {
                // PreloaderManager.instance.setProgress(loader.progress > 90 ? 90 : loader.progress);
            });
        });
    }
}
