import { useEffect, useMemo, useState } from 'react'

type Restaurant = {
  name: string
  city: string
  dish: string
  features: string
  rating: number
  address: string
  tip: string
}

const restaurants: Restaurant[] = [
  {
    name: '란저우 탄면 공방',
    city: '란저우',
    dish: '란저우 탄면',
    features: '진한 육수, 쫄깃한 면발, 마늘 향',
    rating: 4.9,
    address: '시난루 보행거리 부근',
    tip: '저녁 시간에는 줄이 길 수 있으니 오후 일찍 방문하세요.',
  },
  {
    name: '쓰촨 단단면집',
    city: '청두',
    dish: '단단면',
    features: '매운 땅콩소스, 고소한 고명',
    rating: 4.8,
    address: '진리쓰 조식골목',
    tip: '가벼운 매운맛을 원하면 고추기름 양을 조절하세요.',
  },
  {
    name: '베이징 수도면관',
    city: '베이징',
    dish: '수도면',
    features: '담백한 국물, 실키한 육수',
    rating: 4.7,
    address: '왕푸징 쇼핑 거리 근처',
    tip: '국물이 맑고 깔끔해서 아침식사로도 좋습니다.',
  },
  {
    name: '상하이 샤오롱바오면',
    city: '상하이',
    dish: '샤오롱바오 & 국수',
    features: '육즙 가득 샤오롱바오, 부드러운 면',
    rating: 4.6,
    address: '난징동루 상업지구',
    tip: '샤오롱바오는 먼저 맛보고 국수와 함께 즐기면 최고입니다.',
  },
  {
    name: '홍콩 완탕면 스탠드',
    city: '홍콩',
    dish: '완탕면',
    features: '진하고 깔끔한 국물, 쫄깃한 완탕',
    rating: 4.7,
    address: '코즈웨이베이 스트리트 푸드',
    tip: '새우 완탕은 꼭 주문하고, 홍콩 밀크티도 함께 추천합니다.',
  },
  {
    name: '우한 열간면 본점',
    city: '우한',
    dish: '우한 열간면',
    features: '향긋한 참깨 소스, 탱탱한 면발',
    rating: 4.8,
    address: '한구 거리 미식 구역',
    tip: '아침 조식의 인기 메뉴로, 현지인들처럼 빨리 먹는 것이 특징입니다.',
  },
  {
    name: '시안 유포미엔 전통집',
    city: '시안',
    dish: '유포미엔',
    features: '오일 홍당무 소스, 역사 깊은 맛',
    rating: 4.9,
    address: '종루 고궁 관광 지구',
    tip: '2000년 이상의 역사를 가진 시안의 대표 음식입니다.',
  },
  {
    name: '충칭 소매면 수프',
    city: '충칭',
    dish: '소매면',
    features: '고추기름의 향, 톡톡한 매운맛',
    rating: 4.7,
    address: '해방비 미식거리',
    tip: '충칭의 상징적인 음식으로, 매운맛을 좋아하시는 분들에게 추천합니다.',
  },
  {
    name: '난징 오리 육수 면',
    city: '난징',
    dish: '오리 육수 면',
    features: '구수한 오리 국물, 담백한 맛',
    rating: 4.6,
    address: '푸즈먀오 먹거리 골목',
    tip: '난징의 소위 오리 음식 문화의 핵심으로, 아침 일찍 방문하세요.',
  },
  {
    name: '항저우 드래곤웰 새우 면',
    city: '항저우',
    dish: '드래곤웰 새우 면',
    features: '신선한 새우, 우아한 맛',
    rating: 4.8,
    address: '서호 관광 지구',
    tip: '드래곤웰 차의 향미가 면 국물에 어울립니다.',
  },
  {
    name: '푸저우 어묵 면',
    city: '푸저우',
    dish: '어묵 면',
    features: '해산물 풍미, 신선한 어묵',
    rating: 4.6,
    address: '삼방칠항 역사 보호 지역',
    tip: '푸저우의 해양 문화를 대표하는 음식입니다.',
  },
  {
    name: '쿤밍 쌀국수',
    city: '쿤밍',
    dish: '쌀국수',
    features: '국수의 신선함, 가벼운 국물',
    rating: 4.7,
    address: '스푸제 먹거리 거리',
    tip: '운남 지역의 대표 음식으로, 현지 재료가 듬뿍 들어갑니다.',
  },
  {
    name: '타이위안 산서 면',
    city: '타이위안',
    dish: '산서 국수',
    features: '쫄깃한 식감, 구수한 국물',
    rating: 4.6,
    address: '식사거리 맛집 골목',
    tip: '산서 지역이 춘추 시대부터 면의 문화를 가지고 있습니다.',
  },
  {
    name: '모하친 양고기 국수',
    city: '모호청',
    dish: '양고기 국수',
    features: '고소한 양고기, 특유의 향신료',
    rating: 4.7,
    address: '맛집 거리',
    tip: '북부 지역의 특색 있는 음식이며, 추운 겨울에 어울립니다.',
  },
  {
    name: '난톈 쌀 국수',
    city: '난닝',
    dish: '쌀 국수',
    features: '신선한 육수, 다양한 토핑',
    rating: 4.6,
    address: '중한 상업 지구',
    tip: '광시 지역의 특색 있는 아침 음식입니다.',
  },
  {
    name: '장하이 넓은 국수',
    city: '장하이',
    dish: '넓은 국수',
    features: '고소한 국물, 힘줄 있는 면발',
    rating: 4.5,
    address: '지역 미식 거리',
    tip: '광동식 넓은 국수를 즐길 수 있는 명점입니다.',
  },
  {
    name: '닝보 어묵 국수',
    city: '닝보',
    dish: '어묘기 국수',
    features: '신선한 해산물, 깔끔한 맛',
    rating: 4.6,
    address: '항구 먹거리 지구',
    tip: '닝보의 항구 문화가 반영된 해산물 국수입니다.',
  },
  {
    name: '우시 장어말이 국수',
    city: '우시',
    dish: '장어말이 국수',
    features: '부드러운 장어, 특별한 소스',
    rating: 4.7,
    address: '태호 호수 관광지',
    tip: '장어 요리로 유명한 우시의 특별한 국수 요리입니다.',
  },
  {
    name: '장저우 미엔 찐빵',
    city: '장저우',
    dish: '광동식 계란 면',
    features: '달걀의 풍미, 미세한 질감',
    rating: 4.6,
    address: '광장 먹거리 열',
    tip: '장저우 지역의 특색 있는 명인 집입니다.',
  },
]

function App() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('전체')
  const [itinerary, setItinerary] = useState<Restaurant[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('travel-itinerary')
    if (saved) {
      try {
        setItinerary(JSON.parse(saved))
      } catch {
        setItinerary([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('travel-itinerary', JSON.stringify(itinerary))
  }, [itinerary])

  const filtered = useMemo(() => {
    return restaurants.filter((item) => {
      const matchesQuery = [item.name, item.dish, item.features, item.city, item.address]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesCity = city === '전체' || item.city === city
      return matchesQuery && matchesCity
    })
  }, [query, city])

  const topCity = useMemo(() => {
    return filtered.length > 0 ? filtered[0].city : '없음'
  }, [filtered])

  const cities = ['전체', ...Array.from(new Set(restaurants.map((item) => item.city)))]

  const toggleItinerary = (restaurant: Restaurant) => {
    setItinerary((current) => {
      const exists = current.some((item) => item.name === restaurant.name)
      if (exists) {
        return current.filter((item) => item.name !== restaurant.name)
      }
      return [...current, restaurant]
    })
  }

  const isInItinerary = (restaurant: Restaurant) => {
    return itinerary.some((item) => item.name === restaurant.name)
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">중국 면요리 여행</p>
          <h1>중국 면 요리 맛집 어행 어플</h1>
          <p>가장 인기 있는 중국 면요리 맛집을 찾아 여행 일정에 바로 추가해보세요.</p>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <h3>추천 맛집</h3>
          <p>{filtered.length}곳</p>
        </article>
        <article className="summary-card">
          <h3>여행 일정</h3>
          <p>{itinerary.length}곳</p>
        </article>
        <article className="summary-card">
          <h3>추천 지역</h3>
          <p>{topCity}</p>
        </article>
      </section>

      <section className="controls">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="맛집, 요리, 도시, 주소 검색"
        />
        <select value={city} onChange={(event) => setCity(event.target.value)}>
          {cities.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </section>

      <section className="ai-recommendation">
        <h2>AI 여행 추천</h2>
        <p>AutoGen AI를 사용하여 개인화된 여행 추천을 받아보세요.</p>
        <p>터미널에서 다음 명령을 실행하세요:</p>
        <code>python travel_agent.py</code>
        <p>그 후, 방문하고 싶은 도시를 입력하면 AI가 추천해줍니다.</p>
      </section>

      <div className="main-grid">
        <section className="cards">
          {filtered.map((item) => (
            <article key={item.name} className="card">
              <div className="card-header">
                <span>{item.city}</span>
                <strong>{item.rating.toFixed(1)} ★</strong>
              </div>
              <h2>{item.name}</h2>
              <p className="dish">{item.dish}</p>
              <p>{item.features}</p>
              <p className="address">{item.address}</p>
              <p className="tip">Tip: {item.tip}</p>
              <button
                type="button"
                className={isInItinerary(item) ? 'action-button remove' : 'action-button'}
                onClick={() => toggleItinerary(item)}
              >
                {isInItinerary(item) ? '일정에서 제거' : '일정에 추가'}
              </button>
            </article>
          ))}
          {filtered.length === 0 && <p className="empty-state">검색 결과가 없습니다.</p>}
        </section>

        <aside className="itinerary-panel">
          <div className="panel-header">
            <div>
              <p className="panel-subtitle">여행 일정</p>
              <h2>오늘의 면 요리 코스</h2>
            </div>
            <span className="pill">{itinerary.length}개 선택</span>
          </div>

          {itinerary.length === 0 ? (
            <p className="empty-state">맛집을 눌러 일정에 추가해보세요.</p>
          ) : (
            itinerary.map((item) => (
              <div key={item.name} className="itinerary-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.city} · {item.dish}</p>
                </div>
                <button type="button" className="remove-link" onClick={() => toggleItinerary(item)}>
                  삭제
                </button>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
