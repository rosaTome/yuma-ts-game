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

                // function to start quiz for a specific continent
                const startContinentQuiz = async (continent: string) => {
                    try {
                        const continentsData = await fetchContinentsData();

                        countriesByContinent = getCountriesByContinent(continentsData, continent);
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

                    // show game container
                    const gameContainer : any = document.querySelector<HTMLDivElement>(".game-container");

                    if (homeContainer && gameContainer) {
                        homeContainer.style.display = "none";
                        gameContainer.style.display = "flex";
                        generateQuiz(randomCountry);
                    } else {
                        throw new Error("Issue with selectors: home-container or game-container not found");
                    };
                };

                  
            // function to fetch flag data for all countries
                // get flags
                const fetchFlagData = async (): Promise<FlagsResponse[]> => {
                    try {

                        // make the response
                        const response = await fetch("https://restcountries.com/v3.1/all");

                        if (!response.ok) {
                            throw new Error("Failed to fetch flag data");
                        }

                        // access the data 
                        const flagsData: FlagsResponse[] = await response.json();

                        return flagsData;

                    } catch (error) {
                        console.error("Error fetching flag data:", error);
                        throw error;
                    };
                };

                // function to generate quiz for a specific country
                const displayCountryQuiz = async (currentCountry: string) => {
                    try {

                        // fetch flag data for all countries 
                        const flagsData = await fetchFlagData();

                        // Ensure flagsData is an array
                        if (!Array.isArray(flagsData)) {
                            throw new Error("Invalid flag data format");
        }
                        const currentCountryFlag = flagsData.find((country) => country.name.common === currentCountry);

                        if (!currentCountryFlag) {
                            throw new Error("Flag data not found for the current country");
                        }

                        // png flag url for the current country
                        const flagImageUrl = currentCountryFlag.flags.png;

                        // update the flag image in the html 
                        const flagImageElement = document.querySelector<HTMLImageElement>("#flag");

                        if (flagImageElement) {
                            flagImageElement.src = flagImageUrl;
                            flagImageElement.alt = currentCountry;
                        }

                        // generate option for the current country
                        const options = generateOptions(currentCountry, flagsData.length);
                        displayOptions(options);

                    } catch (error) {
                        console.error("Error displaying country quiz:", error);
                    }  
                };

                // generate .option buttons with 3 random incorrect labels and 1 correct label matching the nominated country name from countriesByContinent object 
                const generateOptions = (currentCountry: string, totalCountries: number): string [] => {
                    const options: string[] = [currentCountry]; //to include correct option

                    // Ensure we can generate three unique incorrect options
                    if (totalCountries <= 1) {
                        throw new Error("Insufficient countries to generate options");
                    };

                    // generate three random incorrect options from the list of all countries 
                    while (options.length < 4) {
                        const randomIndex = Math.floor(Math.random() * totalCountries);

                        if (randomIndex >= 0 && randomIndex < totalCountries && countriesByContinent[randomIndex]) {
                            const randomCountry = countriesByContinent[randomIndex];


                            if (!options.includes(randomCountry) && randomCountry !== currentCountry) {
                                options.push(randomCountry);
                            };
                        };
                    };

                    console.log("Generated options:", options);

                    // shuffle the options array to randomise order
                    return shuffleArray(options);
                };

                // (Fisher-Yates shuffle algorithm)
                const shuffleArray = <T>(array: T[]): T[] => {
                    const shuffleArray = [...array];
                    for (let i = shuffleArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
                    }
                    return shuffleArray;
                };

                // function to generate and display a quiz round for a specific country
                const generateQuiz = async (country: string) => {

                    try {
                        await displayCountryQuiz(country);
                        updateScoreDisplay();
                    } catch (error) {
                        console.error("Error generating quiz", error);
                    };
                };

                // Function to display options on the screen 
                const displayOptions = (options: string[]) => {
                    const optionsButtons = document.querySelectorAll<HTMLButtonElement>(".option");

                    if (optionsButtons.length !== options.length) {
                        throw new Error("Number of option buttons does not match the number of options.");
                    }

                    optionsButtons.forEach((button, index) => {
                        button.textContent = options[index];
                        button.addEventListener("click", () => handleOptionClick(options[index]));
                    });
                    updateScoreDisplay();
                };

                const handleOptionClick = (selectedOption: string) => {
                    const currentCountry = countriesByContinent[currentCountryIndex];

                    if (selectedOption === currentCountry) {
                        // correct answer
                        score++;
                    }
                    
                    // move to the next quiz round 
                    currentCountryIndex++;

                    if (currentCountryIndex < totalCountries) {
                        generateQuiz(countriesByContinent[currentCountryIndex]); // generate next quiz round
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
                
                // function to update the score display on the page
                const updateScoreDisplay = () => {
                    const scoreElement = document.querySelector<HTMLDivElement>("#score");
                    if (scoreElement) {
                        scoreElement.textContent = `Score: ${score}/${totalCountries}`;
                    };
                };

                // event listeners for continent buttons
                document.addEventListener("DOMContentLoaded", () => {
                    const continentButtons = document.querySelectorAll(".continents");
                    continentButtons.forEach((button) => {
                        button.addEventListener("click", (event) => {

                            // Check if event.target is an HTMLButtonElement
                            if (event.target instanceof HTMLButtonElement){

                            const selectedContinent = event.target.textContent;

                            if(selectedContinent) {
                                startContinentQuiz(selectedContinent);

                            } else {
                                console.error("Issue with continent button");
                            }
                        } else {

                            console.error("Event target is not a button element");
                            };
                        });
                    });
                });