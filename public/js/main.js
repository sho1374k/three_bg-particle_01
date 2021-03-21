window.addEventListener("DOMContentLoaded", init);

function init() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  canvas();
  function canvas() {
    // レンダー
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("canvas"),
      alpha: true
    });
    // サイズ
    renderer.setSize(width, height);
    // シーン作成
    const scene = new THREE.Scene();
    // カメラ作成
    const camera = new THREE.PerspectiveCamera(
      45, width / height, 1 ,10000
    );
    camera.position.set(0,0,20);

    // オブジェクト作成
    particles(5, .5);
    particles(15, .5);
    particles(20, .3);
    particles(10, .5);
    function particles(size, opacity) {
      const loader = new THREE.TextureLoader();
      const image = loader.load("img/particle.png");

      const geometry = new THREE.SphereGeometry();
      for (let i = 0; i < 100; i++) {
        geometry.vertices.push(
          new THREE.Vector3(
            2000 * (Math.random() - 0.5),
            2000 * (Math.random() - 0.5),
            2000 * (Math.random() - 0.5)
          )
        );
      }

      const material = new THREE.PointsMaterial({
        size: size,
        map: image,
        transparent: true       //透過許可
      });
      material.opacity = opacity;

      const mesh = new THREE.Points(geometry, material);
      mesh.position.set(
        2000 * (Math.random() - 0.5),
        2000 * (Math.random() - 0.5),
        Math.random()*50 - 50
      );
      scene.add(mesh);

      // アニメーション
      tick();
      function tick() {
        mesh.rotation.x +=　Math.random()*0.0002 - 0.0002;
        mesh.rotation.y += Math.random()*0.0002 - 0.0002;
        requestAnimationFrame(tick);
      }
    }

     // カメラの確度
    let rotX = 0;
    let rotY = 0;
    // マウス座標
    let mouseX = 0;
    let mouseY = 0;

    // マウス座標取得
    document.addEventListener("mousemove", function(e){
      mouseX = (-(e.clientX / width) * 2 )*10;
      mouseY = ((e.clientY / height) * 2)*10;
    });

    // アニメーション
    tick();
    function tick() {
      rotX += (mouseX - rotX) * 0.02; 
      rotY += (mouseY - rotY) * 0.02; 
      camera.position.set(
        rotX,
        rotY,
        20
      )
      camera.lookAt(new THREE.Vector3(1,1,1));
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }
};
