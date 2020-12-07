<?php

include $_SERVER['DOCUMENT_ROOT']."/DBconfig.php";

//최대 표시되는 랭킹 수
$RANKING_LIMIT=200;

//이벤트 날짜.
date_default_timezone_set('Asia/Seoul');

$DAY=(intval(date('d'))-3);
if( intval(date('H'))<5 ){
	$DAY--;
}

$dbcon;

if($_GET["day"]==null){
	$_GET["day"]=$DAY;
}
else if(!is_numeric($_GET["day"])){
	$_GET["day"]=$DAY;
}
else if($_GET["day"]>7){
	$_GET["day"]=7;
}
else if($_GET["day"]<1){
	$_GET["day"]=1;
}

function dbset(){
	global $dbcon,$servername,$username,$password,$dbname;

	
	
	$dbcon=new mysqli($servername,$username,$password,$dbname);
	
	if($dbcon->connect_error){
		die("Connection Failed<br>".$dbcon->connect_error);
	}
}
dbset();



$qr="select uid,server from Genshin_rank where day=".$_GET["day"]." order by point desc limit ".$RANKING_LIMIT.";";
$result=$dbcon->query($qr);

echo("<script>\n");
echo("uids=new Array();\n");
echo("servers=new Array();\n");
for($i=0;$i<$result->num_rows;$i++){
	$data=$result->fetch_row();
	$uid=$data[0];
	$server=$data[1];
	echo("uids[".$i."]=".$uid.";\n");
	echo("servers[".$i."]=".$server.";\n");
}
echo("</script>\n");

?>


<html>
<head>
<link rel="stylesheet" href="rank.css">
<script type="text/javascript" src="rank.js"></script>
<title> 원신 비행 도전 랭킹 Day<?=$_GET["day"]?></title>
</head>

<div id=background_opacity class="board bgo"></div>
<div class="title_space">
	<img src="./images/genshin_logo.png" class=logo>
	<div class=title>Day <?=$_GET["day"]?> 비행 도전 랭킹  <a href="./?day=<?=($_GET["day"]-1)?>" id=prev>◀</a> <a href="./?day=<?=($_GET["day"]+1)?>" id=next>▶</a></div>
	<div class=apply><a href="https://forms.gle/BysX9auCNxRPTdfH6" target="_blank" class=apply>랭킹등록하기</a></div>
	<div class=notice>등록하는데는 스샷 혹은 영상이 필요합니다</div>
</div>
<div id=board class=board></div>
<body></body>



<script>
var user_list=new Array();
document.getElementById("background_opacity").style.height=(uids.length*85+200)+"px";
document.getElementById("board").style.height=(uids.length*85)+"px";
for(var i=0;i<uids.length;i++){
	user_list[i]=new User(uids[i],(i+1),<?=$_GET["day"]?>,servers[i]);
}
</script>
</html>
