import Board from '../board';
import {getClientWidth, getClientHeight} from '../utils';

export default (boardEl, ctx, scale) => {
  const clientWidth = getClientWidth();
  const clientHeight = getClientHeight();

  const width = Math.floor(clientWidth/scale)*scale;
  const height = Math.floor((clientHeight)/scale)*scale;
  return Board({
    boardEl: boardEl, context: ctx,
    width: (width-scale), height: (height-(2*scale))});
}
