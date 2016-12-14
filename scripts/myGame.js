var game = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        camera,
        clock = new THREE.Clock(),
        width = window.innerWidth,
        height = window.innerHeight - 10,
        playerBox,
        renderer = new THREE.WebGLRenderer({antialias:true}), 
        playerActive = true,
        lives = 3,
        score = 0,
        pBox,
        playerBox,
        orbits,
        controls,
        controls1;

    renderer.setSize(width, height);
    renderer.setClearColor(0xE0EEEE);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType=THREE.PCFSoftShadowMap;
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        50,
        width / height,
        20,
        900
    );
    scene.add(camera);
    scene.fog = new THREE.Fog(0xE0EEEE, 250, 600);

    function init() {   
        resetScene();
        sceneSetup.addSceneObjects();
        enemy.init();
        player.createPlayer();
        gameControls.init();
        render();
    }

    function resetScene() {

       // camera.position.set(-141, 133, 212);
        //camera.lookAt(new THREE.Vector3(0,0,10));
        camera.position.set(0, 100, 120);
        camera.lookAt(new THREE.Vector3(0,0,-30));
    }

    function startNewGame(){
        lives=3;
        document.getElementById("numberOfLives").innerHTML = lives;
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

    }
    
    function render() {

        var delta = clock.getDelta();
        enemy.update();
        enemy.checkForCollition();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        scene: scene,
        camera: camera,
        playerBox: playerBox,
        renderer:renderer,
        init: init,
        render:render,
        controls: controls,
        playerActive: playerActive,
        resetScene: resetScene,
        lives: lives,
        score:score,
        startNewGame:startNewGame
    }

})();

window.onload = game.init();