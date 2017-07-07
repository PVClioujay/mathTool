<?php
require_once "include/adp_API.php";
require_once 'Date.php';
//require_once "hty_php_inference/inference.php";
$module_name=basename(dirname(__FILE__));
if(!$auth->checkAuth()){
	require_once "feet.php"; 
	die();
}

//以下參數，修正時專用
$FixCsID='006031104';
$FixItemNum=23;
//$FixItemNum=rand(21,23);

//debug_msg("第".__LINE__."行 _SESSION ", $_SESSION);
/*
作答反應說明：
０->實際做錯　
１->實際做對　
２->預測會做對(實際上被省略而未做)　
３->預測會做對但實際上做錯　
４->預測會做對且實際上做對
*/
//debug_msg("第".__LINE__."行 _POST ", $_POST);
$_SESSION['item_stop_time']=time();
if(!(isset($_SESSION['Student_Data'])&&(isset($_SESSION['Concept_Data'])))){
	$_SESSION['paper_vol']=$_POST['paper_vol'];
	$_SESSION['cs_id']=$_POST['cs_id'];
	$_SESSION['exam_type']=$_POST['exam_type'];
	//debug_msg("第".__LINE__."行 _SESSION ", $_SESSION);
	$Concept_Data=new Concept_Structure($_POST['cs_id'],$_POST['paper_vol']);//由上一頁抓資料來儲存
   //debug_msg("第".__LINE__."行 Concept_Data ", $Concept_Data);
	//$Concept_Data->set_rand_sequence();//---------------------new
	//print_r($Concept_Data);
	$Student_Data=new Student_Structure($user_data->organization_name, $user_data->class_name, $user_data->uname);
   //從學校名稱  班級名稱  姓名  來確定指到該人
	$Student_Data->initial_response($Concept_Data->get_item_num());
	$_SESSION['item_total_num']=$Concept_Data->get_item_num();
	for($i=0;$i<$item_num;$i++){
		$question=$Concept_Data->get_selected_item_data($selected_item);
		//debug_msg("第".__LINE__."行 question ", $question);
		$correct_answer[$i]=$question->get_item_correct_answer();  //$correct_answer為正確答案
	}
	$mydate = new Date();
	$_SESSION['start_time']=date("U");       //初始化時間
	$_SESSION['date']= date("Y-m-d, H:i");    //開始做題的時間
	$_SESSION['done_nums']=1;
	$_SESSION['Test_Model']=1;//測驗模式  用來表示正確為此數字錯誤為此數字減一------------------------------------new
	//隨機出題
	$RandCS=array('006080102','006080103','006080104');  //參加隨機出題的單元
	if(in_array($_POST['cs_id'], $RandCS)){
		//$Concept_Data->set_rand_sequence();
		$fold=4;
		$Concept_Data->set_order_sequence($_SESSION['item_total_num'],$fold);
	}
}else{
//session_start();
	$Student_Data=$_SESSION["Student_Data"];
	$Concept_Data=$_SESSION["Concept_Data"];
	$selected_item=$_SESSION["selected_item"]; 
	$Student_Data=unserialize($Student_Data);
	$Concept_Data=unserialize($Concept_Data);
	if($_POST['mad']>0){
		$_POST['user_answer']="mad";
	}
	if(!empty($_POST['user_answer']) && $_POST['user_answer']!=""){
		$_SESSION['done_nums']++;
	}
}

$response=$Student_Data->get_response();
$sequence=$Concept_Data->get_item_sequence();
$item_num=$Concept_Data->get_item_num();
$structure=$Concept_Data->get_structure();

//debug_msg("第".__LINE__."行 FILE ", __FILE__);
//debug_msg("第".__LINE__."行 _SESSION ", $_SESSION);

if((isset($_POST['user_answer']))&&(isset($_SESSION["selected_item"]))){
	$_SESSION["rec_user_answer"].=$_POST["user_answer"]._SPLIT_SYMBOL;
	$_SESSION["selected_item_rec"].=$_SESSION["selected_item"]._SPLIT_SYMBOL;
	$question=$Concept_Data->get_selected_item_data($selected_item);
	//print_r($question);
	/*
	if($_POST['user_answer']==$question->get_item_correct_answer()){
		$response[$selected_item-1]=1;
		for($i=0;$i<$item_num;$i++){
             if($structure[$i][$selected_item-1]==1){
				$response[$i]=2;  //預測這些節點會做對，標記為2
			 }  
		}
	}
	else{
		$response[$selected_item-1]=0;
	}
   */
   //------------------------------------重貼↓(new)
	if($_POST['user_answer']==$question->get_item_correct_answer()){
      $response[$selected_item-1]=$_SESSION['Test_Model'];

		for($i=0;$i<$item_num;$i++){
			if($structure[$i][$selected_item-1]==1 and $response[$i]=="-1"){
				$response[$i]=2;  //預測這些節點會做對，標記為2
			}  
		}
	}
	else{
		$response[$selected_item-1]=$_SESSION['Test_Model']-1;
	}
	//------------------------------------重貼↑(new)


}
if($_POST['mad']>0){   //試題為建構反應題型時的處理方式
   require "modules/".$module_name."/Mad2Db.php";;
}

$Student_Data->set_response($response);
//debug_msg("第".__LINE__."行 response ", $response);

//如果做完剩下預測題目未作便進行轉換以及模式切換
if((!in_array(-1,$response))&&(in_array(2,$response))){
	for($i=0;$i<sizeof($response);$i++){
		if($response[$i]==2)
		{
			$response[$i]=-1;
		}
	}
	$_SESSION['Test_Model']=4;//模式轉換紀錄預測現實的狀況，預測對且作對維4相反為錯(但是大於2全是算對)
	$Concept_Data->set_structure_null();//將結構設定為空值以進行一般選題
}
//轉換完成進行相同的出題動作不受影響
//--------------------------------------加入的模式切換部分(new)

//debug_msg("第".__LINE__."行 response ", $response);




//進行adaptive test
if(in_array(-1,$response))  //檢查是否有還沒測驗的節點(試題)
{   
	$selected_item=-1;
	$index=0;
	while(($selected_item<0)&&($index<$item_num)){
		if($response[$sequence[$index]-1]<0){$selected_item=$sequence[$index];}
		$index=$index+1;
	}
	//固定出題題號，測試時使用
	//$UserSchool=substr($user_data->user_id, 0, 6);
	$UserSchool=$user_data->organization_id;
	if($_SESSION['cs_id']==$FixCsID and ($UserSchool=='193699' OR $UserSchool=='190039')){
		$selected_item=$FixItemNum;
		if($response[$selected_item-1]=="mad"){
			$RedirectTo="Location: index.php?act=logout";
			Header($RedirectTo);
		}
	}
	//進入adaptive測驗   1.答案   2.題目
	//顯示出題畫面
	require_once "modules/".$module_name."/showTestItem.php";


	//$Student_Data->set_response($response);
	$Student_Data=serialize($Student_Data);
	$Concept_Data=serialize($Concept_Data);
	$_SESSION["Student_Data"]=$Student_Data;//等一下要用的學生物件
	$_SESSION["Concept_Data"]=$Concept_Data;//等一下要用的試題結構
	$_SESSION["selected_item"]=$selected_item;
    $_SESSION['item_start_time']=time();       //初始化時間


//上半部就是這樣簡單
}else{
   require "modules/".$module_name."/BnInference.php";

}


function ItemPieces($question){
	global $dbh;
	//debug_msg("第".__LINE__."行 question ", $question);
	//選項
	$output="";
	$ii=$question->get_item_select_num();
	for($i=0;$i<$ii;$i++){
		$PImgProp['op_pieces'.$i]=GetImageSize($_SESSION['cs_path'].$question->op_pieces[$i]);
		$tableH+=$PImgProp['op_pieces'.$i][1];
	}
	$tableH+=56;
	$output.= '<table width="100%" height="'.$tableH.'" border="0" cellpadding="2" cellspacing="2" class="line01">';
	for($i=0;$i<$question->get_item_select_num();$i++){
		if(isset($showfig)){		unset($showfig);	}
		$showfig=explode(".", $question->op_pieces[$i]);
		$showfig[0]=str2compiler($showfig[0]);
		//debug_msg("第".__LINE__."行 showfig ", $showfig);
		$output.= "<tr><td width=\"50\" align=\"center\" scope=\"col\"><input type=\"radio\" name=\"user_answer\" value=\"".($i+1)."\"></td><td width=\"650\" align=\"left\"  class=\"s_title\" height=\"".$PImgProp['op_pieces'.$i][1]."\"><img border=\"0\" src=\"viewfig.php?list=".$showfig[0]."&tpp=".$showfig[1]."\"><hr></td></tr>\n";
	}
	//第五個選項
	/*
	echo "<tr><td width=\"50\" align=\"center\" scope=\"col\"><input type=\"radio\" name=\"user_answer\" value=\"".($i+1)."\"></td><td width=\"650\" align=\"left\"  class=\"s_title\" height=\"48\"><img border=\"0\" src=\""._ADP_URL."images/5th.gif\"></td></tr>\n";
	*/
	$output.= "</table>";

	return $output;
}

?>
