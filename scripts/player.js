var player=(function(){

    "use strict";

    var movementRate = 2,
        playerBox,
        playerBoxMaterial,
        finishLineZPos=-560;
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
            alert("You won");
        }
    }

    function createPlayer(){

        playerBoxMaterial = new THREE.MeshBasicMaterial({
                visible: false
            });


        var personMaterial =  new THREE.MeshPhongMaterial({
                ambient: 0x00dd00,
                transparent: true, 

            });

       
        var playerBody = new THREE.Mesh(
            new THREE.BoxGeometry(7, 5, 1),
            personMaterial
        );
        
        playerBody.position.y = -8;

        var playerLLeg = new THREE.Mesh(
            new THREE.BoxGeometry(2, 5, 1),
            personMaterial
        );
        playerBody.add(playerLLeg);
        playerLLeg.position.y = -5;
        playerLLeg.position.x = -2;

        var playerRLeg = new THREE.Mesh(
            new THREE.BoxGeometry(2, 5, 1),
            personMaterial
        );
        playerBody.add(playerRLeg);
        playerRLeg.position.y = -5;
        playerRLeg.position.x = 2;

        playerBox =  new THREE.Mesh(
            new THREE.BoxGeometry(7, 5, 1),
            playerBoxMaterial
        );
        playerBox.position.set(0, 5, 44);
        playerBox.name = "playerBox";
        playerBox.add(playerBody);
        playerBody.position.y = 2;

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