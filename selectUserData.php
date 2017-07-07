<?php
    require 'config.php'; 

    $insertData = $dbh->prepare('select * from exam_record_its where indicate_id = :itsTitle order by date DESC LIMIT 1;');
    $insertData->bindValue(':itsTitle',$_POST['title'], PDO::PARAM_STR);
    $insertData->execute();

    $row = $insertData -> fetchAll(PDO::FETCH_ASSOC);
        
    echo json_encode($row);
?>