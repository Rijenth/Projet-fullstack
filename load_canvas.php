<?php 
session_start();
require('pdo/pdo.php');
$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);


if($_SESSION["id"]){
    $users_id = $_SESSION["id"];

    $marequete = $pdo->prepare("SELECT * FROM draw where users_id=:users_id and id=:id"); 
    $marequete->execute([
        ":users_id" => $users_id , 
        ":id" => $id /* id de l'image */
        
    ]);
    $row = $marequete->fetch(PDO::FETCH_ASSOC); 
}


?>
