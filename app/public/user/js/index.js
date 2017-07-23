$(function () {
	var reg = /^[a-zA-Z]{5,20}$/;
	$('#btn-login').click(function () {
		var $name = $('.login li input[name="username"]').val();
		var $pwd = $('.login li input[name="password"]').val();
		$.post('/user/login', {
			logintype: 'username',
			username: $name,
			password: $pwd
		}, function (data, status) {
			console.log(data)
		})
	});
	$('#btn-register').click(function () {
		var $name = $('.register li input[name="username"]').val();
		var $pwd = $('.register li input[name="password"]').val();
		var $pwd2 = $('.register li input[name="password2"]').val();
		if ($pwd === $pwd2) {
			if (reg.test($name) && reg.test($pwd)) {
				$.post('/user/register', {
					username: $name,
					password: $pwd
				}, function (data, status) {
					console.log(data)
				})
			} else {
				alert('请输入字母或数字开头的用户名或密码，至少5位');
				return
			}
		} else {
			alert('两次输入的密码不相同');
			return
		}
	});
	$('#btn-reset').click(function () {
		var $mail = $('.reset li input[type="email"]').val();
		$.post('/user/reset', { mail: $mail }, function (data, status) {
			console.log(data)
		})
	});




});
$(function () {
	const $width = $(document).innerWidth();
	const $height = $(document).innerHeight();
	const vs = $width / $height;
	if (vs > 1) {
		$('#bg-img img').css('width', '100%');
		$('#bg-img img').css('height', '')
	} else {
		$('#bg-img img').css('width', '');
		$('#bg-img img').css('height', '100%')
	};
	//	console.log($(document).innerWidth());
	//	console.log($(document).innerHeight());
	var i = 1;
	$('#bg-img-1').css('opacity', '0');
	$('#bg-img-2').css('opacity', '1');
	setInterval(function () {
		if (i > 3) i = 1;
		$("#bg-img-" + i).css('opacity', '1').siblings().css('opacity', '0');
		i++
	}, 5000);
	//图片bind click
	$('#img-btn img').click(function () {
		$('.' + $(this).attr('id')).addClass('active').siblings().removeClass('active')
	});
})