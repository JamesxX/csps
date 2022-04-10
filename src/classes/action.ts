import {v4 as uuidv4} from 'uuid'

export default class action{
    
    constructor( 
        public uuid : string = uuidv4(),
        public grant : string = uuidv4(),
        public delegate : string = uuidv4()
    ){
        // Chirp Chirp
    }
}