<script>

export default
{
    name: 'game',

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
        var createScene = async function(){
            var scene = new BABYLON.Scene(engine);
            window.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            window.tree = await BABYLON.SceneLoader.ImportMeshAsync("", 'static/simple-tree.gltf');
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
            return scene;
        }
        var scene = await createScene();

        const keyboard = await navigator.keyboard.getLayoutMap();
        const keyspressed = {}
        engine.runRenderLoop(function(){
            var direction = new BABYLON.Vector3(0, 0, 0);
            if (keyspressed[keyboard.get('KeyW')]) direction.addInPlace(BABYLON.Vector3.Forward())
            if (keyspressed[keyboard.get('KeyS')]) direction.addInPlace(BABYLON.Vector3.Backward())
            if (keyspressed[keyboard.get('KeyA')]) direction.addInPlace(BABYLON.Vector3.Left())
            if (keyspressed[keyboard.get('KeyD')]) direction.addInPlace(BABYLON.Vector3.Right())

            camera.cameraDirection.addInPlace(camera.getDirection(direction.normalize()).scale(0.1));
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
    canvas
    {
        width: 100%;
        height: 100%;
    }
}
</style>
