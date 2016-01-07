var myApp = angular.module('doh2015.controllers.recipes',['ionic']);

myApp.controller('RecipeCtrl', ['$scope', '$location', '$rootScope','$http',
 function($scope, $location, $rootScope, $http) {

    $scope.diet = $rootScope.diet;

//?energy=20&carbs=20&proteins=20&fats=20&satfats=20&natrium=20&fibers=20
//?energy=20&carbs=20&proteins=20&fats=20&satfats=20&natrium=20&fibers=20
//?energy=200.0&carbs=2&proteins=20&fats=20&satfats=20&natrium=20&fibers=20.0&page=0&limit=100
//?carbs=20&energy=20&fibers=20&natrium=20&proteins=20&satfats=20

    var params = {
      energy: $scope.diet.energie,
      carbs: $scope.diet.koolhydraten,
      proteins: $scope.diet.eiwitten,
      fats: $scope.diet.vet,
      satfats: $scope.diet.vetverzadigd,
      natrium: $scope.diet.natrium,
      fibers: $scope.diet.vezels
    };

    var cards = [];

    $http.get("http://146.185.153.92:5000/recipes", {params:params}).then(function(response){
      if(!response || response.success == false)
      {
        console.log("Error!");

      }else{
        cards = response.data;
        for(var i = 0; i < 3; i++) $scope.addCard();
      }
      console.log(response);
    });


/*
  var cards = [
  { id:1, receptbereiding: "Kook de pasta volgens de aanwijzingen op de verpakking beetgaar. Giet af en spoel koud onder stromend water. Rasp ondertussen de gele schil van de citroen en pers 1 helft uit. Snijd de selderij fijn. Snijd het steeltje van de rode peper. Halveer de peper in de lengte en verwijder met een scherp mesje de zaadlijsten. Snijd het vruchtvlees fijn. Snijd de courgettes in de lengte in dunne plakken. Bestrijk met 2 el olie. Snijd de perziken langs de pit doormidden. Draai de helften in tegengestelde richting los en verwijder de pit. Bestrijk de snijkanten met 1 el olie. Verhit de grillpan zonder olie of boter en gril de courgette 4 min. Keer halverwege. Gril de perziken 2 min. op de snijkant. Meng het citroenrasp, 2 el citroensap, de rode peper, selderij en de rest van de olie tot een dressing. Breng op smaak met peper en eventueel zout. Schep om met de pasta en verdeel over een grote platte schaal. Schep de bladsla erdoor. Scheur de mozzarella en parmaham in stukken en verdeel samen met de courgette en perzik over de salade. Bestrooi met peper.", receptpersonen: 6, rating: 5, receptbereidingstijd: "30 min", recepttitel: "Couscous met couscous", receptafbeelding: 'http://www.contourcontrol.nl/wp-content/uploads/2015/05/champrisotto.jpg', "recept_energie":"390","recept_eiwitten":"14","recept_koolhydraten":"12","recept_vetten":"1","recept_verzadigd":"7","recept_natrium":"1","recept_vezels":"5"},
  { id:2, receptbereiding: "Meng de eikenbladslamelange samen met de sojabonen en maïskorrels in een kom. Snijd vervolgens de mango in blokjes en voeg deze samen met de plakjes gerookte kip toe aan het geheel. Verdeel de yoghurtdressing met kruiden erover en voeg naar smaak de brocco-cress en pittige kiemgroente over je salade.", receptpersonen: 3, rating: 2, receptbereidingstijd: "15 min", recepttitel: "Patat met mayo", receptafbeelding: 'http://www.bbcgoodfood.com/sites/default/files/recipe_images/recipe-image-legacy-id--1201764_10.jpg',"recept_energie":"390","recept_eiwitten":"14","recept_koolhydraten":"40","recept_vetten":"19","recept_verzadigd":"7","recept_natrium":"1.275","recept_vezels":"5"},
  { id:3, receptbereiding: "Verwijder de steelaanzet van de bospeen en snijd in schuine stukken van 1 cm. Verhit de arachideolie in een koekenpan en bak de peen, het selderijzout en peper 8 min. op middelhoog vuur. Schep regelmatig om. Snijd ondertussen de bosui in dunne ringen en de sla fijn. Laat de kip uitlekken. Doe de linzen in een vergiet, spoel af en laat uitlekken. Meng de linzen, bosui, peen en sla op een schaal. Verdeel de kip erover. Besprenkel met de hazelnootolie en bestrooi met peper. Combinatietip: Lekker met geroosterde hazelnoten en citroenparten.", receptpersonen: 2, rating: 5, receptbereidingstijd: "40 min", recepttitel: "Pizza op een bedje van pizza", receptafbeelding: 'http://static01.nyt.com/images/2010/03/31/dining/31minispan-1/31minispan-1-articleLarge.jpg', "recept_energie":"390","recept_eiwitten":"14","recept_koolhydraten":"40","recept_vetten":"19","recept_verzadigd":"7","recept_natrium":"1.275","recept_vezels":"5"},
  { id:4, receptbereiding: "bla", receptpersonen: 6, rating: 5, receptbereidingstijd: "30 min", recepttitel: "Couscous met couscous", receptafbeelding: 'http://www.contourcontrol.nl/wp-content/uploads/2015/05/champrisotto.jpg', "recept_energie":"390","recept_eiwitten":"14","recept_koolhydraten":"12","recept_vetten":"1","recept_verzadigd":"7","recept_natrium":"1","recept_vezels":"5"},
  { id:5, receptbereiding: "bla", receptpersonen: 3, rating: 2, receptbereidingstijd: "35 min", recepttitel: "Vis met vlees", receptafbeelding: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Wikibooks_hamburger_recipe.png', "recept_energie":"390","recept_eiwitten":"14","recept_koolhydraten":"12","recept_vetten":"1","recept_verzadigd":"7","recept_natrium":"1.275","recept_vezels":"5"},
  { id:6, receptbereiding: "bla", receptpersonen: 4, rating: 4, receptbereidingstijd: "20 min", recepttitel: "Couscous met mosselen en kabeljauw", receptafbeelding: 'http://downloads.bbc.co.uk/skillswise/entry12/english/en05skim/images/en05skim-e2-w-scanning-a-recipe-tikka-masala-752x1065.jpg',"recept_energie":"390","recept_eiwitten":"14","recept_koolhydraten":"12","recept_vetten":"19","recept_verzadigd":"7","recept_natrium":"1.275","recept_vezels":"5"}
  ];
*/



$scope.cards = [];
 
$scope.addCard = function() {
    if(cards.length > 0)
    {
//      var newCard = cards[Math.floor(Math.random() * cards.length)];
      var newCard = cards[0];
      cards.splice(0,1);
      newCard.id = Math.random();
      $scope.cards.splice(0,0, angular.extend({}, newCard));
    }
}

//$scope.toStars = function(rating) {
 //   var starIcons = 
//}
$scope.selected = [];

$scope.cardDestroyed = function(index) {
  $scope.cards.splice(index, 1);
  $scope.addCard();
  console.log('destroyed');
};

$scope.cardSwipedLeft = function(index) {
  console.log('Left swipe');
};

$scope.cardSwipedRight = function(index) {
  console.log('Right swipe');

  var newCard =  $scope.cards[index];
  $scope.selected.push(newCard);
}

$scope.cardSwiped = function(index) {
  var newCard =  $scope.cards[index];

//  console.log(newCard);
//  $scope.selected.push( newCard );
};


$scope.submit = function(){
  $rootScope.selected = $scope.selected;
  $location.path("/app/overview");  
};

}])
.controller('RecipeOverviewCtrl', ['$scope', '$location', '$rootScope',
 function($scope, $location, $rootScope) {

  $scope.recipes = $rootScope.selected;

}])
.directive('dohComparator', function() {
  return {
    restrict: 'E',
    scope: {
      cards: '=',
      diet: '='
    },
    templateUrl: 'templates/comparator.html',
    controller:
      ['$scope', function ($scope) {
        $scope.meta = {
          energie:{name:"Energy", unit: "kCal", adh:250,precision:0},
          koolhydraten:{name:"Carbs", unit: "g", adh:25,precision:1},
          eiwitten:{name:"Protein", unit: "g", adh:15,precision:1},
          vet:{name:"Fat", unit: "g", adh:10,precision:1},
          vetverzadigd:{name:"Sat.Fat", unit: "g", adh:2,precision:1},
          natrium:{name:"Sodium", unit: "mg", adh:0.5,precision:2},
          vezels:{name:"Fiber", unit: "g", adh:3,precision:1},
        };

        var diet = $scope.diet;

        $scope.transform = {};

        var factor =
          {
            energie: 0.5,
            koolhydraten: 0.5,
            eiwitten: 0.7,
            vet: 0.1,
            vetverzadigd: 0.1,
            natrium: 0.05,
            vezels: 0.1
          };


        var calcDiff = function(){
          var recept = $scope.cards[$scope.cards.length-1];
          if(recept != undefined)
          {
            $scope.recipe = 
            {
              energie: recept.recept_energie ,
              koolhydraten: recept.recept_koolhydraten ,
              eiwitten: recept.recept_eiwitten ,
              vet: recept.recept_vetten ,
              vetverzadigd: recept.recept_verzadigd ,
              natrium: recept.recept_natrium ,
              vezels: recept.recept_vezels 
            };

            $scope.diff = 
            {
              energie: recept.recept_energie  - diet.energie,
              koolhydraten: recept.recept_koolhydraten - diet.koolhydraten,
              eiwitten: recept.recept_eiwitten - diet.eiwitten,
              vet: recept.recept_vetten - diet.vet,
              vetverzadigd: recept.recept_verzadigd - diet.vetverzadigd,
              natrium: recept.recept_natrium - diet.natrium,
              vezels: recept.recept_vezels - diet.vezels
            };


          
            for(key in $scope.diff)
            {
              //positive = rood, #e53d1b
              //button-assertive = green, #5e6a42
              console.log($scope.diff);
              var p = factor[key] * $scope.diff[key] / $scope.diet[key];
//              var red = Math.round(Math.min(Math.abs(p) * 190 ,255));
//              var green = 255 - red;

              var color = Math.abs(p)>0.5? "#e53d1b":"#5e6a42";
              $scope.transform[key] = {background:color, transform: "scaleX( " + p + ")" }; 

//              $scope.transform[key] = {background:"rgb("+red+","+green+",0)", transform: "scaleX( " + p + ")" }; 
            }
          }

        }
        calcDiff();

        $scope.$watchCollection("cards", function(newval, oldval){
          calcDiff();
          console.log($scope.cards)
          console.log("log")
        });
      }],

  };
});





