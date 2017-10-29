/**
 * Created by ctretyak on 23.02.2017.
 */
import "./preloader.css";

import * as $ from "jquery";
// let preloaderNode = $.parseHTML(require("raw-loader!./preloader.html"));

export class PreloaderManager {
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private static _instance: PreloaderManager;
    private preloader: any;
    private linePath: any;
    private line: any;
    private overlay: any;

    private constructor() {
        if ($(".preloader").length) {
            this.preloader = $(".preloader");
        } /*else {
            $("body").prepend(preloaderNode);
            this.preloader = $(preloaderNode);
        }*/

        this.linePath = this.preloader.find(".preloader__linepath");
        this.line = this.preloader.find(".preloader__line");
        this.overlay = this.preloader.find(".preloader__overlay");
    }

    public setProgress(progress: number, callback?: Function) {
        this.line
            .stop()
            .animate({ width: progress + "%" }, 1000, "linear")
            .promise()
            .done(() => {
                if (progress >= 100) {
                    this.linePath.hide();
                    this.line.hide();
                    this.overlay.fadeOut(1000).promise().done(() => {
                        this.preloader.hide();
                        if (callback) {
                            callback();
                        }
                    });
                }
            });
    }
}
