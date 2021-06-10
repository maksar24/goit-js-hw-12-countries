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
                    console.log(res);
                    return res.json();
        } 
        return Promise.reject('Error! Please try again.' + res.status);
            })
            .then(res => {
                console.log(res);
            this.onResolved(res)
        })
            .catch(res => {
            this.onRejected(res);
        });
    };
};