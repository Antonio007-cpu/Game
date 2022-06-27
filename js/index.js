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
        image.src='./Image/pngwing.com.png'
        image.onload=()=>{
            const scale=0.08
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

class Projectile {
    constructor({position, velocity}){
        this.position=position
        this.velocity=velocity

        this.radius=4
    }

    draw(){
        context.beginPath()
        context.arc(this.position.x ,this.position.y ,this.radius , 0, Math.PI * 2)
        context.fillStyle = 'green'
        context.fill()
        context.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}

class InvaderProjectile {
    constructor({position, velocity}){
        this.position=position
        this.velocity=velocity

        this.radius=5
    }

    draw(){
        context.beginPath()
        context.arc(this.position.x ,this.position.y ,this.radius , 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()
        context.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}

class Virus{
    constructor({position}){
        this.velocity={
            x:0,
            y:0
        }

        const image=new Image()
        image.src='./Image/virus.png'
        image.onload=()=>{
            const scale=0.08
            this.image=image
            this.width=image.width *scale
            this.height=image.height *scale
            this.position={
                x: position.x,
                y: position.y
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
    update({velocity}){
        if (this.image){
        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y
        }
    }

    shoot(invaderProjectiles){
        invaderProjectiles.push(new InvaderProjectile({
            position:{
                x: this.position.x + this.width/2,
                y: this.position.y + this.height
            },
            velocity:{
                x:0,
                y:7
            }
        }))
    }
}

class Grid{
    constructor(){
        this.position ={
            x:0,
            y:0
        }

        this.velocity ={
            x:3,
            y:0
        }
        this.virus =[]

        const columns = Math.floor(Math.random() *3 + 5)
        const rows =Math.floor(Math.random() * 3 + 2)

        this.width =columns * 70
        for(let x=0; x<columns; x++){
            for(let y=0; y<rows; y++){
            this.virus.push(new Virus({position:{
                x:x * 70,
                y:y*50
            }}))
        }}
        console.log(this.virus)
    }
 
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y =0

        if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x
            this. velocity.y=25
        }
    }
}


const player=new Player()
const projectiles =[]
const grids=[]
const invaderProjectiles=[]

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

let frames = 0
let randomInterval =Math.floor((Math.random() * 500) + 500)


function animate(){
    requestAnimationFrame(animate)
    context.fillStyle='black'
    context.fillRect(0,0,canvas.width,canvas.height)
    // console.log('default')
    // player.draw()
    player.update()
    invaderProjectiles.forEach((invaderProjectile, index) =>{

        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height){
            setTimeout(() =>{
                invaderProjectiles.splice(index, 1)
                },0)
        } else { invaderProjectile.update()}

        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y && invaderProjectile.position.x + invaderProjectile.width >= player.position.x && invaderProjectile){
            console.log('You Lose!')
        }
    })

    projectiles.forEach((projectile,index) =>{

        if (projectile.position.y + projectile.radius <=0){
            setTimeout(() =>{
            projectiles.splice(index, 1)
            },0)
        }
        else{
            projectile.update()
        }
    })

    grids.forEach((grid,gridIndex) => {
        grid.update()
        //Spawning projectiles from virus
        if (frames % 100 === 0 && grid.virus.lenght > 0){
            grid.virus[Math.floor(Math.random() * grid.virus.lenght)].shoot(invaderProjectiles)
        }


        grid.virus.forEach((virus,i) =>{
            virus.update({velocity: grid.velocity})

            projectiles.forEach((projectile, j) =>{
                if(projectile.position.y - projectile.radius <= virus.position.y + virus.height && projectile.position.x + projectile.radius >= virus.position.x && projectile.position.x - projectile.radius <= virus.position.x + virus.width && projectile.position.y + projectile.radius >= virus.position.y ){
                    setTimeout(() =>{
                        const virusFound = grid.virus.find((virus2) =>
                            virus2 ===virus
                        )
                        const projectileFound = projectiles.find((projectile2) => projectile2===projectile)

                        if (virusFound&&projectileFound){
                           grid.virus.splice(i,1)
                           projectile.splice(j,1) 
                        }

                        if (grid.virus.lenght >0){
                            const firstvirus=grid.virus[0]
                            const lastvirus=grid.virus[grid.virus.lenght - 1]

                            grid.width = lastvirus.position.x - firstvirus.position.x +lastvirus.width

                            grid.position.x = firstvirus.position.x
                        }
                        else{
                            grids.splice(gridIndex, 1)
                        }
                        
                    },0)
                }
            })
        })
    })

    if (keys.a.pressed && player.position.x >=0){
        player.velocity.x= -5
    } else if(keys.d.pressed && player.position.x + player.width <=canvas.width){
        player.velocity.x=5
    }
    else{
        player.velocity.x = 0
    }
    if (frames % randomInterval===0){
        grids.push(new Grid())
        randomInterval =Math.floor((Math.random() * 500) + 500)
        frames=0
    }

    
    

    frames++
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
            projectiles.push(new Projectile({
                position:{
                    x: player.position.x + player.width/2,
                    y: player.position.y
                },
                velocity:{
                    x:0,
                    y:-10
                }
            }))
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
