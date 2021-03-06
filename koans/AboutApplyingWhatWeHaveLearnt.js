var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

    var productsICanEat = [];

	/* solve using filter() & all() / any() */
	productsICanEat = _(products).filter(function(item){return (item.containsNuts === false) && (!_(item.ingredients).any(function(elem){return elem === "mushrooms"}));});

	expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
	/* try chaining range() and reduce() */
    var sum = _(_.range(1000))
		.chain()
		.filter(function (item) {return (item % 3 === 0) || (item % 5 === 0) ;})
		.reduce(function (sum, x) { return sum + x })
		.value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
	ingredientCount['mushrooms'] = _(products).chain()
		.map(function(item) {return item.ingredients;})
		.flatten()
		.reduce(function(sum, elem){if(elem == "mushrooms") {return sum + 1;} else {return sum;}}, 0)
		.value();
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  it("should find the largest prime factor of a composite number", function () {
	var inputNr = 1035;
	var result = _(_.range(inputNr / 2 + 1)) // restrict range here
		.chain()
		.filter(function(item){
			var isPrime = true;
			var isFactor = false;
			if(inputNr % item == 0){
				isFactor = true;
			}
			if(isFactor === true){
				var limit = Math.sqrt(item);//optimization (see Wikipedia), very slow otherwise
				for(var i = 2; (i <= limit) && isPrime; i += 1 ){
					if(item % i === 0){
						isPrime = false;
					}
				}
			}
			return isPrime && isFactor;
		})
		.reduce(function(memo, elem){
			if(memo > elem){
				return memo;
			}
			else{
				return elem;
			}			
		}, 0)
		.value();
	if(result === 1){
		result = inputNr; // the input number is prime
	}
	expect(result).toBe(23);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
	var maxNr = 999;
	var minNr = 100;
	
	// get the reverse of a number as string
	function getReverse(x){
		var res = x.toString().split("").reverse().join("");	
		return res;
	}
	var result = 0;
	for(var i = maxNr; (i >= minNr); i-=1){
		for(var j = maxNr; j >= i; j-=1){
			var prod = i * j;
			if(prod.toString() === getReverse(prod)){
				if(prod > result){
					result = prod;
				}
				break;
			}
		}
	}
	expect(result).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
	// prime numbers smaller than 21, powered by the maximum number without passing over 20
	var primeNrFactors = [2*2*2*2, 3*3, 5, 7, 11, 13, 17, 19];
	var result = primeNrFactors.reduce(function(memo, x){return memo * x;}, 1);
	expect(result).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
	var result = 0;
	var input = [1, 2, 3, 4, 5];
	var sum = _(input).reduce(function(sum, x){return sum + x}, 0);
	var squares = _(input).map(function(x){return x*x});
	var sumOfSquares = _(squares).reduce(function(sum, x){return sum + x}, 0);
	result = sumOfSquares - sum * sum;
	expect(result).toBe(-170);
  });

  it("should find the 10001st prime", function () {  
	var result = 2; //prime num,bers list starts from 2
	
	function isPrime(item){
		var ret = true;
		var limit = Math.sqrt(item);//optimization (see Wikipedia), very slow otherwise
		for(var i = 2; (i <= limit) && ret; i += 1 ){
			if(item % i === 0){
				ret = false;
			}
		}
		return ret;
	}
	
	var maxIdx = 10001;
	var count = 0;
	while(true)
	{
		if(isPrime(result)){
			count+=1;
			if(count === maxIdx){
				break;
			}
		}
		result+=1;
	}
	
	expect(result).toBe(104743);
  });
});
