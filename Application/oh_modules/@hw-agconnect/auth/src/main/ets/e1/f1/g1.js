import hilog from '@ohos.hilog';
export const AGC_DOMAIN = 0x888f;
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 4] = "INFO";
    LogLevel[LogLevel["WARN"] = 5] = "WARN";
    LogLevel[LogLevel["ERROR"] = 6] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 7] = "FATAL";
})(LogLevel || (LogLevel = {}));
export class Logger {
    static debug(tag, format, ...args) {
        hilog.debug(AGC_DOMAIN, Logger.prefixTag(tag), format, args);
    }
    static info(tag, format, ...args) {
        hilog.info(AGC_DOMAIN, Logger.prefixTag(tag), format, args);
    }
    static warn(tag, format, ...args) {
        hilog.warn(AGC_DOMAIN, Logger.prefixTag(tag), format, args);
    }
    static error(tag, format, ...args) {
        hilog.error(AGC_DOMAIN, Logger.prefixTag(tag), format, args);
    }
    static fatal(tag, format, ...args) {
        hilog.fatal(AGC_DOMAIN, Logger.prefixTag(tag), format, args);
    }
    static isLoggable(tag, level) {
        return hilog.isLoggable(AGC_DOMAIN, Logger.prefixTag(tag), level);
    }
    static prefixTag(tag) {
        return 'AGC_' + tag;
    }
}
