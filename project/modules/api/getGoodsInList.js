var connect_mongo = require("../connect_mongo")
//处理前台请求商品的操作
const getGoodsInList = (params,res)=>{
    let {classid,order,keyword,pageSize,pageNum} = params//classid为类型 order为排序依据 keyword是关键字 pageSize每页数量，pageNum页数
    connect_mongo((db)=>{
      let goods = db.collection("goods")
      let rule = {}//控制classid
      let sort_rule={}//控制sort
      if(parseFloat(classid)){//如果为0说明要查找所有的数据，不加限定条件
        rule.classid=parseFloat(classid)
      }
      if(keyword){
        rule.keyword=new RegExp("" + keyword + "");
      }
      if(order){//如果order存在，说明要按照价格或人气排序
        sort_rule[order]=-1
      }
      // size 5 page 2 6-10 start num*size,size
      let limit = parseFloat(pageSize)
      //skip代表从哪里开始取，limit代表取几个
      goods.find(rule).sort(sort_rule).skip(pageSize*(pageNum-1)).limit(limit).toArray((err,results)=>{
        if(err) throw err;
        res.send(results)

        db.close()
      })
    })

}

module.exports = getGoodsInList



