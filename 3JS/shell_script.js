var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var container, stats;
//var spion = new THREE.Object3D();
//var lysine = new THREE.Object3D();
// newmesh = lysine_group.children[0].children[0].clone();
var psma_group = new THREE.Group();
var nitro_group = new THREE.Group();
var muc_group = new THREE.Group();
var mrv_group = new THREE.Group();
var glyoxyl_group = new THREE.Group();
var lysine_group = new THREE.Group();
var spion_group = new THREE.Group();

var dendrimer = new THREE.Object3D();

var effectController;
pegB = true;
psmaB = true;
nitroB = true;
mucB = true;
mrvB = true;
glyoxylB = true;
lysineB = true;
spionB = true;


THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
function return_PEG_group(){
    var peg_group = new THREE.Group();
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('peg.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('peg.obj', function (object) {
                peg_group.add(object);
                return_PSMA_group();
            });
        });
    return peg_group;
}
var peg_group = return_PEG_group();

function return_PSMA_group(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('psma.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('psma.obj', function (object) {
                psma_group.add(object);

                return_nitro_group();
            });
        });

}

function return_nitro_group(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('nitro.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('nitro.obj', function (object) {
                nitro_group.add(object);

                return_muc_group();
            });
        });
}
function return_muc_group(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('muc.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('muc.obj', function (object) {
                muc_group.add(object);

                return_3mrv_group();
            });
        });
}
function return_3mrv_group(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('3mrv.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('3mrv.obj', function (object) {
                mrv_group.add(object);

                return_glyoxyl_group();
            });
        });
}
function return_glyoxyl_group(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('glyoxyl.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('glyoxyl.obj', function (object) {
                glyoxyl_group.add(object);

                return_lysine_group();
            });
        });
}
function return_lysine_group(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('lysine.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('lysine.obj', function (object) {
                lysine_group.add(object);
                return_spion_group();
            });
        });
}
function return_spion_group(){
    var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
        mtlLoader.load('spion_core.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('https://rawgit.com/jeliashi/visual_1/master/3JS/objects/');
            objLoader.load('spion_core.obj', function (object) {
                spion_group.add(object);
                init();
            });
        });
}

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    // For grading the window is fixed in size; here's general code:
    //var canvasWidth = window.innerWidth;
    //var canvasHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 1000, 1700);

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
        color: 0x808080
    }));
    scene.add(particleLight);
    // Lights
    scene.add(new THREE.AmbientLight(0x808080));
    var directionalLight = new THREE.DirectionalLight( /*Math.random() * 0xffffff*/ 0x808080);
    directionalLight.position.x = 100;
    directionalLight.position.y = 65;
    directionalLight.position.z = -700;
    directionalLight.position.normalize();
    scene.add(directionalLight);
    var pointLight = new THREE.PointLight(0x808080, 4);
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
    setupGui();
    //cameraControls.target.set(scene.position);

    function fillScene() {

        pegshell = makePEGShell();
        dendrimer.add(pegshell);
        psma_shell = makePSMAShell();
        dendrimer.add(psma_shell);
        spion_core = makeSPION();
        dendrimer.add(spion_core);
        nitro_obj = makeNitroObj();
        dendrimer.add(nitro_obj);

        muc_obj = makeMucObj();
        dendrimer.add(muc_obj);

        mrv_obj = makeMrvObj();
        dendrimer.add(mrv_obj);

        glyoxyl_obj = makeGlyoxylObj();
        dendrimer.add(glyoxyl_obj);

        branch = makeLysineTree();
        branchParent = applyLysineTrees(branch);
        dendrimer.add(branchParent);
        scene.add(dendrimer);

    }
    function makePEGShell(){
        pegshell = new THREE.Object3D();
        peg_mesh = peg_group.children[0].children[0].clone();
        peg_mesh.scale.x=0.1;
        peg_mesh.scale.y = 0.1;
        peg_mesh.scale.z = 0.1;
        ico_detail = 4;
        radius = 65;
        ico_geo = new THREE.IcosahedronGeometry(radius,ico_detail);
        vertices = ico_geo.vertices;
       n_vert = vertices.length;
        for (i=0;i<n_vert;i++){
            vertex = vertices[i];
            xrot = Math.atan2(vertex.z,vertex.y);
            zrot = Math.atan2(Math.sqrt(radius*radius - (vertex.x*vertex.x)),vertex.x);
            tmp1 = peg_mesh.clone();
            tmp1.rotation.z = zrot;
            tmp1.rotation.x = xrot;
            tmp1.position.x = vertex.x;
            tmp1.position.y = vertex.y;
            tmp1.position.z = vertex.z;
            pegshell.add(tmp1);
        }
        return pegshell;

    }
    function makePSMAShell(){
        psma_Shell =new THRE.Object3D();
        psma_shell = new THREE.Object3D();
        n_mesh = psma_group.children[0].children.length;
        for (i=0; i < n_mesh; i++){psma_shell.add(psma_group.children[0].children[i].clone());};
        psma_shell.scale.x = 0.1;
        psma_shell.scale.y = 0.1;
        psma_shell.scale.z = 0.1;
        ico_detail = 1;
        radius = 70;
        ico_geo = new THREE.IcosahedronGeometry(radius,ico_detail);
        vertices = ico_geo.vertices;
        n_vert = vertices.length;
        for (i=0;i<n_vert;i++){
            vertex = vertices[i];
            xrot = Math.atan2(vertex.z,vertex.y);
            zrot = Math.atan2(Math.sqrt(radius*radius - (vertex.x*vertex.x)),vertex.x);
            tmp1 = psma_shell.clone();
            tmp1.rotation.z = zrot;
            tmp1.rotation.x = xrot;
            tmp1.position.x = vertex.x;
            tmp1.position.y = vertex.y;
            tmp1.position.z = vertex.z;
            psma_Shell.add(tmp1);
        }
        return psma_Shell;

    }
    function makeSPION(){
        spion_core = new THREE.Object3D();
        n_mesh = spion_group.children[0].children.length;
        for (i = 0; i < n_mesh; i++){
            spion_core.add(spion_group.children[0].children[i].clone());
        }
        spion_core.scale.x = 0.075;
        spion_core.scale.y = 0.075;
        spion_core.scale.z = 0.075;
        return spion_core;
    }
    function makeNitroObj(){
        nitro_obj = new THREE.Object3D();
        nitro_mesh = nitro_group.children[0].children[0].clone();
        nitro_mesh.scale.x = 0.1;
        nitro_mesh.scale.y = 0.1;
        nitro_mesh.scale.z = 0.1;
        N_nitro = 50;
        for (i = 0; i < N_nitro; i++){
            rad = Math.random()*50+10;
            phi = Math.random()*Math.PI;
            theta = Math.random()*2*Math.PI;
            tmp1 = nitro_mesh.clone();
            tmp1.position.x = rad*Math.cos(phi);
            tmp1.position.y = rad*Math.sin(phi)*Math.sin(theta);
            tmp1.position.z = rad*Math.sin(phi)*Math.cos(theta);
            tmp1.rotation.z = Math.random()*2*Math.PI;
            tmp1.rotation.x = Math.random()*Math.PI;
            nitro_obj.add(tmp1);
        }
        return nitro_obj;
    }
    function makeMucObj(){
        muc_obj = new THREE.Object3D();
        muc_mesh = muc_group.children[0].children[0].clone();
        muc_mesh.scale.x = 0.1;
        muc_mesh.scale.y = 0.1;
        muc_mesh.scale.z = 0.1;
        N_muc = 50;
        for (i = 0; i < N_muc; i++){
            rad = Math.random()*50+10;
            phi = Math.random()*Math.PI;
            theta = Math.random()*2*Math.PI;
            tmp1 = muc_mesh.clone();
            tmp1.position.x = rad*Math.cos(phi);
            tmp1.position.y = rad*Math.sin(phi)*Math.sin(theta);
            tmp1.position.z = rad*Math.sin(phi)*Math.cos(theta);
            tmp1.rotation.z = Math.random()*2*Math.PI;
            tmp1.rotation.x = Math.random()*Math.PI;
            muc_obj.add(tmp1);
        }
        return muc_obj;
    }
    function makeMrvObj(){
        mrv_obj = new THREE.Object3D();
        mrv_mesh = mrv_group.children[0].children[0].clone();
        N_mrv = 50;
        for (i = 0; i < N_nitro; i++){
            rad = Math.random()*50+10;
            phi = Math.random()*Math.PI;
            theta = Math.random()*2*Math.PI;
            tmp1 = mrv_mesh.clone();
            tmp1.position.x = rad*Math.cos(phi);
            tmp1.position.y = rad*Math.sin(phi)*Math.sin(theta);
            tmp1.position.z = rad*Math.sin(phi)*Math.cos(theta);
            tmp1.rotation.z = Math.random()*2*Math.PI;
            tmp1.rotation.x = Math.random()*Math.PI;
            mrv_obj.add(tmp1);
        }
        return mrv_obj;
    }
    function makeGlyoxylObj(){
        glyoxyl_obj = new THREE.Object3D();
        glyoxyl_mesh = glyoxyl_group.children[0].children[0].clone();
        N_glyoxyl = 50;
        for (i = 0; i < N_nitro; i++){
            rad = Math.random()*50+10;
            phi = Math.random()*Math.PI;
            theta = Math.random()*2*Math.PI;
            tmp1 = glyoxyl_mesh.clone();
            tmp1.position.x = rad*Math.cos(phi);
            tmp1.position.y = rad*Math.sin(phi)*Math.sin(theta);
            tmp1.position.z = rad*Math.sin(phi)*Math.cos(theta);
            tmp1.rotation.z = Math.random()*2*Math.PI;
            tmp1.rotation.x = Math.random()*Math.PI;
            glyoxyl_obj.add(tmp1);
        }
        return glyoxyl_obj;
    }


    function setupGui(){
        effectController = {
            PSMA: true,
            PEG: true,
            Lysine: true,
            SPION: true,
            Nitro: true,
            Mucin: true,
            mrv: true,
            Glyoxyl: true
        };
        var h;
        var gui = new dat.GUI();
        h= gui.addFolder("Add/Remove Components");
        h.add( effectController,"PSMA").name("Targetting Matrix").onChange(render );
        h.add( effectController,"PEG").name("PEG Shell").onChange(render);
        h.add( effectController,"Lysine").name("Lysine matrix").onChange(render);
        h.add( effectController,"SPION").name("SPION Core").onChange(render);
        h.add( effectController,"Nitro").name("Nitro Package").onChange(render);
        h.add( effectController,"Mucin").name("Mucin Package").onChange(render);
        h.add( effectController,"mrv").name("3mrv Package").onChange(render);
        h.add( effectController,"Glyoxyl").name("Glyoxyl Package").onChange(render);
    }

    animate();


}

function makeLysineTree() {
    var angle = 30;
    var branches = 6;
    branch = new THREE.Object3D();
    var level;
    var x_dist = -8.45
    var y_dist = 0.7
    lysine_i = lysine_group.children[0].children[0].clone();
    lysine_i.rotation.z = -angle*Math.PI/180;
    lysine_i.rotation.x = Math.PI/2

    lysine_i.position.y = -y_dist;      lysine_i.position.x = -x_dist
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
//      scene.add(branch)
return branch;
}
function applyLysineTrees(branch){
    branchParent = new THREE.Object3D()
    ico_detail = 1;
    radius = 10;
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
        branchParent.add(tmp1);
    }
    return branchParent;
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
    if ( effectController.PSMA !== psmaB ||
            effectController.PEG !== pegB ||
            effectController.Lysine !== lysineB ||
            effectController.SPION !== spionB ||
            effectController.Nitro !== nitroB ||
            effectController.Mucin !== mucB ||
            effectController.mrv !== mrvB ||
            effectController.Glyoxyl !== glyoxylB )
    {
        psmaB = effectController.PSMA;
        pegB = effectController.PEG;
        lysineB = effectController.Lysine;
        spionB = effectController.SPION;
        nitroB = effectController.Nitro;
        mucB = effectController.Mucin;
        mrvB = effectController.mrv;
        glyoxylB = effectController.Glyoxyl;

        createNewDendrimer();
    }

    function createNewDendrimer(){
        scene.remove(dendrimer);
        dendrimer = new THREE.Object3D();

        if (pegB == true){dendrimer.add(pegshell);};
        if (psmaB == true){dendrimer.add(psma_shell);};
        if (spionB == true){dendrimer.add(spion_core);};
        if (nitroB == true){dendrimer.add(nitro_obj);};
        if (mucB == true){dendrimer.add(muc_obj);};
        if (mrvB == true){dendrimer.add(mrv_obj);};
        if (glyoxylB == true){dendrimer.add(glyoxyl_obj);};
        if (lysineB == true){
            branch = makeLysineTree();
            branchParent = applyLysineTrees(branch);
            dendrimer.add(branchParent);
        }
        scene.add(dendrimer);
    }
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