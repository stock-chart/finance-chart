import { TimeShare } from '../../src/index';
import './index.scss';

const MOCK_PRICE = [
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.14000129699707,
  14.210000038146973,
  14.229998588562012,
  14.199999809265137,
  14.170000076293945,
  14.15999984741211,
  14.220000267028809,
  14.220000267028809,
  14.229998588562012,
  14.229998588562012,
  14.25,
  14.25,
  14.25,
  14.25,
  14.239999771118164,
  14.210000038146973,
  14.229998588562012,
  14.229998588562012,
  14.239999771118164,
  14.220000267028809,
  14.210000038146973,
  14.180000305175781,
  14.210000038146973,
  14.199999809265137,
  14.210000038146973,
  14.25,
  14.260000228881836,
  14.25,
  14.25,
  14.210000038146973,
  14.199999809265137,
  14.25,
  14.260000228881836,
  14.260000228881836,
  14.260000228881836,
  14.279999732971191,
  14.300000190734863,
  14.300000190734863,
  14.289999961853027,
  14.260000228881836,
  14.239999771118164,
  14.25,
  14.25,
  14.260000228881836,
  14.260000228881836,
  14.260000228881836,
  14.260000228881836,
  14.260000228881836,
  14.260000228881836,
  14.260000228881836,
  14.279999732971191,
  14.270001411437988,
  14.289999961853027,
  14.289999961853027,
  14.270001411437988,
  14.270001411437988,
  14.260000228881836,
  14.270001411437988,
  14.25,
  14.229998588562012,
  14.25,
  14.25,
  14.25,
  14.25,
  14.270001411437988,
  14.279999732971191,
  14.270001411437988,
  14.239999771118164,
  14.220000267028809,
  14.210000038146973,
  14.180000305175781,
  14.170000076293945,
  14.170000076293945,
  14.170000076293945,
  14.170000076293945,
  14.1899995803833,
  14.149999618530273,
  14.14000129699707,
  14.130000114440918,
  14.15999984741211,
  14.1899995803833,
  14.15999984741211,
  14.15999984741211,
  14.1899995803833,
  14.15999984741211,
  14.15999984741211,
  14.15999984741211,
  14.15999984741211,
  14.239999771118164,
  14.239999771118164,
  14.210000038146973,
  14.180000305175781,
  14.199999809265137,
  14.1899995803833,
  14.149999618530273,
  14.14000129699707,
  14.149999618530273,
  14.149999618530273,
  14.14000129699707,
  14.10999870300293,
  14.119999885559082,
  14.14000129699707,
  14.149999618530273,
  14.229998588562012,
  14.239999771118164,
  14.229998588562012,
  14.210000038146973,
  14.210000038146973,
  14.210000038146973,
  14.199999809265137,
  14.199999809265137,
  14.199999809265137,
  14.15999984741211,
  14.15999984741211,
  14.1899995803833,
  14.199999809265137,
  14.170000076293945,
  14.170000076293945,
  14.170000076293945,
  14.170000076293945,
  14.170000076293945,
  14.199999809265137,
  14.180000305175781,
  14.199999809265137,
  14.199999809265137,
  14.210000038146973,
  14.199999809265137,
  14.210000038146973,
  14.199999809265137,
  14.1899995803833,
  14.199999809265137,
  14.180000305175781,
  14.1899995803833,
  14.1899995803833,
  14.1899995803833,
  14.1899995803833,
  14.199999809265137,
  14.229998588562012,
  14.289999961853027,
  14.289999961853027,
  14.289999961853027,
  14.289999961853027,
  14.260000228881836,
  14.260000228881836,
  14.279999732971191,
  14.239999771118164,
  14.239999771118164,
  14.239999771118164,
  14.229998588562012,
  14.220000267028809,
  14.1899995803833,
  14.199999809265137,
  14.199999809265137,
  14.180000305175781,
  14.180000305175781,
  14.199999809265137,
  14.1899995803833,
  14.229998588562012,
  14.199999809265137,
  14.199999809265137,
  14.229998588562012,
  14.210000038146973,
  14.199999809265137,
  14.199999809265137,
  14.220000267028809,
  14.229998588562012,
  14.220000267028809,
  14.220000267028809,
  14.199999809265137,
  14.229998588562012,
  14.220000267028809,
  14.25,
  14.260000228881836,
  14.279999732971191,
  14.260000228881836,
  14.279999732971191,
  14.279999732971191,
  14.239999771118164,
  14.239999771118164,
  14.239999771118164,
  14.279999732971191,
  14.289999961853027,
  14.279999732971191,
  14.25,
  14.270001411437988,
  14.25,
  14.220000267028809,
  14.210000038146973,
  14.220000267028809,
  14.220000267028809,
  14.210000038146973,
  14.270001411437988,
  14.279999732971191,
  14.300000190734863,
  14.300000190734863,
  14.279999732971191
];

const timeShareChart = new TimeShare({
  selector: '#time-share',
  height: 500,
  data: MOCK_PRICE
});