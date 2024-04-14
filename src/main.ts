// IMPORTS
   // import styles
    import "./style.scss";

    // import the flags response type
    import { FlagsResponse } from "../types/flags";

    // import the continents response type 
    import { ContinentsResponse } from "../types/continents";

    // import the continents response objects 
    import { getCountriesByContinent } from "../objects/continents-objects";

// QUERYSELECTORS

// NULL CHECKS
    // find "error" "catch" 

// VARIABLES 
    // tracking game progress 
    // let score = 0;

// FUNCTIONS
    // functions - calling APIs
        
        // Continents 
            // filter countries by continent ✅
                // get continents
                const fetchContinentsData = async (): Promise<ContinentsResponse> => {
                    try {

                        // make the response
                        const response = await fetch("https://restcountries.com/v3.1/all");

                        // access the data 
                        const continentsData: ContinentsResponse = await response.json();

                        return continentsData;

                        // add the continents to the html
                        // quoteContainer.innerHTML = data.content;

                    } catch (error) {
                        console.error("Error fetching or processing data:", error);
                        return[]; 
                    };
                };
            
            
            // link continent button to continent object ✅

                // function to initialise quiz with country data 
                const initialiseQuizContinents = (countries: string[]) => {

                    // ensure countries array is not empty - 
                   if (!countries || countries.length === 0) {
                       throw new Error("No countries available for the selected continent")
                   };

                   // pick a random country from the provided array of countries 
                   const randomIndex = Math.floor(Math.random() * countries.length);
                   const randomCountry : string = countries[randomIndex];

                   // hide continent buttons
                   const homeContainer : any = document.querySelector<HTMLDivElement>(".home-container");
                   homeContainer.style.display = "none";

                   if(!homeContainer){
                       throw new Error ("Issue with selectors: home-container not found");
                   };

                   // show game container
                   const gameContainer : any = document.querySelector<HTMLDivElement>(".game-container")
                   gameContainer.style.display = "flex";

                   if(!gameContainer){
                       throw new Error ("Issue with selectors: game-container not found");
                   };

                   generateQuiz(randomCountry);
               };

                // function to start quiz for a specific continent
                const startContinentQuiz = (continent: string) => {
                fetchContinentsData().then((continentsData) => {
                    const countriesByContinent = getCountriesByContinent(continentsData, continent);

                    // Ensure countries array is not empty
                    if (!countriesByContinent || countriesByContinent.length === 0) {
                    throw new Error("No countries available for the selected continent");
                    };

                    // initialise the quiz with countries for the selected continent
                    initialiseQuizContinents(countriesByContinent);

                    console.log(`QUIZ INITIATION - Countries in ${continent}:`, countriesByContinent);
    
                    });
                };
                
                // event listeners for continent buttons
                document.addEventListener("DOMContentLoaded", () => {
                    const continentButtons = document.querySelectorAll(".continents");
                    continentButtons.forEach((button) => {
                        button.addEventListener("click", (event) => {
                            const selectedContinent= event.target.textContent;
                            startContinentQuiz(selectedContinent);

                            if(!event.target.textContent){
                                throw new Error ("Issue with selector - continent button text content not found");
                            };
                        });
                    });
                });
                 
        // Quiz        
            // flag img must match 
                // get flags
                const fetchFlagData = async (): Promise<ContinentsResponse> => {
                    try {

                        // make the response
                        const response = await fetch("https://restcountries.com/v3.1/all");

                        // access the data 
                        const continentsData: ContinentsResponse = await response.json();

                        return continentsData;

                        // add the continents to the html
                        // quoteContainer.innerHTML = data.content;

                    } catch (error) {
                        console.error("Error fetching or processing data:", error);
                        return[]; 
                    };
                };

                // function to generate quiz 
                const generateQuiz = (countries: string[]) => {
                    // generate .option buttons with 3 random incorrect labels and 1 correct label matching the nominated country name from countriesByContinent object 
                    // if clicked .option button is 1 of the 3 random incorrect labels, button goes red 
                    // if clicked .option button is 1 of the correct label matching the nominated country, button goes green 
                    // if button goes green, score goes up by 1 point
                    // if not, button goes red and score remains the same 
                    // take user to next quiz question/card after each .option button click 
                    // end of game = end of flags for each continent  
                    // correct answers / countries in each continent should be present 
                };
                
// EVENT LISTENERS 