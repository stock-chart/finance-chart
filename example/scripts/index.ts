import './index.scss'
import { TimeShareDrawer } from '../../src/chart/time-share-drawer'
import { Chart } from '../../src/chart/chart'
import { VolumeDrawer, VolumeDrawerData } from '../../src/chart/volume-drawer'

const MOCK_PRICE = [
  {
    "time": 90,
    "price": 14.14000129699707,
    "avg": 14.14000129699707,
    "volume": 0,
    "holdAmount": 0
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 91
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 92
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 93
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 94
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 95
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 96
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 97
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 98
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 99
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 100
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 101
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 102
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 103
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 104
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 105
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 106
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 107
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 108
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 109
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 110
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 111
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 112
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 113
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 114
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 115
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 116
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 117
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 118
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 119
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 120
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 121
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 122
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 123
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 124
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 125
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 126
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 127
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 128
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 129
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 130
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 131
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 132
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 133
  },
  {
    "holdAmount": 0,
    "price": 14.14000129699707,
    "volume": 0,
    "avg": 14.14000129699707,
    "time": 134
  },
  {
    "time": 135,
    "price": 14.210000038146973,
    "avg": 14.210000038146973,
    "volume": 480317,
    "holdAmount": 6823753
  },
  {
    "time": 136,
    "price": 14.229998588562012,
    "avg": 14.210051536560059,
    "volume": 1300,
    "holdAmount": 18481
  },
  {
    "time": 137,
    "price": 14.199999809265137,
    "avg": 14.21004867553711,
    "volume": 9800,
    "holdAmount": 139256
  },
  {
    "time": 138,
    "price": 14.170000076293945,
    "avg": 14.209673881530762,
    "volume": 6000,
    "holdAmount": 85074
  },
  {
    "time": 139,
    "price": 14.15999984741211,
    "avg": 14.208185195922852,
    "volume": 16100,
    "holdAmount": 228011
  },
  {
    "time": 140,
    "price": 14.220000267028809,
    "avg": 14.20783805847168,
    "volume": 58800,
    "holdAmount": 833538
  },
  {
    "time": 141,
    "price": 14.220000267028809,
    "avg": 14.208135604858398,
    "volume": 14400,
    "holdAmount": 204768
  },
  {
    "time": 142,
    "price": 14.229998588562012,
    "avg": 14.20878791809082,
    "volume": 33900,
    "holdAmount": 482061
  },
  {
    "holdAmount": 482061,
    "price": 14.229998588562012,
    "volume": 0,
    "avg": 14.209180708284732,
    "time": 143
  },
  {
    "time": 144,
    "price": 14.25,
    "avg": 14.20960521697998,
    "volume": 12690,
    "holdAmount": 180814
  },
  {
    "time": 145,
    "price": 14.25,
    "avg": 14.209881782531738,
    "volume": 4400,
    "holdAmount": 62700
  },
  {
    "time": 146,
    "price": 14.25,
    "avg": 14.210027694702148,
    "volume": 2300,
    "holdAmount": 32775
  },
  {
    "time": 147,
    "price": 14.25,
    "avg": 14.210564613342285,
    "volume": 8210,
    "holdAmount": 117023
  },
  {
    "time": 148,
    "price": 14.239999771118164,
    "avg": 14.210762023925781,
    "volume": 3400,
    "holdAmount": 48444
  },
  {
    "time": 149,
    "price": 14.210000038146973,
    "avg": 14.21096134185791,
    "volume": 8900,
    "holdAmount": 126618
  },
  {
    "time": 150,
    "price": 14.229998588562012,
    "avg": 14.211376190185547,
    "volume": 15500,
    "holdAmount": 220550
  },
  {
    "time": 151,
    "price": 14.229998588562012,
    "avg": 14.21138858795166,
    "volume": 300,
    "holdAmount": 4273
  },
  {
    "time": 152,
    "price": 14.239999771118164,
    "avg": 14.211806297302246,
    "volume": 10000,
    "holdAmount": 142400
  },
  {
    "time": 153,
    "price": 14.220000267028809,
    "avg": 14.212060928344727,
    "volume": 13900,
    "holdAmount": 197723
  },
  {
    "time": 154,
    "price": 14.210000038146973,
    "avg": 14.212095260620117,
    "volume": 6000,
    "holdAmount": 85297
  },
  {
    "time": 155,
    "price": 14.180000305175781,
    "avg": 14.211475372314453,
    "volume": 16000,
    "holdAmount": 227010
  },
  {
    "time": 156,
    "price": 14.210000038146973,
    "avg": 14.21146011352539,
    "volume": 1200,
    "holdAmount": 17042
  },
  {
    "time": 157,
    "price": 14.199999809265137,
    "avg": 14.21145248413086,
    "volume": 500,
    "holdAmount": 7100
  },
  {
    "time": 158,
    "price": 14.210000038146973,
    "avg": 14.211404800415039,
    "volume": 3800,
    "holdAmount": 53968
  },
  {
    "time": 159,
    "price": 14.25,
    "avg": 14.21143913269043,
    "volume": 8600,
    "holdAmount": 122229
  },
  {
    "time": 160,
    "price": 14.260000228881836,
    "avg": 14.212018013000488,
    "volume": 9600,
    "holdAmount": 136860
  },
  {
    "time": 161,
    "price": 14.25,
    "avg": 14.212322235107422,
    "volume": 5200,
    "holdAmount": 74131
  },
  {
    "holdAmount": 74131,
    "price": 14.25,
    "volume": 0,
    "avg": 14.212838368873074,
    "time": 162
  },
  {
    "time": 163,
    "price": 14.210000038146973,
    "avg": 14.212319374084473,
    "volume": 300,
    "holdAmount": 4263
  },
  {
    "time": 164,
    "price": 14.199999809265137,
    "avg": 14.212274551391602,
    "volume": 2900,
    "holdAmount": 41186
  },
  {
    "time": 165,
    "price": 14.25,
    "avg": 14.212374687194824,
    "volume": 2000,
    "holdAmount": 28500
  },
  {
    "time": 166,
    "price": 14.260000228881836,
    "avg": 14.212621688842773,
    "volume": 4300,
    "holdAmount": 61300
  },
  {
    "time": 167,
    "price": 14.260000228881836,
    "avg": 14.212900161743164,
    "volume": 4500,
    "holdAmount": 64170
  },
  {
    "holdAmount": 64170,
    "price": 14.260000228881836,
    "volume": 0,
    "avg": 14.213496365124666,
    "time": 168
  },
  {
    "time": 169,
    "price": 14.279999732971191,
    "avg": 14.213022232055664,
    "volume": 1400,
    "holdAmount": 19992
  },
  {
    "time": 170,
    "price": 14.300000190734863,
    "avg": 14.215255737304688,
    "volume": 20200,
    "holdAmount": 288716
  },
  {
    "time": 171,
    "price": 14.300000190734863,
    "avg": 14.215350151062012,
    "volume": 1100,
    "holdAmount": 15712
  },
  {
    "time": 172,
    "price": 14.289999961853027,
    "avg": 14.215624809265137,
    "volume": 2900,
    "holdAmount": 41441
  },
  {
    "time": 173,
    "price": 14.260000228881836,
    "avg": 14.216440200805664,
    "volume": 12000,
    "holdAmount": 171248
  },
  {
    "time": 174,
    "price": 14.239999771118164,
    "avg": 14.216462135314941,
    "volume": 700,
    "holdAmount": 9970
  },
  {
    "time": 175,
    "price": 14.25,
    "avg": 14.216638565063477,
    "volume": 4500,
    "holdAmount": 64116
  },
  {
    "time": 176,
    "price": 14.25,
    "avg": 14.217289924621582,
    "volume": 16200,
    "holdAmount": 230847
  },
  {
    "time": 177,
    "price": 14.260000228881836,
    "avg": 14.218059539794922,
    "volume": 15090,
    "holdAmount": 215184
  },
  {
    "holdAmount": 215184,
    "price": 14.260000228881836,
    "volume": 0,
    "avg": 14.218530783492527,
    "time": 178
  },
  {
    "time": 179,
    "price": 14.260000228881836,
    "avg": 14.21828842163086,
    "volume": 4610,
    "holdAmount": 65738
  },
  {
    "time": 180,
    "price": 14.260000228881836,
    "avg": 14.218461990356445,
    "volume": 4000,
    "holdAmount": 57022
  },
  {
    "holdAmount": 57022,
    "price": 14.260000228881836,
    "volume": 0,
    "avg": 14.218913492949113,
    "time": 181
  },
  {
    "time": 182,
    "price": 14.260000228881836,
    "avg": 14.218859672546387,
    "volume": 8190,
    "holdAmount": 116790
  },
  {
    "holdAmount": 116790,
    "price": 14.260000228881836,
    "volume": 0,
    "avg": 14.219297338039317,
    "time": 183
  },
  {
    "time": 184,
    "price": 14.279999732971191,
    "avg": 14.21901798248291,
    "volume": 2200,
    "holdAmount": 31416
  },
  {
    "time": 185,
    "price": 14.270001411437988,
    "avg": 14.219175338745117,
    "volume": 2400,
    "holdAmount": 34260
  },
  {
    "time": 186,
    "price": 14.289999961853027,
    "avg": 14.220937728881836,
    "volume": 22000,
    "holdAmount": 314215
  },
  {
    "time": 187,
    "price": 14.289999961853027,
    "avg": 14.221200942993164,
    "volume": 3500,
    "holdAmount": 50005
  },
  {
    "time": 188,
    "price": 14.270001411437988,
    "avg": 14.221839904785156,
    "volume": 11800,
    "holdAmount": 168396
  },
  {
    "time": 189,
    "price": 14.270001411437988,
    "avg": 14.221948623657227,
    "volume": 2000,
    "holdAmount": 28540
  },
  {
    "time": 190,
    "price": 14.260000228881836,
    "avg": 14.222288131713867,
    "volume": 5700,
    "holdAmount": 81374
  },
  {
    "time": 191,
    "price": 14.270001411437988,
    "avg": 14.222297668457031,
    "volume": 200,
    "holdAmount": 2854
  },
  {
    "time": 192,
    "price": 14.25,
    "avg": 14.222464561462402,
    "volume": 5000,
    "holdAmount": 71264
  },
  {
    "time": 193,
    "price": 14.229998588562012,
    "avg": 14.222485542297363,
    "volume": 1400,
    "holdAmount": 19932
  },
  {
    "time": 194,
    "price": 14.25,
    "avg": 14.22251033782959,
    "volume": 1300,
    "holdAmount": 18510
  },
  {
    "time": 195,
    "price": 14.25,
    "avg": 14.222512245178223,
    "volume": 100,
    "holdAmount": 1425
  },
  {
    "holdAmount": 1425,
    "price": 14.25,
    "volume": 0,
    "avg": 14.222769140083098,
    "time": 196
  },
  {
    "time": 197,
    "price": 14.25,
    "avg": 14.222535133361816,
    "volume": 2500,
    "holdAmount": 35577
  },
  {
    "time": 198,
    "price": 14.270001411437988,
    "avg": 14.22255802154541,
    "volume": 400,
    "holdAmount": 5708
  },
  {
    "time": 199,
    "price": 14.279999732971191,
    "avg": 14.22262191772461,
    "volume": 1200,
    "holdAmount": 17127
  },
  {
    "time": 200,
    "price": 14.270001411437988,
    "avg": 14.222638130187988,
    "volume": 300,
    "holdAmount": 4281
  },
  {
    "time": 201,
    "price": 14.239999771118164,
    "avg": 14.222658157348633,
    "volume": 1100,
    "holdAmount": 15664
  },
  {
    "time": 202,
    "price": 14.220000267028809,
    "avg": 14.222647666931152,
    "volume": 8000,
    "holdAmount": 113815
  },
  {
    "time": 203,
    "price": 14.210000038146973,
    "avg": 14.222576141357422,
    "volume": 5600,
    "holdAmount": 79580
  },
  {
    "time": 204,
    "price": 14.180000305175781,
    "avg": 14.22224235534668,
    "volume": 10000,
    "holdAmount": 141914
  },
  {
    "time": 205,
    "price": 14.170000076293945,
    "avg": 14.221972465515137,
    "volume": 4300,
    "holdAmount": 60919
  },
  {
    "time": 206,
    "price": 14.170000076293945,
    "avg": 14.22196102142334,
    "volume": 200,
    "holdAmount": 2834
  },
  {
    "time": 207,
    "price": 14.170000076293945,
    "avg": 14.2217378616333,
    "volume": 4100,
    "holdAmount": 58112
  },
  {
    "time": 208,
    "price": 14.170000076293945,
    "avg": 14.221680641174316,
    "volume": 1000,
    "holdAmount": 14170
  },
  {
    "time": 209,
    "price": 14.1899995803833,
    "avg": 14.221524238586426,
    "volume": 4800,
    "holdAmount": 68089
  },
  {
    "time": 300,
    "price": 14.149999618530273,
    "avg": 14.220277786254883,
    "volume": 22700,
    "holdAmount": 321565
  },
  {
    "time": 301,
    "price": 14.14000129699707,
    "avg": 14.219927787780762,
    "volume": 4500,
    "holdAmount": 63645
  },
  {
    "time": 302,
    "price": 14.130000114440918,
    "avg": 14.219305038452148,
    "volume": 7000,
    "holdAmount": 98922
  },
  {
    "time": 303,
    "price": 14.15999984741211,
    "avg": 14.219188690185547,
    "volume": 1800,
    "holdAmount": 25481
  },
  {
    "time": 304,
    "price": 14.1899995803833,
    "avg": 14.219178199768066,
    "volume": 400,
    "holdAmount": 5676
  },
  {
    "time": 305,
    "price": 14.15999984741211,
    "avg": 14.219080924987793,
    "volume": 1600,
    "holdAmount": 22656
  },
  {
    "time": 306,
    "price": 14.15999984741211,
    "avg": 14.219035148620605,
    "volume": 800,
    "holdAmount": 11328
  },
  {
    "time": 307,
    "price": 14.1899995803833,
    "avg": 14.218999862670898,
    "volume": 1200,
    "holdAmount": 17019
  },
  {
    "time": 308,
    "price": 14.15999984741211,
    "avg": 14.218494415283203,
    "volume": 9000,
    "holdAmount": 127470
  },
  {
    "time": 309,
    "price": 14.15999984741211,
    "avg": 14.218110084533691,
    "volume": 6700,
    "holdAmount": 94874
  },
  {
    "time": 310,
    "price": 14.15999984741211,
    "avg": 14.218002319335938,
    "volume": 1800,
    "holdAmount": 25486
  },
  {
    "time": 311,
    "price": 14.15999984741211,
    "avg": 14.21760082244873,
    "volume": 7100,
    "holdAmount": 100536
  },
  {
    "time": 312,
    "price": 14.239999771118164,
    "avg": 14.217999458312988,
    "volume": 18500,
    "holdAmount": 262941
  },
  {
    "holdAmount": 262941,
    "price": 14.239999771118164,
    "volume": 0,
    "avg": 14.218163639751833,
    "time": 313
  },
  {
    "time": 314,
    "price": 14.210000038146973,
    "avg": 14.217988014221191,
    "volume": 1300,
    "holdAmount": 18473
  },
  {
    "time": 315,
    "price": 14.180000305175781,
    "avg": 14.21787166595459,
    "volume": 2000,
    "holdAmount": 28315
  },
  {
    "time": 316,
    "price": 14.199999809265137,
    "avg": 14.217824935913086,
    "volume": 2800,
    "holdAmount": 39760
  },
  {
    "time": 317,
    "price": 14.1899995803833,
    "avg": 14.21781063079834,
    "volume": 600,
    "holdAmount": 8514
  },
  {
    "time": 318,
    "price": 14.149999618530273,
    "avg": 14.217164039611816,
    "volume": 10100,
    "holdAmount": 142949
  },
  {
    "time": 319,
    "price": 14.14000129699707,
    "avg": 14.215880393981934,
    "volume": 20500,
    "holdAmount": 290071
  },
  {
    "time": 320,
    "price": 14.149999618530273,
    "avg": 14.215293884277344,
    "volume": 9600,
    "holdAmount": 135784
  },
  {
    "time": 321,
    "price": 14.149999618530273,
    "avg": 14.21397590637207,
    "volume": 20000,
    "holdAmount": 282850
  },
  {
    "time": 322,
    "price": 14.14000129699707,
    "avg": 14.2131986618042,
    "volume": 11700,
    "holdAmount": 165433
  },
  {
    "time": 323,
    "price": 14.10999870300293,
    "avg": 14.212080001831055,
    "volume": 13584,
    "holdAmount": 191816
  },
  {
    "time": 324,
    "price": 14.119999885559082,
    "avg": 14.211551666259766,
    "volume": 6116,
    "holdAmount": 86321
  },
  {
    "time": 325,
    "price": 14.14000129699707,
    "avg": 14.211170196533203,
    "volume": 5800,
    "holdAmount": 81989
  },
  {
    "time": 326,
    "price": 14.149999618530273,
    "avg": 14.210991859436035,
    "volume": 2900,
    "holdAmount": 41007
  },
  {
    "time": 327,
    "price": 14.229998588562012,
    "avg": 14.2117280960083,
    "volume": 58800,
    "holdAmount": 836050
  },
  {
    "time": 328,
    "price": 14.239999771118164,
    "avg": 14.211852073669434,
    "volume": 8100,
    "holdAmount": 115254
  },
  {
    "time": 329,
    "price": 14.229998588562012,
    "avg": 14.21192455291748,
    "volume": 9100,
    "holdAmount": 129344
  },
  {
    "time": 330,
    "price": 14.210000038146973,
    "avg": 14.21196460723877,
    "volume": 5600,
    "holdAmount": 79636
  },
  {
    "time": 331,
    "price": 14.210000038146973,
    "avg": 14.21196460723877,
    "volume": 1100,
    "holdAmount": 15632
  },
  {
    "time": 332,
    "price": 14.210000038146973,
    "avg": 14.211952209472656,
    "volume": 7800,
    "holdAmount": 110804
  },
  {
    "time": 333,
    "price": 14.199999809265137,
    "avg": 14.211938858032227,
    "volume": 4100,
    "holdAmount": 58252
  },
  {
    "time": 334,
    "price": 14.199999809265137,
    "avg": 14.211928367614746,
    "volume": 1100,
    "holdAmount": 15620
  },
  {
    "holdAmount": 15620,
    "price": 14.199999809265137,
    "volume": 0,
    "avg": 14.21185190249712,
    "time": 335
  },
  {
    "time": 336,
    "price": 14.15999984741211,
    "avg": 14.211709976196289,
    "volume": 5300,
    "holdAmount": 75050
  },
  {
    "holdAmount": 75050,
    "price": 14.15999984741211,
    "volume": 0,
    "avg": 14.211382696900186,
    "time": 337
  },
  {
    "time": 338,
    "price": 14.1899995803833,
    "avg": 14.211694717407227,
    "volume": 900,
    "holdAmount": 12770
  },
  {
    "time": 339,
    "price": 14.199999809265137,
    "avg": 14.211664199829102,
    "volume": 3400,
    "holdAmount": 48280
  },
  {
    "time": 340,
    "price": 14.170000076293945,
    "avg": 14.211151123046875,
    "volume": 15600,
    "holdAmount": 221116
  },
  {
    "time": 341,
    "price": 14.170000076293945,
    "avg": 14.211009979248047,
    "volume": 4400,
    "holdAmount": 62348
  },
  {
    "holdAmount": 62348,
    "price": 14.170000076293945,
    "volume": 0,
    "avg": 14.210758384751395,
    "time": 342
  },
  {
    "holdAmount": 62348,
    "price": 14.170000076293945,
    "volume": 0,
    "avg": 14.210509858480314,
    "time": 343
  },
  {
    "time": 344,
    "price": 14.170000076293945,
    "avg": 14.210761070251465,
    "volume": 7700,
    "holdAmount": 109118
  },
  {
    "time": 345,
    "price": 14.199999809265137,
    "avg": 14.210470199584961,
    "volume": 8800,
    "holdAmount": 124750
  },
  {
    "time": 346,
    "price": 14.180000305175781,
    "avg": 14.210468292236328,
    "volume": 200,
    "holdAmount": 2836
  },
  {
    "time": 347,
    "price": 14.199999809265137,
    "avg": 14.210450172424316,
    "volume": 1800,
    "holdAmount": 25560
  },
  {
    "holdAmount": 25560,
    "price": 14.199999809265137,
    "volume": 0,
    "avg": 14.210388335955919,
    "time": 348
  },
  {
    "time": 349,
    "price": 14.210000038146973,
    "avg": 14.210319519042969,
    "volume": 17500,
    "holdAmount": 248510
  },
  {
    "time": 350,
    "price": 14.199999809265137,
    "avg": 14.21031379699707,
    "volume": 800,
    "holdAmount": 11362
  },
  {
    "time": 351,
    "price": 14.210000038146973,
    "avg": 14.210308074951172,
    "volume": 3200,
    "holdAmount": 45462
  },
  {
    "time": 352,
    "price": 14.199999809265137,
    "avg": 14.210138320922852,
    "volume": 20800,
    "holdAmount": 295352
  },
  {
    "time": 353,
    "price": 14.1899995803833,
    "avg": 14.210095405578613,
    "volume": 4900,
    "holdAmount": 69570
  },
  {
    "time": 354,
    "price": 14.199999809265137,
    "avg": 14.210076332092285,
    "volume": 2400,
    "holdAmount": 34080
  },
  {
    "time": 355,
    "price": 14.180000305175781,
    "avg": 14.20995044708252,
    "volume": 5700,
    "holdAmount": 80826
  },
  {
    "time": 356,
    "price": 14.1899995803833,
    "avg": 14.209810256958008,
    "volume": 6700,
    "holdAmount": 95016
  },
  {
    "holdAmount": 95016,
    "price": 14.1899995803833,
    "volume": 0,
    "avg": 14.209698961022195,
    "time": 357
  },
  {
    "holdAmount": 95016,
    "price": 14.1899995803833,
    "volume": 0,
    "avg": 14.209588908616391,
    "time": 358
  },
  {
    "time": 359,
    "price": 14.1899995803833,
    "avg": 14.209768295288086,
    "volume": 2800,
    "holdAmount": 39728
  },
  {
    "time": 360,
    "price": 14.199999809265137,
    "avg": 14.209744453430176,
    "volume": 3200,
    "holdAmount": 45426
  },
  {
    "time": 361,
    "price": 14.229998588562012,
    "avg": 14.209851264953613,
    "volume": 12600,
    "holdAmount": 179194
  },
  {
    "time": 362,
    "price": 14.289999961853027,
    "avg": 14.211152076721191,
    "volume": 30900,
    "holdAmount": 440766
  },
  {
    "time": 363,
    "price": 14.289999961853027,
    "avg": 14.21139907836914,
    "volume": 4600,
    "holdAmount": 65708
  },
  {
    "time": 364,
    "price": 14.289999961853027,
    "avg": 14.211901664733887,
    "volume": 10000,
    "holdAmount": 142828
  },
  {
    "time": 365,
    "price": 14.289999961853027,
    "avg": 14.212000846862793,
    "volume": 1800,
    "holdAmount": 25724
  },
  {
    "time": 366,
    "price": 14.260000228881836,
    "avg": 14.21200180053711,
    "volume": 100,
    "holdAmount": 1424
  },
  {
    "time": 367,
    "price": 14.260000228881836,
    "avg": 14.212005615234375,
    "volume": 100,
    "holdAmount": 1428
  },
  {
    "time": 368,
    "price": 14.279999732971191,
    "avg": 14.21214771270752,
    "volume": 3100,
    "holdAmount": 44248
  },
  {
    "time": 369,
    "price": 14.239999771118164,
    "avg": 14.212955474853516,
    "volume": 24300,
    "holdAmount": 346648
  },
  {
    "time": 370,
    "price": 14.239999771118164,
    "avg": 14.213001251220703,
    "volume": 2500,
    "holdAmount": 35596
  },
  {
    "holdAmount": 35596,
    "price": 14.239999771118164,
    "volume": 0,
    "avg": 14.213141868511835,
    "time": 371
  },
  {
    "time": 372,
    "price": 14.229998588562012,
    "avg": 14.213029861450195,
    "volume": 1800,
    "holdAmount": 25622
  },
  {
    "time": 373,
    "price": 14.220000267028809,
    "avg": 14.213064193725586,
    "volume": 7500,
    "holdAmount": 106650
  },
  {
    "time": 374,
    "price": 14.1899995803833,
    "avg": 14.212968826293945,
    "volume": 16000,
    "holdAmount": 227284
  },
  {
    "time": 375,
    "price": 14.199999809265137,
    "avg": 14.212947845458984,
    "volume": 1600,
    "holdAmount": 22708
  },
  {
    "time": 376,
    "price": 14.199999809265137,
    "avg": 14.212749481201172,
    "volume": 23000,
    "holdAmount": 326600
  },
  {
    "time": 377,
    "price": 14.180000305175781,
    "avg": 14.212610244750977,
    "volume": 7300,
    "holdAmount": 103556
  },
  {
    "time": 378,
    "price": 14.180000305175781,
    "avg": 14.212517738342285,
    "volume": 4500,
    "holdAmount": 63824
  },
  {
    "time": 379,
    "price": 14.199999809265137,
    "avg": 14.21250057220459,
    "volume": 1700,
    "holdAmount": 24140
  },
  {
    "time": 380,
    "price": 14.1899995803833,
    "avg": 14.212493896484375,
    "volume": 700,
    "holdAmount": 9934
  },
  {
    "time": 381,
    "price": 14.229998588562012,
    "avg": 14.212465286254883,
    "volume": 2300,
    "holdAmount": 32650
  },
  {
    "time": 382,
    "price": 14.199999809265137,
    "avg": 14.212470054626465,
    "volume": 1500,
    "holdAmount": 21342
  },
  {
    "time": 383,
    "price": 14.199999809265137,
    "avg": 14.212469100952148,
    "volume": 300,
    "holdAmount": 4260
  },
  {
    "time": 384,
    "price": 14.229998588562012,
    "avg": 14.212477684020996,
    "volume": 4300,
    "holdAmount": 61126
  },
  {
    "time": 385,
    "price": 14.210000038146973,
    "avg": 14.212477684020996,
    "volume": 500,
    "holdAmount": 7106
  },
  {
    "time": 386,
    "price": 14.199999809265137,
    "avg": 14.212435722351074,
    "volume": 6100,
    "holdAmount": 86630
  },
  {
    "time": 387,
    "price": 14.199999809265137,
    "avg": 14.212434768676758,
    "volume": 100,
    "holdAmount": 1420
  },
  {
    "time": 388,
    "price": 14.220000267028809,
    "avg": 14.212435722351074,
    "volume": 300,
    "holdAmount": 4266
  },
  {
    "time": 389,
    "price": 14.229998588562012,
    "avg": 14.21252155303955,
    "volume": 7500,
    "holdAmount": 106724
  },
  {
    "time": 390,
    "price": 14.220000267028809,
    "avg": 14.21253776550293,
    "volume": 3500,
    "holdAmount": 49770
  },
  {
    "time": 391,
    "price": 14.220000267028809,
    "avg": 14.212579727172852,
    "volume": 4500,
    "holdAmount": 64020
  },
  {
    "time": 392,
    "price": 14.199999809265137,
    "avg": 14.212577819824219,
    "volume": 200,
    "holdAmount": 2840
  },
  {
    "time": 393,
    "price": 14.229998588562012,
    "avg": 14.21261215209961,
    "volume": 6000,
    "holdAmount": 85350
  },
  {
    "time": 394,
    "price": 14.220000267028809,
    "avg": 14.212652206420898,
    "volume": 3600,
    "holdAmount": 51226
  },
  {
    "time": 395,
    "price": 14.25,
    "avg": 14.212852478027344,
    "volume": 10700,
    "holdAmount": 152370
  },
  {
    "time": 396,
    "price": 14.260000228881836,
    "avg": 14.212939262390137,
    "volume": 2700,
    "holdAmount": 38510
  },
  {
    "time": 397,
    "price": 14.279999732971191,
    "avg": 14.213722229003906,
    "volume": 19500,
    "holdAmount": 278352
  },
  {
    "time": 398,
    "price": 14.260000228881836,
    "avg": 14.21389389038086,
    "volume": 4800,
    "holdAmount": 68484
  },
  {
    "time": 399,
    "price": 14.279999732971191,
    "avg": 14.2149076461792,
    "volume": 24500,
    "holdAmount": 349808
  },
  {
    "time": 400,
    "price": 14.279999732971191,
    "avg": 14.214999198913574,
    "volume": 2200,
    "holdAmount": 31416
  },
  {
    "time": 401,
    "price": 14.239999771118164,
    "avg": 14.215380668640137,
    "volume": 10800,
    "holdAmount": 154148
  },
  {
    "time": 402,
    "price": 14.239999771118164,
    "avg": 14.2153902053833,
    "volume": 500,
    "holdAmount": 7120
  },
  {
    "time": 403,
    "price": 14.239999771118164,
    "avg": 14.215399742126465,
    "volume": 800,
    "holdAmount": 11392
  },
  {
    "time": 404,
    "price": 14.279999732971191,
    "avg": 14.216349601745605,
    "volume": 23300,
    "holdAmount": 332788
  },
  {
    "time": 405,
    "price": 14.289999961853027,
    "avg": 14.216773986816406,
    "volume": 10700,
    "holdAmount": 152808
  },
  {
    "time": 406,
    "price": 14.279999732971191,
    "avg": 14.217419624328613,
    "volume": 17100,
    "holdAmount": 244192
  },
  {
    "time": 407,
    "price": 14.25,
    "avg": 14.217477798461914,
    "volume": 2200,
    "holdAmount": 31380
  },
  {
    "time": 408,
    "price": 14.270001411437988,
    "avg": 14.217824935913086,
    "volume": 11300,
    "holdAmount": 161248
  },
  {
    "time": 409,
    "price": 14.25,
    "avg": 14.217999458312988,
    "volume": 7400,
    "holdAmount": 105504
  },
  {
    "time": 410,
    "price": 14.220000267028809,
    "avg": 14.21815013885498,
    "volume": 30500,
    "holdAmount": 433928
  },
  {
    "time": 411,
    "price": 14.210000038146973,
    "avg": 14.2180757522583,
    "volume": 8500,
    "holdAmount": 120768
  },
  {
    "time": 412,
    "price": 14.220000267028809,
    "avg": 14.218064308166504,
    "volume": 10700,
    "holdAmount": 152112
  },
  {
    "time": 413,
    "price": 14.220000267028809,
    "avg": 14.217977523803711,
    "volume": 9100,
    "holdAmount": 129320
  },
  {
    "time": 414,
    "price": 14.210000038146973,
    "avg": 14.217964172363281,
    "volume": 2400,
    "holdAmount": 34100
  },
  {
    "time": 415,
    "price": 14.270001411437988,
    "avg": 14.218647956848145,
    "volume": 35500,
    "holdAmount": 505900
  },
  {
    "time": 416,
    "price": 14.279999732971191,
    "avg": 14.21992015838623,
    "volume": 38400,
    "holdAmount": 548496
  },
  {
    "time": 417,
    "price": 14.300000190734863,
    "avg": 14.221588134765625,
    "volume": 39700,
    "holdAmount": 567608
  },
  {
    "time": 418,
    "price": 14.300000190734863,
    "avg": 14.22276496887207,
    "volume": 27600,
    "holdAmount": 394764
  },
  {
    "time": 419,
    "price": 14.279999732971191,
    "avg": 14.22333812713623,
    "volume": 15400,
    "holdAmount": 220168
  }
]

new Chart({
  selector: '#time-share',
  resolution: devicePixelRatio >= 2 ? 2 : 1,
  count: 240,
  data: MOCK_PRICE.map(item => ({
    price: item.price,
    avg: item.avg,
    volume: item.volume
  })),
  mainDrawer: TimeShareDrawer,
  auxiliaryDrawers: [
    class CustomVolumeDrawer extends VolumeDrawer {
      calcDeltaPrice(currentValue: VolumeDrawerData, currentIndex: number, data: VolumeDrawerData[]): number {
        if (currentIndex === 0) return 0;
        return super.calcDeltaPrice(currentValue, currentIndex, data);
      }
    }
  ]
})
