import fs from "fs";
import { get } from "http";

const getManifest = () => {
    try {
        return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
    } catch (error) {
        console.log(error);
    }
};

export default getManifest;
