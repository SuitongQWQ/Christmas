let scene,camera,renderer,controls,render;
var qwq = document.getElementById("qwq");
var qvq = document.getElementById("click");

qwq.style.width = window.innerWidth + "px";
qwq.style.height = window.innerHeight + "px";

const init = () => {
	//Scene(场景)
	scene = new THREE.Scene;
	scene.background = new THREE.Color("#ff6969");
	//renderer(渲染器)
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);

	//天空贴图

	//网格
	/*var grid2=new THREE.GridHelper(10000,100);
	scene.add(grid2);*/

	//相机
	const aspect = window.innerWidth / window.innerHeight;		//获取窗口的尺寸
	camera = new THREE.PerspectiveCamera(70,aspect,0.01,5000);		//(相机角度,相机成像长宽比,相机最低能见度,相机最高能见度)
	camera.rotation.y = (90/180) * Math.PT;		//摄像机角度
	camera.position.set(0,75,223);		//摄像机位置
	camera.lookAt(0,40,0);
	render = function (){
		renderer.render( scene, camera )
	}

	//创建一个音频,将其添加到相机
	var listener = new THREE.AudioListener();
	camera.add( listener );
	var sound = new THREE.Audio( listener );		//创建一个全局音频源
	var audioLoader = new THREE.AudioLoader();		//加载一个声音并将其设置为音频对象的缓冲区
	audioLoader.load( "./MP3/Jingle_bells.mp3", function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( 0.5 );
		sound.play();
	});

	//控制器
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);
	controls.update();
	controls.target=new THREE.Vector3(0,40,0);
	function animate() {
		requestAnimationFrame( animate );
		controls.autoRotate=true;
		controls.update();
		renderer.render( scene, camera );
	}
	animate();

	//环境光
	ambientLight = new THREE.AmbientLight("#8ebeff");
	ambientLight.position.set(-4,330,282);
	scene.add(ambientLight);

	//点光源
	var point = new THREE.PointLight("#ff7800");
	point.position.set(157,200,300);
	scene.add(point);

	//下雪特效
	let textureOrgin = new THREE.TextureLoader().load("./image/xh.png");
	group = new THREE.Group()
	for (let i =0; i< 50; i++) {
		const spriteMaterial = new THREE.SpriteMaterial({
			map: textureOrgin
		})
		const sprite = new THREE.Sprite(spriteMaterial)
		group.add(sprite)
		sprite.scale.set(0.1, 0.1, 0.1)
		let k1 = Math.random() - 0.5
		let k2 = Math.random() - 0.5
		sprite.position.set(k1 * 10, 8 * Math.random(), 10 * k2)
	}
	scene.add(group)

	//loader(导入建模)
	const loader = new THREE.GLTFLoader();
	loader.load("./modeling/sds.gltf",(result) => {
		scene.add(result.scene);
		renderer.render(scene,camera);
		
	});
	
	renderer.render(scene,camera);
	
}

if(window.innerWidth/window.innerHeight > (9/16)){
	console.log("电脑");
	init();
}else{
	qwq.style.backgroundImage = "url(" + "./image/cover.png" + ")";
	qvq.onclick = function(){
		init();
	}
	console.log("手机");
}
// init();
