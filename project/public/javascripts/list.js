var classid = null
var order = null
var keyword = null
var pageNum = 1
var pageSize = 4
$('.goods').on("click", ".type-btn", function(e) {
    keyword = null
    $('#search-inp').val('')


    $(".type-btn").removeClass('btn-primary').addClass("btn-info")
    $(this).removeClass("btn-info").addClass("btn-primary")
    if ($(this).data('id') == classid) {
        return;
    }
    classid = $(this).data('id')
    pageNum = 1
    getGoods()
})

$('.goods').on("click", ".order-btn", function(e) {
    $(".order-btn").removeClass('btn-danger').addClass("btn-info")
    $(this).removeClass("btn-info").addClass("btn-danger")
    if ($(this).data('order') == order) {
        $(this).removeClass("btn-danger").addClass("btn-info")
        order = null
    } else {
        order = $(this).data('order')
    }
    pageNum = 1
    getGoods()
})


$("#search-inp").keyup(function(e) {
    if (e.keyCode == 13) {
        keyword = this.value
        pageNum = 1
        getGoods()
    }
})

$("#prev").click(function() {
    if (pageNum > 1) {
        pageNum--
        getGoods()
    } else {
        alert('已经第一页')
    }
})

$("#next").click(function() {
    pageNum++
    getGoods()
})





function getGoods() {
    $.ajax({
        url: '/goods/getGoodsInList',
        data: { classid: classid, order: order, keyword: keyword, pageNum: pageNum, pageSize: pageSize },
        success: function(results) {
            if (results.length == 0) {
                pageNum--
                alert("已经是最后一页")
                return
            }
            showGoods(results)
        }
    })
}


function showGoods(results) {
    let str = '';
    results.forEach((item, i) => {
        str += `
        <div class="col-xs-12 col-sm-6 col-md-3" style="width:254.5px;height:402.5px">
            <div class="thumbnail">
                <img style="width:214.5px;height:214.5px" class="animated" src="${item.imgurl}" title="${item.name}">
                <div class="caption">
                    <h3>
                        <a href="/detail?id=${item._id}">${item.name}</a>
                    </h3>
                    <p>价格：${item.price} 人气：${item.hot}</p>
                    <p>
                        <button data-id="${item._id}" class="add-btn btn btn-danger">加入购物车</button>
                    </p>
                </div>
            </div>
        </div>
        `
        $(".goods .row").html(str)
        $("#pagenum").html(pageNum)
    });
}