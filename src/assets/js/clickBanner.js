$(document).on('click', '.banner_foot li', function() {
    $(this).addClass('active').siblings().removeClass('active')
})