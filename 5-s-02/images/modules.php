<?php
mb_internal_encoding('utf-8');
require_once "logout.php";
if($_REQUEST[screen]=="all"){
   require_once "head_full_src.php";
}else{
   require_once "head.php";
}
require_once "auth_chk.php";

echo '</div>';
echo '</TD></TR></TABLE>';

//if(!$auth->checkAuth()){
if(Auth::staticCheckAuth($options)){  //检查登入状况
   ;
}else{
	Header("Location: index.php");
	die();
}

if ($_GET["file"]) {
        if (eregi("http:\/\/", $_GET["file"])||eregi("ftp:\/\/", $_GET["file"])||eregi("[[:alnum:]]+\.[[:alnum:]]+\.", $_GET["file"])||eregi("[[:alnum:]]+\.[[:alnum:]]+/", $_GET["file"])) { echo "Hi, How do u do ?"; exit; }
}

echo '<TABLE width="959" CELLPADDING="0" CELLSPACING="0" BORDER="0" align="center">
	<TR>';
echo '<TD WIDTH="13"  align="center" background="images/adtl_960b_2.jpg"></TD>';
echo '<TD WIDTH="910" align="center" background="images/adtl_960b_3.jpg">';

if($_REQUEST['file']=='AdaptiveTestBox' || $_REQUEST['screen']=="all"){
	echo"";
}else{
   echo $_SESSION['block_content'];
}  
echo '</TD>';  
echo '<TD WIDTH="36"  align="center" background="images/adtl_960b_4.jpg"></TD>';    
echo '</tr></table>';

echo '<TABLE width="959" CELLPADDING="0" CELLSPACING="0" BORDER="0" align="center"><TR>';
echo '<TD><IMG WIDTH="959" HEIGHT="12" SRC="images/adtl_960_3.jpg" BORDER="0"></TD>'; 
echo "</TR>";
echo '</TABLE>';

echo '<div id="main">';
echo '<TABLE width="959" CELLPADDING="0" CELLSPACING="0" BORDER="0" align="center">
	<TR> ';
//echo '<TD WIDTH="47" HEIGHT="484" background="images/adtl_960_4.jpg" BORDER="0"></TD>';
echo '<TD WIDTH="842" HEIGHT="484" bgcolor="#FFFFFF" BORDER="0" align="center" valign="top">';

$op=$_REQUEST['op'];
if($op=="modload"){
//		if (!isset($mainfile)) { include("mainfile.php"); }
	if (ereg("\.\.",$name) || ereg("\.\.",$file)) {
		echo "You are so cool";
		die();
	} else {
		$exec_file="modules/".$_REQUEST['name']."/".$_REQUEST['file'].".php";
		if(file_exists($exec_file)){
			include($exec_file);
		}else{
			echo "請不要任意輸入網址！！";
		}
	}
}elseif($op=="main"){
	$user_data=$_SESSION[user_data];
	echo "<font class=\"title1\"><center><br><b>歡迎光臨！<br>";
	echo "<br>您是　".$user_data->user_id."【".$user_data->uname."】，身份：".$user_data->user_level."<br><br>";
	echo $user_data->city_name.$user_data->organization_name."".$user_data->cht_class."</b></font><br><br>";
/*
	$exec_file="modules/Board/index.php";
	
	if(file_exists($exec_file)){
		include($exec_file);
	}
*/
}elseif($op=="logout"){
	$logouttime=date("Y-m-d, H:i:s");
	$sql="UPDATE user_status SET stoptimestamp='{$logouttime}' WHERE user_id ='{$_SESSION['_authsession']['username']}'";
	$result = $dbh->query($sql);

	//$auth->logout();
	$dbh->disconnect();   //资料库离线
	session_destroy();
	//$msg='您已经登出！';
	Header("Location: index.php");
}else{
	die ("抱歉！您的權限不符");
}
echo "<br><br>";
echo '</TD>';
//echo	<TD WIDTH="70" HEIGHT="484" background="images/adtl_960_6.jpg" BORDER="0"></TD>
echo	'</TR></TABLE>';
echo '<TABLE width="959" CELLPADDING="0" CELLSPACING="0" BORDER="0" align="center"><TR>';
echo '<TD><IMG WIDTH="959" HEIGHT="12" SRC="images/adtl_960_3.jpg" BORDER="0"></TD>'
echo    '</TR>
    </TABLE>';
echo '</div>';
echo '<div id="Layer2" style="position:absolute; left:1px; top:1px; width:1px; height:1px; z-index:1">';
require_once "feet.php"; 
?>
