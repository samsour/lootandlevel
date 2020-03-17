var SAT = require('sat');

const check = (entities)=>{
    entities.forEach(e => {
        entities.forEach(f =>{
            if (e != f){
                if(SAT.testCircleCircle(e.hitbox, f.hitbox))
                    console.log("hit")
            }
        })
    });
}


export default{
    check
}