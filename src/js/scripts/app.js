// Main app module.
(function (THREE) {
    'use strict';

    var scene = new THREE.Scene();
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = ebg.initScene({
        scene: scene,
        renderer: renderer,
        light: light,
        camera: {
            type: 'PerspectiveCamera',
            angle: 45,
            aspectRatio: window.innerWidth / window.innerHeight,
            nearPlane: 1,
            farPlane: 500,
            position: {
                z: 15
            }
        },
        controls: {
            type: 'OrbitControls',
            listenFor: 'change',
            callback: function() {
                ebg.render({
                    renderer: renderer,
                    scene: scene,
                    camera: camera
                });
            }
        }
    });

    // Static spaceship.
    ebg.loadModel({
        path: 'models/spaceship/spaceship.dae',
        name: 'static-spaceship',
        scene: scene,
        position: {
            x: -5,
            z: 2
        },
        rotation: {
            x: 30
        }
    });

    // Animated spaceship.
    ebg.loadModel({
        path: 'models/spaceship/spaceship.dae',
        name: 'fast-spaceship',
        scene: scene,
        position: {
            x: 1.5,
            y: 20,
            z: -25
        },
        rotation: {
            x: 30
        }
    });

    // Animated spaceship.
    ebg.loadModel({
        path: 'models/spaceship/spaceship.dae',
        name: 'slow-spaceship',
        scene: scene,
        position: {
            x: -1,
            y: 20,
            z: -45
        },
        rotation: {
            x: 30
        }
    });

    // Render the scene.
    ebg.render({
        renderer: renderer,
        scene: scene,
        camera: camera,
        sprites: [
            {
                // This spaceship is no animated because the orbit controls are used to look at it.
                name: 'static-spaceship',
                scene: scene
            },
            {
                name: 'fast-spaceship',
                scene: scene,
                // The heartbeat of a sprite is run every tick of the main render.
                heartbeat: function (input) {
                    var name = input && input.name;
                    var scene = input && input.scene;
                    var sprite;

                    if (!name || !scene) {
                        throw new Error(ebg.err.input.required);
                    }

                    sprite = scene.getObjectByName(name);

                    if (!sprite) {
                        return; // Sprite hasn't been found yet, it has probably not finished loading.
                    }

                    // Only run code below this point once the sprite has been found in the scene.
                    
                    if (sprite.position.y > 0) {
                        // First vector: the spaceship slowly comes into view, losing altitude.
                        sprite.position.z += 0.05;
                        sprite.position.y += -0.05;
                    } else {
                        // Second vector: the spaceship speeds away from field of camera.
                        sprite.position.z += 1;
                    }

                    if (sprite.position.z > 25) {
                        sprite.position.set(1.5, 20, -25); // back to start position.
                    }
                }
            },
            {
                name: 'slow-spaceship',
                scene: scene,
                // The heartbeat of a sprite is run every tick of the main render.
                heartbeat: function (input) {
                    var name = input && input.name;
                    var scene = input && input.scene;
                    var sprite;

                    if (!name || !scene) {
                        throw new Error(ebg.err.input.required);
                    }

                    sprite = scene.getObjectByName(name);

                    if (!sprite) {
                        return; // Sprite hasn't been found yet, it has probably not finished loading.
                    }

                    // Only run code below this point once the sprite has been found in the scene.
                    
                    if (sprite.position.y > -2) {
                        // First vector: the spaceship slowly comes into view, losing altitude.
                        sprite.position.z += 0.05;
                        sprite.position.y += -0.05;
                    } else {
                        // Second vector: the spaceship moves away from field of camera, slower than fast-spaceship.
                        sprite.position.z += 0.33;
                    }

                    if (sprite.position.z > 25) {
                        sprite.position.set(-1, 20, -45); // back to start position.
                    }
                }
            }
        ],
        // The callback is run every tick of the main render. It co-ordinates running all sprite heartbeats.
        callback: function callback (input) {
            var sprites = input && input.sprites;

            if (!sprites) {
                throw new Error(ebg.err.input.required);
            }

            sprites.map(function (sprite) {
                if (sprite.heartbeat) {
                    sprite.heartbeat(sprite);
                }
            });
        }
    });
}(THREE));
