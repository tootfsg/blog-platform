$(function () {
    $('#btn-reset').click(function () {
        var address = window.location.pathname + '/';
        var $pwd1 = $('input[name="pwd1"]').val();
        var $pwd2 = $('input[name="pwd2"]').val();
        if ($pwd1 === $pwd2) {
            $.get(address + $pwd1, {}, function (date, status) {
                console.log(date);
                return
            })
        } else {
            alert('两次输入密码不一样')
        }
    })
})