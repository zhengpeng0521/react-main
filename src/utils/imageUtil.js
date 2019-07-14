/*
 * 平级数据转成树形结构
 */
export function getImageInfo(imageUrl) {
    return new Promise((resolve, reject) => {
        makeImage(imageUrl, resolve);
    });
}

function makeImage(imageUrl, callback) {
    let image_obj = new Image();
    let getImagePromise;
    image_obj.onreadystatechange = function () {
        if (this.readyState == "complete") {
            callback && callback({
                width: image_obj.width,
                height: image_obj.height,
            });
        }
    }
    image_obj.onload = function () {
        if (this.complete == true) {
            callback && callback({
                width: image_obj.width,
                height: image_obj.height,
            });
        }
    }

    image_obj.onerror = function (err) {
        callback && callback({
            width: 0,
            height: 0,
        });
    }
    image_obj.src = imageUrl;
}
