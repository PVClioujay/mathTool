//���ɰw clockwise �ΰf�ɰw direction
var sw_type = "clockwise";
function chg_sw(type_dsc){
var rotate_css_dsc =""; 
 switch(type_dsc){
	case "clockwise"://���ɰw
	$('#sw_d').show();
	$('#sw_r').hide();
	sw_type = "clockwise";
	rotate_css_dsc ='url(./images/rotate_r.png), default'; 
	break;
	case "direction"://�ΰf�ɰw
	$('#sw_d').hide();
	$('#sw_r').show();
	sw_type = "direction";
	rotate_css_dsc ='url(./images/rotate_l.png), default'; 
	break;
 } 
   if(d_r_type == "r"){
		for(var x=0;x<drag_sw_obj_array.length;x++){	
			if(drag_sw_obj_array[x] == 'protractor'){
			$('#'+drag_sw_obj_array[x]).css("cursor",rotate_css_dsc);
			}else{
			$('#'+drag_sw_obj_array[x]).css("cursor",rotate_css_dsc);
			}
		}
	}
}

//=============================================================================================
//��������άO�즲
var d_r_type = "d";
function chg_d_r(type_dsc){
var d_r_css_dsc =""; 
switch(type_dsc){
	case "d":
		$('#sw_drage').show();
		$('#sw_roato').hide();
		$("#ruler").draggable("enable");
		$("#protractor").draggable("enable");
		
		d_r_type = "d";
		d_r_css_dsc ='default';		
		for(var x=0;x<drag_sw_obj_array.length;x++){
			$('#'+drag_sw_obj_array[x]).css("cursor",d_r_css_dsc);
			$('#'+drag_sw_obj_array[x]).draggable("enable");
		}
	break;
	case "r"://�����즲�令�i�H����
		$('#sw_drage').hide();
		$('#sw_roato').show();

		$("#ruler").draggable({ disabled: true });
		$("#protractor").draggable({ disabled: true });
		d_r_type = "r";
		chg_sw(sw_type);
		for(var x=0;x<drag_sw_obj_array.length;x++){
			//$('#'+drag_sw_obj_array[x]).css("cursor",d_r_css_dsc);
			$('#'+drag_sw_obj_array[x]).draggable({ disabled: true });
		}
		
	break;
} 	
}