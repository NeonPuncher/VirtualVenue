const loader = new THREE.GLTFLoader();

//Get models from Array (LATER REPLACE WITH JSON)
const models = [
    {
        name: "Effenaar",
        description: "The grote concerthal from the famous Effenaar in Eindhoven",
        thumbsrc: "./images/EffenaarThumb.jpg",
        path: "./models/Effenaar.glb",
        tags: ["Indoor","Hall","Big","Crowded"],
        scale: 0.3
    },
    {
        name: "Cyber City",
        description: "A Cyber City fit for EDM music, the color of the building lights is reactive to the beat of the music.",
        thumbsrc: "./images/CyberCity2Thumb.jpg",
        path: "./models/CyberCity2.glb",
        tags: ["Cyber","City","EDM","Lights"],
        scale: 0.15
    },
    {
        name: "Dream Beach Club",
        description: "A relaxing dream beach club with neon palms and summery vibes",
        thumbsrc: "./images/BeachThumb.jpg",
        path: "./models/Beach.glb",
        tags: ["Beach","Summer","Dream"],
        scale: 0.3
    },
    {
        name: "Concert Hal",
        description: "A generic Concerthal modeled after nothing for all use",
        thumbsrc: "./images/ConcerthalThumb.jpg",
        path: "./models/Concerthal.glb",
        tags: ["Indoor","Hall","Small","Crowded"],
        scale: 0.4
    },
    {
        name: "Small Town Cafe",
        description: "A cozy cottage Bar that drives home country music and / or Carneval music",
        thumbsrc: "./images/CafeThumb.jpg",
        path: "./models/Cafe.glb",
        tags: ["Small","Cafe","Country","Carneval"],
        scale: 0.3
    },
    {
        name: "Melenia",
        description: "The blade of Miquella, sworn enemy of Radahn. One of the thoughest bosses in Elden Ring",
        thumbsrc: "./images/MeleniaThumb.jpg",
        path: "./models/Melenia.glb",
        tags: ["Elden Ring","Boss","Monster","Miquella"],
        scale: 2
    },
    {
        name: "Monster",
        description: "The scary monster from hitgame Tarnished",
        thumbsrc: "./images/MonsterThumb.jpg",
        path: "./models//Monster.glb",
        tags: ["Scary","Monster","Big","Spooky"],
        scale: 2
    },
];
//Model Filter
let modelFilter = [];
function filter() {
    const tagArea = document.getElementById("tagArea").value;
    if(tagArea != '') {
        modelFilter = models.filter(models => {
            return models.tags.includes(tagArea);
        }); 
        console.log(modelFilter)
    } else if(tagArea == '')
    {modelFilter = models}
}


//Get Skybox Texture
function createPathString(filename) {
    const basePath = "./models/skybox/";
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ["ft","bk","up","dn","rt","lf"];
    const pathString = sides.map(side => {
        return baseFilename + "_" + side + fileType;
    });
    return pathString
}
//Map Skybox texture
function createMaterialArray(filename) {
  const skyboxImagepaths = createPathString(filename);
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
  });
  return materialArray;
}

//Add Skybox
function createSky(scene) {
    var selectedObject = scene.getObjectByName("skybox");
    scene.remove( selectedObject );
    let skyboxImage = document.getElementById("skyboxtex").value;
    document.getElementById("SkySelect").src = "./models/skybox/" + skyboxImage + "_bk.png";
    const materialArray = createMaterialArray(skyboxImage);
    skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.name = "skybox";
    scene.add(skybox);
}


//Add lighting
function AddLights(scene) {
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(2, 2, 5);
    scene.add(light);
}

//LoadModel function
function LoadModel(modelPath, scale, loaded) {
    loader.load(modelPath, function (glft) {
        const model = glft.scene;
        model.position.set(0, -.7, 0);
        model.scale.set(scale, scale, scale);
        loaded(model);
    }, undefined, function (error) {
        console.error(error);
    });
}

//3D model Renderer Variables
const containerWidth = 1200;
const containerHeight = window.innerHeight
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
let activeModel = null;

//ModelSwitcher Button Generator with Title, description and images
//MAAK HIER NOG EEN FOR LOOP BIJ OM DOOR DE TAGS TE LOPEN!!
function MakeButtons() {
    const modelButtonContainer = document.getElementById('modelButtonContainer');
    const prevButtons = document.getElementsByClassName('stagecontainer');
    while(prevButtons.length > 0)
    {prevButtons[0].parentNode.removeChild(prevButtons[0]);}
    filter();
    for (let i = 0; i < modelFilter.length; i++) {
        //Creating DOMElements
        const button = document.createElement('button');
        const thumbnail = document.createElement('button');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const tags = document.createElement('p');
        const textdiv = document.createElement('div');
        //Setting Attributes
        button.setAttribute('model-id', i);
        button.className = "stagecontainer";
        button.classList.add('model-load-button');
        textdiv.className = "textDiv";
        title.innerHTML = modelFilter[i].name;
        thumbnail.innerHTML="<img class='stageimage' src="+ modelFilter[i].thumbsrc + ">";
        description.innerHTML = modelFilter[i].description;
        tags.innerHTML ="/"+modelFilter[i].tags+"/";
        //Appending to Parents
        modelButtonContainer.appendChild(button);
        button.appendChild(thumbnail);
        button.appendChild(textdiv);
        textdiv.appendChild(title);
        textdiv.appendChild(description);
        textdiv.appendChild(tags);
    }

    //Give Buttons the loadmodel function
    const buttons = document.getElementsByClassName('model-load-button');
    Array.prototype.forEach.call(buttons, function (button) {
    button.onclick = () => {
        const model = modelFilter[button.getAttribute('model-id')];
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        } 
        LoadModel(model.path, model.scale, (loadedModel) => {
            activeModel = loadedModel;
            scene.add(activeModel);
            
        });
        createSky(scene)
        AddLights(scene);
        document.getElementById('stageName').innerHTML = model.name;
        document.getElementById("sceneName").innerHTML = model.name;
        document.getElementById("thumbnailsrc").style.display = "none";
        document.getElementById("thumbnailsrc").innerHTML = model.thumbsrc;
    }
});
}
MakeButtons();

//Generate Renderer and Camera
//Animate with a rotation
const container = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(containerWidth, containerHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
camera.position.z = 5;

//Animate Function 
function animate() {
    requestAnimationFrame(animate);

    if (activeModel) {
        activeModel.rotation.y += 0.00001;
    }

    controls.update();
    renderer.setClearColor( 0xf0f0f0, 1);
    renderer.render(scene, camera);
};
animate();

