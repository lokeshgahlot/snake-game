import './app.scss';
import CONSTANTS from './constants';
import game from './game';
import showModal  from './modal';

const App = () => {

  showModal({
    header: CONSTANTS.headerMsg,
    msg: CONSTANTS.welcomeMsg,
    btnLabel: CONSTANTS.playLabel}
  ).then(game);

}
App();
