
var testArr = [1, 2, 8, 9, 5, 17]

function improvedSort(arr) {
    var sorted = arr.sort(function (a, b) {
        return a - b;
    });
    return sorted
}

function checkIfContinuous(nums) {
    //sort the arr to check step by step
    improvedSort(nums)
    //temporarily save first step minus one to start the check
    var tempValue = nums[0] - 1
    //initialise continuous as true, logic to prove it wrong
    continuous = true
    nums.forEach((value, index) => {
        // first should always succeed, rest is unknown
        if (value == (tempValue + 1)) {
            tempValue = value
        } else {
            continuous = false
            return
        }
    });
    //console.log(tempValue)
    return continuous
}


console.log('Origin: ', testArr)

var display = improvedSort(testArr)
console.log('Sorted: ', display)

var continuous = checkIfContinuous(testArr)
console.log('Is continuous: ', continuous)


function getMissing(nums) {
    var sorted = improvedSort(nums)
    var streak = []
    var failures = []
    var collection = []

    sorted.forEach((value, index) => {
        // make sure we not on the first
        // check failures exist
        // check it was not prev value
        if (index != 0 && failures.length && failures[failures.length - 1] != value - 1 && value - 1 != sorted[index - 1]) {
            //console.log('curvalue:', value)
            //console.log('wuh:', failures[failures.length - 1], ' - ', value - 1)

            // from the prev failure till current
            for (i = failures[failures.length - 1]; i < value - 1; i++) {
                //add prev value to failures 
                failures.push(i + 1)
            }
            //failures.push(value - 1)
            //console.log('wuh:', failures)
            collection.push(failures)
            failures = []

        }

        if (value + 1 == sorted[index + 1]) {
            //if next number is continuous, add to streak
            streak.push(value)

        } else {
            streak.push(value)
            collection.push(streak)

            // make sure we not on the final number
            if (index != nums.length - 1) {

                //console.log('last successful:', value)
                failures.push(value + 1)
                //console.log('failures:', failures)
            }
            streak = []
            //console.log('failures:', failures)
        }
    });
    //console.log('failures: ', failures)
    return collection
}

var collection = getMissing(testArr)
console.log('collection: ', collection)

function countEmUp(collection){
    var counts = []
    collection.forEach((value, index) => {
        index % 2 ? counts.push(value.length) : ''
    });
    return counts
}

var counts = countEmUp(collection)
console.log('counts: ', counts)

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}