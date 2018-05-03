import './index.scss'
import { TimeShareDrawer } from '../../src/chart/time-share-drawer'
import { Chart } from '../../src/chart/chart'
import { VolumeDrawer, VolumeData } from '../../src/chart/volume-drawer'

function createTimeShare() {
  const MOCK_TIME_SHARE = [
    {
      "time": 90,
      "price": 4.599999904632568,
      "avg": 4.6051177978515625,
      "volume": 2183600,
      "holdAmount": 10067614
    },
    {
      "time": 91,
      "price": 4.610001087188721,
      "avg": 4.5824809074401855,
      "volume": 4153180,
      "holdAmount": 18965390
    },
    {
      "time": 92,
      "price": 4.670000076293945,
      "avg": 4.60253381729126,
      "volume": 2049400,
      "holdAmount": 9498640
    },
    {
      "time": 93,
      "price": 4.610001087188721,
      "avg": 4.608004093170166,
      "volume": 1572700,
      "holdAmount": 7290824
    },
    {
      "time": 94,
      "price": 4.639999866485596,
      "avg": 4.610294818878174,
      "volume": 1762700,
      "holdAmount": 8143788
    },
    {
      "time": 95,
      "price": 4.630001068115234,
      "avg": 4.613296031951904,
      "volume": 1531500,
      "holdAmount": 7104908
    },
    {
      "time": 96,
      "price": 4.619999885559082,
      "avg": 4.613879203796387,
      "volume": 904500,
      "holdAmount": 4180980
    },
    {
      "time": 97,
      "price": 4.639999866485596,
      "avg": 4.614800930023193,
      "volume": 1240200,
      "holdAmount": 5733360
    },
    {
      "time": 98,
      "price": 4.619999885559082,
      "avg": 4.615808010101318,
      "volume": 1047700,
      "holdAmount": 4849056
    },
    {
      "time": 99,
      "price": 4.579999923706055,
      "avg": 4.61432409286499,
      "volume": 1561700,
      "holdAmount": 7178136
    },
    {
      "time": 100,
      "price": 4.590000152587891,
      "avg": 4.612071990966797,
      "volume": 1253700,
      "holdAmount": 5739248
    },
    {
      "time": 101,
      "price": 4.610001087188721,
      "avg": 4.611946105957031,
      "volume": 969200,
      "holdAmount": 4460264
    },
    {
      "time": 102,
      "price": 4.599999904632568,
      "avg": 4.611466884613037,
      "volume": 1031400,
      "holdAmount": 4748624
    },
    {
      "time": 103,
      "price": 4.590000152587891,
      "avg": 4.610695838928223,
      "volume": 795200,
      "holdAmount": 3650592
    },
    {
      "time": 104,
      "price": 4.610001087188721,
      "avg": 4.610440254211426,
      "volume": 683000,
      "holdAmount": 3140872
    },
    {
      "time": 105,
      "price": 4.610001087188721,
      "avg": 4.610584259033203,
      "volume": 582400,
      "holdAmount": 2689024
    },
    {
      "time": 106,
      "price": 4.630001068115234,
      "avg": 4.610931873321533,
      "volume": 831100,
      "holdAmount": 3838696
    },
    {
      "time": 107,
      "price": 4.619999885559082,
      "avg": 4.611230850219727,
      "volume": 658800,
      "holdAmount": 3045296
    },
    {
      "time": 108,
      "price": 4.630001068115234,
      "avg": 4.611581802368164,
      "volume": 623000,
      "holdAmount": 2880400
    },
    {
      "time": 109,
      "price": 4.650000095367432,
      "avg": 4.612401008605957,
      "volume": 804600,
      "holdAmount": 3730960
    },
    {
      "time": 110,
      "price": 4.679999828338623,
      "avg": 4.615134239196777,
      "volume": 1356746,
      "holdAmount": 6334232
    },
    {
      "time": 111,
      "price": 4.670000076293945,
      "avg": 4.619053840637207,
      "volume": 1969900,
      "holdAmount": 9213032
    },
    {
      "time": 112,
      "price": 4.639999866485596,
      "avg": 4.62034797668457,
      "volume": 1221800,
      "holdAmount": 5686544
    },
    {
      "time": 113,
      "price": 4.670000076293945,
      "avg": 4.621469020843506,
      "volume": 899300,
      "holdAmount": 4190016
    },
    {
      "time": 114,
      "price": 4.720000267028809,
      "avg": 4.624312877655029,
      "volume": 1271300,
      "holdAmount": 5967056
    },
    {
      "time": 115,
      "price": 4.730000019073486,
      "avg": 4.634852886199951,
      "volume": 3419102,
      "holdAmount": 16200480
    },
    {
      "time": 116,
      "price": 4.710000038146973,
      "avg": 4.638514041900635,
      "volume": 1853000,
      "holdAmount": 8722896
    },
    {
      "time": 117,
      "price": 4.720000267028809,
      "avg": 4.640841007232666,
      "volume": 1170000,
      "holdAmount": 5517360
    },
    {
      "time": 118,
      "price": 4.739999771118164,
      "avg": 4.647663116455078,
      "volume": 2908200,
      "holdAmount": 13778864
    },
    {
      "time": 119,
      "price": 4.710000038146973,
      "avg": 4.651083946228027,
      "volume": 1853200,
      "holdAmount": 8762688
    },
    {
      "time": 120,
      "price": 4.710000038146973,
      "avg": 4.65199089050293,
      "volume": 853320,
      "holdAmount": 4011584
    },
    {
      "time": 121,
      "price": 4.699999809265137,
      "avg": 4.65293025970459,
      "volume": 783800,
      "holdAmount": 3690320
    },
    {
      "time": 122,
      "price": 4.699999809265137,
      "avg": 4.6535868644714355,
      "volume": 567496,
      "holdAmount": 2670832
    },
    {
      "time": 123,
      "price": 4.690000057220459,
      "avg": 4.654483795166016,
      "volume": 1088800,
      "holdAmount": 5109712
    },
    {
      "time": 124,
      "price": 4.679999828338623,
      "avg": 4.6549458503723145,
      "volume": 730000,
      "holdAmount": 3418784
    },
    {
      "time": 125,
      "price": 4.679999828338623,
      "avg": 4.65517520904541,
      "volume": 551200,
      "holdAmount": 2576176
    },
    {
      "time": 126,
      "price": 4.659999847412109,
      "avg": 4.655303955078125,
      "volume": 1089400,
      "holdAmount": 5074240
    },
    {
      "time": 127,
      "price": 4.650000095367432,
      "avg": 4.6552510261535645,
      "volume": 563304,
      "holdAmount": 2620192
    },
    {
      "time": 128,
      "price": 4.679999828338623,
      "avg": 4.6552629470825195,
      "volume": 450600,
      "holdAmount": 2098560
    },
    {
      "time": 129,
      "price": 4.659999847412109,
      "avg": 4.6554059982299805,
      "volume": 452496,
      "holdAmount": 2114192
    },
    {
      "time": 130,
      "price": 4.679999828338623,
      "avg": 4.655525207519531,
      "volume": 299600,
      "holdAmount": 1401248
    },
    {
      "time": 131,
      "price": 4.690000057220459,
      "avg": 4.655882835388184,
      "volume": 576904,
      "holdAmount": 2705136
    },
    {
      "time": 132,
      "price": 4.699999809265137,
      "avg": 4.656394004821777,
      "volume": 687896,
      "holdAmount": 3229216
    },
    {
      "time": 133,
      "price": 4.710000038146973,
      "avg": 4.656979084014893,
      "volume": 661400,
      "holdAmount": 3110864
    },
    {
      "time": 134,
      "price": 4.679999828338623,
      "avg": 4.657803058624268,
      "volume": 984000,
      "holdAmount": 4625728
    },
    {
      "time": 135,
      "price": 4.699999809265137,
      "avg": 4.658013820648193,
      "volume": 438504,
      "holdAmount": 2054592
    },
    {
      "time": 136,
      "price": 4.690000057220459,
      "avg": 4.658225059509277,
      "volume": 362800,
      "holdAmount": 1701520
    },
    {
      "time": 137,
      "price": 4.670000076293945,
      "avg": 4.658507823944092,
      "volume": 764696,
      "holdAmount": 3577104
    },
    {
      "time": 138,
      "price": 4.659999847412109,
      "avg": 4.658519744873047,
      "volume": 414000,
      "holdAmount": 1930160
    },
    {
      "time": 139,
      "price": 4.679999828338623,
      "avg": 4.658555030822754,
      "volume": 252200,
      "holdAmount": 1178160
    },
    {
      "time": 140,
      "price": 4.679999828338623,
      "avg": 4.658720016479492,
      "volume": 346344,
      "holdAmount": 1621280
    },
    {
      "time": 141,
      "price": 4.690000057220459,
      "avg": 4.658944129943848,
      "volume": 493496,
      "holdAmount": 2311984
    },
    {
      "time": 142,
      "price": 4.690000057220459,
      "avg": 4.659022808074951,
      "volume": 160000,
      "holdAmount": 749680
    },
    {
      "time": 143,
      "price": 4.670000076293945,
      "avg": 4.659078121185303,
      "volume": 176904,
      "holdAmount": 827264
    },
    {
      "time": 144,
      "price": 4.679999828338623,
      "avg": 4.659135818481445,
      "volume": 182696,
      "holdAmount": 853728
    },
    {
      "time": 145,
      "price": 4.670000076293945,
      "avg": 4.659213066101074,
      "volume": 257800,
      "holdAmount": 1205504
    },
    {
      "time": 146,
      "price": 4.670000076293945,
      "avg": 4.659275054931641,
      "volume": 262104,
      "holdAmount": 1224224
    },
    {
      "time": 147,
      "price": 4.659999847412109,
      "avg": 4.659299850463867,
      "volume": 389200,
      "holdAmount": 1814368
    },
    {
      "time": 148,
      "price": 4.650000095367432,
      "avg": 4.659286975860596,
      "volume": 547600,
      "holdAmount": 2549312
    },
    {
      "time": 149,
      "price": 4.650000095367432,
      "avg": 4.659225940704346,
      "volume": 462896,
      "holdAmount": 2153568
    },
    {
      "time": 150,
      "price": 4.659999847412109,
      "avg": 4.6592302322387695,
      "volume": 403600,
      "holdAmount": 1880000
    },
    {
      "time": 151,
      "price": 4.659999847412109,
      "avg": 4.659244060516357,
      "volume": 297304,
      "holdAmount": 1385952
    },
    {
      "time": 152,
      "price": 4.670000076293945,
      "avg": 4.659273147583008,
      "volume": 263096,
      "holdAmount": 1228000
    },
    {
      "time": 153,
      "price": 4.670000076293945,
      "avg": 4.65933084487915,
      "volume": 215304,
      "holdAmount": 1006112
    },
    {
      "time": 154,
      "price": 4.679999828338623,
      "avg": 4.6594061851501465,
      "volume": 307200,
      "holdAmount": 1435264
    },
    {
      "time": 155,
      "price": 4.659999847412109,
      "avg": 4.659453868865967,
      "volume": 447800,
      "holdAmount": 2088928
    },
    {
      "time": 156,
      "price": 4.650000095367432,
      "avg": 4.659420967102051,
      "volume": 459096,
      "holdAmount": 2136128
    },
    {
      "time": 157,
      "price": 4.639999866485596,
      "avg": 4.659273147583008,
      "volume": 508504,
      "holdAmount": 2360448
    },
    {
      "time": 158,
      "price": 4.619999885559082,
      "avg": 4.658662796020508,
      "volume": 1360200,
      "holdAmount": 6298112
    },
    {
      "time": 159,
      "price": 4.630001068115234,
      "avg": 4.658181190490723,
      "volume": 881000,
      "holdAmount": 4069632
    },
    {
      "time": 160,
      "price": 4.639999866485596,
      "avg": 4.6581130027771,
      "volume": 284400,
      "holdAmount": 1319776
    },
    {
      "time": 161,
      "price": 4.650000095367432,
      "avg": 4.658053874969482,
      "volume": 367800,
      "holdAmount": 1708960
    },
    {
      "time": 162,
      "price": 4.630001068115234,
      "avg": 4.6579461097717285,
      "volume": 398296,
      "holdAmount": 1848640
    },
    {
      "time": 163,
      "price": 4.639999866485596,
      "avg": 4.657833099365234,
      "volume": 369704,
      "holdAmount": 1713280
    },
    {
      "time": 164,
      "price": 4.639999866485596,
      "avg": 4.657773971557617,
      "volume": 239000,
      "holdAmount": 1109056
    },
    {
      "time": 165,
      "price": 4.650000095367432,
      "avg": 4.657737731933594,
      "volume": 151296,
      "holdAmount": 702208
    },
    {
      "time": 166,
      "price": 4.650000095367432,
      "avg": 4.657699108123779,
      "volume": 252504,
      "holdAmount": 1173600
    },
    {
      "time": 167,
      "price": 4.659999847412109,
      "avg": 4.657695770263672,
      "volume": 193896,
      "holdAmount": 902656
    },
    {
      "time": 168,
      "price": 4.639999866485596,
      "avg": 4.6576361656188965,
      "volume": 409304,
      "holdAmount": 1901632
    },
    {
      "time": 169,
      "price": 4.639999866485596,
      "avg": 4.657587051391602,
      "volume": 245400,
      "holdAmount": 1139168
    },
    {
      "time": 170,
      "price": 4.630001068115234,
      "avg": 4.657529830932617,
      "volume": 178296,
      "holdAmount": 826592
    },
    {
      "time": 171,
      "price": 4.639999866485596,
      "avg": 4.657463073730469,
      "volume": 227400,
      "holdAmount": 1053728
    },
    {
      "time": 172,
      "price": 4.650000095367432,
      "avg": 4.657437801361084,
      "volume": 124200,
      "holdAmount": 576896
    },
    {
      "time": 173,
      "price": 4.650000095367432,
      "avg": 4.657413005828857,
      "volume": 268104,
      "holdAmount": 1246048
    },
    {
      "time": 174,
      "price": 4.670000076293945,
      "avg": 4.657427787780762,
      "volume": 245696,
      "holdAmount": 1144960
    },
    {
      "time": 175,
      "price": 4.670000076293945,
      "avg": 4.657527923583984,
      "volume": 439104,
      "holdAmount": 2051968
    },
    {
      "time": 176,
      "price": 4.690000057220459,
      "avg": 4.657651901245117,
      "volume": 310296,
      "holdAmount": 1454304
    },
    {
      "time": 177,
      "price": 4.690000057220459,
      "avg": 4.657798767089844,
      "volume": 325200,
      "holdAmount": 1524960
    },
    {
      "time": 178,
      "price": 4.679999828338623,
      "avg": 4.657916069030762,
      "volume": 391200,
      "holdAmount": 1830208
    },
    {
      "time": 179,
      "price": 4.670000076293945,
      "avg": 4.657958984375,
      "volume": 180104,
      "holdAmount": 841344
    },
    {
      "time": 180,
      "price": 4.670000076293945,
      "avg": 4.657984733581543,
      "volume": 143200,
      "holdAmount": 669056
    },
    {
      "time": 181,
      "price": 4.670000076293945,
      "avg": 4.658003807067871,
      "volume": 131296,
      "holdAmount": 612768
    },
    {
      "time": 182,
      "price": 4.659999847412109,
      "avg": 4.6580119132995605,
      "volume": 84600,
      "holdAmount": 394592
    },
    {
      "time": 183,
      "price": 4.670000076293945,
      "avg": 4.65802001953125,
      "volume": 84800,
      "holdAmount": 395552
    },
    {
      "time": 184,
      "price": 4.650000095367432,
      "avg": 4.658030033111572,
      "volume": 245704,
      "holdAmount": 1145088
    },
    {
      "time": 185,
      "price": 4.650000095367432,
      "avg": 4.658017158508301,
      "volume": 130096,
      "holdAmount": 605376
    },
    {
      "time": 186,
      "price": 4.659999847412109,
      "avg": 4.6580071449279785,
      "volume": 219704,
      "holdAmount": 1022016
    },
    {
      "time": 187,
      "price": 4.650000095367432,
      "avg": 4.658001899719238,
      "volume": 79600,
      "holdAmount": 370112
    },
    {
      "time": 188,
      "price": 4.650000095367432,
      "avg": 4.6579790115356445,
      "volume": 126800,
      "holdAmount": 589120
    },
    {
      "time": 189,
      "price": 4.650000095367432,
      "avg": 4.657962799072266,
      "volume": 116400,
      "holdAmount": 541088
    },
    {
      "time": 190,
      "price": 4.650000095367432,
      "avg": 4.657961845397949,
      "volume": 47696,
      "holdAmount": 221984
    },
    {
      "time": 191,
      "price": 4.670000076293945,
      "avg": 4.657969951629639,
      "volume": 204000,
      "holdAmount": 950720
    },
    {
      "time": 192,
      "price": 4.659999847412109,
      "avg": 4.657978057861328,
      "volume": 127304,
      "holdAmount": 593280
    },
    {
      "time": 193,
      "price": 4.670000076293945,
      "avg": 4.657981872558594,
      "volume": 125096,
      "holdAmount": 582848
    },
    {
      "time": 194,
      "price": 4.650000095367432,
      "avg": 4.657980918884277,
      "volume": 151704,
      "holdAmount": 706720
    },
    {
      "time": 195,
      "price": 4.659999847412109,
      "avg": 4.657968997955322,
      "volume": 152600,
      "holdAmount": 709824
    },
    {
      "time": 196,
      "price": 4.650000095367432,
      "avg": 4.657961845397949,
      "volume": 103696,
      "holdAmount": 482400
    },
    {
      "time": 197,
      "price": 4.659999847412109,
      "avg": 4.657962799072266,
      "volume": 330504,
      "holdAmount": 1539808
    },
    {
      "time": 198,
      "price": 4.659999847412109,
      "avg": 4.657958984375,
      "volume": 100200,
      "holdAmount": 466272
    },
    {
      "time": 199,
      "price": 4.659999847412109,
      "avg": 4.657961845397949,
      "volume": 108712,
      "holdAmount": 506720
    },
    {
      "time": 200,
      "price": 4.670000076293945,
      "avg": 4.6579790115356445,
      "volume": 230888,
      "holdAmount": 1076768
    },
    {
      "time": 201,
      "price": 4.670000076293945,
      "avg": 4.6579909324646,
      "volume": 124096,
      "holdAmount": 578880
    },
    {
      "time": 202,
      "price": 4.679999828338623,
      "avg": 4.658010959625244,
      "volume": 165416,
      "holdAmount": 772224
    },
    {
      "time": 203,
      "price": 4.670000076293945,
      "avg": 4.658020973205566,
      "volume": 42000,
      "holdAmount": 196416
    },
    {
      "time": 204,
      "price": 4.679999828338623,
      "avg": 4.658041000366211,
      "volume": 96400,
      "holdAmount": 450624
    },
    {
      "time": 205,
      "price": 4.670000076293945,
      "avg": 4.6580891609191895,
      "volume": 180800,
      "holdAmount": 845248
    },
    {
      "time": 206,
      "price": 4.670000076293945,
      "avg": 4.6581220626831055,
      "volume": 245096,
      "holdAmount": 1144288
    },
    {
      "time": 207,
      "price": 4.670000076293945,
      "avg": 4.658141136169434,
      "volume": 97800,
      "holdAmount": 457152
    },
    {
      "time": 208,
      "price": 4.679999828338623,
      "avg": 4.6581711769104,
      "volume": 123200,
      "holdAmount": 575968
    },
    {
      "time": 209,
      "price": 4.679999828338623,
      "avg": 4.658236980438232,
      "volume": 269504,
      "holdAmount": 1260768
    }
  ]

  const timeShareChart = new Chart({
    selector: '#time-share',
    resolution: devicePixelRatio >= 2 ? 2 : 1,
    count: 240,
    data: MOCK_TIME_SHARE,
    mainDrawer: TimeShareDrawer,
    auxiliaryDrawers: [
      class CustomVolumeDrawer extends VolumeDrawer {
        calcDeltaPrice(currentValue: VolumeData, currentIndex: number, data: VolumeData[]): number {
          if (currentIndex === 0) return 0;
          return super.calcDeltaPrice(currentValue, currentIndex, data);
        }
      }
    ]
  })
  function autoUpdateTimeShare() {
    if (MOCK_TIME_SHARE.length < 240) {
      setTimeout(autoUpdateTimeShare, 500)
    }
    const last = MOCK_TIME_SHARE[MOCK_TIME_SHARE.length - 1]
    const next = {
      time: last.time + 1,
      price: last.price * (Math.random() * 0.02 - 0.01 + 1),
      avg: last.avg * (Math.random() * 0.02 - 0.01 + 1),
      volume: last.volume * (Math.random() * 0.6 - 0.3 + 1),
      holdAmount: last.holdAmount * (Math.random() * 0.6 - 0.3 + 1),
    }
    MOCK_TIME_SHARE.push(next)
    timeShareChart.setData(MOCK_TIME_SHARE)
  }
  autoUpdateTimeShare()
}
createTimeShare()
