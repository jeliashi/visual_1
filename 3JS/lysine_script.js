var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var container, stats;
//var spion = new THREE.Object3D();
//var lysine = new THREE.Object3D();
// newmesh = lysine_group.children[0].children[0].clone();

THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
function return_lysine_group(){
	var lysine_group = new THREE.Group();
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath('objects/');
		mtlLoader.load('lysine.mtl', function (materials) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);

			objLoader.setPath('objects/');
			objLoader.load('lysine.obj', function (object) {
				lysine_group.add(object);
				init();
			});
		});
	return lysine_group;
}
var lysine_group = return_lysine_group();
function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.set(0, 10, 17);

	scene = new THREE.Scene();
	var size = 14,
		step = 1;

	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({
		color: 0x303030
	});
	for (var i = -size; i <= size; i += step) {
		geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
		geometry.vertices.push(new THREE.Vector3(size, -0.04, i));
		geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
		geometry.vertices.push(new THREE.Vector3(i, -0.04, size));
	}
	var line = new THREE.LineSegments(geometry, material);
	scene.add(line);

	var onProgress = function (xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};
	var onError = function (xhr) {};
	fillScene();



	particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
		color: 0xffffff
	}));
	scene.add(particleLight);
	// Lights
	scene.add(new THREE.AmbientLight(0xcccccc));
	var directionalLight = new THREE.DirectionalLight( /*Math.random() * 0xffffff*/ 0xeeeeee);
	directionalLight.position.x = Math.random() - 0.5;
	directionalLight.position.y = Math.random() - 0.5;
	directionalLight.position.z = Math.random() - 0.5;
	directionalLight.position.normalize();
	scene.add(directionalLight);
	var pointLight = new THREE.PointLight(0xffffff, 4);
	particleLight.add(pointLight);
	particleLight.position.set(0, 4000, 3000);
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	stats = new Stats();
	container.appendChild(stats.dom);
	//
	window.addEventListener('resize', onWindowResize, false);
	camera.lookAt(scene.position);
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.addEventListener('change', render); // remove when using animation loop

	//cameraControls.target.set(scene.position);

	function fillScene() {
		//  var branch = new THREE.Object3D();
		//scene.add(obj1);
		branch = makeLysineTree();
		scene.add(branch)
		applyLysineTrees(branch);
	}

	function makeLysineTree() {
		var angle = 30;
		var branches = 5;
		branch = new THREE.Object3D();
		var level;
		var x_dist = -8.45
		var y_dist = 0.7
		lysine_i = lysine_group.children[0].children[0].clone();
		lysine_i.rotation.z = -angle*Math.PI/180;
		lysine_i.rotation.x = Math.PI/2

		lysine_i.position.y = -y_dist;		lysine_i.position.x = -x_dist
		lysine_i2 = lysine_group.children[0].children[0].clone();
		lysine_i2.rotation.z = angle*Math.PI/180;
		lysine_i2.rotation.x = Math.PI/2;
		lysine_i2.position.y = y_dist;
		lysine_i2.position.x = -x_dist
		lysine_base = lysine_group.children[0].children[0].clone();
		branch.add(lysine_i);
		branch.add(lysine_i2);
		branch.add(lysine_base);

		for (level = 0; level < branches-1; level++) {

			tmp1 = branch.clone(true);
			tmp2 = branch.clone(true);
			base = lysine_group.children[0].children[0].clone();
			delete branch;
			tmp1.rotation.z = -angle*Math.PI/180;
			tmp1.rotation.x = Math.PI/2;

			tmp1.position.y = -y_dist;
			tmp1.position.x = -x_dist;
			tmp2.rotation.z = angle*Math.PI/180;
			tmp2.rotation.x = Math.PI/2;

			tmp2.position.y = y_dist;
			tmp2.position.x = -x_dist;
			branch = new THREE.Object3D();
			branch.add(tmp1);
			branch.add(tmp2);
			branch.add(base);

		}
//		scene.add(branch)
		return branch;
	}
	function applyLysineTrees(branch){
		ico_detail = 0;
		radius = 15;
		ico_geo = new THREE.IcosahedronGeometry(radius,ico_detail);
		vertices = ico_geo.vertices;
		n_vert = vertices.length;
		for (i=0; i< n_vert; i++){
			vertex = vertices[i];
			xrot = Math.atan2(vertex.z,vertex.y);
			zrot = Math.atan2(Math.sqrt(radius*radius - (vertex.x*vertex.x)),vertex.x);
			tmp1 = branch.clone();
			tmp1.rotation.z = zrot;
			tmp1.rotation.x = xrot;
			tmp1.position.x = vertex.x;
			tmp1.position.y = vertex.y;
			tmp1.position.z = vertex.z;
			scene.add(tmp1);
		}

	}
	animate();


}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
	requestAnimationFrame(animate);
	render();
	stats.update();
}
var clock = new THREE.Clock();

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length > 0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild(renderer.domElement);
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
	//  particleLight.position.x = Math.sin( timer * 4 ) * 3009;
	//  particleLight.position.y = Math.cos( timer * 5 ) * 4000;
	//  particleLight.position.z = Math.cos( timer * 4 ) * 3009;
	renderer.render(scene, camera);
}

function addToScene() {
	//  scene.add(lysine);

}


/*try {

		init();
		animate();



} catch (e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport + e);
}
*/