var tdata = [
711.4, 59.6, -14.1,
710.5, 120.9, -15.6,
710.1, 176.1, -17.1,
710.3, 239.1, -20.4,
709.9, 301.4, -21.9,
711.9, 361.9, -23.3,
714.1, 421.4, -24.3,
720.4, 479.6, -25.4,
724.9, 537.6, -27.7,
729.0, 594.1, -29.9,
735.7, 647.2, -31.3,
741.6, 701.1, -33.1,
750.1, 753.0, -34.8,
757.8, 804.7, -36,
765.6, 856.6, -37.8,
774.1, 905.0, -39.3,
782.6, 952.4, -40.5,
793.0, 998.5, -41.8
];

var renderer, scene, camera, dynTex, cyl;
var w = 856, h = 475;
var rotAxis;
var Canvas3d;
var interval, media;

function deg2rad(d) {
    return d * Math.PI / 180;
}


function show() {
    updatePosition();
    Canvas3d.style.display = 'block';
}

function hide() {
    Canvas3d.style.display = 'none';
}

function stop() {
    media.pause();
}

function play() {
    media.play();
}

function onPlayStart() {
    Canvas3d = document.getElementsByTagName('canvas')[0];
    Canvas3d.style.display = 'block';

    media.onended = function() {
        clearInterval(interval);
        Canvas3d.style.display = 'none';
    }

    interval = setInterval(function() {

        updatePosition();

    }, 1000 / 60);

}

var frate = 29.97; // US TV standard
function updatePosition() {

    var frame = Math.floor(media.currentTime * frate);

    var start = 105;

    if(frame < start || frame > start + 18) {
        // out of view
        cyl.position.y = 1000;
        return;
    }

    var cp = frame - 105;

    cyl.rotation.z = deg2rad(tdata[cp * 3 + 2] - 13);

    cyl.position.z = tdata[cp * 3] / 120 - 5;
    cyl.position.y = -tdata[cp * 3 + 1] / 120;


}

function init() {


    media = document.getElementById('video');

    dynTex  = new THREEx.DynamicTexture(512, 256);
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 10000 );
    var aspect = w / h;
    var d = 5;
    //camera = new THREE.OrthographicCamera( -d*aspect, d*aspect, d, -d, 01, 1000);

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });

    renderer.setSize(w, h);

    document.getElementById('container').appendChild( renderer.domElement );

    var geometry = new THREE.CylinderGeometry(1.7, 1.7, 6, 32, 10, false);
    var material = new THREE.MeshBasicMaterial( {
        color: 0xFFFFFF,
        map: dynTex.texture
        //, wireframe: true
    } );

    dynTex.context.font = '60px Arial';
    dynTex.drawText('John Smith', 0, 160, 'white');

    cyl = new THREE.Mesh( geometry, material );

    // cyl.rotateY(deg2rad(-90));
    // cyl.rotateZ(deg2rad(30));
    // cyl.rotateX(deg2rad(30));

    // cyl.translateY(-2);
    // cyl.translateZ(1);

    scene.add( cyl );
    scene.add(camera);

    //camera.position.z = 5;

    camera.position.set(7, -1, -4);
    camera.lookAt(scene.position);

    // var a = new THREE.Vector3( 1, 0, 0 );
    // var b = new THREE.Vector3( 0, 0, 1 );

    // rotAxis = new THREE.Vector3();
    // rotAxis.crossVectors( a, b );

    cyl.rotateY(-35 * Math.PI / 180);

    render();

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function changeName() {
    var name = document.getElementById('name').value;
    dynTex.clear();
    dynTex.drawText(name, 32, 126);
    dynTex.texture.neeedsUpdate = true;
    return false;
}
