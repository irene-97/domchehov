<!doctype html>
<html lang="ru">
<head>
    <?php

    $title = 'Отзывы о компании МДЧ';

    include('includes/head.php');

    ?>
</head>
<body>
<div id="page">
    <?php include('includes/mobile-menu.php') ?>
    <?php include('includes/mobile-sidebar.php') ?>
    <div class="container">
        <?php include('includes/sidebar.php') ?>
        <div class="main-part">
            <?php include('includes/main-menu.php') ?>
            <div class="main-columns">
                <div class="main-content">
                    <?php include('includes/reviews-content.php') ?>
                </div>
                <div class="main-sidebar">
                    <?php include('includes/recommendation.php') ?>
                </div>
            </div>
            <span class="copy">© 2000-2013 Сеть мебельных салонов «МДЧ»</span>
        </div>
    </div>
    <?php include('includes/modals.php') ?>
</div>
</body>
</html>
