//Scene
var scene, camera, renderer;

/* We need this stuff too */
var container, aspectRatio,
  HEIGHT, WIDTH, fieldOfView,
  nearPlane, farPlane,
  mouseX, mouseY, windowHalfX,
  windowHalfY, stats, geometry,
  starMat, matOp, star;

//Scene

// Camera

function setup()
{
    'use strict';

    container = document.createElement('div');
    document.body.appendChild( container );
    document.body.style.overflow = 'hidden';

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 75;
    nearPlane = 500;
    farPlane = 1000;
    mouseX = 0;
    mouseY = 0;

    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

		//Z positioning of camera

		camera.position.z = farPlane / 2;

		scene = new THREE.Scene({antialias:true});
		scene.fog = new THREE.FogExp2( 0x000000, 0.0003 );

		stars(izzmRandom(1.3,3));

		//check for browser Support
		if (webGLSupport()) {
			renderer = new THREE.WebGLRenderer({alpha: true});

		} else {
			renderer = new THREE.CanvasRenderer();
		}

		renderer.setClearColor(0x000011, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize( WIDTH, HEIGHT);
		container.appendChild(renderer.domElement);

		// stats = new Stats();
		// stats.domElement.style.position = 'absolute';
		// stats.domElement.style.top = '0px';
		// stats.domElement.style.right = '0px';
		// container.appendChild( stats.domElement );

		window.addEventListener( 'resize', onWindowResize, false );
		document.addEventListener( 'mousemove', onMouseMove, false );

    update();
};

function draw()
{
  camera.position.x += ( mouseX - camera.position.x ) * 0.0005;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.0005;
  //camera.lookAt( scene.position );
  renderer.render(scene, camera);
};

var update = function ()
{
  requestAnimationFrame(update);
  draw();
  //stats.update();
};

function webGLSupport() {

  try {
    var canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch(e) {
    // console.warn(not able to use webGL for this.  use canvas.');
    return false;
  }
}

// function onWindowResize() {
//
//   // resize
//     var WIDTH = window.innerWidth,
//       HEIGHT = window.innerHeight;
//
//     camera.aspect = aspectRatio;
//     camera.updateProjectionMatrix();
//     renderer.setSize(WIDTH, HEIGHT);
// }

function stars(_s) {

  var starQty = 50000;
    geometry = new THREE.SphereGeometry(1000, 10, 50);

      matOp = {
        size: _s, //
        transparency: true,
        opacity: 0.7
      };

      starMat = new THREE.PointCloudMaterial(matOp);

  for (var i = 0; i < starQty; i++) {

    var starVertex = new THREE.Vector3();
    starVertex.x = Math.random() * 9030 - 1000;
    starVertex.y = Math.random() * 6300 - 1000;
    starVertex.z = Math.random() * 1003 - 1000;

    geometry.vertices.push(starVertex);

  }


  star = new THREE.PointCloud(geometry, starMat);
  scene.add(star);
}

function onMouseMove(e) {

  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;
}

function izzmRandom(min, max) {
    return Math.random() * (max - min) + min;
};
