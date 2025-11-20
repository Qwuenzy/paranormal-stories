import { EventEmitter } from 'node:events';
import createAlert from '../utils/createAlert.js'



export default async function sightLocation(sightingadded) {
    try {
        const sightingEvents = new EventEmitter()

        sightingEvents.on('sightingEvents', createAlert)

        sightingEvents.emit('sightingEvents', sightingadded)
}catch (err){
    console.log(err);
    
}
}

