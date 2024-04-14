// IMPORT
    // import continent response type
import { ContinentsResponse } from "../types/continents";

// OBJECTS 
    // per continent 
    // export const africaFlags: ContinentsResponse = {
    //     region: "Africa",
    // };
    
    // export const americaFlags: ContinentsResponse = {
    //     region: "Americas",
    // };
    
    // export const asiaFlags: ContinentsResponse = {
    //     region: "Asia",
    // };
    
    // export const europeFlags: ContinentsResponse = {
    //     region: "Europe",
    // };
    
    // export const oceaniaFlags: ContinentsResponse = {
    //     region: "Oceania",
    // };

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
