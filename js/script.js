const loader = new THREE.GLTFLoader();

//Get models from Array (LATER REPLACE WITH JSON)
const models = [
    {
        name: "Effenaar",
        description: "The grote concerthal from the famous Effenaar",
        thumbsrc: "./images/EffenaarThumb.jpg",
        path: "./models/Effenaar.glb",
        tags: ["Indoor","Hall","Big","Crowded"],
        scale: 0.3
    },
    {
        name: "Monster",
        description: "The scary monster from hitgame Tarnished",
        thumbsrc: "./images/MonsterThumb.jpg",
        path: "./models//Monster.glb",
        tags: ["Scary","Monster","Big","Spooky"],
        scale: 2
    },
    {
        name: "Hornet",
        description: "A character from the hitgame Hollow Knight",
        thumbsrc: "./images/HornetThumb.jpg",
        path: "./models/Hornet.glb",
        tags: ["Insect","Monster","Bug","Shaw"],
        scale: 0.7
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
        name: "Melenia",
        description: "The blade of Miquella, sworn enemy of Radahn. One of the thoughest bosses in Elden Ring",
        thumbsrc: "./images/MeleniaThumb.jpg",
        path: "./models/Melenia.glb",
        tags: ["Elden Ring","Boss","Monster","Miquella"],
        scale: 2
    },
    {
        name: "Cucumber",
        description: "A green cucumber that is a 1:1 recreation of a real cucumber.",
        thumbsrc: "./images/KomkommerThumb.jpg",
        path: "./models/Komkommer.glb",
        tags: ["Green","Monster","Long","Moist"],
        scale: 5
    }
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

//Add lighting
function AddLights(scene) {
    const light = new THREE.DirectionalLight(0xffffff, 2);
    const light2 = new THREE.DirectionalLight(0xfc035a, 1);
    light.position.set(2, 2, 5);
    light.position.set(-2, 2, -3);
    scene.add(light, light2);
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
const containerWidth = 1000;
const containerHeight = 750;
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
        title.innerHTML = modelFilter[i].name;
        thumbnail.innerHTML="<img ' width=\'100px\' height=\'150px\' src="+ modelFilter[i].thumbsrc + ">";
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
        AddLights(scene);
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
        activeModel.rotation.y += 0.003;
    }

    controls.update();
    renderer.setClearColor( 0xf0f0f0, 1);
    renderer.render(scene, camera);
};
animate();

