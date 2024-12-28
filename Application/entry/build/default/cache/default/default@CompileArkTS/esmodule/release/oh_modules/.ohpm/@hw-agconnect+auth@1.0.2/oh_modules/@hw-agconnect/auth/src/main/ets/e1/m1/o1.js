export function replace(packageName, config) {
    let appInfo = matchPkgName(packageName, config);
    if (appInfo) {
        for (let key in appInfo) {
            if (config[key]) {
                replaceTraverse(key, appInfo[key], config);
            }
        }
    }
    else {
        if (config.app_info && config.app_info.app_id && config.client) {
            config.client.app_id = config.app_info.app_id;
        }
    }
    return config;
}
function replaceTraverse(key, value, replace) {
    if (!key || !value || !replace) {
        return;
    }
    if (typeof value === 'object') {
        for (let nextKey in value) {
            replaceTraverse(nextKey, value[nextKey], replace[key]);
        }
    }
    else {
        replace[key] = value;
    }
}
function matchPkgName(packageName, config) {
    let appInfos = config.appInfos;
    if (appInfos.length > 0) {
        for (let info of appInfos) {
            if (packageName === info.package_name) {
                return info;
            }
        }
    }
    return null;
}
