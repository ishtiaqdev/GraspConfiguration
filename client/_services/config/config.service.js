
//Other services can also be created using TypeScript in _services folder and can be injected to the constructors of 
//relevant components for Dependency Injection. If those components have an interface type in their constructors
//and if these services implement that particular interface, then it can be used for mock testing by passing
// mock types implementing that interface into constructors. But, due to time constraints, I am using React with hooks.
export class ConfigService {
    constructor() {}

    //configurable API URL according to deployed server.
    //private _api_url: string = 'http://localhost:3000/api/';


    //Grasp URL private fields
    //private _ListOfGrasps_url: string = this._api_url + '/grasps';


    //Grasp URL public access
    //public getListOfGrasps_url():string { return this._ListOfGrasps_url; }


    //Further API's url can be written here.
}