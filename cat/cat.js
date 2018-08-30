AR.log("ar AR v1.0");
var screen = new Screen()
AR.log(screen.w, screen.h)
var nodeArr = [
    // 场景1
    'AR_PART1_end', // 0
    // 场景2
    'AR_PART2_Laboratory', // 1
    'AR_PART2_background2', // 2
    'AR_PART2_cat', // 3
    // 场景3
    'AR_PART2_button', // 4
    'AR_PART2_button_background', // 5
]
var group = ['AR_PART1', 'AR_PART2', 'AR_PART2_anjian']
// 场景2位置设置
var node1 = AR.get_position(nodeArr[1]);
var node2 = AR.get_position(nodeArr[2]);
var node3 = AR.get_position(nodeArr[3]);
var pos2 = [node1, node2, node3];

var staticOne = false;
AR.onload = function () {
    // 初始化节点位置
    AR.set_visible('kong', false)
    AR.translate('kong', 600, 10, 0)
    for (var i = 0; i < nodeArr.length; i++) {
        AR.set_visible(nodeArr[i], false)
    }
    AR.translate(nodeArr[1], 200, 0, -10)
    AR.translate(nodeArr[2], 0, 0, -15)
    AR.translate(nodeArr[3], 193, -23, 5)

    AR.translate(nodeArr[4], 0, 0, 5)
    AR.translate(nodeArr[5], 0, 0, 5)

    // 场景1
    AR.set_visible(nodeArr[0], true)

    sequence(nodeArr[0], "cat.fbm/AR-PART1_0", 27);

    // var frameCount = 0;
    // AR.onframe = function (t) {
    //     frameCount++;
    // };
    // AR.setTimeout(function () {
    //     showTwo();
    // }, 6000);
    // showTwo();
    // var delayId11 = AR.setInterval(function () {
    AR.onframe = function (t) {
        var worldPos1 = AR.get_position('kong');
        var screenPos1 = AR.coord_transform(worldPos1.x, worldPos1.y, worldPos1.z, true);
        // AR.toast('测试 x' + screenPos1.x + ',y' + screenPos1.y)
        if (screenPos1.x > screen.w * 0.1 && screenPos1.x < screen.w * 0.9) {
            if (screenPos1.y > screen.h * 0.1 && screenPos1.y < screen.h * 0.9) {
                if (staticOne) {
                    // AR.clearInterval(delayId11);
                    staticOne = false;
                    showTwo();
                }
                // AR.toast('测试 x' + screenPos1.x + ',y' + screenPos1.y)
                // AR.clearInterval(delayId);
            }
        }
    };
    // }, 3000 / 1);
    AR.log(screen.h, screen.w)
};
AR.onbegin = function (clipId) {};

AR.onend = function (clipId) {};

// AR.onclick = function (nodeId, x, y) {
//     AR.log(nodeId,nodeArr[4],nodeId == nodeArr[4],'按钮')
//     if (nodeId == nodeArr[4]) {
//         跳转
//         AR.open_url('https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018072460813243&scope=auth_base&redirect_uri=http://minilab.arbaseworld.com/minilab/ali/oauth2&state=abc123');
//     }
// };


// 获取屏幕分辨率
function Screen() {
    var ua = AR.getUserAgent();
    var arr = ua.split(';');
    var arr1 = arr[3].split(' ');
    var arr2 = arr1[1].split('x');
    return {
        w: arr2[1],
        h: arr2[0]
    }
}
// 场景2入场
function showTwo() {
    AR.set_visible(nodeArr[1], true)

    AR.set_visible(nodeArr[3], true)
    var i = 0;
    var delayId = AR.setInterval(function () {
        i++;
        AR.translate(nodeArr[0], -4, 0, 0)
        AR.translate(nodeArr[1], -4, 0, 0)
        AR.translate(nodeArr[3], -4, 0, 0)
        if (i == 50) {
            AR.set_visible(nodeArr[2], true)
            AR.clearInterval(delayId)
            two()
        }
    }, 1000 / 60);
}
// 场景2动画
function two() {
    AR.set_visible('AR_PART1', false)
    AR.set_static(group[1], true)

    AR.modulate_alpha(nodeArr[2], 0, 0)
    var i = 0
    var twoT = AR.setInterval(function () {
        i++;
        AR.modulate_alpha(nodeArr[2], i * 0.05, 0)
        // AR.log('测试')
        if (i * 0.05 >= 1.06) {
            AR.clearInterval(twoT);
        }
    }, 1000 / 60);
    sequence(nodeArr[3], "cat.fbm/AR-PART2_0", 21);
    // sequence(nodeArr[2], "cat.fbm/cat0001_00", 8);
}
// 场景3动画
function three() {
    AR.set_visible(nodeArr[4], true)
    AR.translate(nodeArr[4], 0, 0, 2)
    AR.set_visible(nodeArr[5], true)
    // 触摸
    AR.ontouch = function (x, y, state) {
        if (state == 0) {
            AR.open_url('https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018072460813243&scope=auth_base&redirect_uri=http://minilab.arbaseworld.com/minilab/ali/oauth2&state=abc123');
            AR.exit();
        }
    };
    // AR.modulate_alpha(nodeArr[5], 0, 0)
    // var i = 0

    // var threeT = AR.setInterval(function () {
    //     i++;
    //     AR.set_texture(nodeArr[5], 'cat.fbm/' + i + '.png', 0);
    //     // AR.log('测试')
    //     if (i >= 5) {
    //         AR.clearInterval(threeT);
    //         AR.remove_tex_cache('cat.fbm/1.png');
    //         AR.remove_tex_cache('cat.fbm/2.png');
    //         AR.remove_tex_cache('cat.fbm/3.png');
    //         AR.remove_tex_cache('cat.fbm/4.png');
    //         AR.remove_tex_cache('cat.fbm/5.png');
    //     }
    // }, 1000 / 10);
}
// 序列帧动画
function sequence(node, path, mun) {
    var texIdx = 1; // 序列帧序号
    for (var i = 0; i <= mun; i++) {
        AR.setTimeout(function () {
            var filePath = getTexturePath(path, texIdx);
            AR.set_texture(node, filePath, 0);
            if (AR.remove_tex_cache && texIdx > 0) {
                AR.remove_tex_cache(getTexturePath(path, texIdx - 1));
            }
            texIdx++;
            if (texIdx > 27) {
                AR.set_texture(node, 'cat.fbm/AR-PART1_end.png', 0);
                staticOne = true;
            }
            if (mun == 21 && texIdx > 21) {
                // AR.set_visible(group[1], false)
                three();
            }
        }, i * 200);
    }
}

function getTexturePath(path, idx) {
    return path + pad(idx, 3) + ".png";
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}