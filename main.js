var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
   this.name = name;
   this.calories = calories;
   this.vegan = vegan || false;
   this.glutenFree = glutenFree || false;
   this.citrusFree = citrusFree || false;
};

FoodItem.prototype.toString = function() {
   var nutritionString = "The menu item, " + this.name + ", has " + this.calories + " calories. \n Vegan: " +this.vegan + ". \n Gluten Free: " +this.glutenFree+ ". \n Citrus Free: " + this.citrusFree+".";
   return this.name;
};

// console.log(burger.toString(), frites.toString(), shake.toString());

var Drink = function(name, description, price, ingredients){
  this.name = name;
  this.description = description;
  this.price = price;
  this.ingredients = ingredients;

};

var jackNcoke = new Drink('Jack and Coke', 'kind of an okay drink if you\'re boring', 9.00, [coke, jack]);
console.log(jackNcoke);

var Plate = function(name, description, price, ingredients){
   this.name = name;
   this.description = description;
   this.price = price;
   this.ingredients = ingredients;
};

Plate.prototype.isVegan = function() {
   
   for (var i = 0; i < this.ingredients.length; i++) {
      if(this.ingredients[i].vegan === false){
         return false;
      }
      
   }
   return true;
};


Plate.prototype.isGlutenFree = function(){
   for (var i = 0; i < this.ingredients.length; i++) {
      if(this.ingredients[i].glutenFree === false){
         return false;
      }
      
   }  
   return true;    
};

Plate.prototype.isCitrusFree = function(){
   for (var i = 0; i < this.ingredients.length; i++) {
      if(this.ingredients[i].citrusFree === false){
         return false;
      }
      
   }
   return true;
};

var burgerNfrites = new Plate('Crabby & Frying', 'The best meal we serve', 20, [burger, frites]);

var Order = function(orderItems){
   this.orderItems = orderItems;
};


var Menu = function(menuItems){
   this.menuItems = menuItems;   
};

Menu.prototype.toString = function() {
   console.log(this.menuItems);
   var ingredArr = this.menuItems.map(function(item){
      console.log(item.ingredients.slice());
      return item.name + " costs $" + item.price + ". " +item.name+" is " +item.description+" and is made from "+item.ingredients+".";
      
   });

   return ingredArr.join(' ');  
};


var Restaurant = function(name, description, menu){
   this.name = name;
   this.description = description;
   this.menu = menu;
};

Restaurant.prototype.toString = function() {
   return this.name + ' is ' + this.description + ', and ' + this.name + ' serves: ' + this.menu.toString();
};

var Customer = function(dietaryPref){
   this.dietaryPref = dietaryPref;
};

console.log('tea: ', tea, "waffle: ", chickenWaffles);

var tomsOrder = new Order([chickenWaffles, tea]);

Order.prototype.toString = function() {
  var orderString = this.orderItems.join('\n\n\t');
  // var orderTotal: 
  return  "Your order consists of: \n\n\t"+orderString;

};

Customer.prototype.toString = function() {
   return "Customer has the following deficiencies: " + this.dietaryPref;
};

console.log(tomsOrder.toString());


// FOOD ITEMS:

var burger = new FoodItem('Crabby Patty', 400, null, null, true);

var shake = new FoodItem("Bake'n'Shake", 1000, true, true, true);

var frites = new FoodItem('Belgian Fires', 500, true, true);

var coke = new FoodItem("Coca-cola", 200, true, true);

var jack = new FoodItem('Jack Daniels Whiskey', 100, true, true, true);

var groundBeef = new FoodItem('Ground Beef', 300, null, true, true);

var cheese = new FoodItem('Chedder Blend', 300, null, true, true);

var chips = new FoodItem('Tortilla Chips', 50, true, true, true);

var guac = new FoodItem('Guacamole', 400, true, true);





// menu items

var tea = new Drink('Ice-T', 'a smooth, but in-yo-face straight-up Compton Blend', 3.14, ['sizzurp', 'Compton tap water', 'gin']);
var chickenWaffles = new Plate('Chicken & Waffles', 'Feels like mamma\'s house!', 15, ['sizzurp', 'chicken derivative', 'recycled dairy queen waffle cone blend']);

var burritoPlate = new Plate('The Burrito Plate', 'the most burrito burrito outside of chipotle', 25, [groundBeef, cheese]);

var guacamolePlate = new Plate('Chips & Guac', 'dive in', 8, [guac, chips]);

var margarita = new Drink('House Marg', 'A marg made by a blind man', 10, [coke, jack]);

var fullMenu = new Menu([burritoPlate, guacamolePlate, margarita, chickenWaffles, jackNcoke, burgerNfrites, tea]);

var refactoruDiner = new Restaurant('The RefactorU Diner', 'Once you dine here, you\'ll never leave... ever', fullMenu);


console.log(guacamolePlate);
console.log(fullMenu.toString());