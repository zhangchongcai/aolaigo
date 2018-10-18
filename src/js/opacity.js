(function($){
		$.fn.carousel = function (opts) {
			var _this = this;
			stepNum = 0; //步数
			len = null; //要轮播图片的个数
			All = "";
			timer = null;
			//检查是否已加载角标
			isLoaderSpeed = 0;
			// 初始化		param传入整个轮播图的宽和高
			option = {
				W: '100%',
				H: '100%',
				speed: '3000',
				isloop: false,
				iscarousel : true
			}
			param = $.extend(option, opts);

			$("#carousel-big").css({
				"height": param.H,
				"width": param.W
			})
			init = function () {

				len = $("#carousel-center .carousel-banner").length;

				var btnH = parseInt($("#carousel-left-btn").css("height"));

				$("#carousel-left-btn").css({
					"left": "10%",
					"top": (param.H - btnH) / 2
				});
				$("#carousel-right-btn").css({
					"right": "10%",
					"top": (param.H - btnH) / 2
				});
				addLinkA();
				clickFun();
				if(param.iscarousel){
					timer = setInterval(stepFun, param.speed);
				}
			},
				// 创建页面的点点
				addLinkA = function () {
					for (var a = 0; a < len; a++) {
						All += '<a href="javascript:opacityChange(0,' + a + ')"></a>';
					}
					var html = '<p id="carousel-step">' + All + '</p>';
					if (!isLoaderSpeed) {
						$("#carousel-big").append(html);
						isLoaderSpeed = 1;
					}
				},
				// 透明度的改变来切换图片
				opacityChange = function (time, y) {
					// 改变点击之后i的值
					stepNum = y;
					$("#carousel-center .carousel-banner").eq(y).animate({
						"opacity": 1,
						"z-index": 1
					}, time);
					$("#carousel-step a").eq(y).css("background-position", "0 0")
					$("#carousel-center .carousel-banner").eq(y).siblings().animate({
						"opacity": 0,
						"z-index": 0
					}, time)
					$("#carousel-step a").eq(y).siblings().css("background-position", "-29px 0")
				},
				// 计算步数的方法
				stepFun = function () {
					// 记录走到哪
					stepNum++;
					stepNum = (len - 1) < stepNum && !param.isloop ? 0 : stepNum
					// 如果是ie8及一下版本，则不显示过度动画
					var DEFAULT_VERSION = "8.0";
					var ua = navigator.userAgent.toLowerCase();
					var isIE = ua.indexOf("msie")>-1;
					var safariVersion;
					if(isIE){
					    safariVersion =  ua.match(/msie ([\d.]+)/)[1];
					}
					if(safariVersion <= DEFAULT_VERSION ){
					    opacityChange(20, stepNum)
					}else{
						opacityChange(1000, stepNum)
					}
					

				},

				clickFun = function () {
					// 向左点击切换图片图片
					$("#carousel-right-btn") && $("#carousel-right-btn").click(function () {

						stepNum++;
						stepNum = (len - 1) < stepNum ? 0 : stepNum;
						opacityChange(0, stepNum)

					})
					// 右点击
					$("#carousel-left-btn") && $("#carousel-left-btn").click(function () {
						// 向右点击切换图片图片
						stepNum--;
						stepNum = stepNum < 0 ? (len - 1) : stepNum;
						opacityChange(0, stepNum)

					})
					$("#carousel-big").mouseover(function () {

						clearInterval(timer);

						$("#carousel-left-btn,#carousel-right-btn").stop().show(200);

					}).mouseout(function () {
						if(param.iscarousel){
							timer = setInterval(stepFun, param.speed)
						}
						$("#carousel-left-btn,#carousel-right-btn").stop().hide(100);


					})
				}
			init();
		}
	})(jQuery)
