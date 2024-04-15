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
    let totalCountries: number = 0;
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

                        // set the total numbers of quiz rounds
                        totalCountries = countriesByContinent.length;
                        currentCountryIndex = 0;

                        // initialise the quiz with countries for the selected continent
                        initialiseQuizContinents(countriesByContinent);

                        console.log(`1. startContinentQuiz Troubleshooting - Countries in ${continent}:`, countriesByContinent);
                        
                    } catch (error) {
                        console.error("Error starting continent quiz:", error);
                    };
                };

                // link continent button to continent object ✅

                // function to initialise quiz with country data 
                const initialiseQuizContinents = (countries: string[]) => {
                    if (!countries || countries.length === 0) {
                        throw new Error("No countries available for the selected continent");
                    }
                
                    const randomCountry = getRandomCountry(countries);
                
                    // Hide continent buttons and show game container
                    const homeContainer = document.querySelector<HTMLDivElement>(".home-container");
                    const gameContainer = document.querySelector<HTMLDivElement>(".game-container");
                
                    if (homeContainer && gameContainer) {
                        homeContainer.style.display = "none";
                        gameContainer.style.display = "flex";
                        generateQuiz(randomCountry); // Generate the initial quiz round
                    } else {
                        throw new Error("Issue with selectors: home-container or game-container not found");
                    }
                };

                //    // hide continent buttons
                //    const homeContainer : any = document.querySelector<HTMLDivElement>(".home-container");

                //     // show game container
                //     const gameContainer : any = document.querySelector<HTMLDivElement>(".game-container");

                //     if (homeContainer && gameContainer) {
                //         homeContainer.style.display = "none";
                //         gameContainer.style.display = "flex";
                //         generateQuiz(randomCountry);
                //     } else {
                //         throw new Error("Issue with selectors: home-container or game-container not found");
                //     };
                // };

                  
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

                        // find the flag data for the current country 
                        const countryFlag = flagsData.find((country) => country.name.common === currentCountry);

                        // Ensure flagsData is an array
                        if (!countryFlag) {
                            throw new Error("Invalid flag data format");
                        }
                        // Get the flag image URL for the current country
                        const flagImageUrl = countryFlag.flags.png;

                        // Update the flag image in the HTML
                        const flagImageElement = document.querySelector<HTMLImageElement>("#flag");
                        if (flagImageElement) {
                            flagImageElement.src = flagImageUrl;
                            flagImageElement.alt = currentCountry;
                        } else {
                            throw new Error("Flag image element not found in the HTML");
                        }
                
                        // Generate options for the current country and display them
                        const options = generateOptions(currentCountry);
                        displayOptions(options);
                
                    } catch (error) {
                        console.error("Error displaying country quiz:", error);
                    }
                };
                // generate .option buttons with 3 random incorrect labels and 1 correct label matching the nominated country name from countriesByContinent object 
                const generateOptions = (currentCountry: string): string[] => {
                    
                    const options: string[] = [];
                    const allCountriesExceptCurrent = countriesByContinent.filter(country => country !== currentCountry);

                    while (options.length < 3) {
                        const randomIndex = Math.floor(Math.random() * allCountriesExceptCurrent.length);
                        const randomCountry = allCountriesExceptCurrent[randomIndex];

                        if (!options.includes(randomCountry)) {
                            options.push(randomCountry);
                        }
                    }
                    const correctAnswer = currentCountry;
                    const incorrectAnswers = options.filter(option => option !== correctAnswer);

                    console.log("2. generateOptions Troubleshooting - Nominated Country:", currentCountry);
                    console.log("3. generateOptions Troubleshooting - Options Generated:", options);
                    console.log("4. generateOptions Troubleshooting - Incorrect Answers:", incorrectAnswers);
                    console.log("5. generateOptions Troubleshooting - Correct Answer:", correctAnswer);
                   
                    // Add the correct country as an option
                    options.push(currentCountry);
                
                    // Shuffle the options array to randomize the order
                    return shuffleArray(options);
                };
                

                const getRandomCountry = (countries: string[]): string => {
                    const randomIndex = Math.floor(Math.random() * countries.length);
                    return countries[randomIndex];
                }

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
                    } catch (error) {
                        console.error("Error generating quiz", error);
                    }
                };
                    
                // Function to display options on the screen 
                const displayOptions = (options: string[]) => {
                    const optionsButtons = document.querySelectorAll<HTMLButtonElement>(".option");
                    optionsButtons.forEach((button, index) => {
                        button.textContent = options[index];
                        button.disabled = false; // Re-enable the button for the new quiz round
                        button.addEventListener("click", (event) => {
                            handleOptionClick(event, options[index]); // Pass the event and selected option
                        });
                    });
                    updateScoreDisplay();
                };

                // event listeners for continent buttons
                document.addEventListener("DOMContentLoaded", () => {
                    const continentButtons = document.querySelectorAll<HTMLButtonElement>(".continents");
                
                    continentButtons.forEach((button) => {
                        button.addEventListener("click", async (event) => {
                            // Check if event.target is an HTMLButtonElement
                            if (event.target instanceof HTMLButtonElement){
                                const selectedContinent = event.target.textContent;
                                if (selectedContinent) {
                                    await startContinentQuiz(selectedContinent);
                                } else {
                                    console.error("Issue with continent button");
                                }
                            } else {
                                console.error("Event target is not a button element");
                            }
                        });
                    });
                
                    // event listeners for option buttons
                    const optionsButtons = document.querySelectorAll<HTMLButtonElement>(".option");
                        optionsButtons.forEach((button) => {
                        button.addEventListener("click", (event) => {
                            const selectedOption = button.textContent;
                            if (selectedOption) {
                                handleOptionClick(event, selectedOption); // Pass event and selectedOption
                            } else {
                                console.error("Selected option is invalid");
                            }
                        });
                    });
                });

                 // function to update the score display on the page
                const updateScoreDisplay = () => {
                    const scoreElement = document.querySelector<HTMLDivElement>("#score");
                    if (scoreElement) {
                        scoreElement.textContent = `Score: ${score}/${totalCountries}`;
                    } else {
                        console.error("Score element not found");
                    };
                };

                const handleOptionClick = async (event: MouseEvent, selectedOption: string) => {
                    const targetElement = event.target as HTMLButtonElement;
                    
                    // Disable the button to prevent multiple clicks
                    targetElement.disabled = true;
                
                    // Get the current country for this quiz round
                    const currentCountry = countriesByContinent[currentCountryIndex];
                    
                    // Log the clicked option and current country for troubleshooting
                    console.log("6. handleOptionClick Troubleshooting - Clicked option:", selectedOption);
                    console.log("7. handleOptionClick Troubleshooting - Confirmation of Current Country:", currentCountry);
                    
                    // Normalize selected option and current country for comparison
                    const normalisedSelectedOption = selectedOption.trim().toLowerCase();
                    const normalisedCurrentCountry = currentCountry.trim().toLowerCase();
                    
                    // Log the normalized values for debugging
                    console.log("8a. handleOptionClick Troubleshooting Normalised Selected Option:", normalisedSelectedOption);
                    console.log("8b. handleOptionClick Troubleshooting Normalised Current Country:", normalisedCurrentCountry);
                    
                    // Check if the selected option matches the nominated current country
                    if (normalisedSelectedOption === normalisedCurrentCountry) {
                        score++; // Increment score for correct answer
                        console.log("9a. handleOptionClick Troubleshooting - CORRECT! Score added");
                    } else {
                        console.log("9b. handleOptionClick Troubleshooting - INCORRECT! Score stays the same");
                    }
                    
                    // Update the display of the score
                    updateScoreDisplay();
                    
                    // Move to the next quiz round if applicable
                    currentCountryIndex++;
                    if (currentCountryIndex < totalCountries) {
                        const nextCountry = countriesByContinent[currentCountryIndex];
                        await generateQuiz(nextCountry);
                    } else {
                        // End of quiz logic
                        const messageElement = document.querySelector<HTMLDivElement>(".message");
                        if (messageElement) {
                            const endMessage = `Quiz completed. Score: ${score}/${totalCountries}`;
                            messageElement.textContent = endMessage;
                        }
                    }
                };