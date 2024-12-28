import cryptoFramework from "@ohos:security.cryptoFramework";
import buffer from "@ohos:buffer";
export class Random {
    static getRandom(length) {
        let f7 = cryptoFramework.createRandom();
        try {
            let g7 = f7.generateRandomSync(length);
            if (g7.data) {
                let buf = buffer.from(g7.data);
                if (buf && buf?.length === length) {
                    return buf.toString('hex');
                }
            }
            return '';
        }
        catch (error) {
            let e = error;
            console.error(`sync error, ${e.code}, ${e.message}`);
            return '';
        }
    }
}
