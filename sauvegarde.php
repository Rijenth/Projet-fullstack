<?php
session_start();
$saveTab = filter_input(INPUT_POST, "saveTab");
$users_id = $_SESSION["id"];

if($_POST["saveTab"])

    try {
        $engine = "mysql";
        $host = "localhost";
        $port = 3306;
        $dbname = "paint";
        $username = "root";
        $password = "root";
        $pdo = new PDO("$engine:host=$host:$port;dbname=$dbname", $username, $password);

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
