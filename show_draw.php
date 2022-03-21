<?php 
session_start();
require("pdo/pdo.php");
$users_id = $_SESSION["id"];
$user_name = $_SESSION["user"];

$marequete = $pdo->prepare("SELECT * FROM draw where users_id=:users_id");

// Etape 2 : Executer la requête
$marequete->execute([
    "users_id" => $users_id
]);

// Etape 3 : Récupération (Fetch)
$dessins = $marequete->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Les oeuvres de <?= $user_name ?> </title>
    <link rel="stylesheet" href="show_draw.css">
</head>
<body>
<div class="touthtml">
<h1>Sauvegarde disponible :</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom de la sauvegarde</th>
                <th>Createur</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($dessins as $dessin): ?>
                <tr>
                    <td><?= $dessin["id"] ?></td>
                    <td>
                        <a href="dashboard.php?id=<?= $dessin["id"] ?>"> Dessin<?= $dessin["id"] ?></a>
                    </td>
                    <td><?= $user_name ?></td>

                    <!-- Mettre un png du dessin pour pouvoir le prévisualiser ? -->

                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <a class="retour" href="dashboard.php">Retour</a>
</div>
</body>
</html>
