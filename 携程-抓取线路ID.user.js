// ==UserScript==
// @name			携程-抓取线路ID
// @namespace		https://www.baidu.com/
// @version			0.0.1
// @description		携程辅助插件
// @author 			小D
// @homepage		https://www.baidu.com/
// @match			*://*.ctrip.com/*/*/ResourceListV1.aspx*
// @icon			http://ctrip.com/favicon.ico
// @icon64			http://pic.c-ctrip.com/h5/common/72.png
// @updateURL		//localhost/test.js
// @downloadURL		//localhost/test.js
// @run-at			document-start
// @noframes
// @grant			none
// ==/UserScript==
(function(window, document, $bj) {
	'use strict';
	/*初始化辅助插件控件*/
	var init = function() {
		$bj('#BAT_support_css,#BAT_support').remove();
		var css = '<link id="BAT_support_css" rel="stylesheet" type="text/css" href="data:text/css,#BAT_support{width:100px;position:fixed;top:50%;left:0;padding:10px;margin-top:-10%;border:1px solid #1380e2;background-color:#f9f9f9}#BAT_support #upcsv{display:none}">';
		$bj(css).appendTo('head');
		var html = '<ul id="BAT_support"><li class="btn" id="catchResID">抓取线路资源ID</li></ul>';
		$bj(html).appendTo('body').children('#catchResID').click(function(e) {
			e.preventDefault();
			e.originalEvent.stopPropagation();
			e.originalEvent.stopImmediatePropagation();
			window.localStorage.setItem('catchFlag', 1);
			window.localStorage.removeItem('savedList');
			saveData();
		});
		var haveList = function() {
			$bj('#resInfo,#resLine,#downloadResID,#clearResID').off('click').remove()
			var targetList = JSON.parse(localStorage.getItem('savedList'));
			if (targetList && targetList.length) {
				/*追加访问模板页功能*/
				html = '<li class="btn" id="resInfo"><a href="' + './ResourceMaintenance.aspx?ResourceID=' + targetList[0][0] + '&amp;typeid=10' + '" target="_blank">产品信息模板页</a></li>';
				$bj(html).appendTo('#BAT_support').click(function(e) {
					window.localStorage.removeItem('passNumber');
					window.localStorage.setItem('resMaint', 0);
				});
				/*追加访问模板页功能*/
				html = '<li class="btn" id="resLine"><a href="' + './TourLineInfo.aspx?ResourceID=' + targetList[0][0] + '&amp;typeid=10' + '" target="_blank">行程介绍模板页</a></li>';
				$bj(html).appendTo('#BAT_support').click(function(e) {
					window.localStorage.removeItem('passNumber');
					window.localStorage.setItem('resMaint', 20);
				});
				/*追加编辑线路列表功能*/
				html = '<li class="btn" id="downloadResID"><a>下载已抓取线路</a></li>';
				$bj(html).appendTo('#BAT_support').children('a').click(function(e) {
					var head = '"资源ID","产品ID","商家产品名称","出发地"\r\n';
					var content = localStorage.savedList.replace('\[\[', '').replace(/(\]\,\[)+/g, '\r\n').replace('\]\]', '');
					var data = "\ufeff" + head + content;
					var blob = new Blob([data], {
						type: 'attachment/csv,charset=UTF-8'
					});
					var csvUrl = URL.createObjectURL(blob);
					var date = new Date().toLocaleDateString() + '-' + new Date().toTimeString().slice(0, 8);
					this.download = '线路ID列表 ' + date + '.csv';
					this.href = csvUrl;
				});
				html = '<li class="btn" id="clearResID">清空已抓取线路</li>';
				$bj(html).appendTo('#BAT_support').click(function() {
					window.localStorage.removeItem('savedList');
					haveList();
				});
			}
		};
		html = '<li class="btn" id="upResID">上传已抓取线路<input id="upcsv" accept=".csv" type="file" /></li>';
		$bj(html).appendTo('#BAT_support').click(function() {
			$bj(this).children('#upcsv')[0].click();
		}).children('#upcsv').on('change', function() {
			if (this.files && this.files[0]) {
				var reader = new FileReader();
				reader.onload = function(d) {
					var rs = d.target.result.split('\r\n');
					$bj.each(rs, function(i, o) {
						if (o == '') {
							rs.splice(i, 1);
							return true;
						}
						o = o.split(',');
						$bj.each(o, function(j, p) {
							o[j] = p.replace('"', '');
						});
						rs[i] = o;

					});
					if (rs[0][0] == '资源ID') {
						rs.shift();
					}
					window.localStorage.setItem('savedList', JSON.stringify(rs));
					tips('上传完成');
					$bj('#upcsv').val('');
					haveList();
				};
				reader.readAsText(this.files[0], 'gbk');
			}
		});
		haveList();
	};
	/*保存数据*/
	var saveData = function() {
		var rs = JSON.parse(window.localStorage.getItem('savedList'));
		rs = rs || [];
		$bj('#tblResourceList').find('tr[class]').each(function(i, o) {
			var that = $bj(this),
				temp = [],
				rid = that.data('resourceid').toString(),
				pid = that.data('id').toString(),
				sname = that.find('td:nth-child(3)>a').text().trim(),
				dep = that.find('td:nth-child(7)').text().trim();
			temp.push(rid, pid, sname, dep);
			rs.push(temp);
		});
		window.localStorage.setItem('savedList', JSON.stringify(rs));
		/*初始化翻页按钮*/
		var prevPageBtn = $bj('#ctl00_ContentPlaceHolder1_ucPageSetting_lnkToPrePage');
		var nextPageBtn = $bj('#ctl00_ContentPlaceHolder1_ucPageSetting_lnkToNextPage');
		var isLastPage = Boolean(nextPageBtn.attr('disabled'));
		if (isLastPage) {
			tips('抓取完成');
			window.localStorage.removeItem('catchFlag');
			init();
			
		} else {
			nextPageBtn[0].click();
		}

	};
	if (window.localStorage.getItem('catchFlag')) {
		saveData();
	} else {
		init();
	}
})(window, document, $bj);


function add(){
	var a = 1;
	var b = 2;
	var result = a+b;
	console.log(result);
}
setTimeout('add()',20000);

