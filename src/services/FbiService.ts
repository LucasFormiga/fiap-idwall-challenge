export default class FbiService {
    private apiUrl: string = "https://api.fbi.gov/@wanted";

    async getMostWanted() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();

        return this.toHumanLanguage(data);
    }

    private toHumanLanguage(data) {
        const items = data.items;

        return items.map(item => ({
            name: item.title,
            nationalities: item.nationality ? [item.nationality] : []
        }));
    }
}