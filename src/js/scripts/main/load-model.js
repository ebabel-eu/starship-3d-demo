// Load a collada model and add it to the scene.
ebg.loadModel = function loadModel (input) {
    'use strict';

    var loader;
    var path = input && input.path;
    var name = input && input.name;
    var scene = input && input.scene;
    var position = input && input.position || { x: 0, y: 0, z: 0 };
    var rotation = input && input.rotation || { x: 0, y: 0, z: 0 };

    if (!path || !name || !scene) {
        throw new Error(ebg.err.input.required);
    }

    loader = new THREE.ColladaLoader();
    //loader.options.convertUpAxis = true;

    loader.load(
        // Model path.
        path,

        // Model is loaded.
        function loaded (collada) {
            var model = collada.scene;

            model.name = name;
            model.position.set(position.x || 0, position.y || 0, position.z || 0);
            model.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0);

            scene.add(model);
        },

        // Model loading in progress.
        function loading (xhr) {
            console.log([
                xhr.currentTarget.responseURL,
                ' ',
                (xhr.loaded / xhr.total * 100),
                '% loaded'].join(''));
        }
    );
};