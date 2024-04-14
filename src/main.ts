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

// VARIABLES 
    // tracking game progress 
    // let currentFlagIndex = 0;
    // let score = 0;
    // let shuffledFlags = [...flags];

// FUNCTIONS
    // functions - calling APIs
        
        // Continents 
            // link  continent button to continent object
            // countries must generate randomly
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

                // fetch continent data and process countries for a specific continent 
                fetchContinentsData().then((continentsData) => {
                    // specify continent to filter 
                    const africaContinentToFilter = "Africa";

                     const americaContinentToFilter = "Americas";
    
                     const asiaContinentToFilter = "Asia";
    
                     const europeContinentToFilter = "Europe";
    
                     const oceaniaContinentToFilter = "Oceania";
    
                    // Get country names for the specific continent 
                    const africaCountriesInContinent = getCountriesByContinent(continentsData, africaContinentToFilter);

                     const americaCountriesInContinent = getCountriesByContinent(continentsData, americaContinentToFilter)

                     const asiaCountriesInContinent = getCountriesByContinent(continentsData, asiaContinentToFilter)

                     const europeCountriesInContinent = getCountriesByContinent(continentsData, europeContinentToFilter)

                     const oceaniaCountriesInContinent = getCountriesByContinent(continentsData, oceaniaContinentToFilter)

                    //  log retrieved country names by continent
                    console.log(`Countries in ${africaContinentToFilter}: `, africaCountriesInContinent);

                    console.log(`Countries in ${americaContinentToFilter}: `, americaCountriesInContinent);

                    console.log(`Countries in ${asiaContinentToFilter}: `, asiaCountriesInContinent);


                    console.log(`Countries in ${europeContinentToFilter}: `, europeCountriesInContinent);

                    console.log(`Countries in ${oceaniaContinentToFilter}: `, oceaniaCountriesInContinent);

                    // log each country name individually 
                    // africaCountriesInContinent.forEach((country) => {
                    //     console.log(country);
                        
                    // });
                });

               


        // Flags
            // display flag for each country
                // get name
                // const getQuote = async () => {

                //     // make the response
                //     const response = await fetch("https://api.quotable.io/random");

                //     // access the name data 
                //     const data: QuoteResponse = await response.json();

                //     // add the quote to the html
                //     quoteContainer.innerHTML = data.content;
                // }

        // Score
            // if user clicks on button matching country name name, button goes green and user get a score.
            // if not, button goes red and score remains the same 
            //  1 score for correct answer
            //  score remains the same if incorrect answer 
                // get name
                // const getQuote = async () => {

                //     // make the response
                //     const response = await fetch("https://api.quotable.io/random");

                //     // access the name data 
                //     const data: QuoteResponse = await response.json();

                //     // add the quote to the html
                //     quoteContainer.innerHTML = data.content;
                // }

        // Hint 
            // on click, pop up message containing capital should display
                // get capital
                // const getQuote = async () => {

                //     // make the response
                //     const response = await fetch("https://api.quotable.io/random");

                //     // access the data 
                //     const data: QuoteResponse = await response.json();

                //     // add the quote to the html
                //     quoteContainer.innerHTML = data.content;
                // }

    // function - other functions:

        // next question:
            // take user to next quiz question

        // end of game.
            // end of flags in specific continent game. 
            // correct answers / countries in each continent should be present 

// EVENT LISTENERS 