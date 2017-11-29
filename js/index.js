(function() {

//begin by hiding board, win screens and buttons
     $('#board').hide();
      $('#win').hide();
      $('#players').hide();
      $('#twoPlay').hide();
      $('#play').hide();

//declare variables
   var ai;
   var player;
   var nameHeaderOne;
   var nameHeaderTwo;

//set the win positions to check for a win or draw
   const winPositions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
   ];

//set the game board with box values for the ai to make a move
    let board = [3,2,3,2,4,2,3,2,3];

//one player button shows the form
      $('#onePlayerBtn').click(function() {
               $('#p1Label').show();
               $('#p1').hide();
              $('#players').show();
              $('#twoPlay').show();
              $('#play').show();
      });

//two player button shows the form
         $('#twoPlayerBtn').click(function() {
            $('#p1Label').hide();
            $('#p1').show();
            $('#players').show();
            $('#twoPlay').show();
            $('#play').show();
         });

//the play button gets player names, number of players and calls init
         $('#play').click(function(){
            
            var p1name = document.getElementById('p1').value;
            nameHeaderOne = document.getElementById('player-one-name');
            var p2name = document.getElementById('p2').value;
            nameHeaderTwo = document.getElementById('player-two-name');

                     if(!p1name){
                        nameHeaderOne.innerHTML= "Big AL";
                        nameHeaderTwo.innerHTML=p2name;
                         init(1);
                     }else{
                         nameHeaderOne.innerHTML=p1name;
                        nameHeaderTwo.innerHTML=p2name;
                         init(2);
                     }
               });
//set the hover function
const $box = $(".box");
      $box.hover(function(){
          setHover($(this), player);
       });

//init hides welcome screen and removes classes from previous game, resets board calls gameStart
               function init(numPlayers){

                    $('#start').hide();
                    $('#win').hide();
                    $('#players').hide();
                    $('#twoPlay').hide();
                    $('.box').removeClass("box-filled-1");
                    $('.box').removeClass("box-filled-2");
                    $('#win').removeClass('screen-win-one');
                    $('#win').removeClass('screen-win-two');
                    $('#win').removeClass('screen-win-tie');


                    player=1;
                    board = [3,2,3,2,4,2,3,2,3];

//if there is only one player, ai will be set to true and the computer will play as player 1

                  if(numPlayers ===2){
                        ai=false;
                     }else{
                        ai=true;
                     }
                     gameStart();
              }


//start the game by showing the board and setting the click function
      function gameStart() {

$('#board').show();

//if ai is true the computer will take over the moves for player 1
         if(ai){
             BigAlMove();
         }

//start by making player one active
         $("#player1").addClass("active");
         $("#player2").removeClass("active");

//click checks if boxes are occupied then fills the box with current player's mark
                   $box.click(function(){

                         let isFilled;
                         let boxClicked = $(this);

                         if (
                           boxClicked.hasClass("box-filled-1") == true ||
                           boxClicked.hasClass("box-filled-2") == true
                         ) {
                           isFilled = true;
                           return;
                         }
                         if(player ===1){
                               if (!isFilled) {

                                   $(this).removeClass('box-choose-1');
                                   $(this).addClass('box-filled-1');
                                      makeMove($(this).attr('id'),"O");
                                   }
//some timers were used to slow down the ui a little for better experience
                         }else if(player===2){
                           if (!isFilled) {
                               $(this).removeClass('box-choose-2');
                               $(this).addClass('box-filled-2');
                               makeMove($(this).attr('id'),"X");

//check if ai is true to allow computer to move
                               if(ai){
                                      setTimeout(function(){
                                       BigAlMove();
                                    }, 300);
                            }
                      }

                }

        });
}//gameStart

//hover function allows ghost images for moving player
function setHover(box,player) {
        let isFilled;
           if (
          box.hasClass("box-filled-1") == true ||
          box.hasClass("box-filled-2") == true
        ) {
             isFilled = true;
         }
           if (!isFilled) {
               box.toggleClass("box-choose-" + player);
          }
      }


//change the player will be called after each move

function changePlayer () {
        if (player == 1) {

          player = 2;
          $("#player2").addClass("active");
          $("#player1").removeClass("active");

        } else {

          player = 1;
          $("#player1").addClass("active");
          $("#player2").removeClass("active");

        }
      }

//makeMove fills the board array to be checked for win or ties
      function makeMove(box,player){


      board[box]=player;
//call the checkWin function to check win
      if(checkWin(board,player)){

      if(player==='O'){
//more time outs to enhance user experience
         setTimeout(function(){
         $('#board').hide();
        }, 300);

//display win board if "O"" is the winner

        $('#theWinner').text(nameHeaderOne.innerHTML + " Wins!");

        $('#win').addClass('screen-win-one');
         setTimeout(winShow, 400);


      }else if(player==='X'){
         setTimeout(function(){
         $('#board').hide();
      }, 400);

//display win board if "X"" is the winner
         $('#theWinner').text(nameHeaderTwo.innerHTML + " Wins!");

         $('#win').addClass('screen-win-two');
           setTimeout(winShow, 400);

      }

      }
      //check for tie and display tie board
      else if(checkTie(board)){

         setTimeout(function(){
         $('#board').hide();
      }, 400);

        $('#theWinner').text("Tie");

        $('#win').addClass('screen-win-tie');
        setTimeout(winShow, 400);


      }
changePlayer();
   }//end makeMove

//seperate function to show the win board to work with setTimeout
function winShow(){

   $('#win').show();
}

//check win helper function loops win arr and game board
      function checkWin (board, player){

//counts three in a row to find winner
         var count=0;

               for(let i=0;i<winPositions.length;i++){
               var wPos = winPositions[i];

                     for(let j=0; j<wPos.length;j++){
                     var jPos=wPos[j];

            if(board[wPos[j]]===player){
               count ++;
            }
               if(count===3){

                  return true;
               }
         }
               count=0;
      }
         return false;
      }

//check tie helper function
      function checkTie(board){
        var boxtot=0;
        for(let q=0;q<board.length;q++){
         if(board[q]==='X' || board[q]==='O'){
            boxtot++;
         }
        }
        if(boxtot===9){
         return true;
        }
        return false;
      }


//////BigAlMove (not so big after all) makes computer ai move
function BigAlMove(){

   var move = BigAlChoose();
   var moveBox = $("#" + move);

    moveBox.removeClass('box-choose-1');
    moveBox.addClass('box-filled-1');

  makeMove(move,"O");

}

//BigAlMove useses this function to make a decision
function BigAlChoose(){

   for(let i=0;i<winPositions.length;i++){
   	var oCount=0;
   	var xCount=0;
   	var winPos;

//counts Os and Xs to find 2 in a row
   	var wPos = winPositions[i];
   		for(let j=0; j<wPos.length;j++){
   			var jPos=wPos[j];

   				if(board[jPos]==="O"){
   					oCount++;

   				}else if(board[jPos]==="X"){
   				xCount++;
   				}

   				if(board[jPos]!=="O" && board[jPos]!=="X"){
   					winPos=jPos;

   				}

			}
//if it finds two in a row it will choose the stored unfilled box location
   						if(oCount===2 && winPos!== undefined){

                           return winPos;

   							}else if(xCount===2 && winPos !==undefined){

                           return winPos;

   							}

   		}
//if there are not 2 in a winning position it will make a random move
   	return makeRandomMove();
   }



//pick a random number from available boxes
   function makeRandomMove(){

   var threeArr=[];
   var twoArr=[];
   var fourArr=[];
   var randomMove;

   					for(box in board){
   							if(board[box] === 3){
   								threeArr.push(box);
   							}else if(board[box]===2){
   								twoArr.push(box);
   							}else if(board[box]===4){
   								fourArr.push(box);
   							}
   					}

   						if(fourArr.length===1){
   					        randomMove = 4;

                         return randomMove;

   						}else if(threeArr.length>0){
   							var num = getRandomNum(threeArr.length);
   							randomMove=threeArr[num];

                        return randomMove;

   							}else if(twoArr.length >0){
   								var num = getRandomNum(twoArr.length);
   						   	randomMove=twoArr[num];

                           return randomMove;
         				}
   			}

//random number generator
   function getRandomNum(max){
     min = Math.ceil(1);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - 1)) + 1;
  }


//replay function resets board without returning to home screen
      $('#replay').click(function(){
            ai ? init(1) : init(2);
      });

//restart button brings you back to home screen
$('#restart').click(function(){
location.reload();
});


})();///end
