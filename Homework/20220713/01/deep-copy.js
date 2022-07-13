const aa = [{ x: 1 }, 3];

const ab = [...aa];

console.log(aa, ab);

aa[0].x = 999;

console.log(aa, ab);

// 多拷貝一層
const ad = aa.map((v) => {
    if (typeof v === 'object') return { ...v };

    return v;
});

console.log(aa, ab, ad);

aa[0].x = 1;

console.log(aa, ab, ad);

// 深拷貝語法
// 新語法: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
const ae = JSON.parse(JSON.stringify(aa));
