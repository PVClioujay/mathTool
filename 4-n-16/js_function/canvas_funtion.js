var mousePressed = false;
var image = new Image();
var first_x = "";
var first_y = "";
var last_x = "";
var last_y = "";
var set_num = 1;
var need_go_back = false;
var color_value = "black"; //µeµ§ÃC¦â¹w³]¬°¶Â¦â
var canvas_lineWidth = 2; //½u±ø²Ê²Ó
var draw_x_y = false;
//«Å§i¨ú±o·Æ¹«¦ì¸m
var mx = 0;
var my = 0;
jQuery(document).mousemove(function(event) {
    mx = event.pageX;
    my = event.pageY;
});

function initializeContext_up(get_idex, target_id, target_id_1) {
    var get_index_dsc = get_idex;
    canvas_up_array[get_index_dsc] = document.getElementById(target_id);
    context_up_array[get_index_dsc] = canvas_up_array[get_index_dsc].getContext("2d");

    //·Æ¹««ö¤U
    $("#" + target_id).mousedown(function(event) {
        var x = 0;
        var y = 0;
        if (event.layerX || event.layerX == 0) { // Firefox
            x = event.layerX;
            y = event.layerY;
        } else if (event.offsetX || event.offsetX == 0) { // Opera
            x = event.offsetX;
            y = event.offsetY;
        }
        //¨Ï¥Îoffset¤è¦¡¨ú±o°_©lÂI
        first_x = x;
        first_y = y;
        context_up_array[get_index_dsc].moveTo(first_x, first_y);
        mousePressed = true;
    });
    //·Æ¹«²¾°Ê
    $("#" + target_id).mousemove(function() {
        if (!mousePressed) {
            return false;
        }
        last_x = mx - $('#' + target_id).offset().left;
        last_y = my - $('#' + target_id).offset().top;
        if (set_num < 1) {
            $('#showRecord').show();
            context_up_array[get_index_dsc].clearRect(0, 0, canvas_up_array[get_index_dsc].width, canvas_up_array[get_index_dsc].height);
            context_up_array[get_index_dsc].beginPath();
            context_up_array[get_index_dsc].moveTo(first_x, first_y);
            context_up_array[get_index_dsc].lineTo(last_x, last_y);
            context_up_array[get_index_dsc].lineWidth = canvas_lineWidth; //²Ê²Ó
            context_up_array[get_index_dsc].strokeStyle = color_value; //ÃC¦â
            context_up_array[get_index_dsc].stroke();
            context_up_array[get_index_dsc].closePath();
        } else {
            set_num--;
        }
    });

    //·Æ¹«©ñ¶}
    $("#" + target_id).mouseup(function() {
        if (!mousePressed) {
            return false;
        }
        last_x = mx - $('#' + target_id).offset().left;
        last_y = my - $('#' + target_id).offset().top;

        context_up_array[get_index_dsc].clearRect(0, 0, canvas_up_array[get_index_dsc].width, canvas_up_array[get_index_dsc].height);
        context_down_array[get_index_dsc].beginPath();
        context_down_array[get_index_dsc].moveTo(first_x, first_y);
        context_down_array[get_index_dsc].lineTo(last_x, last_y);
        context_down_array[get_index_dsc].lineWidth = canvas_lineWidth; //²Ê²Ó
        context_down_array[get_index_dsc].strokeStyle = color_value; //ÃC¦â
        context_down_array[get_index_dsc].stroke();
        context_down_array[get_index_dsc].closePath();

        /*
        	¬ö¿ý¸ê®Æ
        	1.ÃÑ§O½X : line_w
        	2.Ã¸¹Ï°Ïid
        	3.Ã¸¹Ï°_©lÂI
        	4.Ã¸¹Ïµ²§ôÂI
        	5.ª«¥óªºindex
        	6.²Ê²Ó
        	7.ÃC¦â
        */
        total_record_array.push("line_w||" + target_id + "||" + first_x + "," + first_y + "||" + last_x + "," + last_y + "||" + get_idex + "||" + canvas_lineWidth + "||" + color_value);
        first_record_array.push("line_w||" + target_id + "||" + first_x + "," + first_y + "||" + last_x + "," + last_y + "||" + get_idex + "||" + canvas_lineWidth + "||" + color_value);
        mousePressed = false;
        console.log("first:" + first_x, first_y);
        console.log("last:" + last_x, last_y);
        switch(title){
            case 10:
                if (first_x > 100 && (first_y < 350 || first_y > 350)) {
                    console.log("qwe")
                    if ((last_x < 300 || last_x > 300) && (last_y > 20 || last_y < 30)) {
                        console.log("qwe2")
                        draw_x_y = true;
                    }
                }else{
                    respons("這個角的開口朝右邊，記得要從綠色的0開始數角度。")
                }
            break;
            case 11:
                if (first_x > 340 && first_y < 386) {
                    console.log("qwe")
                    if (last_x < 80 && (last_y > 36 || last_y < 36)) {
                        console.log("qwe2")
                        draw_x_y = true;
                    }
                }else{
                    respons("這個角的開口朝右邊，記得要從綠色的0開始數角度。")
                }
            break;
        }
        //判斷判斷130
        
        //判斷60度、角度連連看
        


        first_x = 0;
        first_y = 0;
        last_x = 0;
        last_y = 0;
        set_num = 2;
    });

    //·Æ¹«©ñ¶}
    $("#" + target_id).mouseout(function() {
        if (!mousePressed) {
            return false;
        }
        last_x = mx - $('#' + target_id).offset().left;
        last_y = my - $('#' + target_id).offset().top;

        context_up_array[get_index_dsc].clearRect(0, 0, canvas_up_array[get_index_dsc].width, canvas_up_array[get_index_dsc].height);
        context_down_array[get_index_dsc].beginPath();
        context_down_array[get_index_dsc].moveTo(first_x, first_y);
        context_down_array[get_index_dsc].lineTo(last_x, last_y);
        context_down_array[get_index_dsc].lineWidth = canvas_lineWidth; //²Ê²Ó
        context_down_array[get_index_dsc].strokeStyle = color_value; //ÃC¦â
        context_down_array[get_index_dsc].stroke();
        context_down_array[get_index_dsc].closePath();
        total_record_array.push("line_w||" + target_id + "||" + first_x + "," + first_y + "||" + last_x + "," + last_y + "||" + get_idex);
        first_record_array.push("line_w||" + target_id + "||" + first_x + "," + first_y + "||" + last_x + "," + last_y + "||" + get_idex);
        mousePressed = false;
        first_x = 0;
        first_y = 0;
        last_x = 0;
        last_y = 0;
        set_num = 2;
    });



    //$('#'+target_id).zIndex(-1);//¤¤¼hµe¥¬=>©ì©Ô®ÉÅã¥Üª½
}


function initializeContext_down(get_idex, target_id, target_id_1, bg_dsc) {
    var get_index_dsc = get_idex;
    canvas_down_array[get_index_dsc] = document.getElementById(target_id);
    context_down_array[get_index_dsc] = canvas_down_array[get_index_dsc].getContext("2d");
    $('#' + target_id).show().offset({
        top: $('#' + target_id_1).offset().top,
        left: cover_left
    }); //³Ì©³¼hµe¥¬=>Åã¥Üª½½u

    var background = new Image();
    background.src = bg_dsc; //³]©w­I´º
    background.onload = function() {
        context_down_array[get_index_dsc].drawImage(background, 100, 350);
        if (need_go_back) {
            for (var x = 0; x < total_record_array.length; x++) {
                var data_array = total_record_array[x].split("||");
                switch (data_array[0]) {
                    case "line_w": //¾î¦¡§@µª°Ï
                        if (data_array[4] == get_index_dsc) {
                            var f_xy_array = data_array[2].split(",");
                            var l_xy_array = data_array[3].split(",");
                            context_down_array[data_array[4]].beginPath();
                            context_down_array[data_array[4]].moveTo(f_xy_array[0], f_xy_array[1]);
                            context_down_array[data_array[4]].lineTo(l_xy_array[0], l_xy_array[1]);
                            context_down_array[data_array[4]].lineWidth = data_array[5]; //²Ê²Ó
                            context_down_array[data_array[4]].strokeStyle = data_array[6]; //ÃC¦â
                            context_down_array[data_array[4]].stroke();
                            context_down_array[data_array[4]].closePath();
                        }
                        break;
                }
            }
            need_go_back = false;
        }
    }

}

function initializeContext_down2(get_idex, target_id, target_id_1, bg_dsc) {
    var get_index_dsc = get_idex;
    canvas_down_array[get_index_dsc] = document.getElementById(target_id);
    context_down_array[get_index_dsc] = canvas_down_array[get_index_dsc].getContext("2d");
    $('#' + target_id).show().offset({
        top: $('#' + target_id_1).offset().top,
        left: cover_left
    }); //³Ì©³¼hµe¥¬=>Åã¥Üª½½u

    var background = new Image();
    background.src = bg_dsc; //³]©w­I´º
    background.onload = function() {
        context_down_array[get_index_dsc].drawImage(background, 0, 0);
        if (need_go_back) {
            for (var x = 0; x < total_record_array.length; x++) {
                var data_array = total_record_array[x].split("||");
                switch (data_array[0]) {
                    case "line_w": //¾î¦¡§@µª°Ï
                        if (data_array[4] == get_index_dsc) {
                            var f_xy_array = data_array[2].split(",");
                            var l_xy_array = data_array[3].split(",");
                            context_down_array[data_array[4]].beginPath();
                            context_down_array[data_array[4]].moveTo(f_xy_array[0], f_xy_array[1]);
                            context_down_array[data_array[4]].lineTo(l_xy_array[0], l_xy_array[1]);
                            context_down_array[data_array[4]].lineWidth = data_array[5]; //²Ê²Ó
                            context_down_array[data_array[4]].strokeStyle = data_array[6]; //ÃC¦â
                            context_down_array[data_array[4]].stroke();
                            context_down_array[data_array[4]].closePath();
                        }
                        break;
                }
            }
            need_go_back = false;
        }
    }

}

function set_canvas_color(color_dsc) {
    color_value = color_dsc;
}

function set_canvas_line_width(width_dsc) {
    canvas_lineWidth = width_dsc;
}