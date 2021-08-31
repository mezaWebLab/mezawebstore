import Utils from "./Utils";
import Cube from "./Cube";
import * as BABYLON from "babylonjs";

class World {
    canvas: HTMLCanvasElement;
    showAxis: boolean;
    cameraControls: boolean;
    cubes: Array<any>;
    cubesAmount: number;
    cubeRotationSpeed: number;
    cubeMovementSpeed: number;
    minCubeSize: number;
    maxCubeSize: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
    engine: BABYLON.Engine;
    scene?: BABYLON.Scene;
    camera?: BABYLON.ArcRotateCamera;
    target?: any;
    utils?: Utils;
    glow?: any;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.showAxis = false;
        this.cameraControls = false;
        this.cubes = [];
        this.cubesAmount = window.innerWidth < 640 ? 50 : 100;
        this.cubeRotationSpeed = 0.005;
        this.cubeMovementSpeed = 0.001;
        this.minCubeSize = 0.5;
        this.maxCubeSize = 1;
        this.minX = 0;
        this.maxX = 50;
        this.minY = -20;
        this.maxY = 5;
        this.minZ = -10;
        this.maxZ = 10;
        this.engine = new BABYLON.Engine(this.canvas, true, null, true);
        this.createScene();
        this.createCubes();

        this.engine.runRenderLoop(() => {
            this.update();
            // @ts-ignore
            this.scene.render();
        });

        this.onScroll();

        window.addEventListener("resize", () => this.engine.resize());
    }

    createScene() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0.125, 0.125, 0.125, 1);
        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(-5, 5, 0), this.scene);
        if (this.cameraControls) this.camera.attachControl(this.canvas, true);
        // @ts-ignore
        this.target = new BABYLON.MeshBuilder.CreateSphere("sphere", { diameter : 0.25 }, this.scene);
        // @ts-ignore
        this.target.material = new BABYLON.StandardMaterial("target-material");
        this.target.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        this.target.position = new BABYLON.Vector3(2, 2, 0);
        this.target.material.alpha = 0;
        this.camera.setTarget(this.target);
        this.utils = new Utils(this, { showAxis: this.showAxis });
        this.glow = new BABYLON.GlowLayer("glow", this.scene);
        this.glow.intensity = 1;
    }

    createCubes() {
        for (let i = 0; i < this.cubesAmount; i++) {
            // @ts-ignore
            var size = this.utils.getRanNum(this.minCubeSize, this.maxCubeSize),
            // @ts-ignore
                position = new BABYLON.Vector3(this.utils.getRanNum(this.minX, this.maxX), this.utils.getRanNum(this.minY, this.maxY), this.utils.getRanNum(this.minZ, this.maxZ)),
                // @ts-ignore
                rotation = new BABYLON.Vector3(this.utils.getRanNum(this.minX, this.maxX), this.utils.getRanNum(this.minY, this.maxY), this.utils.getRanNum(this.minZ, this.maxZ)),
                emissiveColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

            this.cubes.push(new Cube(size, position, rotation, emissiveColor));
        }
    }

    update() {
        this.cubes.forEach(cube => {
            cube.mesh.rotation.x += this.cubeRotationSpeed;
            cube.mesh.rotation.y += this.cubeRotationSpeed;
            cube.mesh.rotation.z += this.cubeRotationSpeed;
            cube.mesh.position = new BABYLON.Vector3(cube.mesh.position.x, cube.mesh.position.y - this.cubeMovementSpeed, cube.mesh.position.z - this.cubeMovementSpeed);
        });
    }

    onScroll() {
        let lastScrollTop = 0;

        window.addEventListener("scroll", () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > lastScrollTop){
                // downscroll code
                this.cubes.forEach(cube => {
                    cube.mesh.position.y += 0.05;
                });
            } else {
                // upscroll code
                this.cubes.forEach(cube => {
                    cube.mesh.position.y -= 0.05;
                });
            }

            lastScrollTop = st <= 0 ? 0 : st;
        });

        window.addEventListener("scrollend", () => {
            console.log("scroll endded bitch");
        })
    }
}

export default World;