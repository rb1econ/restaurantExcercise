$(document).on('ready', function(){

  ///////////////////////////////////
  // FOOD ITEM CLASS & CONSTRUCTOR //
  ///////////////////////////////////

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


  //////////////////////////////////////////////////
  // FUNCTIONS TO BE USED BY BOTH DRINKS & PLATES //
  //////////////////////////////////////////////////

  var itemPrinter = function() {
    this.$el = $('#item-template')
      .clone().attr('id', '')
      .removeClass('inactive')
      .data('item', this);
    this.$el.find('img').attr('src', this.imageUrl);
    this.$el.find('.item-name').text(this.name);
    this.$el.find('.item-description').text(this.description);
    this.$el.find('.item-price').text('$' + this.price);
    this.$el.find('.item-cals').text('Calories: ' + this.calCounter());
    return this.$el;
  };

  var itemCalCounter = function() {
    var total = 0;
    for(var i = 0; i < this.ingredients.length; i++) {
      total += this.ingredients[i].calories;
    }
    return total;
  };


  ///////////////////////////////
  // DRINK CLASS & CONSTRUCTOR //
  ///////////////////////////////

  var Drink = function(name, description, price, ingredients, imageUrl){
    this.name = name;
    this.description = description;
    this.price = price;
    this.ingredients = ingredients;
    this.imageUrl = imageUrl;
  };

  Drink.prototype.printer = itemPrinter;

  Drink.prototype.calCounter = itemCalCounter;


  ///////////////////////////////
  // PLATE CLASS & CONSTRUCTOR //
  ///////////////////////////////

  var Plate = function(name, description, price, ingredients, imageUrl){
     this.name = name;
     this.description = description;
     this.price = price;
     this.ingredients = ingredients;
     this.imageUrl = imageUrl;
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

  Plate.prototype.printer = itemPrinter;

  Plate.prototype.calCounter = itemCalCounter;


  ///////////////////////////////
  // ORDER CLASS & CONSTRUCTOR //
  ///////////////////////////////

  var Order = function(orderItems){
     this.orderItems = orderItems;
  };

  Order.prototype.toString = function() {
    var orderString = this.orderItems.join('\n\n\t');
    // var orderTotal: 
    return  "Your order consists of: \n\n\t"+orderString;
  };


  //////////////////////////////
  // MENU CLASS & CONSTRUCTOR //
  //////////////////////////////

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

  Menu.prototype.render = function() {
    // _.groupBy only works in this case because we have just two items 
    var results = _.groupBy(this.menuItems, function(item) {
      return (item instanceof Plate) ? 'plate' : 'drink';
    });
    $('.plates .row').append(results.plate.map(function(item) {
      return item.printer();
    }));
    $('.drinks .row').append(results.drink.map(function(item) {
      return item.printer();
    }));
  };


  ////////////////////////////////////
  // RESTAURANT CLASS & CONSTRUCTOR //
  ////////////////////////////////////

  var Restaurant = function(name, description, menu){
     this.name = name;
     this.description = description;
     this.menu = menu;
  };

  Restaurant.prototype.toString = function() {
     return this.name + ' is ' + this.description + ', and ' + this.name + ' serves: ' + this.menu.toString();
  };


  //////////////////////////////////
  // CUSTOMER CLASS & CONSTRUCTOR //
  //////////////////////////////////

  var Customer = function(dietaryPref){
     this.dietaryPref = dietaryPref;
  };

  Customer.prototype.toString = function() {
     return "Customer has the following deficiencies: " + this.dietaryPref;
  };


  /////////////////
  // FOOD ITEMS  //
  /////////////////

  var burger = new FoodItem('Crabby Patty', 400, null, null, true);
  var shake = new FoodItem("Bake'n'Shake", 1000, true, true, true);
  var frites = new FoodItem('Belgian Fires', 500, true, true);
  var coke = new FoodItem("Coca-cola", 200, true, true);
  var jack = new FoodItem('Jack Daniels Whiskey', 100, true, true, true);
  var groundBeef = new FoodItem('Ground Beef', 300, null, true, true);
  var cheese = new FoodItem('Chedder Blend', 300, null, true, true);
  var chips = new FoodItem('Tortilla Chips', 50, true, true, true);
  var guac = new FoodItem('Guacamole', 400, true, true);


  ////////////////
  // MENU ITEMS //
  ////////////////

  var tea = new Drink('Ice-T', 'a smooth, but in-yo-face straight-up Compton Blend', 3.14, ['sizzurp', 'Compton tap water', 'gin'], 'http://s3.amazonaws.com/rapgenius/1364203873_Gin_and_Juice_by_Skulldaggery.jpg');
  var chickenWaffles = new Plate('Chicken & Waffles', 'Feels like mamma\'s house!', 15, ['sizzurp', 'chicken derivative', 'recycled dairy queen waffle cone blend'], 'http://www.dartreview.com/wp-content/uploads/2011/02/sq-hyped-rage-over-chicken-waffles-at-uc-irvine.jpg');
  var burritoPlate = new Plate('The Burrito Plate', 'the most burrito burrito outside of chipotle', 25, [groundBeef, cheese], 'http://s3-media1.fl.yelpcdn.com/bphoto/zGfaCTfUPb4hT3rFpwdBKA/l.jpg');
  var guacamolePlate = new Plate('Chips & Guac', 'dive in', 8, [guac, chips], 'http://previews.123rf.com/images/maninsuit/maninsuit1108/maninsuit110800005/10226533-guacamole-and-nachos-on-a-rectangular-plate-and-bowl-the-plate-is-placed-on-a-wooden-table-top.jpg');
  var burgerNfrites = new Plate('Crabby & Frying', 'The best meal we serve', 20, [burger, frites], 'http://www.craftster.org/pictures/data/500/medium/164265_04Feb10_Krabby_meal.JPG');
  var margarita = new Drink('House Marg', 'A marg made by a blind man', 10, [coke, jack], 'http://ediblesarasota.com/files/images/stories/articles/sum12/margarita.jpg');
  var jackNcoke = new Drink('Jack and Coke', 'kind of an okay drink if you\'re boring', 9.00, [coke, jack], 'http://www.earlytorise.com/wp-content/uploads/2009/04/jack_daniels_coke.jpg');
  

  //////////////
  // OUR MENU //
  //////////////
  
  var fullMenu = new Menu([burritoPlate, guacamolePlate, margarita, chickenWaffles, jackNcoke, burgerNfrites, tea]);


  ////////////////////
  // OUR RESTAURANT //
  ////////////////////
  
  var refactoruDiner = new Restaurant('The RefactorU Diner', 'Hard-coded deliciousness.', fullMenu);


  ///////////////////////////////
  // DOM ELEMENTS FOR THE SITE //
  ///////////////////////////////
  
  $('.main-heading h1').append('<h5>' + refactoruDiner.description + '</h5>');

  fullMenu.render();


  //////////////////////
  // ordering system: //
  //////////////////////
  var orderArrayPrice = [];
  var orderArrayPlateDrink = [];
  $('.col-sm-4').on('click', '.order-btn', function(){
    
    // console.log('this was clicked: ', $(this).parent()[0].textContent);
    orderArrayPrice.push($(this).closest('.item').data('item').price);
    orderArrayPlateDrink.push($(this).closest('.item').data('item').name);

    console.log('orderArrayPrice: ', orderArrayPrice);
    console.log('orderArrayPlateDrink: ', orderArrayPlateDrink);
  });

  //////////////////
  // SUBMIT ORDER //
  //////////////////
  $('.submitOrder').on('click', function(){
    var totalPrice = orderArrayPrice.reduce(function(a,b){
      return a+b;
    });
    var totalPlateDrink = orderArrayPlateDrink.reduce(function(a,b){
      return a + '<li>' + b + '</li>';
    });
    console.log('totalPrice: ', totalPrice);
    console.log('totalPlateDrink: ', totalPlateDrink);
  

    $('.modal-body').append('<p>Your total comes out to: $'+totalPrice+'</p><p>Order includes: <ul>'+totalPlateDrink+'</ul></p>');
  });


});