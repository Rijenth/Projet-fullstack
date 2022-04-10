<?php
session_start();
$saveTab = filter_input(INPUT_POST, "saveTab");
$users_id = $_SESSION["id"];

if($_POST["saveTab"])

    try {
        require("pdo/pdo.php");
        $marequete = $pdo->prepare("INSERT INTO draw (liste, users_id) VALUES (:saveTab, :users_id);");
        $marequete->execute([
            ":saveTab" => $saveTab,
            ":users_id" => $users_id
        ]);
        

        } catch (\PDOException $e) { 
            if ($e->errorInfo[1] == 1062) {
            
            }
        
        }


?>
