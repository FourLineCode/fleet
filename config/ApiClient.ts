import axios from "axios";
import { config } from "~config/config";

export const ApiClient = axios.create({
    baseURL: config.api,
});
