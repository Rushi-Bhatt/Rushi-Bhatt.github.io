var game = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        camera,
        clock = new THREE.Clock(),
        width = window.innerWidth,
        height = window.innerHeight - 10,
        playerBox,
        renderer = window.WebGLRenderingContext ?  new THREE.WebGLRenderer() : new THREE.CanvasRenderer() ,
        playerActive = true,
        lives = 3,
        pBox,
        playerBox,
        orbits,
        controls,
        controls1;

    renderer.setSize(width, height);
    renderer.setClearColor(0xE0EEEE);

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        50,
        width / height,
        20,
        900
    );
    scene.add(camera);
    ///scene.fog = new THREE.Fog(0xE0EEEE, 250, 600);

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

    }
    function removeLife() {
        lives -= 1;
        document.getElementById("numberOfLives").innerHTML = lives;

        if (lives == 0) {
            alert('game over');
            startNewGame();
        }
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
        init: init,
        controls: controls,
        playerActive: playerActive,
        resetScene: resetScene,
        lives: lives,
        removeLife: removeLife
    }

})();

window.onload = game.init();