// export 
const lightenDarkenColor = (col, percent) => {
    const usePound = col.charAt(0) === "#";
    if (usePound) col = col.slice(1);
 
    let num = parseInt(col,16);

    percent = percent*10;

    const r = setInRange((num >> 16) + percent, [0, 255]);
    const g = setInRange((num & 0x0000FF) + percent, [0, 255]);
    const b = setInRange(((num >> 8) & 0x00FF) + percent, [0, 255]);
 

    let ret = (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

    // 将 16进制 部分补齐为6位
    for(let i = 0; i < 7 - ret.length; i++) {
        ret += "0"
    }

    return ret;
}


const setInRange = (val, [min, max]) => {
    return Math.max(min, Math.min(max, val));
}