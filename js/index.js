const canvas = document.querySelector('canvas')
const context=canvas.getContext('2d')

canvas.width=window.innerWidth
canvas.height=window.innerHeight

class Player{
    constructor(){
        
        this.velocity={
            x:0,
            y:0
        }

        const image=new Image()
        image.src='./Image/Player.png'
        image.onload=()=>{
            const scale=0.15
            this.image=image
            this.width=image.width *scale
            this.height=image.height *scale
            this.position={
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

       
    }

    draw(){
        // context.fillStyle='green'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (this.image)
            context.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
    }
    update(){
        if (this.image){
        this.draw()
        this.position.x += this.velocity.x
        }
    }
}

const player=new Player()
const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    space:{
        pressed:false
    }
}
player.draw()

function animate(){
    requestAnimationFrame(animate)
    context.fillStyle='black'
    context.fillRect(0,0,canvas.width,canvas.height)
    // console.log('default')
    // player.draw()
    player.update()

    if (keys.a.pressed){
        player.velocity.x= -5
    } else if(keys.d.pressed){
        player.velocity.x=5
    }
    else{
        player.velocity.x = 0
    }
}

animate()

addEventListener('keydown',({key})=>{
    switch(key){
        case 'a':
            console.log('left')
            // player.velocity.x = -5
            keys.a.pressed=true
            break
        case 'd':
            console.log('right')
            keys.d.pressed=true
            break
        case ' ':
            console.log('space')
            break
    }
})

addEventListener('keyup',({key})=>{
    switch(key){
        case 'a':
            console.log('left')
            // player.velocity.x = -5
            keys.a.pressed=false
            break
        case 'd':
            console.log('right')
            keys.d.pressed=false
            break
        case ' ':
            console.log('space')
            break
    }
})
