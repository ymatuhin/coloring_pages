import Test from './Test';
export default class Main {
    constructor() {
        console.log('Typescript Webpack starter launched');

        let test: Test = new Test();
        test.test2();
    }
}



let start = new Main();