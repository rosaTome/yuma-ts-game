// IMPORT
    // import continent response type
import { ContinentsResponse } from "../types/continents";

// function to retrieve
export const getCountriesByContinent = (continents: ContinentsResponse, continent: string): string[] => {
    const countriesInContinent: string[] = [];

    continents.forEach((continentInfo) => {
        if (continentInfo.region === continent && continentInfo.name?.common) {
            countriesInContinent.push(continentInfo.name.common);
        }
    });

    return countriesInContinent;
};
