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