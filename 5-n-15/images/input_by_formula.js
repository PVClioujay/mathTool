//===============================================================================================
//輸入區使用計算機輸入
var select_input_obj_id = "";
var select_input_obj_has_input = false;
var select_input_type="";

//只有計算機
function set_input(obj_id,index_dsc){
	select_input_type ="input";
	select_input_obj_id = obj_id;
	$('#formula_area_1').val($('#'+select_input_obj_id).val());
	$("#light_box_area").show();
	$.colorbox({inline:true,href:"#light_box_area",onClosed:function(){
		//如果有輸入的話
		if(select_input_obj_has_input && index_dsc !=''){
		add_input_value(select_input_obj_id,parseInt(index_dsc));
		}
		select_input_obj_has_input =false;
		$("#light_box_area").hide();
		select_input_type ="";
	}});
	
}

//包含計算機跟分數器
function set_ans_input(obj_id,index_dsc){
	select_input_type ="answer";

	select_input_obj_id = obj_id;
	$("#light_box_area").show();
	$("#fraction_edit_for_ans").show();
	$.colorbox({inline:true,href:"#light_box_area",onClosed:function(){
		//如果有輸入的話
		if(select_input_obj_has_input){
			add_input_value(select_input_obj_id,parseInt(index_dsc));
		}
		select_input_obj_has_input =false;
		$("#fraction_edit_for_ans").hide();		
		$("#light_box_area").hide();
		select_input_type ="";		
	}});
	
}


//計算機操作 
function add_value_1(a_value){
var all_value = $('#formula_area_1').val() + a_value;
$('#formula_area_1').val(all_value);
}
//將計算機的值傳送到算式紀錄區
function send_value_1(){
	var all_value="";//計算機的值
	var fraction_ans_val="";//分數的值
	fraction_ans_val = get_fraction_ans_area();//分數的值
	switch(select_input_type){
		case "input":	
			all_value = $('#formula_area_1').val();
			$('#'+select_input_obj_id).val(all_value);
		break;
		case "answer":
			//all_value = "<span style='float:left;'>"+$('#formula_area_1').val()+"</span>"+fraction_ans_val;
			all_value = $('#formula_area_1').val() + fraction_ans_val;
			$('#'+select_input_obj_id).append(all_value);
			UpdateMath(select_input_obj_id);		
		break;
	}	
	$('#formula_area_1').val("");
	$("#fraction_edit_for_ans").hide();		
	$("#light_box_area").hide();
	select_input_obj_has_input =true;
	$.colorbox.close();
	
}
function cl_value_1(){
	$('#formula_area_1').val("");
}
function close_colorbox(){
	select_input_obj_id="";
	$("#fraction_edit_for_ans").hide();		
	$("#light_box_area").hide();
	$.colorbox.close();
}

//紀錄input的值
function add_input_value(obj_id,array_index){
	$('#showRecord').show();
	switch(select_input_type){
		case "input":			
			first_record_array.push("i||"+obj_id+"||"+$('#'+obj_id).val()+"||"+array_index);
			directly_record_array[array_index].push($('#'+obj_id).val());	
			var all_value = "i||"+obj_id+"||"+$('#'+obj_id).val();
			total_record_array.push(all_value);
		break;
		case "answer":
			first_record_array.push("i_ans_area||"+obj_id+"||"+$('#'+obj_id).html()+"||"+array_index);
			
			directly_record_array[array_index].push($('#'+obj_id).html());	
			var all_value = "i_ans_area||"+obj_id+"||"+$('#'+obj_id).html();
			total_record_array.push(all_value);
		break;
	}
}

//紀錄下拉符號的值
function add_sw_value(obj_id,array_index){//直式作答區符號資料輸入
	$('#showRecord').show();
	first_record_array.push("sw||"+obj_id+"||"+$('#'+obj_id).val()+"||"+array_index);
	directly_record_array[array_index].push($('#'+obj_id).val());		
	var all_value = "sw||"+obj_id+"||"+$('#'+obj_id).val();
	total_record_array.push(all_value);
}

//分數輸入區
function get_fraction_ans_area(){
var f_1 = $('#fraction_ans_1').val();
var f_2 = $('#fraction_ans_2').val();
var f_3 = $('#fraction_ans_3').val();
if(f_1 == ''){
//f_1 = '&nbsp;';
}
if(f_2 !='' && f_3 !=''){
	$('#showRecord').show();
	var all_value = '\\('+f_1+'{'+f_2+' \\over '+f_3+'}\\)';	
	$('#fraction_ans_1').val('');
	$('#fraction_ans_2').val('');
	$('#fraction_ans_3').val('');
	return all_value;
}else{
	$('#fraction_ans_1').val('');
	$('#fraction_ans_2').val('');
	$('#fraction_ans_3').val('');
	return "";
}

}

//latex語法支援
(function () {
    window.UpdateMath = function (obj_id) {
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,obj_id]);
    }
  })();

//橫式計算區的分數輸入器
function add_out_fraction(obj_id){
var f_1 = $("#out_fraction_1").val();
var f_2 = $("#out_fraction_2").val();
var f_3 = $("#out_fraction_3").val();
if(f_1 == ""){
//f_1 = "&nbsp;";
}
if(f_2 !="" && f_3 !="" && now_select_obj_type !="i"){
	
	$("#showRecord").show();
	var all_value = '\\('+f_1+'{'+f_2+' \\over '+f_3+'}\\)';
	if(obj_fraction_sw_input_area == "area_2"){
		ans_dsc += all_value;//上傳作答區答案(此值的分數部份會存latex語法而非轉換過得語法,轉換後的code有差異所以不拿來比對)
	}	
	first_record_array.push(now_select_obj_type+"||"+obj_fraction_sw_input_area+"||"+$('#'+obj_fraction_sw_input_area).html());
	$("#"+obj_fraction_sw_input_area).append(all_value);	
	total_record_array.push(now_select_obj_type+"||"+obj_fraction_sw_input_area+"||"+all_value);	
	$("#out_fraction_1").val("");
	$("#out_fraction_2").val("");
	$("#out_fraction_3").val("");
	UpdateMath(obj_fraction_sw_input_area);
	set_now_select_obj("text_area",obj_fraction_sw_input_area,"");
}else{
	$("#out_fraction_1").val("");
	$("#out_fraction_2").val("");
	$("#out_fraction_3").val("");
	return "";
}

}

//紀錄手寫輸入input的值
function add_hand_input_value(obj_id,array_index){
	$('#showRecord').show();
	first_record_array.push("i||"+obj_id+"||"+$('#'+obj_id).val()+"||"+array_index);
	directly_record_array[array_index].push($('#'+obj_id).val());	
	var all_value = "i||"+obj_id+"||"+$('#'+obj_id).val();
	total_record_array.push(all_value);
}