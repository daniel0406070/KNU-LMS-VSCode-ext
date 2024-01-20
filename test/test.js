"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_URL = "https://canvas.knu.ac.kr";
const API_TOKEN;
class LMS_API {
    constructor() {
    }
    API_request(method) {
        const url = `${API_URL}/api/v1/${method}?access_token=${API_TOKEN}`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => JSON.stringify(console.log(json), null, 2))
            .catch((error) => console.log(error));
    }
}
const api = new LMS_API;
api.API_request("courses");
//# sourceMappingURL=test.js.map