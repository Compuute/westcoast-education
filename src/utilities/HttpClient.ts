export class HttpClient {
    constructor(private _url: string) {}
    async Get() {
        try {
            const response = await fetch(this._url);
            console.log(response);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(
                    `GET request misslyckades med status ${response.status} `
                )
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }
}