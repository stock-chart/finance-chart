import './index.scss'
import { TimeShareDrawer } from '../../src/chart/time-share-drawer'
import { CandleStickDrawer, CandleStickData } from '../../src/chart/candle-stick-drawer';
import { Chart } from '../../src/chart/chart'
import { VolumeDrawer, VolumeData } from '../../src/chart/volume-drawer'
import { formateDate } from '../../src/algorithm/date';
import MOCK_TIME_SHARE from './mock-time-share';
import MOCK_KLINE from './mock-kline';

function createTimeShare() {
  const timeShareChart = new Chart({
    selector: '#time-share',
    resolution: (window.devicePixelRatio || 1) >= 2 ? 2 : 1,
    count: 240,
    data: MOCK_TIME_SHARE,
    mainDrawer: TimeShareDrawer,
    auxiliaryDrawers: [
      class CustomVolumeDrawer extends VolumeDrawer {
        calcDeltaPrice(currentValue: VolumeData, currentIndex: number, data: VolumeData[]): number {
          // 第一个项数据应该与昨收价比较
          if (currentIndex === 0) return 0;
          return super.calcDeltaPrice(currentValue, currentIndex, data);
        }
      }
    ],
    detailProvider: (i, data) => {
      const date = new Date()
      date.setTime(data[i].time * 60 * 1000)
      return {
        title: formateDate(date, 'HH:mm'),
        tables: [
          {
            color: 'green',
            name: '开盘',
            value: '10353'
          },
          {
            color: '#333',
            name: '开盘',
            value: '10353'
          }
        ]
      }
    }
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
      volume: Math.round(last.volume * (Math.random() * 0.6 - 0.3 + 1)),
      holdAmount: Math.round(last.holdAmount * (Math.random() * 0.6 - 0.3 + 1)),
    }
    MOCK_TIME_SHARE.push(next)
    timeShareChart.setData(MOCK_TIME_SHARE)
  }
  autoUpdateTimeShare()
}

function createKLine() {
  CandleStickDrawer.MAIndicators = [
    {
      key: 'ma5',
      color: '#FF8E29'
    },
    {
      key: 'ma10',
      color: '#ADE3F3'
    },
    {
      key: 'ma20',
      color: '#EC6ED9'
    }
  ]
  const klineChart = new Chart({
    selector: '#candle-stick',
    resolution: (window.devicePixelRatio || 1) >= 2 ? 2 : 1,
    count: 60,
    data: MOCK_KLINE,
    mainDrawer: CandleStickDrawer,
    auxiliaryDrawers: [
      class CustomVolumeDrawer extends VolumeDrawer {
        calcDeltaPrice(currentValue: VolumeData, currentIndex: number, data: any[]): number {
          const { open, close } = data[currentIndex]
          return close - open
        }
      }
    ],
    detailProvider: (i, data) => {
      const WEEK_DAY_MAP: { [index: number]: string} = {
        0: '周日',
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六'
      }
      const date = new Date(data[i].time.replace(/-/g, '/'))
      return {
        title: `${formateDate(date, 'yyyy/MM/dd')} ${WEEK_DAY_MAP[date.getDay()]}`,
        tables: [
          {
            color: 'green',
            name: '开盘',
            value: '10353'
          },
          {
            color: '#333',
            name: '开盘',
            value: '10353'
          }
        ]
      }
    }
  })
}
createTimeShare()
createKLine()