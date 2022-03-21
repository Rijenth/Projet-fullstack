<?php 
session_start();

$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);


if(!isset($_SESSION["user"])) { // !isset - Variable non déclarée et est null
    http_response_code(302);
    header('Location: login.php');
    exit();
} 

?> 


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paint</title>
    <link rel="stylesheet" href="Paint.css">
    <?php
        require_once('sauvegarde.php');
        require_once('load_canvas.php');
    ?>

</head>
<body class="light">
    <div class="page">
        <div id="download">
        <form method="POST" id ="form">
            <button  type="submit" onclick="save()">Sauvegarder</button>
            <canvas id="canvas" width="1000" height="500">Hello There</canvas>
            </form></div>
        
        <div class="menu_bar">
            
            <button id ="choix" name="choix">Choisir</button> 
            <button id ="load" name="load" onclick="load()">Charger</button> 
            <button onclick="capture()">Export as png</button> 
            <button id="btn">Export as pdf</button> 
            <button onclick="efface()">Clear</button>
            <button><a href="deconnexion.php">Quitter</a></button>
             
        </div>


        <div class="left_column">
            <button onclick="rectangle()"> <img src="img/rectangle.svg" alt="rectangle"> </button>
            <button onclick="circle()"> <img src="img/round.svg" alt="round"> </button>
            <button onclick="triangle()"> <img src="img/triangle.svg" alt="triangle"> </button>
            <button onclick="rubberStart()"> <img src="img/rubber.svg" alt="rubber"> </button>
            <button onclick="writetext()"> <img src="img/text.svg" alt="text"> </button>
            <select id="m1" name="style-police" onchange="fontfamilySelection()">
                <option value="serif">Style police 1</option>
                <option value="Helvetica">Style police 2</option>
                <option value="Segoe Print">Style police 3</option>
            </select>
            <button onclick="colorBlue()" id="blue"></button>
            <button onclick="colorOrange()" id="orange"></button>
            <button onclick="colorYellow()" id="yellow"></button>
            <button onclick="blueStroke()" id="blueborder"></button>
            <button onclick="orangeStroke()" id="orangeborder"></button>
            <button onclick="yellowStroke()" id="yellowborder"></button>
        </div>
        
        
        
        </div>
    </div>
    
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script> 
    <script src="Paint.js"></script>
    <script>
        function save(){
            for(let i=0;i<shapes.length;i++){
                saveTab.push(shapes[i])
                
            }
            let formData = new FormData();
            formData.append("saveTab", JSON.stringify(saveTab)) 
            // VALUE saveTab, qu'on stringify avant insertion bdd. 
            // form = id de mon formulaire       

            form.onsubmit = async(e)=>{
            e.preventDefault()

            let response = await fetch("sauvegarde.php",{  
                method: "POST",
                body:formData,
            // CREATION D'UNE FORMDATA 
            });                 
            };
        }
    </script>
    <script>
        function load(){
            saveTab = <?= $row["liste"]; ?>;
            shapes = saveTab;
            drawAll()
            }   
        
    </script>
    
    
</body>
</html>