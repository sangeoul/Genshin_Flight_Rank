<?php
//Provide user data

include $_SERVER['DOCUMENT_ROOT']."/DBconfig.php";

function dbset(){
	global $dbcon,$servername,$username,$password,$dbname;
	$dbcon=new mysqli($servername,$username,$password,$dbname);
	
	if($dbcon->connect_error){
		die("Connection Failed<br>".$dbcon->connect_error);
	}
}
dbset();


header("Content-Type: application/json");


$qr="select * from Genshin_rank where uid=".$_GET["uid"]." and server=".$_GET["server"]." and day=".$_GET["day"].";";
$result=$dbcon->query($qr);
$data=$result->fetch_array();


echo(Json_encode($data));

?>