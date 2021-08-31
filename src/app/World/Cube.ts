import * as BABYLON from "babylonjs";

class Cube {
    uniqueKey: string;
    mesh: any;

    constructor(size: any, position: any, rotation: any, emissiveColor: any) {
        this.uniqueKey = `cube-${ Math.round(Math.random() * 1000) }`;
         // @ts-ignore
        this.mesh = new BABYLON.MeshBuilder.CreateBox(this.uniqueKey, { size });
        this.mesh.position = position;
        this.mesh.rotation = rotation;
         // @ts-ignore
        this.mesh.material = new BABYLON.StandardMaterial(`${this.uniqueKey}-material`);
         // @ts-ignore
        this.mesh.material.emissiveColor = new BABYLON.Color3.FromHexString(emissiveColor);
    }
}

export default Cube;