import axios from "axios";
import { storage } from "../Screen/Setting/DarkMode/storage";

const ApiConfig = axios.create({
    baseURL: storage.getString('baseUrl'),
    timeout: 10000,
    headers : {
        "Content-Type" : "application/json"
    }
})
export default ApiConfig