import mpg_data from "./data/mpg_data.js";
import {getStatistics, getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {city: getStatistics(mpg_data.map(object => object.city_mpg)).mean, highway: getStatistics(mpg_data.map(object => object.highway_mpg)).mean},
    allYearStats: getStatistics(mpg_data.map(object => object.year)),
    ratioHybrids: (mpg_data.map(object => object.hybrid).filter(object => object == true).length/mpg_data.map(object => object.hybrid).length),
};
 
console.log(allCarStats);



/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mhybrids(),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybrid()
};

export function mhybrids () {
    let hy = mpg_data.filter(x => x.hybrid == true);
    let ids = hy.map(x => x.id);
    let makes = hy.map(x => x.make);
    let make = [];
    let result = [];
    for(let i = 0; i < makes.length; i++){
        if(!make.includes(makes[i])){
            make.push(makes[i]);
            result.push({make: makes[i], hybrids: []});
        }
    }

    for(let x = 0; x < result.length; x++){
        for(let i = 0; i< ids.length; i++) {
            if(hy[i].make == result[x].make) {
                result[x].hybrids.push(hy[i].id); 
            }
        }
    }

    return result;
}

console.log(moreStats);

export function avgMpgByYearAndHybrid () {
    let years = mpg_data.map(x => x.year);
    let result = [];
    for(let i = 0; i < years.length; i++){
        if(!result.includes(years[i])){
            result.push(years[i]);
        }
    }

    let final = {};

    for(let i = 0; i < result.length; i++) {
        final[result[i]] = { hybrid: {
            city:
            getStatistics(mpg_data
                .filter(x => x.year === result[i])
                .filter(x => x.hybrid == true)
                .map(x => x.city_mpg)).mean,
            highway: 
            getStatistics(mpg_data 
                .filter(x => x.year === result[i])
                .filter(x => x.hybrid == true)
                .map(x => x.highway_mpg)).mean
        },
        notHybrid: {
            city:
            getStatistics(mpg_data
                .filter(x => x.year === result[i])
                .filter(x => x.hybrid == false)
                .map(x => x.city_mpg)).mean,
            highway: 
            getStatistics(mpg_data 
                .filter(x => x.year === result[i])
                .filter(x => x.hybrid == false)
                .map(x => x.highway_mpg)).mean
        },
    }};
    console.log(final);
    return final;
}