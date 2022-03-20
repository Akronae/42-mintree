<script>

export default
{
    name: 'game',
    props:
    {
        trees: {type: Array, required: true}
    },

    render () 
    {
        return (
            <div id='game-view'>
                <canvas id="renderCanvas" touch-action="none"></canvas>
            </div>
        )
    },

    data () 
    {
        return {
        }
    },

    async mounted ()
    {
        var canvas = document.getElementById('renderCanvas');
        var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        var createScene = async () =>{
            var scene = new BABYLON.Scene(engine);
            window.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            camera.cameraDirection.addInPlace(camera.getDirection(BABYLON.Vector3.Backward()).scale(8));
            camera.cameraDirection.addInPlace(camera.getDirection(BABYLON.Vector3.Up()).scale(0.7));

            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            const groundMat = new BABYLON.StandardMaterial("groundMat");
            groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
            groundMat.diffuseTexture = new BABYLON.Texture("http://i.imgur.com/SO4M8W0.png");

            const subdivisions = {w: 60, h: 60}
            const ground = BABYLON.MeshBuilder.CreateTiledGround("ground", {width:1000, height:1000, xmin: -500, xmax: 500, zmin: -500, zmax: 500, subdivisions}, scene);
            const verticesCount = ground.getTotalVertices();
    const tileIndicesLength = ground.getIndices().length / (subdivisions.w * subdivisions.h);
let base = 0;
    for (let row = 0; row < subdivisions.h; row++) {
        for (let col = 0; col < subdivisions.w; col++) {
            new BABYLON.SubMesh(row % 2 ^ col % 2, 0, verticesCount, base, tileIndicesLength, ground);
            base += tileIndicesLength;
        }
    }
            ground.material = groundMat;
            return scene;
        }
        window.scene = await createScene();
        scene.clearColor = new BABYLON.Color3(0.13, 0.13, 0.13);


        var keyboard
        if (navigator.keyboard) keyboard = await navigator.keyboard.getLayoutMap();
        const keyspressed = {}
        engine.runRenderLoop(function(){
            if (navigator.keyboard)
            {
                var direction = new BABYLON.Vector3(0, 0, 0);
                if (keyspressed[keyboard.get('KeyW')]) direction.addInPlace(BABYLON.Vector3.Forward())
                if (keyspressed[keyboard.get('KeyS')]) direction.addInPlace(BABYLON.Vector3.Backward())
                if (keyspressed[keyboard.get('KeyA')]) direction.addInPlace(BABYLON.Vector3.Left())
                if (keyspressed[keyboard.get('KeyD')]) direction.addInPlace(BABYLON.Vector3.Right())

                camera.cameraDirection.addInPlace(camera.getDirection(direction.normalize()).scale(0.1));
            }
            
            scene.render();
        });
        window.addEventListener('resize', function(){
            engine.resize();
        });

        document.addEventListener("keydown", function(event) {
            keyspressed[event.key] = true;
        });
        document.addEventListener('keyup', function(event) {
            keyspressed[event.key] = false;
        })
    },

    methods:
    {
        async refreshTrees (trees)
        {
            var i = 0
            for (const t of trees)
            {
                window.tree = await BABYLON.SceneLoader.ImportMeshAsync("", 'static/simple-tree.gltf');
                window.tree.meshes.forEach(m => m.position.addInPlace(new BABYLON.Vector3(i * 20, 0, i * 20)))
                i++
            }
        }
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#game-view
{
    width: 100%;
    
    canvas
    {
        width: 100%;
        height: 70vh;
    }
}
</style>
