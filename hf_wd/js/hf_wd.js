var app = angular.module('hf_wd', ['ionic']);

//自定义服务
app.service('$wdHttp',
  ['$http', '$ionicLoading',
    function ($http, $ionicLoading) {
      this.sendRequest = function (url, handleSucc) {
        $ionicLoading.show({template: 'loading...'})
        $http
          .get(url)
          .success(function (data) {
            $ionicLoading.hide();
            handleSucc(data);
          })
      }

    }])


app.config(
  function ($stateProvider,
            $ionicConfigProvider,
            $urlRouterProvider) {

    //调整tabs固定在底部
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('wdStart', {
        url: '/wdStart',
        templateUrl: 'tpl/start.html',
        controller:'StartCtrl'
      })
      .state('wdMain', {
        url: '/wdMain',
        templateUrl: 'tpl/main.html',
        controller: 'MainCtrl'
      })
      .state('wdDetail', {
        url: '/wdDetail/:id',
        templateUrl: 'tpl/detail.html',
        controller: 'DetailCtrl'
      })
      .state('wdOrder', {
        url: '/wdOrder/:id',
        templateUrl: 'tpl/order.html',
        controller: 'orderCtrl'
      })
      .state('wdMyOrder', {
        url: '/wdMyOrder',
        templateUrl: 'tpl/myOrder.html',
        controller: 'myOrderCtrl'
      })
      .state('wdCart',{
        url:'/wdCart',
        templateUrl:'tpl/cart.html',
        controller:'cartCtrl'
      })
      .state('wdSetting', {
        url: '/wdSetting',
        templateUrl: 'tpl/setting.html',
        controller: 'settingCtrl'
      })
      .state('GanGuo', {
        url: '/GanGuo',
        templateUrl: 'tpl/GanGuo.html',
        controller:'parentCtrl'
      })
      .state('JianGuo', {
        url: '/JianGuo',
        templateUrl: 'tpl/JianGuo.html',
        controller:'parentCtrl'
      })
      .state('wdIntroduce', {
        url: '/wdIntroduce',
        templateUrl: 'tpl/introduce.html'
      })


    $urlRouterProvider.otherwise('/wdStart');
  })

//创建一个父控制器
app.controller('parentCtrl', ['$scope', '$state','$ionicActionSheet','$wdHttp','$ionicScrollDelegate',
  function ($scope, $state,$ionicActionSheet,$wdHttp,$ionicScrollDelegate) {
    $scope.jump = function (desState, arg) {
      $state.go(desState, arg);
    }
    $scope.dishList = [];
    //加载干果数据
    $wdHttp.sendRequest(
      'data/dish_getganguo.php',
      function (data) {
        console.log(data);
        $scope.dishList = data;
      })

    //滚动到顶部
    $scope.goToTop = function () {
      $ionicScrollDelegate.scrollTop(true);
    }

    $scope.showActionSheet = function () {
      $ionicActionSheet.show({
        titleText:'分享',
        destructiveText:'删除',
        destructiveButtonClicked: function () {
          console.log('选择了删除操作');
          return true;
        },
        cancelText:'取消',
        cancel: function () {
          console.log('选择了取消的操作');
          return true;
        },
        buttons:[
          {text:'分享到朋友圈'},
          {text:'分享到微博'},
          {text:'分享到QQ'}
        ]
      });
    }
  }
]);

app.controller('StartCtrl', ['$scope', '$state','$ionicActionSheet',
  function ($scope, $state,$ionicActionSheet) {

//分享-弹出操作表
    $scope.showActionSheet = function () {
      $ionicActionSheet.show({
        titleText:'分享',
        destructiveText:'删除',
        destructiveButtonClicked: function () {
          console.log('选择了删除操作');
          return true;
        },
        cancelText:'取消',
        cancel: function () {
          console.log('选择了取消的操作');
          return true;
        },
        buttons:[
          {text:'分享到朋友圈'},
          {text:'分享到微博'},
          {text:'分享到QQ'}
        ]
      });
    }
  }
]);


app.controller('MainCtrl', ['$scope', '$wdHttp','$ionicSideMenuDelegate','$ionicActionSheet','$ionicScrollDelegate',
  function ($scope, $wdHttp,$ionicSideMenuDelegate,$ionicActionSheet,$ionicScrollDelegate) {
    $scope.myActiveSlide = 1;
    $scope.hasMore = true;
    $scope.dishList = [];
    //打开左边的侧边栏菜单
    $scope.openLeft = function () {
      $ionicSideMenuDelegate.toggleLeft(true);
    }
    //加载首页数据
    $wdHttp.sendRequest(
      'data/dish_getbypage.php',
      function (data) {
        console.log(data);
        $scope.dishList = data;
      })
    //滚动到顶部
    $scope.goToTop = function () {
      $ionicScrollDelegate.scrollTop(true);
    }



    //分享-弹出操作表
    $scope.showActionSheet = function () {
      $ionicActionSheet.show({
        titleText:'分享',
        destructiveText:'删除',
        destructiveButtonClicked: function () {
          console.log('选择了删除操作');
          return true;
        },
        cancelText:'取消',
        cancel: function () {
          console.log('选择了取消的操作');
          return true;
        },
        buttons:[
          {text:'分享到朋友圈'},
          {text:'分享到微博'},
          {text:'分享到QQ'}
        ]
      });
    }
    //给按钮定义一个处理函数：加载更多数据
    $scope.loadMore = function () {
      $wdHttp.sendRequest(
        'data/dish_getbypage.php?start=' + $scope.dishList.length,
        function (data) {
          if (data.length < 3) {
            $scope.hasMore = false;
          }
          $scope.dishList = $scope.dishList.concat(data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      )
    }
  }
])
//添加到购物车
app.controller('DetailCtrl',
  ['$scope', '$wdHttp', '$stateParams', '$ionicPopup','$ionicActionSheet','$ionicSideMenuDelegate',
    function ($scope, $wdHttp, $stateParams, $ionicPopup,$ionicActionSheet,$ionicSideMenuDelegate) {
      console.log($stateParams);
      //定义方法，更新购物车信息
      $scope.addToCart = function () {
        //与服务器端通信
        $wdHttp.sendRequest(
          'data/cart_update.php?uid=1&did=' + $stateParams.id + "&count=-1",
          function (result) {
              //将添加都购物车的结果弹窗显示
            $ionicPopup.alert({
              template: '添加到购物车成功'
            })
          }
        )
      }
        //打开左边的侧边栏菜单
        $scope.openLeft = function () {
          $ionicSideMenuDelegate.toggleLeft(true);
        }

      //分享-弹出操作表
      $scope.showActionSheet = function () {
        $ionicActionSheet.show({
          titleText:'分享',
          destructiveText:'删除',
          destructiveButtonClicked: function () {
            console.log('选择了删除操作');
            return true;
          },
          cancelText:'取消',
          cancel: function () {
            console.log('选择了取消的操作');
            return true;
          },
          buttons:[
            {text:'分享到朋友圈'},
            {text:'分享到微博'},
            {text:'分享到QQ'}
          ],
          buttonClicked: function (index) {
            if(index == 0)
            {
              $location.href=""
            }
            else
            {
              console.log('分享到微博成功');
            }
            return true;
          }
        });
      }

      //发起网络请求，取指定id的详情信息并显示在视图
      $wdHttp.sendRequest(
        'data/dish_getbyid.php?id=' + $stateParams.id,
        function (data) {
          console.log(data);
          $scope.dish = data[0];
        }
      )
    }
  ])

app.controller('orderCtrl',
  ['$scope', '$http', '$stateParams', '$httpParamSerializerJQLike',
    function ($scope, $http, $stateParams, $httpParamSerializerJQLike) {
      $scope.order = {did: $stateParams.id,totalPrice: sessionStorage['totalPrice']};

      $scope.submitOrder = function () {
        //针对 对象或者数组 做序列化的处理
        var result = $httpParamSerializerJQLike($scope.order);
        console.log(result);
        $http
          .get('data/order_add.php?' + result)
          .success(function (data) {
            console.log(data);
            if (data[0].msg == 'succ') {
              $scope.AddResult = '下单成功，订单编号为' + data[0].oid;
              location.href="#/wdMyOrder";
            }
            else {
              $scope.AddResult = "下单失败";
            }

          })
      }


    }
  ]);


app.controller('myOrderCtrl', ['$scope', '$wdHttp',
  function ($scope, $wdHttp) {
    $wdHttp
      .sendRequest(
      'data/order_getbyuserid.php?userid=1',
      function (result) {
        console.log(result);
        $scope.orderList = result.data;
      }
    )
  }
])

app.controller('cartCtrl', ['$scope', '$wdHttp',
  function ($scope, $wdHttp) {

    $scope.editEnable = false;
    $scope.editText = '编辑';
    $scope.cart = [];//购物车对象数组
    $scope.toggleEdit = function () {
      //每次点之前取反
      $scope.editEnable = !$scope.editEnable;
      if ($scope.editEnable) {
        $scope.editText = '完成'
      }
      else {
        $scope.editText = '编辑'
      }
    }

    //请求服务器端，读取指定用户的购物车的数据
    $wdHttp.sendRequest(
      'data/cart_select.php?uid=1',
      function (result) {
        $scope.cart = result.data;
      }
    )

    function update(did, count) {
      $wdHttp.sendRequest(
        'data/cart_update.php?uid=1&did=' + did + "&count=" + count,
        function (result) {
          //console.log(result);
        }
      )
    }

    $scope.minus = function (index) {
      //将产品的数据减1
      var dish = $scope.cart[index];
      //已经是1了就不能减了
      if (dish.dishCount == 1) {
        return
      }
      else {
        dish.dishCount--;
        update(dish.did, dish.dishCount);
      }
    }

    $scope.add = function (index) {
      //将产品的数据加1
      var dish = $scope.cart[index];
      console.log(dish);
      dish.dishCount++;
      update(dish.did, dish.dishCount);

    }
    
    $scope.sumAll = function () {
      result = 0;
      for(var i =0;i<$scope.cart.length;i++)
      {
        var dish = $scope.cart[i];
        result += (dish.price * dish.dishCount);
      }
      return result;
    }

    $scope.jumpToOrder = function () {

      //准备要传递的参数
      var totalPrice = $scope.sumAll();
      sessionStorage['totalPrice']=totalPrice;
      //json格式的序列化
      var detail = angular.toJson($scope.cart);
      $scope.jump('wdOrder',{id:1});

    }
  }
])

//设置窗口
app.controller('settingCtrl', ['$ionicModal', '$scope','$ionicActionSheet',function ($ionicModal, $scope,$ionicActionSheet) {
 var model = $ionicModal.fromTemplateUrl('tpl/payMethod.html', {
    scope: $scope,
    animation:'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  })
  $scope.open = function () {
    $scope.modal.show();
  }
  $scope.hide = function () {
    $scope.modal.hide();
  }


  //分享-弹出操作表
  $scope.showActionSheet = function () {
    $ionicActionSheet.show({
      titleText:'分享',
      destructiveText:'删除',
      destructiveButtonClicked: function () {
        console.log('选择了删除操作');
        return true;
      },
      cancelText:'取消',
      cancel: function () {
        console.log('选择了取消的操作');
        return true;
      },
      buttons:[
        {text:'分享到朋友圈'},
        {text:'分享到微博'},
        {text:'分享到QQ'}
      ]
    });
  }
}])







