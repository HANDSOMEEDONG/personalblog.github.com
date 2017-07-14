$(function(){
	$('.maq_tab_left').click(function(){
		var a = $('.maq_tab_left').index(this);
		if(a == 1){
			$('#hd2').css({'z-index':'13'});
		}else{
			$('#hd2').css({'z-index':'11'});
		}
		$('.maq_tab_left ').eq($(this).index()).addClass('ma_border').siblings().removeClass('ma_border');
		$('.asan').eq($(this).index()).css('display','block').siblings().css('display','none');
	});
	var aa = $('.aaaa');
		var bb = $('.bbbb');
		aa.click(function(){
			bb.removeClass('blue_tab');
			aa.addClass('orange_tab');
			$('.ma_img').attr('src','image/ma1.png');
			$('.mb_img').attr('src','image/ma2.png');
		});
		bb.click(function(){
			aa.removeClass('orange_tab');
			bb.addClass('blue_tab');
			$('.mb_img').attr('src','image/ma4.png');
			$('.ma_img').attr('src','image/ma3.png');
		});
})