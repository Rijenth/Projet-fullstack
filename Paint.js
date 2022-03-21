// Fonction qui permet le download en format PNG
function capture() {

    const captureElement = document.querySelector('#download')
    html2canvas(captureElement)
      .then(canvas => {
        canvas.style.display = 'none'
        document.body.appendChild(canvas)
        return canvas
      })
      .then(canvas => {
        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        const a = document.createElement('a')
        a.setAttribute('download', 'my-image.png')
        a.setAttribute('href', image)
        a.click()
        canvas.remove()
      })
}

 /* Script qui permet au bouton "Charger" de rediriger vers une page PHP  */
            
document.getElementById("choix").onclick = function () {
location.href = "show_draw.php";}

/* Cette partie permet de télécharger ce que contient le canvas en PDF. */
window.onload = function () {
document.getElementById('btn').addEventListener("click", function () {
html2canvas(document.getElementById('canvas')).then(function (canvas) {
document.body.appendChild(canvas);
var imgdata = canvas.toDataURL("image/jpg");
var doc = new jspdf.jsPDF('p', 'mm', [452, 792]);
doc.addImage(imgdata, "JPG", 1, 1);
doc.save("sample.pdf");    
        });
    })

}

//création du canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const rect = canvas.getBoundingClientRect()

let cw=canvas.width
let ch=canvas.height
//variable couleur
let colorChoice
let strokeChoice
//les variables états
let isDragging=false
let state = false
let stateBorder = [false, false, false, false, false, false, false]
//[bordure gauche, bordure droite, bordure haute, bordure basse, corner gauche haut, corner droit haut, corner gauche bas, corner droit bas]
//ltableaux des formes
let shapes = []
let saveTab = []
//les coordonées en x et y du 1er clic lors du dragging
let startX
let startY
let selectedShapeIndex


let input
let fontfamily = "serif"
//Selection style de police

function fontfamilySelection(){
    let monselectPolice = document.getElementById('m1').value;
    if(monselectPolice === "serif"){
        fontfamily = "serif";
        console.log(fontfamily);
        }
    else if(monselectPolice  === "Helvetica"){
        fontfamily = "Helvetica";
        console.log(fontfamily);
        }
    else if(monselectPolice === "Segoe Print"){
        fontfamily = "Segoe Print" ;
        console.log(fontfamily);
        }
}
function writetext(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', addInput)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', addInput)
        state = false
    }
}


//fonction pour l'ajout du input box 
function addInput(e) {
    let xInput = e.clientX
    let yInput = e.clientY
    input = document.createElement('input');

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (xInput - 10) + 'px';
    input.style.top = (yInput - 10) + 'px';

    
    input.onkeydown = handleEnter;
    document.body.appendChild(input);

    canvas.removeEventListener('click', addInput)
    state = false
}
function Text(shapeTab) {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = shapeTab.fontsize + " " + fontfamily;
    ctx.fillStyle = shapeTab.color;
    ctx.fillText(shapeTab.text, shapeTab.x - 4, shapeTab.y - 4);
}

//Touche Entrer pour le input box
function handleEnter(e) {
    let keyCode = e.keyCode;
    if (keyCode === 13) {
        shapes.push({
            x:parseInt(this.style.left, 10)-5,
            y:parseInt(this.style.top, 10)-5,
            widthText: 50,
            heightText: 20,
            text: this.value,
            color: "#000",
            fontsize: "18px",
        })
        drawAll()
        document.body.removeChild(this);
    }
    
}


//fonction gomme
let rubber = function(){
    //récupération des coordonées du clic
    let xClic = event.clientX-rect.left
    let yClic = event.clientY-rect.top
    for(let i=0;i<shapes.length;i++){//parcourir le tableau
        if(isMouseInShape(xClic,yClic,shapes[i])){//si dans la forme
            shapes.splice(i, 1)//suprimer l'élément
            drawNoborder()
        }  
    }
    
    state=false
    canvas.removeEventListener('click', rubber)
}
//fonction lorsqu'on appuie sur le bouton gomme
function rubberStart(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', rubber)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', rubber)
        state = false
    }
}
//changer une couleur à la forme
let color = function(){
    //récupération des coordonées du clic
    let xClic = event.clientX-rect.left
    let yClic = event.clientY-rect.top
    for(let i=0;i<shapes.length;i++){//parcourir le tableau
        if(isMouseInShape(xClic,yClic,shapes[i])){//si dans la forme
            shapes[i].color= colorChoice
            drawAll()       
        }  
    }
    state=false
    canvas.removeEventListener('click', color)
}
//fonction qui active l'evenement
function colorStart(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', color)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', color)
        state = false
    }
}
//fonction qui applique la première couleur
function colorBlue(){
    colorChoice = "#023047"
    colorStart()
}
//fonction qui applique la deuxième couleur
function colorYellow(){
    colorChoice = "#FFB703"
    colorStart()
}
//fonction qui applique la troisième couleur
function colorOrange(){
    colorChoice = "#E4572E"
    colorStart()
}

//changer la stroke à la forme
let strokeColor = function(){
    //récupération des coordonées du clic
    let xClic = event.clientX-rect.left
    let yClic = event.clientY-rect.top
    for(let i=0;i<shapes.length;i++){//parcourir le tableau
        if(isMouseInShape(xClic,yClic,shapes[i])){//si dans la forme
            shapes[i].stroke = strokeChoice
            drawAll()
        }  
    }
    state=false
    canvas.removeEventListener('click', strokeColor)
}
//fonction qui active l'evenement
function strokeStart(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', strokeColor)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', strokeColor)
        state = false
    }
}

//fonction qui applique la première stroke
function blueStroke(){
    strokeChoice = "#023047"
    strokeStart()
}
//fonction qui applique la deusième stroke
function yellowStroke(){
    strokeChoice = "#FFB703"
    strokeStart()
}
//fonction qui applique la troisième stroke
function orangeStroke(){
    strokeChoice = "#E4572E"
    strokeStart()
}


//application des actions "clic" sur le canvas
canvas.onmousedown=handleMouseDown
canvas.onmousemove=handleMouseMove
canvas.onmouseup=handleMouseUp
canvas.onmouseout=handleMouseOut
//dessine tous les rectangle
function allRectangle(shapeTab){
    ctx.fillStyle=shapeTab.color
    ctx.fillRect(shapeTab.x,shapeTab.y,shapeTab.width,shapeTab.height)
    ctx.lineWidth = 5
    ctx.strokeStyle = shapeTab.stroke;
    ctx.strokeRect(shapeTab.x+2, shapeTab.y+2, shapeTab.width-4, shapeTab.height-4);
}
//dessine tous les cercles
function allCircle(shapeTab){
    ctx.beginPath()
    ctx.arc(shapeTab.x,shapeTab.y,shapeTab.radius,0,Math.PI*2)
    ctx.fillStyle=shapeTab.color
    ctx.fill()
    ctx.beginPath()
    ctx.arc(shapeTab.x,shapeTab.y,shapeTab.radius-2,0,Math.PI*2)
    ctx.lineWidth = 5
    ctx.strokeStyle = shapeTab.stroke;
    ctx.stroke()
}
//dessine tous les triangles
function allTriangle(shapeTab){
    ctx.beginPath()
    ctx.moveTo(shapeTab.pointA.x, shapeTab.pointA.y)
    ctx.lineTo(shapeTab.pointB.x, shapeTab.pointB.y)
    ctx.lineTo(shapeTab.pointC.x, shapeTab.pointC.y)
    ctx.fillStyle=shapeTab.color
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(shapeTab.pointA.x-1, shapeTab.pointA.y+1)
    ctx.lineTo(shapeTab.pointB.x-2, shapeTab.pointB.y-2)
    ctx.lineTo(shapeTab.pointC.x+2, shapeTab.pointC.y-2)
    ctx.lineTo(shapeTab.pointA.x+1, shapeTab.pointA.y+1)
    ctx.lineWidth = 5
    ctx.strokeStyle=shapeTab.stroke
    ctx.stroke()
    
}
//fonction qui redessine tout sauf les bordures
function drawNoborder(){
    ctx.clearRect(0,0,cw,ch)
        for(let i=0;i<shapes.length;i++){
            let shape=shapes[i]
            if(shape.width){
                allRectangle(shape)
            }else if(shape.radius){
                allCircle(shape)
            }else if(shape.pointA){
                allTriangle(shape)
            }else if(shape.text){
                Text(shape)
            }
        }
}
//dessine l'aspect de la bordure
function drawBorder(){
    //si la forme est selectionner
    if (shapes[selectedShapeIndex].select ==true){
        //chaque partie d'une bordure(les côtés et les coins) sont des rectangles créés à partir de x, y, width et height de la forme select
        let xBorder
        let yBorder
        let widthBorder
        let heightBorder
        //récupération des caractéristiques du rectangle sélectionné
        if(shapes[selectedShapeIndex].width){
                xBorder=shapes[selectedShapeIndex].x
                yBorder=shapes[selectedShapeIndex].y
                widthBorder=shapes[selectedShapeIndex].width
                heightBorder=shapes[selectedShapeIndex].height
        }
        //récupération des caractéristiques du cercle sélectionné
        else if(shapes[selectedShapeIndex].radius){
            xBorder=shapes[selectedShapeIndex].x-shapes[selectedShapeIndex].radius
            yBorder=shapes[selectedShapeIndex].y-shapes[selectedShapeIndex].radius
            widthBorder=shapes[selectedShapeIndex].radius*2
            heightBorder=shapes[selectedShapeIndex].radius*2
        }
        //récupération des caractéristiques du triangle sélectionné
        else if(shapes[selectedShapeIndex].pointA){
            xBorder=shapes[selectedShapeIndex].pointC.x
            yBorder=shapes[selectedShapeIndex].pointA.y
            widthBorder=shapes[selectedShapeIndex].pointB.x-shapes[selectedShapeIndex].pointC.x
            heightBorder=shapes[selectedShapeIndex].pointB.y-shapes[selectedShapeIndex].pointA.y
        }
        //bordure côté gauche
        ctx.fillStyle='#0560C8'
        ctx.fillRect(
        xBorder-2,
        yBorder,
        2,
        heightBorder
        )
        //bordure côté droite
        ctx.fillRect(
        xBorder+widthBorder,
        yBorder,
        2,
        heightBorder
        )
        //bordure côté haut
        ctx.fillRect(
        xBorder,
        yBorder-2,
        widthBorder,
        2
        )
        //bordure côté bas
        ctx.fillRect(
        xBorder,
        yBorder+heightBorder,
        widthBorder,
        2
        )
        //bordure côté gauche haut
        ctx.fillStyle='#0560C8'
        ctx.fillRect(
            xBorder-4,
            yBorder-4,
            6,
            6
        )
        //bordure côté droite haut
        ctx.fillRect(
            xBorder+widthBorder-2,
            yBorder-4,
            6,
            6
        )
        //bordure côté gauche bas
        ctx.fillRect(
            xBorder-4,
            yBorder+heightBorder-2,
            6,
            6
        )
        //bordure côté droite bas
        ctx.fillRect(
            xBorder+widthBorder-2, 
            yBorder+heightBorder-2,
            6,
            6
        )//basdroite
        
    }
    else{
        //on clear tout sauf les shapes
        drawNoborder()
    }

}
//on déselecte toutes les formes
function deselectAll(){
    for(let i=0; i<shapes.length; i++){
        shapes[i].select = false
    }
}
//on reselectionne la forme 
function reselect(){
    shapes[selectedShapeIndex].select = true
}
//on reset tous les états de chaques éléments d'une bordure
function resetStateBorder(){
    for(let i=0; i<stateBorder.length; i++){
        stateBorder[i] = false
    }
}
//détection du triangle par produit vectoriel
function isLeft(pA, pB, pC){
    let result=(pB.x-pA.x)*(pC.y-pA.y)-(pC.x - pA.x) * (pB.y - pA.y)
    return result
}
//tester si au clic on se trouve soit dans la forme ou dans un des éléments de la bordure
function testShape(xClic, yClic, TopLeft, TopRight, BotLeft, BotRight, test){
    if(xClic>TopLeft-4 && xClic<TopLeft+4 && yClic>BotLeft+4 && yClic<BotRight-4){//gauche bordure
        stateBorder[0] = true
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopRight-4 && xClic<TopRight+4 && yClic>BotLeft+4 && yClic<BotRight-4){//droite bordure
        stateBorder[1] = true
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopLeft+4 && xClic<TopRight-4 && yClic>BotLeft-4 && yClic<BotLeft+4){//haut bordure
        stateBorder[2] = true
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopLeft+4 && xClic<TopRight-4 && yClic>BotRight-4 && yClic<BotRight+4){//bas bordure
        stateBorder[3] = true
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopLeft- 4 && xClic<TopLeft+4 && yClic>BotLeft-4 && yClic<BotLeft+4){//corner gauche haut
        stateBorder[4] = true
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopRight-4 && xClic<TopRight+4 && yClic>BotLeft-4 && yClic<BotLeft+4){//corner droite haut
        stateBorder[5] = true
        
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopLeft-4 && xClic<TopLeft+4 && yClic>BotRight-4 && yClic<BotRight+4){//corner gauche bas
        stateBorder[6] = true
        reselect()
        drawBorder()
        return(true)
    }else if(xClic>TopRight-4 && xClic<TopRight+4 && yClic>BotRight-4 && yClic<BotRight+4){//corner droite bas
        stateBorder[7] = true
        reselect()
        drawBorder()
        return(true)
    }else if(test){//dans la forme
        resetStateBorder()
        reselect()
        drawBorder()
        return(true)
    }else{//en dehors de tous les éléments et de la forme
        resetStateBorder()
        drawBorder()
        return (false)
    }
}

//détection si on est dans une shape booléen
function isMouseInShape(mouseX,mouseY,shape){
    if(shape.width){
        let TopLeftRec=shape.x
        let TopRightRec=shape.x+shape.width
        let BotLeftRec=shape.y
        let BotRightRec=shape.y+shape.height
        if (testShape(mouseX, mouseY, TopLeftRec, TopRightRec, BotLeftRec, BotRightRec, mouseX>TopLeftRec && mouseX<TopRightRec && mouseY>BotLeftRec && mouseY<BotRightRec)==true){
            return(true)
        }
    } else if(shape.radius){
        let TopLeftRec=shape.x-shape.radius
        let TopRightRec=shape.x+shape.radius
        let BotLeftRec=shape.y-shape.radius
        let BotRightRec=shape.y+shape.radius
        let dx=mouseX-shape.x
        let dy=mouseY-shape.y
        if (testShape(mouseX, mouseY, TopLeftRec, TopRightRec, BotLeftRec, BotRightRec, dx*dx+dy*dy<shape.radius*shape.radius)==true){
            return(true)
        }
    } else if(shape.pointA){
        let TopLeftRec=shape.pointC.x
        let TopRightRec=shape.pointB.x
        let BotLeftRec=shape.pointA.y
        let BotRightRec=shape.pointB.y
        let mouse={x: mouseX, y:mouseY}
        if (testShape(mouseX, mouseY, TopLeftRec, TopRightRec, BotLeftRec, BotRightRec, 
            isLeft(shape.pointC,shape.pointA,mouse)*isLeft(shape.pointC,shape.pointA,shape.pointB)>0 && 
            isLeft(shape.pointA,shape.pointB,mouse)*isLeft(shape.pointA,shape.pointB,shape.pointC)>0 &&
            isLeft(shape.pointC,shape.pointB,mouse)*isLeft(shape.pointC,shape.pointB,shape.pointA)>0)==true){
            return(true)
        }
    } else if(shape.text){
        let TopLeftRec=shape.x-10
        let TopRightRec=shape.x+shape.widthText
        let BotLeftRec=shape.y-10
        let BotRightRec=shape.y+shape.heightText
        if (mouseX>TopLeftRec && mouseX<TopRightRec && mouseY>BotLeftRec && mouseY<BotRightRec){
            return(true)
        }

    }
    return(false)
}
//quand le clique est maintenu
function handleMouseDown(event){
    deselectAll()
    resetStateBorder()
    //on récupère les coordonées du clic
    startX=event.clientX - rect.left
    startY=event.clientY - rect.top
    for(let i=0;i<shapes.length;i++){
        //si le clic se trouve dans une des formes de la tableau shapes
        if(isMouseInShape(startX,startY,shapes[i])){
            selectedShapeIndex=i//récupération de l'index
            isDragging=true//on passe en mode dragging
            return
        }
    }
    
}
//quand le clique est levé
function handleMouseUp(){
    if(!isDragging){
        return
    }
    isDragging=false
}
//quand le clique est hors du canvas
function handleMouseOut(){
    if(!isDragging){
        return
    }
    isDragging=false
}
//quand le clic est maintenu et que la souris se déplace
function handleMouseMove(event){
    if(!isDragging){
        return
    }
    mouseX=event.clientX-rect.left
    mouseY=event.clientY-rect.top
    //delta qui permet déplacer et resize en fonction de la distance parourue
    let dx=mouseX-startX
    let dy=mouseY-startY
    let selectedShape=shapes[selectedShapeIndex]
    //côté gauche de la bordure
    if (stateBorder[0]==true && selectedShape.select==true){//si l'état du côté gauche de la bordure est en mode true ainsi que la forme selectionné est true
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.x+=dx
            selectedShape.width-=dx
        }else if(shapes[selectedShapeIndex].radius){//resize c'est un cercle
            selectedShape.radius-=dx
        }else if(shapes[selectedShapeIndex].pointA){//resize c'est un triangle
            selectedShape.pointC.x+=dx
            selectedShape.pointA.x=(selectedShape.pointB.x+selectedShape.pointC.x)/2
        }
    //cöté droit de la bordure
    }else if (stateBorder[1]==true && selectedShape.select==true){
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.width+=dx
        }else if(shapes[selectedShapeIndex].radius){//resize c'est un cercle
            selectedShape.radius+=dx
        }else if(shapes[selectedShapeIndex].pointA){//resize c'est un triangle
            selectedShape.pointB.x+=dx
            selectedShape.pointA.x=(selectedShape.pointB.x+selectedShape.pointC.x)/2
        }
    //côté haut de la bordure
    }else if (stateBorder[2]==true && selectedShape.select==true){
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.y+=dy
            selectedShape.height-=dy
        }else if(shapes[selectedShapeIndex].radius){//resize si c'est un cercle
            selectedShape.radius-=dy
        }else if(shapes[selectedShapeIndex].pointA){//resize si c'est un triangle
            selectedShape.pointA.y+=dy
        }
    //côté bas de la bordure
    }else if (stateBorder[3]==true && selectedShape.select==true){
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.height+=dy
        }else if(shapes[selectedShapeIndex].radius){//resize si c'est un cercle
            selectedShape.radius+=dy
        }else if(shapes[selectedShapeIndex].pointA){//resize si c'est un triangle
            selectedShape.pointB.y+=dy
            selectedShape.pointC.y+=dy
        }
    //corner en haut à gauche
    }else if (stateBorder[4]==true && selectedShape.select==true){
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.x+=dx
            selectedShape.width-=dx
            selectedShape.y+=dy
            selectedShape.height-=dy
        }else if(shapes[selectedShapeIndex].radius){//resize si c'est un cercle
            selectedShape.radius-=dx
        }else if(shapes[selectedShapeIndex].pointA){//resize si c'est un triangle
            selectedShape.pointC.x+=dx
            selectedShape.pointA.x=(selectedShape.pointB.x+selectedShape.pointC.x)/2
            selectedShape.pointA.y+=dy
        }
    //corner en haut à droite
    }else if (stateBorder[5]==true && selectedShape.select==true){
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.width+=dx
            selectedShape.y+=dy
            selectedShape.height-=dy
        }else if(shapes[selectedShapeIndex].radius){//resize si c'est un cercle
            selectedShape.radius+=dx
        }else if(shapes[selectedShapeIndex].pointA){//resize si c'est un triangle
            selectedShape.pointB.x+=dx
            selectedShape.pointA.x=(selectedShape.pointB.x+selectedShape.pointC.x)/2
            selectedShape.pointA.y+=dy
        }
    //corner en bas à gauche
    }else if (stateBorder[6]==true && selectedShape.select==true){
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.x+=dx
            selectedShape.width-=dx
            selectedShape.height+=dy
        }else if(shapes[selectedShapeIndex].radius){//resize si c'est un cercle
            selectedShape.radius-=dx
        }else if(shapes[selectedShapeIndex].pointA){//resize si c'est un triangle
            selectedShape.pointC.x+=dx
            selectedShape.pointA.x=(selectedShape.pointB.x+selectedShape.pointC.x)/2
            selectedShape.pointB.y+=dy
            selectedShape.pointC.y+=dy
        }
    //corner en bas à droite
    }else if (stateBorder[7]==true && selectedShape.select==true){//corner droite bas
        if(shapes[selectedShapeIndex].width){//resize si c'est rectangle
            selectedShape.width+=dx
            selectedShape.height+=dy
        }else if(shapes[selectedShapeIndex].radius){//resize si c'est un cercle
            selectedShape.radius+=dx
        }else if(shapes[selectedShapeIndex].pointA){//resize si c'est un triangle
            selectedShape.pointB.x+=dx
            selectedShape.pointA.x=(selectedShape.pointB.x+selectedShape.pointC.x)/2
            selectedShape.pointB.y+=dy
            selectedShape.pointC.y+=dy
        }
    //déplacement d'un rectangle et d'un cercle  
    }else if (selectedShape.x){
        selectedShape.x+=dx
        selectedShape.y+=dy
    }
    //déplacement de d'un triangle
    else if(selectedShape.pointA){
        let pA=selectedShape.pointA
        let pB=selectedShape.pointB
        let pC=selectedShape.pointC
        pA.x+=dx
        pA.y+=dy

        pB.x+=dx
        pB.y+=dy

        pC.x+=dx
        pC.y+=dy
    }
//on redéssine tou
drawAll()
startX=mouseX
startY=mouseY
} 
//fontion caractéristique par défault pour déssiner le rectangle
let drawRectangle = function(){
    //récupération des coordonées du clic
    let xRectangle = event.clientX-50-rect.left
    let yRectangle = event.clientY-50-rect.top
    //on déselectionne toutes les formes présent sur le canvas
    if (shapes.length != 0){
       deselectAll()
    }
    //on ajoute la forme dans le tableau
    shapes.push({
        x:xRectangle,
        y:yRectangle,
        width: 100,
        height: 100,
        color: "#023047",
        stroke: "#FFB703",
        select: true//lorsque la forme s'ajoute cette dernière est automatiquement sélectionner
    })
    //on considère que la dernière forme ajouté dans le tableau est sélectionner
    selectedShapeIndex=shapes.length-1
    //on déssine la forme
    drawAll()
    //désactive l'event pour dessiner que une seule forme
    state = false
    canvas.removeEventListener('click', drawRectangle)
}
//fonction lorsqu'on appuie le bouton rectangle
function rectangle(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', drawRectangle)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', drawRectangle)
        state = false
    }
}
//fontion caractéristique par défault pour dessiner le cercle
let drawCircle = function(){
    //récupération des coordonées du clic
    let xCircle = event.clientX-rect.left
    let yCircle = event.clientY-rect.top
    //on déselectionne toutes les formes présent sur le canvas
    if (shapes.length != 0){
       deselectAll()
    }
    //on ajoute la forme dans le tableau
    shapes.push({
        x:xCircle, 
        y:yCircle,
        radius:50,
        color:'#023047',
        stroke:"#FB703",
        select: true//lorsque la forme s'ajoute cette dernière est automatiquement sélectionner
    })
    //on considère que la dernière forme ajouté dans le tableau est sélectionner
    selectedShapeIndex=shapes.length-1
    //on déssine la forme
    drawAll()
    //désactive l'event pour dessiner que une seule forme
    state=false
    canvas.removeEventListener('click', drawCircle)
}
//fonction lorsqu'on appuie le bouton cercle
function circle(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', drawCircle)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', drawCircle)
        state = false
    }
}
//fontion caractéristique par défault pour dessiner le triangle 
let drawTriangle = function(){
    //récupération des coordonées du clic
    let xTriangle = event.clientX-rect.left
    let yTriangle = event.clientY-rect.top
    //on déselectionne toutes les formes présent sur le canvas
    if (shapes.length != 0){
       deselectAll()
    }
    //on ajoute la forme dans le tableau
    shapes.push({
        pointA: {x: xTriangle, y: yTriangle-50}, 
        pointB: {x: xTriangle+50, y: yTriangle+50}, 
        pointC: {x: xTriangle-50, y: yTriangle+50}, 
        color:'#023047',
        stroke: "#FFB703",
        select:true//lorsque la forme s'ajoute cette dernière est automatiquement sélectionner
    })
    //on considère que la dernière forme ajouté dans le tableau est sélectionner
    selectedShapeIndex=shapes.length-1
    //on déssine la forme
    drawAll()
    //désactive l'event pour dessiner que une seule forme
    state = false
    canvas.removeEventListener('click', drawTriangle)
}
//fonction lorsqu'on appuie le bouton cercle
function triangle(){
    if(state == false) {//si c'est faux on active l'event
        canvas.addEventListener('click', drawTriangle)
        state = true
    } else {//si on rappuie sur le bouton on désactive
        canvas.removeEventListener('click', drawTriangle)
        state = false
    }
}
//fonction qui surpprime le canvas et qui le redéssine avec de nouvelles infos
function drawAll(){
    ctx.clearRect(0,0,cw,ch)
    for(let i=0;i<shapes.length;i++){//on parcourt la liste et à chaque forme on la déssine
        let shape=shapes[i]
        if(shape.width){//rectangle
            allRectangle(shape)
            drawBorder()//si présence d'une bordure on l'a dessine
        }else if(shape.radius){//cercle
            allCircle(shape)
            drawBorder()
        }else if(shape.pointA){//triangle
            allTriangle(shape)
            drawBorder()
        }else if(shape.text){
            Text(shape)
        }
    }
}


//fonction clear TOUS le canvas
function efface(){
    ctx.clearRect(0,0,cw,ch)
    shapes=[]
}