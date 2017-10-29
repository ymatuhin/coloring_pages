import ResourcesNavi from './ResourcesNavi';
import { mainSlot } from '../index';
import ResourcesLoader from './ResourcesLoader';

/**
 * Created by aniii526 on 1.09.2017.
 */
export default class ResourcesLoaderManager {
    public soundPath: string;
    public bonusSoundLoading: boolean;
    private gamename: string;
    private res: ResourcesLoader;
    constructor() {
    }
    public create(id_game: string = "1"): Promise<any> {
        return new Promise(resolve => {
            this.bonusSoundLoading = false;
            // id_game = GameList.STEAMMASHINES;
            switch (id_game) {

                case "1":
                    this.res = new ResourcesNavi();
                    mainSlot.nameGame = this.gamename = 'navi';
                    break;
            }
            this.soundPath = "assets/" + this.gamename + "/sounds/";
            this.res.init().then(() => {
                resolve();
            });
        });
    }
}
