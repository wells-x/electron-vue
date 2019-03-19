import request from './request';

const upBase64 = {
    /**
     * @description 上传图片到七牛云
     * @param  ImageBase64
     * @param pathAndFileName
     * @param {function} callBack
     */
    upImageToQiniu: function(ImageBase64, pathAndFileName, callBack) {


        //获取当前用户的账号
        const base = new this.Base64();
        const newFileName = pathAndFileName || new Date().getTime() + (Math.random() * 1000000).toFixed(0) + ".png";
        let upLoadFileName = pathAndFileName || "pftcropimages/" + newFileName;
        upLoadFileName = base.encode(upLoadFileName);

        //先到我们的服务器获取token,然后直传图片到七牛
        this.getQinuiToken(function(token) {
            const pic = ImageBase64;
            // console.log('----------',pic, token);
            const url = "//upload.qiniup.com/putb64/-1/key/" + upLoadFileName; //非华东空间需要根据注意事项 1 修改上传域名
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const result = JSON.parse(xhr.responseText);
                        callBack(200, result.key);
                    } else {
                        const errorJson = JSON.parse(xhr.responseText);
                        callBack(400, errorJson.error);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + token);
            xhr.send(pic);
        })

    },

    /**
     *  Base64 encode / decode
     *  @author haitao.tu
     *  @date   2010-04-26
     *  @email  tuhaitao@foxmail.com
     */
    Base64: function() {

        // private property
        const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function(input) {
            let output = "";
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        };

        // public method for decoding
        this.decode = function(input) {
            let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;
            input = input.replace(/[^A-Za-z0-9+/=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        };

        // private method for UTF-8 encoding
        const _utf8_encode = function(string) {
            string = string.replace(/\r\n/g, "\n");
            let utftext = "";
            for (let n = 0; n < string.length; n++) {
                const c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        };

        // private method for UTF-8 decoding
        const _utf8_decode = function(utftext) {
            let string = "";
            let i = 0;
            let c, c2;
            c = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    let c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    },

    /**
     * @description 获取七牛的token
     */
    getQinuiToken: function(callBack) {
        request({url: "/r/Resource_ImageUpload/getUploadToken", method: "get",})
            .then(({uptoken}) => {
                uptoken && callBack(uptoken);
            })
            .catch(({uptoken}) => {
                uptoken && callBack(uptoken);
            })


        /*PFT.Util.Ajax("/r/Resource_ImageUpload/getUploadToken", {
            type: "GET",
            params: {},
            loading: function() {

            },
            complete: function() {

            },
            success: function(res) {
                callBack(res.uptoken);
            },
            tiemout: function() {
                Message.error(PFT.AJAX_TIMEOUT_TEXT)
            },
            serverError: function() {
                Message.error(PFT.AJAX_ERROR_TEXT)
            }
        });*/

    }
};

/**
 * @description 封装成一个上传base64到七牛的函数
 * @author fangxu
 * @param {Object} opt
 */
function upImgBase64(opt) {

    const defaults = {
        data: "", //base64
        pathAndFileName: "",
        success: new Function,
        loading: new Function,
        complete: new Function,
        error: new Function
    };

    //混合默认参数和新参数
    const newOpt = {};
    for (const i in defaults) {
        if (typeof opt[i] == "undefined") {
            newOpt[i] = defaults[i];
        } else {
            newOpt[i] = opt[i];
        }
    }

    //执行loading
    newOpt.loading();

    upBase64.upImageToQiniu(newOpt["data"], newOpt["pathAndFileName"], function(code, text) {
        if (code === 200) {
            let host;
            if (/12301\.cc/.test(location.host)) {
                host = "https://images.pft12301.cc";
            } else if (/xisland\.cn/.test(location.host)) {
                host = "http://images.xisland.cn";
            } else {
                host = "https://images.12301dev.com";
            }
            const imgAddress = host + "/" + text;
            newOpt["success"](imgAddress);
        } else {
            newOpt["error"](text);
        }
        newOpt["complete"]();
    })

}

export {upImgBase64}
