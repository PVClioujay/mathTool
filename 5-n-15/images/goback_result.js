/*
	此js用來顯示步驟及回上一步驟呼叫用
	reload_input(setNum) => 顯示步驟用
	go_back => 回上一步驟
*/

function reload_input(setNum){
var data_array = total_record_array[setNum].split("||");
	switch(data_array[0]){
		case "cp_d_c_obj"://可拖曳、複製物件
			clone_d_c_obj(data_array[1],false)		
		break;
		case "text_area"://橫式作答區
			$('#'+data_array[1]).append(data_array[2]);
			UpdateMath(data_array[1]);
		break;
		case "text_area<br>"://橫式作答區_換行
			$("#cos_ans_area img").attr("src","./images/icon_triangles.png");//先將所有圖片改成靜態
			$('#'+data_array[1]).append(data_array[2]);
			UpdateMath(data_array[1]);
		break;
		case "i"://直式作答區
			console.log(data_array);
			$("#"+data_array[1]).val(data_array[2]);
		break;
		case "i_ans_area"://作答輸入區
			$("#"+data_array[1]).append(data_array[2]);
			UpdateMath(data_array[1]);
		break;
		case "sw"://直式作答區的符號區
			$("#"+data_array[1]).children().each(function(){
			if ($(this).text()==data_array[2]){
				$(this).attr("selected", true);
			}
			});
		break;	
		case "cp_obj"://直式作答區的符號區
			add_division(false);
		break;
		case "cp_table"://直式作答區的符號區
			add_table(false);
		break;
		case "r":
			var int_dsc = parseInt(data_array[2]);
			switch(data_array[1]){
				case "protractor":
					$("#"+data_array[1]).rotate(
					{
						angle: (int_dsc),
						center: ["150px", "150px"]
					});					
				break;
				default:
					$("#"+data_array[1]).rotate(
					{
						angle: (int_dsc),
						center: ["0%", "50%"]
					});
				break;
			}			
		break;
		case "m":
			var m_value_array =  data_array[2].split(",");
			$("#"+ data_array[1]).offset({ top:m_value_array[1] , left:m_value_array[0] });
		break;
		case "i_o":
			if(data_array[2]=="in"){
					$('#show_img').attr("src","images/glass_90.png");
					$('#show_img_ml').attr("src","images/glass_90ml.png");

			}
		break;
		case "cp_obj_1"://可拖曳文字輸入框
			clone_obj(data_array[1],false)
		break;
		case "cp_obj_2"://短除法
			clone_division_obj(data_array[1],false)
		break;
		case "line_w"://繪圖區劃線
			var f_xy_array = data_array[2].split(",");
			var l_xy_array = data_array[3].split(",");	
			context_down_array[data_array[4]].beginPath();
			context_down_array[data_array[4]].moveTo(f_xy_array[0],f_xy_array[1] );
			context_down_array[data_array[4]].lineTo(l_xy_array[0],l_xy_array[1]);
			context_down_array[data_array[4]].lineWidth=data_array[5];//粗細
			context_down_array[data_array[4]].strokeStyle=data_array[6];//顏色				
			context_down_array[data_array[4]].stroke();
			context_down_array[data_array[4]].closePath();

		break;
		case "show_tools"://直尺、三角尺、量角器
			show_set_tools(data_array[1]);
		break;
		case "hide_tools"://直尺、三角尺、量角器
			hide_set_tools(data_array[1]);
		break;
		case "show_drag_obj"://拖曳物件顯示
			show_set_drag_obj_show(data_array[1],data_array[2]);
		break;
		case "switch_obj_area"://顯示直式、除式作答區
			switch_obj_area(data_array[1],data_array[2],false);
			if(data_array[1] == "obj_2"){
			$('#select_obj_area').empty().append(data_array[2]);
			}
		break;		
	}
}

//==========================================================================
//回上一步驟
function go_back(){
	if(total_record_array.length > 0){
		var xxx = total_record_array.pop();
		var goback_index = first_record_array.length -1;
		var data_array = first_record_array[goback_index].split("||");
		var reload_once =false;

		switch(data_array[0]){
			case "cp_d_c_obj"://可拖曳、複製物件
			$("#"+ data_array[1]).remove();			
			break;
			case "text_area"://橫式作答區
				$("#"+data_array[1]).empty().append(data_array[2]);
				UpdateMath(data_array[1]);
			break;
			case "i":
				xxx = directly_record_array[data_array[3]].pop();
				goback_index = directly_record_array[data_array[3]].length -1;
				$("#"+data_array[1]).val(directly_record_array[data_array[3]][goback_index]);	
			break;
			case "i_ans_area":
				//xxx = directly_record_array[data_array[3]].pop();
				//goback_index = directly_record_array[data_array[3]].length -1;
				//$("#"+data_array[1]).empty().html(directly_record_array[data_array[3]][goback_index]);	
				$("#"+data_array[1]).empty().append(data_array[2]);
				UpdateMath(data_array[1]);
			break;			
			case "sw":
				xxx = directly_record_array[data_array[3]].pop();
				goback_index = directly_record_array[data_array[3]].length -1;
				$("#"+data_array[1]).children().each(function(){
					if ($(this).text() == directly_record_array[data_array[3]][goback_index]){
						//jQuery給法
						$(this).attr("selected", true);
					}
				});
			break;
			case "cp_input":
				var last_index = del_obj_id_array.length -1;
				$("#"+ del_obj_id_array[last_index]).remove();
				xxx = del_obj_id_array.pop();
			break;				
			case "cp_table":
				var last_index = del_obj_id_array.length -1;
				$("#"+ del_obj_id_array[last_index]).remove();
				xxx = del_obj_id_array.pop();
				last_index = del_obj_id_array.length -1;
				$("#"+ del_obj_id_array[last_index]).remove();			
				xxx = del_obj_id_array.pop();
			break;
			case "r":
				var index_dsc = drag_sw_obj_array.indexOf(data_array[1]);
				var int_dsc = parseInt(data_array[2]);
				drag_sw_obj_ration_val[index_dsc] = data_array[2];
					switch(data_array[1]){
						case "protractor":
							$("#"+data_array[1]).rotate(
							{
								angle: (int_dsc),
								center: ["150px", "150px"]
							});					
						break;
						default:
							$("#"+data_array[1]).rotate(
							{
								angle: (int_dsc),
								center: ["0%", "50%"]
							});
						break;
					}
			break;
			case "m":
			var m_value_array =  data_array[2].split(",");
				$("#"+ data_array[1]).offset({ top:m_value_array[1] , left:m_value_array[0] });
			break;
			case "chg_pic"://丟石頭到水瓶
				$('#show_img').attr("src","images/glass_50.png");			
				$('#show_img_ml').attr("src","images/glass_50ml.png");
				reload_once = true;
			break;
			case "cp_obj_1"://可拖曳文字輸入框
				$("#"+ data_array[1]).remove();			
			break;
			case "cp_obj_2"://短除法
				$("#"+ data_array[1]).remove();			
			break;
			case "line_w"://繪圖區劃線
				re_write(data_array[4]);
			break;
			case "show_tools"://直尺、三角尺、量角器
				hide_set_tools(data_array[1]);
			break;
			case "hide_tools"://直尺、三角尺、量角器
				show_set_tools(data_array[1]);
			break;
			case "show_drag_obj"://拖曳物件顯示
				hide_set_drag_obj_show(data_array[1],data_array[2]);
			break;
			case "switch_obj_area"://顯示直式、除式作答區
				if(data_array[2] !=''){
				$('#'+data_array[1]).hide();
				}
				if(data_array[2] !=''){
				$('#'+data_array[2]).show();
				}
				if(data_array[3]!=""){
				$('#select_obj_area').empty().append(data_array[3]);
				}
			break;
		}
		xxx = first_record_array.pop();
		
		if(reload_once){//專門for 水瓶丟石頭題目用
			$("#stone").draggable("enable");
			$('#show_img').attr("src","images/glass_50.png");			
			go_back();
		}
		if(total_record_array.length == 0){
			$('#showRecord').hide();
			hide_all_obj_area();
		}
	}
}