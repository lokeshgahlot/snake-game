export const drawCell = (ctx, color, scale, strokeColor='white') => (row, col) => {
    ctx.fillStyle = color;
    ctx.fillRect(row*scale, col*scale, scale, scale);
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(row*scale, col*scale, scale, scale);
}

export const getClientHeight = () => {
    let myHeight = 0;
    if(typeof window.innerHeight === 'number' ) {
        myHeight = window.innerHeight;//Non-IE
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        myHeight = document.documentElement.clientHeight;//IE 6+ in 'standards compliant mode'
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        myHeight = document.body.clientHeight;//IE 4 compatible
    }
    return myHeight;
}

export const getClientWidth = () => {
    let myWidth = 0;
    if( typeof window.innerWidth === 'number' ) {
        myWidth = window.innerWidth;//Non-IE
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        myWidth = document.documentElement.clientWidth;//IE 6+ in 'standards compliant mode'
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        myWidth = document.body.clientWidth;//IE 4 compatible
    }
    return myWidth;
}

export const  getRandomPos = (maxRow, maxCol) => {
  return [ Math.floor(Math.random()*maxRow),  Math.floor(Math.random()*maxCol) ];
}
