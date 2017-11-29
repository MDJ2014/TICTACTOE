(function() {

  $('#board').hide();
   $('#win').hide();
   $('#players').hide();
   $('#twoPlay').hide();


var ai;
var player;
var nameHeaderOne;
var nameHeaderTwo;



   $('#start-btn').click(function() {
//init(1);

$('#p1Label').show();

$('#p1').hide();
$('#players').toggle();
$('#twoPlay').toggle();
   });


   $('#start2-btn').click(function() {
   $('#p1Label').hide();
   $('#p1').show();
   $('#players').toggle();
   $('#twoPlay').toggle();
   });

$('#play').click(function(){
   var p1name = document.getElementById('p1').value;
   nameHeaderOne = document.getElementById('player-one-name');

   if(!p1name){
       nameHeaderOne.innerHTML= "Big AL";
       init(1);
   }else{
    nameHeaderOne.innerHTML=p1name;
    var p2name = document.getElementById('p2').value;
   nameHeaderTwo = document.getElementById('player-two-name');
   nameHeaderTwo.innerHTML=p2name;

   init(2);

   }



});

function init(numPlayers){

   // var ai;
   // var player;
   //
     $('#start').hide();
     $('#win').hide();
    $('#players').hide();
     $('#twoPlay').hide();
     $('#board').show();
   // //


   if(numPlayers ===2){
      ai=false;

   }else{

      ai=true;

   }

gameStart();

}

///////////////////////////
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
 let board = [3,2,3,2,4,2,3,2,3];



 function gameStart() {
player = 1;
const $box = $(".box");

$box.hover(function(){
 setHover($(this), player);
          });

console.log("AI IS SET TO: " + ai);
////setClick

   $box.click(function(){

         let isFilled;
         let boxClicked = $(this);

         // check to see if box is occupied
         if (
           boxClicked.hasClass("box-filled-1") == true ||
           boxClicked.hasClass("box-filled-2") == true
         ) {
           isFilled = true;
           return;
         }
/////////////////////************************/////////////TODO if ai===true
if(!ai){
   if(player ===1){
         if (!isFilled) {

             $(this).removeClass('box-choose-1');
             $(this).addClass('box-filled-1');
            makePlay($(this).attr('id'),"O");///changeing 1 to O
               }
   }else if(player===2){
     if (!isFilled) {
         $(this).removeClass('box-choose-2');
         $(this).addClass('box-filled-2');
         makePlay($(this).attr('id'),"X");//change 2 to X
   }

}


}//if not ai
if(ai){
   if(player ===1){
      if(!isFilled){
         BigAlPick(board);
      }
   }else if(player===2){
     if (!isFilled) {
         $(this).removeClass('box-choose-2');
         $(this).addClass('box-filled-2');
         makePlay($(this).attr('id'),"X");//change 2 to X
   }

}


}

   changePlayer();

   });

}//end gameStart




function setHover(box,player) {
        let isFilled;
        // if the box has any of the css classes it is occupied -> dont do anything
        if (
          box.hasClass("box-filled-1") == true ||
          box.hasClass("box-filled-2") == true
        ) {
          isFilled = true;
        }
        // if its not filled show the hover for the correct player
        if (!isFilled) {
          box.toggleClass("box-choose-" + player);
        }
      }


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

////++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            function makePlay(box,player){

            //TODO   fill box on the UI  ai function

            board[box]=player;

            if(checkWin(board,player)){

            if(player==='O'){
              $('#board').hide();

              $('#theWinner').text(nameHeaderOne.innerHTML + " Wins!");

              $('#win').addClass('screen-win-one');

              $('#win').show();
            }else if(player==='X'){
               $('#board').hide();

               $('#theWinner').text(nameHeaderTwo.innerHTML + " Wins!");

               $('#win').addClass('screen-win-two');

               $('#win').show();
             }

            }//end if
            else if(checkTie(board)){
              $('#board').hide();
              $('#theWinner').text("Tie");

              $('#win').addClass('screen-win-tie');

              $('#win').show();

            }

            }//end makePlay



         function checkWin (board, player){


               var count=0;

               		for(let i=0;i<winPositions.length;i++){
               		var wPos = winPositions[i];

               				for(let j=0; j<wPos.length;j++){
               				var jPos=wPos[j];
            ////////
               	if(board[wPos[j]]===player){
               		count ++;
               	}
               		if(count===3){

               			return true;
               		}
               				}//end inner loop of wPos

               		count=0;

               		}//end outerloop



               return false;


            }//end checkWin

         function checkTie(board){
              var boxtot=0;
              for(let q=0;q<board.length;q++){
                if(board[q]==='X' || board[q]==='O'){
                  boxtot++;
                }
              }//for
              if(boxtot===9){
                return true;
              }
              return false;
            }//checkTie


            $('#replay').click(function(){

               $('.box').removeClass("box-filled-1");
               $('.box').removeClass("box-filled-2");
               $('#win').removeClass('screen-win-one');
               $('#win').removeClass('screen-win-two');
               $('#win').removeClass('screen-win-tie');
             player=1;
              board = [3,2,3,2,4,2,3,2,3];
               $('#win').hide();
               $('#board').show();

            });

////////////////BigAL ****************************************++++++++++++++*************************
function BigAlPick(board){
//////check for winning box position
for(let i=0;i<winPositions.length;i++){
	var oCount=0;
	var xCount=0;
	var winPos;
	var blockPos;

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
						}//end inner loop of wPos

						if(oCount===2 && winPos!== undefined){
						//	console.log("FOUND TWO Os");
						//	return console.log("Win MOVE IS: " + winPos);
/////TODO make UI move here and add to arrray
board[winPos]='O';
$(this).removeClass('box-choose-1');
$(this).addClass('box-filled-1');
							}else if(xCount===2 && winPos !==undefined){
						//	console.log("FOUND TWO Xs");
							//return console.log("BLOCK MOVE IS: " + winPos);

	///TODO make ui move here add to array
      board[winPos]='O';
      $(this).removeClass('box-choose-1');
      $(this).addClass('box-filled-1');
							}


		}//end outerloop for win pos

////check for blocking position




	makeRandomMove();
}//end bigAL move




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
         //TODO make ui move add to array
         board[randomMove]='O';
        $(this).removeClass('box-choose-1');
        $(this).addClass('box-filled-1');

							//	return console.log("Random move is: " + randomMove);
		//TODO make ui move add to array
      board[randomMove]='O';
     $(this).removeClass('box-choose-1');
     $(this).addClass('box-filled-1');


								}else if(threeArr.length>0){
								var num = getRandomNum(threeArr.length);
								randomMove=threeArr[num];
							//	return console.log("Random move is: " + randomMove);

      //TODO make ui move add to array
      board[randomMove]='O';
     $(this).removeClass('box-choose-1');
      $(this).addClass('box-filled-1');


								}else if(twoArr.length >0){
									var num = getRandomNum(twoArr.length);
							   	randomMove=twoArr[num];
							//	return console.log("Random move is: " + randomMove);

      //TODO make ui move add to array
      board[randomMove]='O';
       $(this).removeClass('box-choose-1');
       $(this).addClass('box-filled-1');


								}


			}//end random move










         function getRandomNum(max) {
           min = Math.ceil(1);
           max = Math.floor(max);
           return Math.floor(Math.random() * (max - 1)) + 1;
         }



})();///end



for(let j=0; j<wPos.length;j++){
   var jPos=wPos[j];









      if(board[jPos]==="O"){
         oCount++;
               if(board[jPos]!=="O" && board[jPos]!=="X"){
                    winPos=jPos;
                  }

      }else if(board[jPos]==="X"){
      xCount++;
         if(board[jPos]!=="O" && board[jPos]!=="X"){
            blockPos=jPos;
            }
      }














         /////////////

            if(oCount===2 && winPos!== undefined){

                  return winPos;

               }else if(xCount===2 && winPos !==undefined){

                  return blockPos;

               }
