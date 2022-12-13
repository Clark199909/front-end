import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';


@Injectable({
    providedIn: 'root'
})

export class CountryService {

    constructor(private http: HttpClient) {
    }

    async getCountries(): Promise<Country[]> {
        const res = await this.http.get<Country[]>('https://trial.mobiscroll.com/content/countries.json').toPromise();
        if (res === undefined) {
            const countries: Country[] = [];
            return countries
        }
        return res;
    }
}