// 获取报错信息
export function valueError(data: any) {
    let ret = ""
    for (let key in data) {
        let value = data[key]
        ret += (value ? value.toString() : "")
    }
    return ret
}

// 选择框id去重
export function duplicateRemoval(a: any, b: any) {
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i].value === b[j].value) {
                b.splice(j, 1, 0)
            }
        }
    }
    const list = []
    for (let i = 0; i < b.length; i++) {
        if (b[i]) {
            list.push(b[i])
        }
    }
    return list
}

// 获取菜单
export function getMenuData(id: any, routerData: any) {
    if (id != "1") {
        for (let i = 0; i < routerData.length; i++) {
            if (routerData[i].meta.isOk) {
                routerData[i].meta.isShow = false
            }
            if (routerData[i].children && routerData[i].children.length > 0) {
                for (let j = 0; j < routerData[i].children.length; j++) {
                    if (routerData[i].children[j].meta.isOk) {
                        routerData[i].children[j].meta.isShow = false
                    }
                }
            }
        }
        return routerData
    } else {
        for (let i = 0; i < routerData.length; i++) {
            if (routerData[i].meta.isOk) {
                routerData[i].meta.isShow = true
            }
            if (routerData[i].children && routerData[i].children.length > 0) {
                for (let j = 0; j < routerData[i].children.length; j++) {
                    routerData[i].children[j].meta.isShow = true
                }
            }
        }
        return routerData
    }
}

// 时间格式化
export function formatDate(date: string, type?: string) {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1)
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate()
    const hour = newDate.getHours() > 9 ? newDate.getHours() : "0" + newDate.getHours()
    const minute = newDate.getMinutes() > 9 ? newDate.getMinutes() : "0" + newDate.getMinutes()
    const second = newDate.getSeconds() > 9 ? newDate.getSeconds() : "0" + newDate.getSeconds()
    if (type) {
        return year + type + month + type + day + " " + hour + ":" + minute + ":" + second
    } else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    }
}

// 日期格式化
export function formatDate2(date: string) {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1)
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate()
    return year + "-" + month + "-" + day
}

// 获取patch更新数据
export function getUpdateParams(data: any, originalData: any) {
    const updatedData: any = {};
    Object.keys(data).forEach((key: any) => {
        if (data[key] !== originalData[key]) {
            updatedData[key] = data[key];
        }
    });
    return updatedData
}

// 下载
export function downloadFunc(url: string, isNew?: boolean) {
    let link = document.createElement("a");
    link.href = url
    if (isNew) {
        link.target = "_bank"
    }
    document.body.appendChild(link);
    link.click();
}

// 表情包文件
export const appData = [
    {
        "codes": "1F600",
        "char": "😀",
        "name": "grinning face"
    },
    {
        "codes": "1F603",
        "char": "😃",
        "name": "grinning face with big eyes"
    },
    {
        "codes": "1F604",
        "char": "😄",
        "name": "grinning face with smiling eyes"
    },
    {
        "codes": "1F601",
        "char": "😁",
        "name": "beaming face with smiling eyes"
    },
    {
        "codes": "1F606",
        "char": "😆",
        "name": "grinning squinting face"
    },
    {
        "codes": "1F605",
        "char": "😅",
        "name": "grinning face with sweat"
    },
    {
        "codes": "1F923",
        "char": "🤣",
        "name": "rolling on the floor laughing"
    },
    {
        "codes": "1F602",
        "char": "😂",
        "name": "face with tears of joy"
    },
    {
        "codes": "1F642",
        "char": "🙂",
        "name": "slightly smiling face"
    },
    {
        "codes": "1F643",
        "char": "🙃",
        "name": "upside-down face"
    },
    {
        "codes": "1F609",
        "char": "😉",
        "name": "winking face"
    },
    {
        "codes": "1F60A",
        "char": "😊",
        "name": "smiling face with smiling eyes"
    },
    {
        "codes": "1F607",
        "char": "😇",
        "name": "smiling face with halo"
    },
    {
        "codes": "1F970",
        "char": "🥰",
        "name": "smiling face with hearts"
    },
    {
        "codes": "1F60D",
        "char": "😍",
        "name": "smiling face with heart-eyes"
    },
    {
        "codes": "1F929",
        "char": "🤩",
        "name": "star-struck"
    },
    {
        "codes": "1F618",
        "char": "😘",
        "name": "face blowing a kiss"
    },
    {
        "codes": "1F617",
        "char": "😗",
        "name": "kissing face"
    },
    {
        "codes": "1F61A",
        "char": "😚",
        "name": "kissing face with closed eyes"
    },
    {
        "codes": "1F619",
        "char": "😙",
        "name": "kissing face with smiling eyes"
    },
    {
        "codes": "1F44B",
        "char": "👋",
        "name": "waving hand"
    },
    {
        "codes": "1F91A",
        "char": "🤚",
        "name": "raised back of hand"
    },
    {
        "codes": "1F590",
        "char": "🖐",
        "name": "hand with fingers splayed"
    },
    {
        "codes": "270B",
        "char": "✋",
        "name": "raised hand"
    },
    {
        "codes": "1F596",
        "char": "🖖",
        "name": "vulcan salute"
    },
    {
        "codes": "1F44C",
        "char": "👌",
        "name": "OK hand"
    },
    {
        "codes": "1F90F",
        "char": "🤏",
        "name": "pinching hand"
    },
    {
        "codes": "270C",
        "char": "✌",
        "name": "victory hand"
    },
    {
        "codes": "1F91E",
        "char": "🤞",
        "name": "crossed fingers"
    },
    {
        "codes": "1F91F",
        "char": "🤟",
        "name": "love-you gesture"
    },
    {
        "codes": "1F918",
        "char": "🤘",
        "name": "sign of the horns"
    },
    {
        "codes": "1F919",
        "char": "🤙",
        "name": "call me hand"
    },
    {
        "codes": "1F448",
        "char": "👈",
        "name": "backhand index pointing left"
    },
    {
        "codes": "1F449",
        "char": "👉",
        "name": "backhand index pointing right"
    },
    {
        "codes": "1F446",
        "char": "👆",
        "name": "backhand index pointing up"
    },
    {
        "codes": "1F595",
        "char": "🖕",
        "name": "middle finger"
    },
    {
        "codes": "1F447",
        "char": "👇",
        "name": "backhand index pointing down"
    },
    {
        "codes": "261D FE0F",
        "char": "☝️",
        "name": "index pointing up"
    },
    {
        "codes": "1F44D",
        "char": "👍",
        "name": "thumbs up"
    },
    {
        "codes": "1F44E",
        "char": "👎",
        "name": "thumbs down"
    },
    {
        "codes": "270A",
        "char": "✊",
        "name": "raised fist"
    },
    {
        "codes": "1F44A",
        "char": "👊",
        "name": "oncoming fist"
    },
    {
        "codes": "1F91B",
        "char": "🤛",
        "name": "left-facing fist"
    },
    {
        "codes": "1F91C",
        "char": "🤜",
        "name": "right-facing fist"
    }

]
