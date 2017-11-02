
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

function getCubeMap()
{
    var cubeMap = new THREE.Texture();
    cubeMap.format = THREE.RGBFormat;
    cubeMap.flipY = false;

    var envMaps =
        {file: "shinyblue.jpg", size: 1024};

    var loader = new THREE.ImageLoader();
    var pre = "./Textures/";
    var file = pre + envMaps.file;
    var size = envMaps.size;

    loader.load(file, function (image)
    {
        var getSide = function (x, y) {

            var canvas = document.createElement('myCanvas');
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext('2d');
            context.drawImage(image, -x * size, -y * size);

            return canvas;
        }

        cubeMap.image[ 0 ] = getSide(2, 1); // px
        cubeMap.image[ 1 ] = getSide(0, 1); // nx
        cubeMap.image[ 2 ] = getSide(1, 0); // py
        cubeMap.image[ 3 ] = getSide(1, 2); // ny
        cubeMap.image[ 4 ] = getSide(1, 1); // pz
        cubeMap.image[ 5 ] = getSide(3, 1); // nz
        cubeMap.needsUpdate = true;

    });

    return cubeMap;
};

        function mouseFollow(event)
        {
  var mouseX = event.touches ? event.touches[0].pageX : event.pageX;
  var mouseY = event.touches ? event.touches[0].pageY : event.pageY;
  var vector = new THREE.Vector3();
  vector.set(
    (mouseX / window.innerWidth) * 2 - 1, -(mouseY / window.innerHeight) * 2 + 1,
    0.5);

  vector.unproject(camera);

  var dir = vector.sub(camera.position).normalize();

  var distance = -camera.position.z / dir.z;

  mousePos = camera.position.clone().add(dir.multiplyScalar(distance));
}



function map_range(value, low1, high1, low2, high2)
{
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

function izzmRandom(min, max)
{
    return Math.random() * (max - min) + min;
};
