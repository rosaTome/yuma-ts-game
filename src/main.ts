// IMPORTS
   // import styles
    import "./style.scss";

    // import the flags response type
    import { FlagsResponse } from "../types/flags";

    // import the continents response type 
    import { ContinentsResponse } from "../types/continents";

    // import the continents response objects 
    import { africaFlags, americaFlags, asiaFlags, europeFlags, oceaniaFlags } from "../objects/continents-objects";

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
                // const getQuote = async () => {

                //     // make the response
                //     const response = await fetch("");

                //     // access the data 
                //     const data: QuoteResponse = await response.json();

                //     // add the continents to the html
                //     quoteContainer.innerHTML = data.content;
                // }

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