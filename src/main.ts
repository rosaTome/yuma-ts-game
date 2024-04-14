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
    let currentCountryIndex = 0;
    let score = 0;
    let totalCountries: 0;
    let countriesByContinent: string[] = [];

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

                    } catch (error) {
                        console.error("Error fetching continents data:", error);
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
                const startContinentQuiz = async (continent: string) => {
                    try {
                        const countriesData = await fetchContinentsData();

                        const countriesByContinent = getCountriesByContinent(continentsData, continent);
                        if (!countriesByContinent || countriesByContinent.length === 0) {
                            throw new Error("No countries available for the selected continent");
                        };

                        // initialise the quiz with countries for the selected continent
                        initialiseQuizContinents(countriesByContinent);

                        console.log(`QUIZ INITIATION - Countries in ${continent}:`, countriesByContinent);
                        
                    } catch (error) {
                        console.error("Error starting continent quiz:", error);
                    };
                };
                    
                // event listeners for continent buttons
                document.addEventListener("DOMContentLoaded", () => {
                    const continentButtons = document.querySelectorAll(".continents");
                    continentButtons.forEach((button) => {
                        button.addEventListener("click", (event) => {
                            const selectedContinent= event.target.textContent;
                            if(!selectedContinent){
                                startContinentQuiz(selectedContinent);

                            } else {
                                console.error("Issue with continent button text content");
                            }
                        });


                    });
                });
                 
        // Quiz        
            // flag img must match ✅
                // get flags
                const fetchFlagData = async (): Promise<FlagsResponse> => {
                    try {

                        // make the response
                        const response = await fetch("https://restcountries.com/v3.1/all");

                        // access the data 
                        const flagsData: FlagsResponse = await response.json();

                        return flagsData;

                    } catch (error) {
                        console.error("Error fetching or flag data:", error);
                        return []; 
                    };
                };

            // function to generate quiz for a specific country
                // COUNTRIES NEEDS TO COME FROM LIST - countriesByContinent array
                const generateQuiz = async (continent: string) => {
                    try {
                        // fetch continents data
                        const continentsData = await fetchContinentsData();

                        // get countries for the specified continent 
                        const countriesByContinent = getCountriesByContinent(continentsData, continent);

                        if (!countriesByContinent || countriesByContinent.length === 0) {
                            throw new Error("No countries available for quiz.");
                        }

                        const totalCountries = countriesByContinent.length;

                        // randomly select a country from the countriesByContinent array
                        const randomIndex = Math.floor(Math.random() * totalCountries);
                        const currentCountry = countriesByContinent[randomIndex];

                        // log current country for the quiz round
                        console.log(`Round ${currentCountryIndex + 1}: ${currentCountry}`);

                        // call the function to display the flag and options for the current country
                        await displayCountryQuiz(currentCountry, totalCountries);

                    } catch(error) {
                        console.error("Error generating quiz", error);       
                    };
                };

                // flag img 
                const displayCountryQuiz = async (currentCountry: string, totalCountries: number) => {
                    try {

                        // fetch flag data for all countries 
                        const flagsData = await fetchFlagData();

                        const currentCountryFlag = flagsData.find(country => country.flags.alt === currentCountry);

                        if (!currentCountryFlag) {
                            throw new Error("Flag data not found for the current country");
                        }

                        // png flag url for the current country
                        const flagImageUrl = currentCountryFlag.flags.png;

                        // update the flag image in the html 
                        const flagImageElement = document.querySelector<HTMLImageElement>("#flag");
                        flagImageElement.src = flagImageUrl;
                        flagImageElement.alt = currentCountryFlag.flags.alt;

                        if (flagImageElement) {
                            flagImageElement.src = flagImageUrl;
                            flagImageElement.alt = currentCountryFlag.flags.alt;
                        }

                        // generate option for the current country
                        const options = generateOptions(currentCountry, totalCountries);
                        displyOptions(options);

                    } catch (error) {
                        console.error("Error displaying country quiz:", error);
                    }  
                };
                    
                    // generate .option buttons with 3 random incorrect labels and 1 correct label matching the nominated country name from countriesByContinent object 

                const generateOptions = (currentCountry: string, totalCountries: number): string [] => {
                    const options: string[] = [currentCountry]; //to include correct option

                    // generate three random incorrect options from the list of all countries 
                    while (options.length < 4) {
                        const randomIndex = Math.floor(Math.random() * totalCountries);
                        const randomCountry = countriesByContinent[randomIndex];  
                        if (!options.includes(randomCountry) && randomCountry !== currentCountry) {
                            options.push(randomCountry);
                        }
                    }

                    // shuffle the options array to randomise order
                    return shuffleArray(options);
                };

                // shuffle nan array (Fisher-Yates shuffle algorithm)
                const shuffleArray = <T>(array: T[]): T[] => {
                    const shuffleArray = [...array];
                    for (let i = shuffleArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
                    }
                    return shuffleArray;
                };

                // Function to display options on the screen 
                const displayOptions = (options: string[]) => {
                    const optionsButtons = document.querySelectorAll<HTMLButtonElement>(".option");

                    if (optionButtons.length !== options.length) {
                        throw new Error("Number of option buttons does not match the number of options.");
                    }

                    optionsButtons.forEach((button, index) => {
                        button.textContent = options[index];
                        button.addEventListener("click", () => handleOptionClick(options[index]));
                    });
                    updateScoreDisplay();
                };

                const handleOptionClick = (selectedOption: string) => {
                    const currentCountry = countriesByContinent[currentCountryIndex - 1];

                    if (selectedOption === currentCountry) {
                        // correct answer
                        score++;
                    }

                     // move to the next quiz round if available
                    if (currentCountryIndex < totalCountries) {
                        generateQuiz(countriesByContinent);
                    } else {
                        // end of quiz
                        const messageElement = document.querySelector<HTMLDivElement>(".message");
                        if (messageElement) {
                            const endMessage = `Quiz completed. Score: ${score}/${totalCountries}`;
                            messageElement.textContent = endMessage;
                        };
                    };

                    // update the display of the score
                    updateScoreDisplay();
                };
                
                const updateScoreDisplay = () => {
                    const scoreElement = document.querySelector<HTMLDivElement>("#score");
                    if (scoreElement) {
                        scoreElement.textContent = `Score: ${score}/${totalCountries}`;
                    };
                };

                document.addEventListener("DOMContentLoaded", () => {
                    const continentButtons = document.querySelectorAll(".continents");
                    continentButtons.forEach((button) => {
                        button.addEventListener("click", (event) => {
                            const selectedContinent = event.target.textContent;
                            if (selectedContinent) {
                                generateQuiz(selectedContinent);
                            } else {
                                throw new Error("Issue with continent button text content.");
                            }
                        });
                    });
                });
                
// EVENT LISTENERS 