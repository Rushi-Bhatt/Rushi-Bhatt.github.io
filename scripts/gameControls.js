var gameControls=(function(){

    function checkKey(e) {

        if(!game.playerActive){
            return;
        }

        var left = 37,
            up = 38,
            right = 39,
            down = 40,
            increment = 2;

        e = e || window.event;

        if (e.keyCode == up) {
            player.moveZ(-increment);
            game.score+=1;
            document.getElementById("scoreValue").innerHTML = game.score;
        } else if (e.keyCode == down) {
            if(game.playerBox.position.z < 52){
                if(game.score>0){
                    game.score-=1;
                    document.getElementById("scoreValue").innerHTML = game.score;
                }
                player.moveZ(increment);    
            }
        } else if (e.keyCode == left) {
            if(game.playerBox.position.x >-110){
            player.moveX(-increment);
            }
        } else if (e.keyCode == right) {
            if(game.playerBox.position.x < 110){
            player.moveX(increment);
            }
        }
    }

    function init(){
        window.onkeydown = checkKey;
    }

    return{
        init: init
    }

})();