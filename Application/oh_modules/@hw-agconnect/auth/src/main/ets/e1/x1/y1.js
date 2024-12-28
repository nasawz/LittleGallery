export function getKey(xBytes, yBytes, zBytes) {
    return bytesXor(bytesShift(bytesXor(bytesShift(xBytes, -4), yBytes), 6), zBytes);
}
function bytesXor(left, right) {
    if (!left || !right) {
        throw new Error('left or right must not be null.');
    }
    if (left.length !== right.length) {
        throw new Error('left and right must be the same length.');
    }
    let result = new Array();
    for (let i = 0; i < left.length; i++) {
        result[i] = left[i] ^ right[i];
    }
    return result;
}
function bytesShift(bytes, steps) {
    if (!bytes) {
        throw new Error('bytes can not be null.');
    }
    for (let i = 0; i < bytes.length; i++) {
        if (steps < 0) {
            bytes[i] = bytes[i] << -steps;
        }
        else {
            bytes[i] = bytes[i] >> steps;
        }
    }
    return bytes;
}
