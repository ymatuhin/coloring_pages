import ResourcesLoader from './ResourcesLoader';

/**
 * Created by aniii526 on 1.09.2017.
 */
export default class ResourcesNavi extends ResourcesLoader {
    constructor() {
        super();
    }
    public init(): Promise<any> {
        return new Promise(resolve => {
            // шрифты
            this.fontFamilies = ["MyriadPro-Regular", "tr_avatarregular"];

            // создается loader, когда ресурсы загрузятся, вызываем resolve();
            super.init().then(() => {
                resolve();
            });

            // список загрузок для данной игры.
            const version = 2;

            this.loader.add('assets/pic1.jpg?' + version);
            this.loader.add('assets/pic2.jpg?' + version);
            this.loader.add('assets/pic3.jpg?' + version);

            this.loader.load();
        });
    }
}
