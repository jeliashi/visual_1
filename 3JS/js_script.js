
var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var container, stats;
var spion;

function fillScene() {
	// SPION
//	var spion = new THREE.Object3D();
var loader = new THREE.ColladaLoader();

	loader.load(
		// resource URL
		'./spion_core.dae',
		// Function when resource is loaded
		function ( collada ) {
			spion = collada.scene;
			spion.traverse( function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						child.geometry.computeFaceNormals();
						child.material.shading = THREE.FlatShading;
					}
				}
			);
		}
	);//	scene.add( spion );

//scene.add(dae);
}






function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 17, 10, 0 );

	scene = new THREE.Scene();
	var size = 14, step = 1;

	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
	for ( var i = - size; i <= size; i += step ) {
		geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );
		geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );
	}
	var line = new THREE.LineSegments( geometry, material );
	scene.add( line );
	fillScene();


	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	scene.add( particleLight );
				// Lights
	scene.add( new THREE.AmbientLight( 0xcccccc ) );
	var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
	directionalLight.position.x = Math.random() - 0.5;
	directionalLight.position.y = Math.random() - 0.5;
	directionalLight.position.z = Math.random() - 0.5;
	directionalLight.position.normalize();
	scene.add( directionalLight );
	var pointLight = new THREE.PointLight( 0xffffff, 4 );
	particleLight.add( pointLight );
	particleLight.position.set(0,4000,3000);
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	stats = new Stats();
	container.appendChild( stats.dom );
				//
	window.addEventListener( 'resize', onWindowResize, false );
	camera.lookAt(scene.position);
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.addEventListener( 'change', render ); // remove when using animation loop

//cameraControls.target.set(scene.position);

}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}
var clock = new THREE.Clock();

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function animate() {
	window.requestAnimationFrame(animate);
	cameraControls.update();

	render();
}

function render() {
	var timer = Date.now() * 0.0005;
	var delta = clock.getDelta();
	//camera.position.x = Math.cos( timer ) * 17;
	//camera.position.y = 10;
	//camera.position.z = Math.sin( timer ) * 17;
	//camera.lookAt(scene.position)
//	particleLight.position.x = Math.sin( timer * 4 ) * 3009;
//	particleLight.position.y = Math.cos( timer * 5 ) * 4000;
//	particleLight.position.z = Math.cos( timer * 4 ) * 3009;
	THREE.AnimationHandler.update( clock.getDelta() );
	renderer.render( scene, camera );
}
function addToScene(){
	scene.add(spion);

}


try {
	init();
	animate();
	setTimeout(function(){addToScene();},1000);

} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}

