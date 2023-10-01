type InterpolNotice = {
    name: string;
    firstName: string;
    lastName: string;
    nationalities: string[];
}

export default class InterpolService {
    private apiUrl: string = "https://ws-public.interpol.int/notices/v1/red?resultPerPage=20&page=3";

    async getMostWanted() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();

        return this.toHumanLanguage(data);
    }

    private toHumanLanguage(data): Array<InterpolNotice> {
        const notices = data["_embedded"].notices;

        return notices.map(notice => ({
            name: `${notice.name} ${notice.forename}`,
            firstName: notice.name,
            lastName: notice.forename,
            nationalities: notice.nationalities
        }));
    }
}