import * as THREE from "three";
import { GUI } from "lil-gui";

export const setupLighting = (scene, paintings) => {
  // Initialize GUI
  const gui = new GUI();

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // GUI for Ambient Light
  const ambientFolder = gui.addFolder("环境光");
  ambientFolder.add(ambientLight, "intensity", 0, 2).name("强度");

  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.57079;
    spotlight.penumbra = 0.2;
    spotlight.decay = 1;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    // Add spotlight and its target to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Add a helper for this spotlight
    // const spotlightHelper = new THREE.SpotLightHelper(spotlight);
    // scene.add(spotlightHelper);

    // Create a GUI folder for this spotlight
    const folder = gui.addFolder(`聚光灯 (${x}, ${y}, ${z})`);
    folder.add(spotlight, "intensity", 0, 4).name("强度");
    folder.add(spotlight, "angle", 0, Math.PI / 2).name("角度");
    folder.add(spotlight, "penumbra", 0, 1).name("半影");
    folder.add(spotlight, "decay", 0, 2).name("衰减");
    folder.add(spotlight, "distance", 0, 100).name("距离");
    folder.add(spotlight.position, "x", -50, 50).name("X");
    folder.add(spotlight.position, "y", -50, 50).name("Y");
    folder.add(spotlight.position, "z", -50, 50).name("Z");
    folder.add(spotlight.target.position, "x", -50, 50).name("目标X");
    folder.add(spotlight.target.position, "y", -50, 50).name("目标Y");
    folder.add(spotlight.target.position, "z", -50, 50).name("目标Z");

    return spotlight;
  }

  const frontWallSpotlight = createSpotlight(
    0,
    6.7,
    -13,
    0.948,
    new THREE.Vector3(0, 0, -20)
  );

  const backWallSpotlight = createSpotlight(
    0,
    6.7,
    13,
    0.948,
    new THREE.Vector3(0, 0, 20)
  );

  const leftWallSpotlight = createSpotlight(
    -13,
    6.7,
    0,
    0.948,
    new THREE.Vector3(-20, 0, 0)
  );

  const rightWallSpotlight = createSpotlight(
    13,
    6.7,
    0,
    0.948,
    new THREE.Vector3(20, 0, 0)
  );

  const statueSpotlight = createSpotlight(
    0,
    10,
    0,
    0.948,
    new THREE.Vector3(0, -4.2, 0)
  ); // Spotlight for the statue
  statueSpotlight.angle = 0.75084;
  statueSpotlight.decay = 1;
  statueSpotlight.penumbra = 1;
  statueSpotlight.distance = 0;

  const statueSpotlightFolder = gui.addFolder("雕像灯光");
  statueSpotlightFolder.add(statueSpotlight, "intensity", 0, 4).name("强度");
  statueSpotlightFolder
    .add(statueSpotlight, "angle", 0, Math.PI / 2)
    .name("角度");
  statueSpotlightFolder.add(statueSpotlight, "penumbra", 0, 1).name("半影");
  statueSpotlightFolder.add(statueSpotlight, "decay", 0, 2).name("衰减");
};
