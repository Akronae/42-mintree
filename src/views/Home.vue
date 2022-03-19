<script>
import Button from '@/components/Button'


export default
{
    name: 'home',

    render () 
    {
        return (
            <div id='home-view'>
                <h1>Mintree</h1>
                <canvas id="renderCanvas" touch-action="none"></canvas>
            </div>
        )
    },

    data () 
    {
        return {
        }
    },

    computed:
    {
    },

    async   mounted ()
    {
        // Get the canvas DOM element
var canvas = document.getElementById('renderCanvas');
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var createScene = async function(){
    var scene = new BABYLON.Scene(engine);
    window.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    window.tree = await BABYLON.SceneLoader.ImportMeshAsync("", 'static/simple-tree.gltf');
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
//    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
  //  sphere.position.y = 1;
    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
    return scene;
}
// call the createScene function
var scene = await createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});
    },

    methods:
    {
    },

    components:
    {
        Button
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#home-view
{
    padding: 10px;

    canvas
    {
        width: 100%;
        height: 100%;
    }
}
</style>
