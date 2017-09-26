import './app.scss';
import CONSTANTS from './constants';
import game from './game';
import showModal  from './utils/modal';

const App = () => {

  showModal({
    header: CONSTANTS.headerMsg,
    msg: CONSTANTS.welcomeMsg,
    btnLabel: CONSTANTS.playLabel}
  ).then(game);

}
App();
