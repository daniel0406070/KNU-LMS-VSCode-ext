import { json } from "stream/consumers";

const API_URL = "https://canvas.knu.ac.kr";
const API_TOKEN = "";

function API_request(method : string) {
    const url = `${API_URL}/api/v1/${method}?access_token=${API_TOKEN}`;

    fetch(url)
        .then((response) => response.json())
        .then((json) => JSON.stringify(console.log(json), null, 2))
        .catch((error) => console.log(error));

}

API_request("courses/28542/modules/443939/items/2377826");

