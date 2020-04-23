$(document).ready(function () {
    // Object.keys(selector).length  获取对象的长度
    let selector = {
        'leftSemiCircle': '',
        'rightSemiCircle': '',
        'percent': '',
        'dud': '',
        'total': '',
        'hours': '',
        'minute': '',
        'second': ''
    };

    // 已上传文件的大小
    let uploadNow = 0;
    // 已下载文件的大小
    let downloadNow;
    // 文件的总大小
    let uploadFileTotal = 55;
    let downloadFileTotal;
    // 进度条旋转角度
    let uploadAngle = 0;
    let downloadAngle = 0;
    // 圆的总角度
    const CIRCLE_ANGLE = 360;
    // 上传下载标志
    const UPLOAD_FLAG = "upload";
    const DOWNLOAD_FLAG = "download";
    // 背景颜色
    let NOW_BACKGROUND_COLOR = '#CCFF99';
    let OLD_BACKGROUND_COLOR = '#99CCFF';

    /**
     * circleRotateAngle()
     * 计算圆已旋转的角度
     */
    function circleRotateAngle(finished, fileTotal) {
        // 保留两位小数
        return Math.round(CIRCLE_ANGLE * finished / fileTotal * 100) / 100;
    }

    /**
     * semiCircleRotate()
     * 半圆旋转
     * @param selectors 该对象有8个属性
     * @param angle
     */
    function semiCircleRotate(selectors, angle) {
        let tempUploadAngle;
        // 右圆
        let rightSemiCircleSelector = selectors.rightSemiCircle;
        // 左圆
        let leftSemiCircleSelector = selectors.leftSemiCircle;
        // 右半圆旋转
        if (angle <= 180) {
            rightSemiCircleSelector.css('transform', 'rotate(' + (angle) + 'deg)');
        } else if (angle > 180 && angle <= 360) {
            // 设置成与大圆背景颜色相同
            rightSemiCircleSelector.css('background-color', NOW_BACKGROUND_COLOR);
            rightSemiCircleSelector.css('transform', 'rotate(' + (0) + 'deg)');
            // 左半圆旋转
            tempUploadAngle = angle - 180;
            if (tempUploadAngle <= 180) {
                leftSemiCircleSelector.css('transform', 'rotate(' + (tempUploadAngle) + 'deg)');
                leftSemiCircleSelector.css('z-index', '0');
            } else {
                // TODO
            }
        }
    }

    /**
     * percent
     * 求百分比
     * @param finished
     * @param total
     * @returns {string}
     */
    function percent(finished, total) {
        var decimals = finished / total;
        if (decimals <= 1) {
            decimals = Math.round(decimals * 10000) / 100;
            console.log(decimals);
        } else {
            decimals = 100;
        }
        return decimals;
    }


    /**
     * uploadProgress()
     * 上传进度
     * @param attributeValues  该对象有8个属性 selector = {'leftSemiCircle':'','rightSemiCircle':'','percent':'','dud':'','total':'','hours':'', 'minute':'','second':''};
     * @param func
     * @param finished
     * @param fileTotal
     */
    function uploadProgress(attributeValues, func, finished, fileTotal) {
        // 保存上传文件
        uploadAngle = func;

        // selectors.percent.text(percent);
        semiCircleRotate(attributeValues, uploadAngle);
        attributeValues.percent.text(percent(finished, fileTotal));
        attributeValues.dud.text();
        attributeValues.total.text();
    }

    /**
     * downloadProgress()
     * 上传进度
     * @param attributeValues  该对象有8个属性
     * @param func
     */
    function downloadProgress(attributeValues, func) {
        // 保存上传文件
        downloadAngle = func;

        semiCircleRotate(attributeValues, downloadAngle);
    }

    function getSelector(values) {
        let keys = [];
        let index = 0;
        for (let key in selector) {
            keys[index++] = key;
        }
        for (let i = 0; i < values.length; i++) {
            // selector[keys[i]] = document.getElementById();
            selector[keys[i]] = $('#' + values[i]);
        }
        return selector;
    }

    if (uploadNow >= 50) {
        clearInterval(timer);
    }
    var timer = setInterval(function () {
        uploadNow++;
        uploadProgress(getSelector(['left-semi-circle', 'right-semi-circle', 'percent', 'dud', 'total', 'hours', 'minute', 'second']), circleRotateAngle(uploadNow, uploadFileTotal), uploadNow, uploadFileTotal);
    }, 1000);
});