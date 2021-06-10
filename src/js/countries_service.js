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
            .then(this.onFetch)
            .then(res => {
            this.onResolved(res)
        })
            .catch(err => {
            this.onRejected(res);
        });
    };
    
    onFetch(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Error! Please try again.' + res.status);
    };
};