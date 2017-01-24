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

//Presence of Objects
pegB = true;
psmaB = true;
nitroB = true;
mucB = true;
mrvB = true;
glyoxylB = true;
lysineB = true;
spionB = true;

//Shell Geometries
peg_scale = 1;
peg_ico = 4;
psma_scale = 1;
psma_ico = 1;
shell_rad = 65;

//Spion/Lysine Geometry
lysine_angle = 30;
lysine_branches = 6;
lysine_scale = 1;
lysine_ico = 1;
spion_radius = 10;

//Package numbers
n_nitro = 50;
n_muc = 50;
n_mrv = 50;
n_glyoxyl = 50;
s_nitro = 1;
s_muc = 1;
s_mrv = 1;
s_glyoxyl = 1;


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
    camera.position.set(0, 100, 170);

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




    function setupGui(){
        effectController = {
            PSMA: true,
            PEG: true,
            Lysine: true,
            SPION: true,
            Nitro: true,
            Mucin: true,
            mrv: true,
            Glyoxyl: true,

            pegscale: 1,
            pegico: 4,
            psmascale: 1,
            psmaico: 1,
            shellrad: 65,

            lysineangle: 30,
            lysinebranches: 6,
            lysinescale: 1,
            lysineico: 1,
            spionradius: 10,

            nnitro: 50,
            nmuc: 50,
            nmrv: 50,
            nglyoxyl: 50,
            snitro: 1,
            smuc: 1,
            smrv: 1,
            sglyoxyl: 1

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

        h = gui.addFolder("Shell Geometry");
        h.add( effectController,"pegscale",0.1,2.0,0.1).name("Shell Component Scale").onChange(render );
        h.add( effectController,"pegico",0,6,1).name("Shell Icosahedron Detail").onChange(render );
        h.add( effectController,"psmascale",0.1,2.0,0.1).name("Targetting Componet Scale").onChange(render );
        h.add( effectController,"psmaico",0,3,1).name("Targetting Icosahedron Detail").onChange(render );
        h.add( effectController,"shellrad",45,100,5.0).name("Shell Radius (um)").onChange(render );

        h = gui.addFolder("SPION/Lysine Geometry");
        h.add( effectController,"lysineangle",5,70,5).name("Inter-Lysine Angle").onChange( render );
        h.add( effectController,"lysinebranches",1,10,1).name("Lysine Branches").onChange( render );
        h.add( effectController,"lysinescale",0.1,2,0.1).name("Lysine Scale").onChange( render );
        h.add( effectController,"lysineico",0,4,1).name("Lysine Ico Detail").onChange( render );
        h.add( effectController,"spionradius",2,30,1).name("SPION Radius").onChange( render );

        h = gui.addFolder("Pacakages");
        h.add( effectController,"nnitro",1,200,1).name("# Nitro").onChange( render );
        h.add( effectController,"nmuc",1,200,1).name("# Mucin").onChange( render );
        h.add( effectController,"nmrv",1,200,1).name("# 3MRV").onChange( render );
        h.add( effectController,"nglyoxyl",1,200,1).name("# Glyoxyl").onChange( render );
        h.add( effectController,"snitro",0.1,3,0.1).name("Scale of Nitro").onChange( render );
        h.add( effectController,"smuc",0.1,3,0.1).name("Scale of Mucin").onChange( render );
        h.add( effectController,"smrv",0.1,3,0.1).name("Scale of 3MRV").onChange( render );
        h.add( effectController,"sglyoxyl",0.1,3,0.1).name("Scale of Glyoxyl").onChange( render );


    }

    animate();

}

function fillScene() {

    createNewDendrimer();

}
function createNewDendrimer(){

    scene.remove(dendrimer);
    dendrimer = new THREE.Object3D();

    if (pegB == true){dendrimer.add(group2objSurface(peg_group,0.1*peg_scale,peg_ico,shell_rad));};
    if (psmaB == true){dendrimer.add(group2objSurface(psma_group,0.1,1,shell_rad+5*psma_scale));};
    if (spionB == true){dendrimer.add(group2objComponents(spion_group,0.075*spion_radius/10,1,0,0,0));};
    if (nitroB == true){dendrimer.add(group2objComponents(nitro_group,0.1*s_nitro,n_nitro,spion_radius,shell_rad-5*s_nitro,1));};
    if (mucB == true){dendrimer.add(group2objComponents(muc_group,0.1*s_muc,n_muc,spion_radius,shell_rad-5*s_muc,1));};
    if (mrvB == true){dendrimer.add(group2objComponents(mrv_group,1.0*s_mrv,n_mrv,spion_radius,shell_rad-5*s_mrv,1));};
    if (glyoxylB == true){dendrimer.add(group2objComponents(glyoxyl_group,1.0*s_glyoxyl,n_glyoxyl,spion_radius,shell_rad-5*s_glyoxyl,1));};
    if (lysineB == true){dendrimer.add(applyLysine(lysine_angle,lysine_branches,lysine_scale,lysine_ico,spion_radius));};
    scene.add(dendrimer);
}

function group2objSurface(comp_group, dim_scale, ico_detail, radius){
    comp_obj = new THREE.Object3D();
    comp_mesh = new THREE.Object3D();
    n_mesh = comp_group.children[0].children.length;
    for (i=0;i<n_mesh;i++){comp_mesh.add(comp_group.children[0].children[i].clone());};
        comp_mesh.scale.set(dim_scale,dim_scale,dim_scale);
    ico_geo = new THREE.IcosahedronGeometry(radius,ico_detail);
    vertices = ico_geo.vertices;
    n_vert = vertices.length;
    for (i=0;i<n_vert;i++){
        vertex = vertices[i];
        xrot = Math.atan2(vertex.z,vertex.y);
        zrot = Math.atan2(Math.sqrt(radius*radius - (vertex.x*vertex.x)),vertex.x);
        tmp1 = comp_mesh.clone();
        tmp1.rotation.z = zrot;
        tmp1.rotation.x = xrot;
        tmp1.position.x = vertex.x;
        tmp1.position.y = vertex.y;
        tmp1.position.z = vertex.z;
        comp_obj.add(tmp1);
    }
    return comp_obj;
}

function group2objComponents(comp_group, dim_scale,n_comp,rad_min,rad_max,random){
    comp_obj = new THREE.Object3D();
    comp_mesh = new THREE.Object3D();
    n_mesh = comp_group.children[0].children.length;
    for (i=0;i<n_mesh;i++){comp_mesh.add(comp_group.children[0].children[i].clone());};
        comp_mesh.scale.x=dim_scale;
    comp_mesh.scale.y=dim_scale;
    comp_mesh.scale.z=dim_scale;
    for (i=0; i < n_comp; i++){
        tmp1 = comp_mesh.clone();
        if (random == 1){
            rad = Math.random()*(rad_max-rad_min)+rad_min;
            phi = Math.random()*Math.PI;
            theta = Math.random()*2*Math.PI;
            tmp1.position.x = rad*Math.cos(phi);
            tmp1.position.y = rad*Math.sin(phi)*Math.sin(theta);
            tmp1.position.z = rad*Math.sin(phi)*Math.cos(theta);
            tmp1.rotation.z = Math.random()*2*Math.PI;
            tmp1.rotation.x = Math.random()*Math.PI;
        }
        comp_obj.add(tmp1);
    }
    return comp_obj;
}

function makeLysineTree(angle,branches,dim_scale) {
    branch = new THREE.Object3D();
    var level;
    var x_dist = -8.45*dim_scale;
    var y_dist = 0.7*dim_scale;

    lysine_i = lysine_group.children[0].children[0].clone();
    lysine_i.scale.set(dim_scale,dim_scale,dim_scale);

    lysine_i2 = lysine_i.clone();
    lysine_base = lysine_i.clone();

    lysine_i.rotation.z = -angle*Math.PI/180;
    lysine_i.rotation.x = Math.PI/2
    lysine_i.position.y = -y_dist;
    lysine_i.position.x = -x_dist;

    lysine_i2.rotation.z = angle*Math.PI/180;
    lysine_i2.rotation.x = Math.PI/2;
    lysine_i2.position.y = y_dist;
    lysine_i2.position.x = -x_dist

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

    return branch;
}


function applyLysine(angle,branches,dim_scale,ico_detail,radius){
    branch = makeLysineTree(angle,branches,dim_scale);

    branchParent = new THREE.Object3D()
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
            effectController.Glyoxyl !== glyoxylB ||
            effectController.pegscale !== peg_scale ||
            effectController.pegico !== peg_ico ||
            effectController.psmascale !== psma_scale ||
            effectController.psmaico !== psma_ico ||
            effectController.shellrad !== shell_rad ||
            effectController.lysineangle !== lysine_angle ||
            effectController.lysinebranches !== lysine_branches ||
            effectController.lysinescale !== lysine_scale ||
            effectController.lysineico !== lysine_ico ||
            effectController.spionradius !== spion_radius ||
            effectController.nnitro !== n_nitro ||
            effectController.nmuc !== n_muc ||
            effectController.nmrv !== n_mrv ||
            effectController.nglyoxyl !== n_glyoxyl ||
            effectController.snitro !== s_nitro ||
            effectController.smuc !== s_muc ||
            effectController.smrv !== s_mrv ||
            effectController.sglyoxyl !== s_glyoxyl )

    {
        psmaB = effectController.PSMA;
        pegB = effectController.PEG;
        lysineB = effectController.Lysine;
        spionB = effectController.SPION;
        nitroB = effectController.Nitro;
        mucB = effectController.Mucin;
        mrvB = effectController.mrv;
        glyoxylB = effectController.Glyoxyl;
        peg_scale = effectController.pegscale;
        peg_ico = effectController.pegico;
        psma_scale = effectController.psmascale;
        psma_ico = effectController.psmaico;
        shell_rad = effectController.shellrad;
        lysine_angle = effectController.lysineangle;
        lysine_branches = effectController.lysinebranches;
        lysine_scale = effectController.lysinescale;
        lysine_ico = effectController.lysineico;
        spion_radius = effectController.spionradius;
        n_nitro = effectController.nnitro;
        n_muc = effectController.nmuc;
        n_mrv = effectController.nmrv;
        n_glyoxyl = effectController.nglyoxyl;
        s_nitro = effectController.snitro;
        s_muc = effectController.smuc;
        s_mrv = effectController.smrv;
        s_glyoxyl = effectController.sglyoxyl;


        createNewDendrimer();
    }

    renderer.render(scene, camera);

}