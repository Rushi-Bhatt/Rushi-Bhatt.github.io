var sceneSetup = (function () {

    "use strict";
    var loader = new THREE.TextureLoader();
    loader.setCrossOrigin('');
    var texture = loader.load( "/content/tree.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    function createRoad(zPos) {

        var road = new THREE.Mesh(
            new THREE.BoxGeometry(2000, 1, 240),
            new THREE.MeshLambertMaterial({ ambient : 0x000000/*map: THREE.ImageUtils.loadTexture('content/road.jpg')*/ }), //http://opengameart.org/sites/default/files/oga-textures/tunnel_road.jpg
            0
        );

        road.name = "road";
        road.position.y = 1;
        road.position.z = zPos;
        game.scene.add(road);
    }

    function createLake(zPos) {

        var lake = new THREE.Mesh(
            new THREE.BoxGeometry(2000, 1, 180),
            new THREE.MeshLambertMaterial({ambient: 0x0000ff/* map: THREE.ImageUtils.loadTexture('content/water.jpg')*/ }), //http://opengameart.org/node/10510
            0
        );

        lake.name = "lake";
        lake.position.y = 1;
        lake.position.z = zPos;
        game.scene.add(lake);
    }

    function createBoard(x, z) {

        var board = new THREE.Mesh(
            new THREE.BoxGeometry(30, 15, 3),
            new THREE.MeshLambertMaterial({ ambient: 0x003311 * support.getRand(0, 5),map: texture }),
            0
        );

        var base = new THREE.Mesh(
            new THREE.CylinderGeometry(2, 2, 35),
            new THREE.MeshLambertMaterial({ ambient: 0x552211  }),
            0
        );

        board.position.set(x, 30, z);
        board.add(base);
        base.position.y = -25;
        board.name = "board"; 
        game.scene.add(board);
    }


    function addSceneObjects() {

        //ground
        //var grassTexture = THREE.ImageUtils.loadTexture('content/grass.png'); //http://opengameart.org/sites/default/files/grass_0_0.png
        //grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
        //grassTexture.repeat.set(25, 25);

        var material = new THREE.MeshLambertMaterial({ ambient : 0x00ff00/*map: grassTexture*/ });
        var ground = new THREE.Mesh(
            new THREE.BoxGeometry(2000, 1, 800),
            material,
            0
        );

        ground.name = "ground";
        ground.position.y = 0;
        ground.position.z = -300;
        game.scene.add(ground);

        //first road
        createRoad(-100);

        //boards
        for (var i = 0; i < 20; i++) {
            createBoard(support.getRand(-500, 500), support.getRand(-230, -350));
        }

        //second lake - with friends
        createLake(-466);
        setupSceneLighting();
    }

    function setupSceneLighting(){

        var ambientLight = new THREE.AmbientLight(0xcccccc);
        game.scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 200, -50);
        game.scene.add(spotLight);

    }

    return {
        addSceneObjects: addSceneObjects
    }

})();

