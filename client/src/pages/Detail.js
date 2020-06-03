import React, { useEffect, useState } from 'react'
import { Grid, Button, Box, Divider } from '@material-ui/core';
import axios from 'axios'
import { CardIngredient } from '../components';
import { LocalDining, AccessTime, DoubleArrow } from '@material-ui/icons';
import { useStyles } from '../assets/css';
import { useParams, Link, useHistory } from 'react-router-dom'
import Ingredients from '../components/Ingredients'
import ExtendedFoodCard from '../components/ExtendedFoodCard'


const recipe = {
    "vegetarian": false,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": true,
    "sustainable": false,
    "weightWatcherSmartPoints": 16,
    "gaps": "no",
    "lowFodmap": false,
    "aggregateLikes": 89258,
    "spoonacularScore": 71.0,
    "healthScore": 9.0,
    "creditsText": "Kevin & Amanda",
    "sourceName": "Kevin & Amanda",
    "pricePerServing": 244.28,
    "extendedIngredients": [
        {
            "id": 6008,
            "aisle": "Canned and Jarred",
            "image": "beef-broth.png",
            "consistency": "liquid",
            "name": "beef broth",
            "original": "1 cup beef broth (or water)",
            "originalString": "1 cup beef broth (or water)",
            "originalName": "beef broth (or water)",
            "amount": 1.0,
            "unit": "cup",
            "meta": [
                "(or water)"
            ],
            "metaInformation": [
                "(or water)"
            ],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "cup",
                    "unitLong": "cup"
                },
                "metric": {
                    "amount": 236.588,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 1001,
            "aisle": "Milk, Eggs, Other Dairy",
            "image": "butter-sliced.jpg",
            "consistency": "solid",
            "name": "butter",
            "original": "1 tablespoon butter",
            "originalString": "1 tablespoon butter",
            "originalName": "butter",
            "amount": 1.0,
            "unit": "tablespoon",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                }
            }
        },
        {
            "id": 1002014,
            "aisle": "Spices and Seasonings",
            "image": "ground-cumin.jpg",
            "consistency": "solid",
            "name": "cumin",
            "original": "1 teaspoon cumin",
            "originalString": "1 teaspoon cumin",
            "originalName": "cumin",
            "amount": 1.0,
            "unit": "teaspoon",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                }
            }
        },
        {
            "id": 10011885,
            "aisle": "Canned and Jarred",
            "image": "tomatoes-canned.png",
            "consistency": "solid",
            "name": "diced tomatoes with green chiles",
            "original": "1 (10-oz) can Ro-Tel Diced Tomatoes and Green Chiles",
            "originalString": "1 (10-oz) can Ro-Tel Diced Tomatoes and Green Chiles",
            "originalName": "Ro-Tel Diced Tomatoes and Green Chiles",
            "amount": 10.0,
            "unit": "oz",
            "meta": [
                "diced",
                "green",
                "canned"
            ],
            "metaInformation": [
                "diced",
                "green",
                "canned"
            ],
            "measures": {
                "us": {
                    "amount": 10.0,
                    "unitShort": "oz",
                    "unitLong": "ounces"
                },
                "metric": {
                    "amount": 283.495,
                    "unitShort": "g",
                    "unitLong": "grams"
                }
            }
        },
        {
            "id": 11215,
            "aisle": "Produce",
            "image": "garlic.png",
            "consistency": "solid",
            "name": "garlic",
            "original": "3-4 cloves garlic, minced",
            "originalString": "3-4 cloves garlic, minced",
            "originalName": "garlic, minced",
            "amount": 3.0,
            "unit": "cloves",
            "meta": [
                "minced"
            ],
            "metaInformation": [
                "minced"
            ],
            "measures": {
                "us": {
                    "amount": 3.0,
                    "unitShort": "cloves",
                    "unitLong": "cloves"
                },
                "metric": {
                    "amount": 3.0,
                    "unitShort": "cloves",
                    "unitLong": "cloves"
                }
            }
        },
        {
            "id": 1053,
            "aisle": "Milk, Eggs, Other Dairy",
            "image": "fluid-cream.jpg",
            "consistency": "liquid",
            "name": "heavy cream",
            "original": "¼ cup heavy cream",
            "originalString": "¼ cup heavy cream",
            "originalName": "heavy cream",
            "amount": 0.25,
            "unit": "cup",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 0.25,
                    "unitShort": "cups",
                    "unitLong": "cups"
                },
                "metric": {
                    "amount": 59.147,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 23557,
            "aisle": "Meat",
            "image": "fresh-ground-beef.jpg",
            "consistency": "solid",
            "name": "lean ground beef",
            "original": "½ lb lean ground beef",
            "originalString": "½ lb lean ground beef",
            "originalName": "lean ground beef",
            "amount": 0.5,
            "unit": "lb",
            "meta": [
                "lean"
            ],
            "metaInformation": [
                "lean"
            ],
            "measures": {
                "us": {
                    "amount": 0.5,
                    "unitShort": "lb",
                    "unitLong": "pounds"
                },
                "metric": {
                    "amount": 226.796,
                    "unitShort": "g",
                    "unitLong": "grams"
                }
            }
        },
        {
            "id": 1002024,
            "aisle": "Spices and Seasonings",
            "image": "dry-mustard.jpg",
            "consistency": "solid",
            "name": "mustard powder",
            "original": "1 teaspoon mustard powder (optional)",
            "originalString": "1 teaspoon mustard powder (optional)",
            "originalName": "mustard powder (optional)",
            "amount": 1.0,
            "unit": "teaspoon",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                }
            }
        },
        {
            "id": 11282,
            "aisle": "Produce",
            "image": "brown-onion.png",
            "consistency": "solid",
            "name": "onion",
            "original": "2 cups diced onion (about 1 whole onion)",
            "originalString": "2 cups diced onion (about 1 whole onion)",
            "originalName": "diced onion (about 1 whole onion)",
            "amount": 2.0,
            "unit": "cups",
            "meta": [
                "diced",
                "whole",
                "( 1 onion)"
            ],
            "metaInformation": [
                "diced",
                "whole",
                "( 1 onion)"
            ],
            "measures": {
                "us": {
                    "amount": 2.0,
                    "unitShort": "cups",
                    "unitLong": "cups"
                },
                "metric": {
                    "amount": 473.176,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 1002030,
            "aisle": "Spices and Seasonings",
            "image": "pepper.jpg",
            "consistency": "solid",
            "name": "pepper",
            "original": "1 teaspoon pepper",
            "originalString": "1 teaspoon pepper",
            "originalName": "pepper",
            "amount": 1.0,
            "unit": "teaspoon",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                }
            }
        },
        {
            "id": 98853,
            "aisle": "Pasta and Rice;Refrigerated;Frozen",
            "image": "gnocchi-isolated.jpg",
            "consistency": "solid",
            "name": "potato gnocchi",
            "original": "1 (16 oz) package potato gnocchi",
            "originalString": "1 (16 oz) package potato gnocchi",
            "originalName": "package potato gnocchi",
            "amount": 16.0,
            "unit": "oz",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 16.0,
                    "unitShort": "oz",
                    "unitLong": "ounces"
                },
                "metric": {
                    "amount": 453.592,
                    "unitShort": "g",
                    "unitLong": "grams"
                }
            }
        },
        {
            "id": 2047,
            "aisle": "Spices and Seasonings",
            "image": "salt.jpg",
            "consistency": "solid",
            "name": "salt",
            "original": "1 teaspoon salt",
            "originalString": "1 teaspoon salt",
            "originalName": "salt",
            "amount": 1.0,
            "unit": "teaspoon",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "tsp",
                    "unitLong": "teaspoon"
                }
            }
        },
        {
            "id": 11291,
            "aisle": "Produce",
            "image": "spring-onions.jpg",
            "consistency": "solid",
            "name": "scallions",
            "original": "1/3 cup thinly sliced scallions",
            "originalString": "1/3 cup thinly sliced scallions",
            "originalName": "thinly sliced scallions",
            "amount": 0.3333333333333333,
            "unit": "cup",
            "meta": [
                "thinly sliced"
            ],
            "metaInformation": [
                "thinly sliced"
            ],
            "measures": {
                "us": {
                    "amount": 0.333,
                    "unitShort": "cups",
                    "unitLong": "cups"
                },
                "metric": {
                    "amount": 78.863,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 1031009,
            "aisle": "Cheese",
            "image": "cheddar-cheese.png",
            "consistency": "solid",
            "name": "sharp cheddar cheese",
            "original": "1 cup shredded sharp cheddar cheese",
            "originalString": "1 cup shredded sharp cheddar cheese",
            "originalName": "shredded sharp cheddar cheese",
            "amount": 1.0,
            "unit": "cup",
            "meta": [
                "shredded"
            ],
            "metaInformation": [
                "shredded"
            ],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "cup",
                    "unitLong": "cup"
                },
                "metric": {
                    "amount": 236.588,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 1012028,
            "aisle": "Spices and Seasonings",
            "image": "paprika.jpg",
            "consistency": "solid",
            "name": "smoked paprika",
            "original": "½ teaspoon smoked paprika",
            "originalString": "½ teaspoon smoked paprika",
            "originalName": "smoked paprika",
            "amount": 0.5,
            "unit": "teaspoon",
            "meta": [
                "smoked"
            ],
            "metaInformation": [
                "smoked"
            ],
            "measures": {
                "us": {
                    "amount": 0.5,
                    "unitShort": "tsps",
                    "unitLong": "teaspoons"
                },
                "metric": {
                    "amount": 0.5,
                    "unitShort": "tsps",
                    "unitLong": "teaspoons"
                }
            }
        }
    ],
    "id": 718981,
    "title": "Cheeseburger Gnocchi",
    "readyInMinutes": 45,
    "servings": 4,
    "sourceUrl": "http://www.kevinandamanda.com/recipes/dinner/cheeseburger-gnocchi.html",
    "image": "https://spoonacular.com/recipeImages/718981-556x370.jpg",
    "imageType": "jpg",
    "summary": "Cheeseburger Gnocchi might be just the <b>Mediterranean</b> recipe you are searching for. For <b>$2.44 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. One serving contains <b>510 calories</b>, <b>27g of protein</b>, and <b>22g of fat</b>. 89259 people have tried and liked this recipe. A mixture of paprika, ground beef, cumin, and a handful of other ingredients are all it takes to make this recipe so scrumptious. To use up the salt you could follow this main course with the <a href=\"https://spoonacular.com/recipes/apple-turnovers-recipe-48175\">Apple Turnovers Recipe</a> as a dessert. It works best as a main course, and is done in around <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 73%</b>. This score is pretty good. Try <a href=\"https://spoonacular.com/recipes/cheeseburger-gnocchi-605536\">Cheeseburger gnocchi</a>, <a href=\"https://spoonacular.com/recipes/thirty-minute-philly-cheeseburger-gnocchi-bake-542541\">Thirty Minute Philly Cheeseburger Gnocchi Bake</a>, and <a href=\"https://spoonacular.com/recipes/lamb-ragu-with-potato-gnocchi-pasticcio-di-agnello-con-gnocchi-di-patate-763026\">Lamb Ragu with Potato Gnocchi: Pasticcio di Agnello con Gnocchi di Patate</a> for similar recipes.",
    "cuisines": [
        "American"
    ],
    "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
    ],
    "diets": [],
    "occasions": [],
    "winePairing": {
        "pairedWines": [],
        "pairingText": "",
        "productMatches": []
    },
    "instructions": "Melt butter in a 12-inch skillet over medium-high heat. Add gnocchi in a single layer and cook on one side for 2-3 minutes until browned and toasted. Shake the pan to toss the gnocchi and continue cooking for another 2-3 minutes, tossing occasionally, until both sides are toasted. Remove gnocchi to a plate and set aside.Turn the heat to high and return skillet to stove. When the pan is very hot and smoking, add the beef and season with salt, pepper, cumin, paprika, and mustard powder if desired. Add the onion and garlic, and cook, stirring occasionally, until beef is browned and onions are golden. Drain if necessary.Add the tomatoes, broth, and gnocchi back into the skillet. Stir to combine. Bring to a boil, then cover, reduce heat to medium-low, and simmer for 5 minutes until the gnocchi is tender and liquid is mostly absorbed.Off heat, then add the cream and  cup cheese and stir to combine. Top with remaining cheese and scallions. Place the skillet under the broiler in the oven until cheese is browned and bubbly, about 3 minutes. Serve and enjoy!! :)",
    "analyzedInstructions": [
        {
            "name": "",
            "steps": [
                {
                    "number": 1,
                    "step": "Melt butter in a 12-inch skillet over medium-high heat.",
                    "ingredients": [
                        {
                            "id": 1001,
                            "name": "butter",
                            "image": "butter-sliced.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404645,
                            "name": "frying pan",
                            "image": "pan.png"
                        }
                    ]
                },
                {
                    "number": 2,
                    "step": "Add gnocchi in a single layer and cook on one side for 2-3 minutes until browned and toasted. Shake the pan to toss the gnocchi and continue cooking for another 2-3 minutes, tossing occasionally, until both sides are toasted.",
                    "ingredients": [
                        {
                            "id": 98853,
                            "name": "gnocchi",
                            "image": "gnocchi-isolated.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404645,
                            "name": "frying pan",
                            "image": "pan.png"
                        }
                    ],
                    "length": {
                        "number": 6,
                        "unit": "minutes"
                    }
                },
                {
                    "number": 3,
                    "step": "Remove gnocchi to a plate and set aside.Turn the heat to high and return skillet to stove. When the pan is very hot and smoking, add the beef and season with salt, pepper, cumin, paprika, and mustard powder if desired.",
                    "ingredients": [
                        {
                            "id": 1002024,
                            "name": "mustard powder",
                            "image": "dry-mustard.jpg"
                        },
                        {
                            "id": 98853,
                            "name": "gnocchi",
                            "image": "gnocchi-isolated.jpg"
                        },
                        {
                            "id": 2028,
                            "name": "paprika",
                            "image": "paprika.jpg"
                        },
                        {
                            "id": 1002030,
                            "name": "pepper",
                            "image": "pepper.jpg"
                        },
                        {
                            "id": 1002014,
                            "name": "cumin",
                            "image": "ground-cumin.jpg"
                        },
                        {
                            "id": 2047,
                            "name": "salt",
                            "image": "salt.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404645,
                            "name": "frying pan",
                            "image": "pan.png"
                        },
                        {
                            "id": 404794,
                            "name": "stove",
                            "image": "oven.jpg"
                        }
                    ]
                },
                {
                    "number": 4,
                    "step": "Add the onion and garlic, and cook, stirring occasionally, until beef is browned and onions are golden.",
                    "ingredients": [
                        {
                            "id": 11215,
                            "name": "garlic",
                            "image": "garlic.png"
                        },
                        {
                            "id": 11282,
                            "name": "onion",
                            "image": "brown-onion.png"
                        }
                    ],
                    "equipment": []
                },
                {
                    "number": 5,
                    "step": "Drain if necessary.",
                    "ingredients": [],
                    "equipment": []
                },
                {
                    "number": 6,
                    "step": "Add the tomatoes, broth, and gnocchi back into the skillet. Stir to combine. Bring to a boil, then cover, reduce heat to medium-low, and simmer for 5 minutes until the gnocchi is tender and liquid is mostly absorbed.Off heat, then add the cream and  cup cheese and stir to combine. Top with remaining cheese and scallions.",
                    "ingredients": [
                        {
                            "id": 11291,
                            "name": "green onions",
                            "image": "spring-onions.jpg"
                        },
                        {
                            "id": 98853,
                            "name": "gnocchi",
                            "image": "gnocchi-isolated.jpg"
                        },
                        {
                            "id": 1041009,
                            "name": "cheese",
                            "image": "cheddar-cheese.png"
                        },
                        {
                            "id": 1053,
                            "name": "cream",
                            "image": "fluid-cream.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404645,
                            "name": "frying pan",
                            "image": "pan.png"
                        }
                    ],
                    "length": {
                        "number": 5,
                        "unit": "minutes"
                    }
                },
                {
                    "number": 7,
                    "step": "Place the skillet under the broiler in the oven until cheese is browned and bubbly, about 3 minutes.",
                    "ingredients": [
                        {
                            "id": 1041009,
                            "name": "cheese",
                            "image": "cheddar-cheese.png"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 405914,
                            "name": "broiler",
                            "image": "oven.jpg"
                        },
                        {
                            "id": 404645,
                            "name": "frying pan",
                            "image": "pan.png"
                        },
                        {
                            "id": 404784,
                            "name": "oven",
                            "image": "oven.jpg"
                        }
                    ],
                    "length": {
                        "number": 3,
                        "unit": "minutes"
                    }
                },
                {
                    "number": 8,
                    "step": "Serve and enjoy!! :)",
                    "ingredients": [],
                    "equipment": []
                }
            ]
        }
    ],
    "originalId": null
}
const loading = false;

export default function Detail() {
    const history = useHistory()
    const { id } = useParams()
    // const [recipe, setRecipe] = useState(null)
    // const [loading, setLoading] = useState(false)
    useEffect(() => {
        // setLoading(true)
        // axios({
        //     method: "get",
        //     url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=5cd43e21289d449988abacef7d29dd14`
        // })
        //     .then(response => {
        //         console.log(response)
        //         setRecipe(response.data)
        //         setLoading(false)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }, [])

    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const update = () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    };
    window.addEventListener("resize", update);

    
    function goToStep(){
        history.push(`/step/${id}`)
    }

    return (
        <div style={{ textAlign:'center', backgroundColor: 'white', minHeight: '90vh'}}>
            <>
            {   loading &&
                    <div style={{textAlign:"center"}}>
                        <img height="300" width="300" src="/loading.gif" alt="loading" />
                    </div>
            }
            
            {   (!loading && recipe !== null) &&
                <div>
                {   width > 1000 &&

                <div style={{
                backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // height: '100px',
                paddingTop: '8px',
                paddingLeft: '10vw',
                paddingRight: '10vw',
                textAlign: 'center'
                }}>
                        <h1 className='accountText'>
                            {recipe.title}
                        </h1>
                </div>
                }
                {   width <= 1000 &&

                    <div style={{
                        backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '60px',
                        paddingTop: '8px',
                        paddingLeft: '10vw',
                        paddingRight: '10vw',
                        textAlign: 'center'
                    }}>
                    <h5 className='accountTextMini'>
                        {recipe.title}
                    </h5>
                    </div>
        
                    
                }

                { width > 500 &&
                <div style={{paddingLeft: '5vw', paddingRight: '5vw'}}>
                    <br/>
                    <ExtendedFoodCard recipe={recipe} />
                    <br/>
                </div>
                }
                {
                    width < 500 &&
                    <div style={{padding: '0'}}>
                    <ExtendedFoodCard recipe={recipe} />
                    <br/>
                    </div>
                }
                </div>
            }
            </>
        </div>
    )
}