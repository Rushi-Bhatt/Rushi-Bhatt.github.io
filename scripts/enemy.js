var enemy = (function () {

    "use strict";

    var enemies = [];
    var friends=[];
    var fBox;
    var pBox;

    function createEnemy(origin, speed, startPos, zPos) {

        var enemy = new THREE.Mesh(
            new THREE.BoxGeometry (30, 20, 15),
            new THREE.MeshPhongMaterial({
                    ambient: Math.random() * 0xffffff
                })
        );

        var tyre1 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x0340d00 }));
        tyre1.position.x = -7;
        tyre1.position.y = -10;
        tyre1.rotation.x = 90 * (Math.PI / 180);

        var tyre2 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x0340d00 }));
        tyre2.position.x = 7;
        tyre2.position.y = -10;
        tyre2.rotation.x = 90 * (Math.PI / 180);

        enemy.add(tyre1);
        enemy.add(tyre2);

        startPos = origin == 'right' ? startPos : -startPos;

        enemy.position.set(startPos, 18, zPos);

        enemy.userData = {
            origin: origin,
            speed: speed,
            startPos: startPos,
            zPos: zPos
        }

        enemy.name = 'enemy';

        enemies.push(enemy);

        game.scene.add(enemy);
    }

    function createWierdEnemy(origin, speed, startPos, zPos) {

        var enemy = new THREE.Mesh(
            new THREE.BoxGeometry (50, 20, 15),
            new THREE.MeshPhongMaterial({
                    ambient: Math.random() * 0xffffff
                })
        );

        var tyre1 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x0340d00 }));
        tyre1.position.x = -11;
        tyre1.position.y = -10;
        tyre1.rotation.x = 90 * (Math.PI / 180);

        var tyre2 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x0340d00 }));
        tyre2.position.x = 7;
        tyre2.position.y = -10;
        tyre2.rotation.x = 90 * (Math.PI / 180);

        var tyre3 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x0340d00 }));
        tyre2.position.x = 11;
        tyre2.position.y = -10;
        tyre2.rotation.x = 90 * (Math.PI / 180);

        enemy.add(tyre1);
        enemy.add(tyre2);
        enemy.add(tyre3);

        startPos = origin == 'right' ? startPos : -startPos;

        enemy.position.set(startPos, 18, zPos);

        enemy.userData = {
            origin: origin,
            speed: speed,
            startPos: startPos,
            zPos: zPos
        }

        enemy.name = 'wierdEnemy';

        enemies.push(enemy);

        game.scene.add(enemy);
    }

    function createFriend(origin, speed, startPos, zPos) {

        var friend = new THREE.Mesh(
            new THREE.BoxGeometry (50, 0, 30),
            new THREE.MeshPhongMaterial({
                    ambient: Math.random() * 0xffffff
                })
        );

        startPos = origin == 'right' ? startPos : -startPos;

        friend.position.set(startPos, 2, zPos);

        friend.userData = {
            origin: origin,
            speed: speed,
            startPos: startPos,
            zPos: zPos
        }

        friend.name = 'friend';

        friends.push(friend);

        game.scene.add(friend);
    }


    var onLog=true;
    function checkForCollition() {
        //checkForDrowning();
        if(game.playerBox.position.z>-377)
        {
            //road
            if (enemies.length == 0) return;
            for (var i = 0; i < enemies.length; i++) {
              var eBox = new THREE.Box3().setFromObject(enemies[i]); 
              var pBox = new THREE.Box3().setFromObject(game.playerBox);   
              if(pBox.isIntersectionBox(eBox)){
               handleCollision();
              }
            }
        } 
        else
        {
            var alive = checkForDrowning();
            if(!alive){
                handleCollision();
            }
        }
    }

    function checkForDrowning(){
        var isAlive=false;
        if (friends.length == 0) return isAlive;
        for (var j = 0; j < friends.length; j++)
        {
            fBox = new THREE.Box3().setFromObject(friends[j]); 
            pBox = new THREE.Box3().setFromObject(game.playerBox);   
            if(pBox.isIntersectionBox(fBox)){
                console.log("boat",friends[j]);
                console.log(game.playerBox);
                isAlive=true;
               // alert("handlefloat");
                onLog = false;
                fBox=friends[j];
                pBox = game.playerBox;
                handleFloating(friends[j],game.playerBox);
                //game.playerBox.position.set(friends[j].position.x,game.playerBox.position.y,friends[j].position.z+350);
            }
            else
            {
               
            }
        }
        return isAlive;
    }
    function handleFloating(friend,player){
        //For friends
            if(friend.userData.origin == 'right')
                player.position.x -= friend.userData.speed;
            else
                player.position.x += friend.userData.speed;

            if ((friend.userData.origin == 'right' &&  player.position.x < -112) || (friend.userData.origin == 'left' &&  player.position.x > 112)) {
                //Player died
                handleCollision();
            }
            else {
                player.__dirtyPosition = true;
            }
    }
    function handleCollision() {
        alert("You died.. Be more careful next time");
        game.playerActive = false;
        game.removeLife();
        handlePlayerKilled();
    }

    function handlePlayerKilled() {

        var playerBox = game.scene.getObjectByName('playerBox');
        game.scene.remove(playerBox);
        game.resetScene();
        player.createPlayer();
        game.playerActive = true;

    }
    
    function createEnemies() {

        //road 1
        createEnemy('right', 0.7, -200, -5);
        createEnemy('right', 0.7, 200, -5);

        //road 2
        createEnemy('left', 0.5, -350, -60);
        createEnemy('left', 0.5, 0, -60);

        //road 3
        createEnemy('right', 1, -200, -130);
        createEnemy('left', 1, -300, -190);
    }
    function createWierdEnemies() {

        //road 1
       // createWierdEnemy('right', 0.5, -200, -5);
        
        //road 2
        createWierdEnemy('left', 0.8, 350, -60);
        
        //road 3
        //createWierdEnemy('right', 1, -200, -130);
    }
        
    function createFriends(){
        
        //Lake1
        createFriend('right', 0.1, -200, -393);
        createFriend('right', 0.1, 200, -393);

        //lake2
        createFriend('left', 0.2, -350, -425);
        createFriend('left', 0.2, 0, -425);

        //lake3
        createFriend('right', 0.3, -200, -457);
        createFriend('right', 0.3, -300, -457);

        //lake4
        createFriend('left', 0.1, -350, -489);
        createFriend('left', 0.1, 0, -489);

         //lake5
        createFriend('right', 0.2, -200, -521);
        createFriend('right', 0.2, -300, -521);

        //lake6
        createFriend('left', 0.3, -350, -553);
        createFriend('left', 0.3, 0, -553);

    }


    function update() {

        if (enemies.length == 0) return;

        for (var i = 0; i < enemies.length; i++) {

            var enemy = enemies[i];

            if (enemy.userData.origin == 'right') 
                enemy.position.x -=  (enemy.userData.speed);
            else
                enemy.position.x +=  (enemy.userData.speed);


            if ((enemy.userData.origin == 'right' && enemy.position.x < -400) || (enemy.userData.origin == 'left' && enemy.position.x > 400)) {
                //restart enemy over other side
                enemy.position.x = enemy.userData.origin == 'right' ? 400 : -400;
            }
            else {
                //rotate tyres
                enemy.children[0].rotation.y += 1;
                enemy.children[1].rotation.y += 1;
                enemy.__dirtyPosition = true;
            }
        }


        //For friends
        if (friends.length == 0) return;

        for (var j = 0; j < friends.length; j++) {

            var friend = friends[j];
            if (friend.userData.origin == 'right') 
                friend.position.x -=  (friend.userData.speed);
            else
                friend.position.x +=  (friend.userData.speed);
            if ((friend.userData.origin == 'right' && friend.position.x < -400) || (friend.userData.origin == 'left' && friend.position.x > 400)) {
                //restart friend over other side
                friend.position.x = friend.userData.origin == 'right' ? 400 : -400;
            }
            else {
                friend.__dirtyPosition = true;
            }
        }
    }

    function init() {
        createEnemies();
        createFriends();
        createWierdEnemies();

    }

    return {
        init: init,
        update: update,
        handleFloating:handleFloating,
        checkForCollition : checkForCollition,
        fBox:fBox,
        pBox:pBox

    }

})();