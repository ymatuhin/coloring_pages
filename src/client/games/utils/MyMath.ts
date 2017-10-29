/**
 * Created by aniii526 on 13.03.2017.
 */
export class MyMath {

    /**
     * Возвращает случайное число из заданного диапазона.
     *
     * @param	aMin	 Меньшее значание в диапазоне.
     * @param	aMax	 Большее значание в диапазоне.
     * @return		Случайное число из заданного диапазона.
     */
    public static randomInRange(aMin: number, aMax: number): number {
        return aMin - 0.5 + Math.random() * (aMax - aMin + 1);
    }

    /**
     * Возвращает случайное целочисленное число из заданного диапазона.
     *
     * @param	aMin	 Меньшее значание в диапазоне.
     * @param	aMax	 Большее значание в диапазоне.
     * @return		Случайное целочисленное число из заданного диапазона.
     */
    public static randomIntInRange(aMin: number, aMax: number): number {
        return Math.round(this.randomInRange(aMin, aMax));
    }

    /**
     * Рассчитывает процент исходя из текущего и общего значения.
     *
     * @param    aCurrent     Текущее значание.
     * @param    aTotal     Общее значение.
     * @return        Возвращает процент текущего значения.
     */
    public static toPercent(aCurrent: number, aTotal: number): number {
        return (aCurrent / aTotal) * 100;
    }

    /**
     * Рассчитывает текущее значение исходя из текущего процента и общего значения.
     *
     * @param    aPercent     Текущий процент.
     * @param    aTotal     Общее значение.
     * @return        Возвращает текущее значение.
     */
    public static fromPercent(aPercent: number, aTotal: number): number {
        return (aPercent * aTotal) / 100;
    }

    /**
     * Переводит радианы в градусы.
     *
     * @param    aRadians     Угол в радианах.
     * @return        Возвращает угол в градусах.
     */
    public static toDegrees(aRadians: number): number {
        return aRadians * 180 / Math.PI;
    }

    /**
     * Переводит градусы в радианы.
     *
     * @param    aDegrees     Угол в градусах.
     * @return        Возвращает угол в радианах.
     */
    public static toRadians(aDegrees: number): number {
        return aDegrees * Math.PI / 180;
    }

    public static KEY_EOD = 'ConFeed';

    public static encryptOrDecrypt(text: string, key: string): string {
        let result = "";
        for (let c = 0; c < text.length; c++) {
            result += String.fromCharCode(text.charCodeAt(c) ^ key.charCodeAt(c % key.length));
        }
        return result;
    }
}