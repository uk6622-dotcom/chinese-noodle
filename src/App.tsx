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
