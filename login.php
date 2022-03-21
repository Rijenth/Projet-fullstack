<?php
session_start();
require("pdo/pdo.php");

$login = filter_input(INPUT_POST, "login"); // Ou $_POST["login"]
$user = filter_input(INPUT_POST, "user");
$candidate_password = filter_input(INPUT_POST, "password");


if(isset($login)){ // isset - Variable déclarée et non null.
    if($user=="" or $candidate_password==""){
        echo '<left><h2 style="color:red">','Erreur ! Connexion refusée.','</h2></left>';
    } 
}


// Etape 1 : Preparer la requête 
$marequete = $pdo->prepare("SELECT * FROM users where username = :user"); //  and password = :password

// Etape 2 : Executer la requête 
$marequete->execute([
    ":user" => $user,
    //":password" => $password
]);

// Etape 3 : Récupération (Fetch)
$row = $marequete->fetch(PDO::FETCH_ASSOC); // Autre méthode inutilisée : fetch(PDO::FETCH_OBJECT)

if($row){ // Autre méthode inutilisée : if($row>0) en lien avec "fetch_object"
    
        if(password_verify($candidate_password, $row["password"])){
            $_SESSION["user"]=$user;
            $_SESSION["id"]=$row["id"];

            http_response_code(302);
            header("location: dashboard.php");
            exit();
        } else { // Erreur password
            echo '<left><h2 style="color:red">','Erreur ! Le mot de passe est faux.','</h2></left>'; 
        }
} else if($user != $row["username"]) { // Erreur username
    echo '<left><h2 style="color:red">','Erreur ! Le username n\'est pas reconnu','</h2></left>';
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Login.css">
    <title>Connexion paint</title>




</head>
<body>

        <div class="box">
            <div class="connexion">
                <br>
                <h2>Connexion</h2>
                <form class="menu" method="POST">

                    <div class="connexion1"><label for="user">Identifiant :</label>
                    <div class="bouge"><input class='buttoncolor' placeholder="Mon id" type="text" name="user" id="user" /><br/></div></div>

                    <div class="connexion2"><label for="password">Mot de passe :</label>
                    <div class="bouge"><input class="buttoncolor" placeholder="********" type="password" name="password" id="password" /><br/></div></div>

                    <div><input class="seconnecter" type="submit" value="Se connecter" name="login" class="input" /></div>
                    <br> 
                    <p class="pdulink"><a class="link_inscription"href="inscription.php">Inscription</a></p>
                </form>
            </div>
        </div>



</body>
</html>