//Scene
var camera,
    scene,
    renderer;

//Lights
var dLight

//Controls
var controls;

//Geometries
var starGeo,
    starMat;

//Mouse Position
var mousePos = new THREE.Vector3(0, 0, 0);

//Scene
scene = new THREE.Scene();

//Renderer
renderer = new THREE.WebGLRenderer({alpha: true,
    antialias: true
});

// Camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 0, 333);
camera.focalLength = camera.position.distanceTo(scene.position);
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setClearColor(new THREE.Color("0x000000", 0.0));
renderer.shadowMap.enabled = true;


//LIGHTS
dlight = new THREE.DirectionalLight("rgb(130,180,242)");
pLightCenter = new THREE.PointLight("rgb(255,255,255)", 0.3);
pLightCenter.position.y = 100;
pLightMask = new THREE.PointLight("rgb(133,190,233)",3);
pLightMask.position.y = 0;
pLightMask.position.z = 100;
pLightHighs = new THREE.PointLight("rgb(133,190,233)",3);
pLightHighs.position.y = 0;
pLightHighs.position.z = 600;
rainLight = new THREE.PointLight("rgb(33,0,255)", 3);
rainLight.position.z = 133;

//Geometries
starGeo = new THREE.SphereBufferGeometry( 0.1, 60, 60 );
//waterGeo = new THREE.OctahedronGeometry(33,0);
starMat = new THREE.MeshStandardMaterial({
    color: "rgb(255,0,0)",
    blending: THREE.AdditiveBlending
});

function setup()
{
    'use strict';

//Controls
    //controls = new THREE.OrbitControls(camera, renderer.domElement);



//Render to Dom
document.getElementById('myCanvas').appendChild(renderer.domElement);

    // Events
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', mouseFollow);
    document.addEventListener('touchstart', mouseFollow);
    document.addEventListener('touchmove', mouseFollow);

    scene.add(dlight);
    //scene.add(pLightCenter);
    //scene.add(pLightHighs);
    //scene.add(pLightMask)
    //scene.add(rainLight);
    scene.add(camera);

    //Water
    for (var i = 0; i <NUM_STARS; i++)
    {
        var p = new Star(Math.random() * -Math.cos(Math.random() * 9000));
        scene.add(p.dust);
        starDust.push(p);
    }

    update();
};

function draw()
{
    requestAnimationFrame(draw);

    for (var i = 0; i < starDust.length; i++)
    {
        starDust[i].update();
        starDust[i].edges();
        starDust[i].display();
    }

    renderer.render(scene, camera);
};

var update = function ()
{
    draw();
};
