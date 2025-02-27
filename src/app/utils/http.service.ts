import axios, { AxiosResponse } from "axios";

interface QueryParams {
    [key: string]: string | string[];
}

class HttpService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "https://pokeapi.co/api/v2";
    }

    async get<T>(path: string, query: QueryParams = {}): Promise<T> {
        try {
            let url = `${this.apiUrl}/${path}`;
            const params = this.buildQuery(query);
            if (params) {
                url = `${url}?${params}`;
            }
            const response: AxiosResponse<T> = await axios.get(url);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("An error occurred:", error.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
            throw error;
        }

    }

    private buildQuery(query: QueryParams): string {
        const params = new URLSearchParams();

        Object.keys(query).forEach((key) => {
            const value = query[key];

            if (Array.isArray(value)) {
                value.forEach((element) => {
                    params.append(key, element);
                });
            } else {
                params.append(key, value);
            }
        });

        return params.toString();
    }
}

const httpService = new HttpService();
export default httpService;