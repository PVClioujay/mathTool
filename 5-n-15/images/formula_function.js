//計算機操作 
var now_select_obj_type = "";//現在選擇物件的種類,text_area橫式作答區、i輸入框、i_ans_area答案區
var now_select_obj_id = "";//現在選擇物件的id
var now_select_obj_index = "";//現在選擇物件的index
var ans_dsc ="";//答案區的值，用來比對用(此值的分數部份會存latex語法而非轉換過得語法,轉換後的code有差異所以不拿來比對)


//設定目前聚焦物件的種類與id
function set_now_select_obj(obj_type,obj_id,obj_index){
	now_select_obj_type = obj_type;
	now_select_obj_id = obj_id;
	now_select_obj_index = obj_index;
	$(':input').css("border","");//所有的輸入框
	$('#area_2').css("border","");//答案區
	$('#cos_ans_area').css("border","");//橫式作答區
	if(now_select_obj_type == 'i'){//一般輸入，只限輸入一個字
		$('#'+now_select_obj_id).css("border","1px solid #a4c6fd");
	}else if(now_select_obj_type == 'i_short'){//短除法用，不限輸入字數
		$('#'+now_select_obj_id).css("border","1px solid #a4c6fd");
	}else if(now_select_obj_type == 'i_fraction'){//分數輸入器
		$('#'+now_select_obj_id).css("border","1px solid #a4c6fd");
	}else{
		$('#'+now_select_obj_id).css("display","block").css("border","3px solid #a4c6fd");
	}
	
	//如果是作答區或是橫式輸入區，設定分數輸出綁定區域
	if(obj_id =="area_2" || obj_id =="cos_ans_area"){
		set_fraction_target_area(obj_id);
	}	
}

//顯示按下計算機按鍵的值
function add_value(a_value){
	if(now_select_obj_type == "i"){//文字輸入框限定輸入一個位元的資料
		$('#formula_area').val(a_value);
	}else{
		var all_value = $('#formula_area').val() + a_value;
		$('#formula_area').val(all_value);
	}
}

//將計算機的值傳送到指定的物件
function send_value(obj_id){
$('#showRecord').show();
var all_value = $('#formula_area').val();
switch(now_select_obj_type){
		case "i"://一般的文字輸入框	
			first_record_array.push("i||"+now_select_obj_id+"||"+$('#'+now_select_obj_id).val()+"||"+now_select_obj_index);
			directly_record_array[now_select_obj_index].push($('#formula_area').val());	
			var recode_dsc = "i||"+now_select_obj_id+"||"+$('#formula_area').val();
			total_record_array.push(recode_dsc);
			$('#'+now_select_obj_id).val($('#formula_area').val());
		break;
		case "i_fraction"://分數輸入器	
			$('#'+now_select_obj_id).val($('#formula_area').val());
		break;		
		case "i_short"://短除法，不限字數
			first_record_array.push("i||"+now_select_obj_id+"||"+$('#'+now_select_obj_id).val()+"||"+now_select_obj_index);
			directly_record_array[now_select_obj_index].push($('#formula_area').val());	
			var recode_dsc = "i||"+now_select_obj_id+"||"+$('#formula_area').val();
			total_record_array.push(recode_dsc);
			$('#'+now_select_obj_id).val($('#formula_area').val());
		break;
		case "i_ans_area"://答案區
			ans_dsc += all_value;
			first_record_array.push("i_ans_area||"+now_select_obj_id+"||"+$('#'+now_select_obj_id).html()+"||"+now_select_obj_index);			
			total_record_array.push("i_ans_area||"+now_select_obj_id+"||"+all_value);					
			$('#'+now_select_obj_id).append(all_value);
		break;
		case "text_area"://橫式作答區
			first_record_array.push("text_area||"+now_select_obj_id+"||"+$('#'+now_select_obj_id).html());
			$('#'+now_select_obj_id).append(all_value);
			total_record_array.push("text_area||"+now_select_obj_id+"||"+all_value);		
		break;
	}
	$('#formula_area').val("");//清除計算機的值
}

//插入一個跳行到橫式作答區
function add_br(obj_id){
	if(now_select_obj_type == "text_area"){
		$('#showRecord').show();
		var all_value = "<br><img src='images/icon_triangles_flash.gif'>";
		first_record_array.push("text_area||"+obj_id+"||"+$('#'+obj_id).html());
		$("#cos_ans_area img").attr("src","./images/icon_triangles.png");//先將所有圖片改成靜態		
		$('#'+obj_id).append(all_value);
		total_record_array.push("text_area<br>||"+obj_id+"||"+all_value);
	}
}

//清除機算機的值。
function cl_value(){
	$('#formula_area').val("");
}

//設定分數輸入器輸出的欄位
function set_fraction_target_area(target_obj){
	obj_fraction_sw_input_area = target_obj;
}