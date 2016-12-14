var player=(function(){

    "use strict";

    var movementRate = 2,
        playerBox,
        playerBoxMaterial,
        finishLineZPos=-620;
    function init(){
    }

    function moveX(movement) {
        //game.camera.position.x += movementRate * movement;
       // game.camera.__dirtyPosition = true;
        playerBox.position.x  += movementRate * movement;
        playerBox.__dirtyPosition = true;

    }

    function moveZ(movement) {
        game.camera.position.z += movementRate * movement;
        game.camera.__dirtyPosition = true;
        playerBox.position.z += movementRate  * movement;
        playerBox.__dirtyPosition = true;
        checkIfPlayerAtFinish();
    }

    function checkIfPlayerAtFinish(){

        if(playerBox.position.z<=finishLineZPos){
            document.getElementById("alertText").innerHTML = "" ;
            document.getElementById("alertText").innerHTML = "Congratulations. Lets Play Again";
            document.getElementById("control-panel-alert").style.display = "block";
            setTimeout(function(){document.getElementById("control-panel-alert").style.display = "none";},2000);
            
            enemy.handlePlayerKilled();
            game.startNewGame();

        }
    }

    function createPlayer(){

        playerBoxMaterial = new THREE.MeshBasicMaterial({
                visible: false
            });

        var personMaterial =  new THREE.MeshPhongMaterial({
                ambient: 0xff00000,
                transparent: true, 

            });

        var playerBody = new THREE.Mesh(
            new THREE.BoxGeometry(7, 10, 1),
            personMaterial
        );
        
        playerBody.position.y = -8;

        var playerLLeg = new THREE.Mesh(
            new THREE.BoxGeometry(2, 10, 1),
            personMaterial
        );
        playerBody.add(playerLLeg);
        playerLLeg.position.y = -5;
        playerLLeg.position.x = -2;

        var playerRLeg = new THREE.Mesh(
            new THREE.BoxGeometry(2, 10, 1),
            personMaterial
        );
        playerBody.add(playerRLeg);
        playerRLeg.position.y = -5;
        playerRLeg.position.x = 2;

        var playerHead = new THREE.Mesh(
            new THREE.BoxGeometry(4, 4, 1),
            personMaterial
        );
        playerBody.add(playerHead);
        playerHead.position.y = 8;
        playerHead.position.x = 0;


        playerBox =  new THREE.Mesh(
            new THREE.BoxGeometry(7, 10, 1),
            playerBoxMaterial
        );
        playerBox.position.set(0, 5, 44);
        playerBox.name = "playerBox";
        playerBox.castShadow = true;
        playerBox.add(playerBody);
        playerBody.position.y = 6;

        game.scene.add(playerBox);
        playerBox.userData = {
            origin: 'right',
            speed: 0.5,
            startPos: -200,
            zPos: -5
        }

        game.playerBox = playerBox;

    }

    return{
        init: init,
        createPlayer: createPlayer,
        moveX: moveX,
        moveZ: moveZ,
        playerBox : playerBox
    }

})();