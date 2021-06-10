export default class CountriesApiService {
    constructor({ address, query, onResolved, onRejected }) {
    this.address = address;
    this.query = query;
    this.onResolved = onResolved;
    this.onRejected = onRejected;
  }
    
    fetchDescriptionCountry() {
        const url = `${this.address}${this.query}`;

        return fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
        })
            .then(res => {
            this.onResolved(res)
        })
            .catch(res => {
            this.onRejected(res);
        });
    };
};