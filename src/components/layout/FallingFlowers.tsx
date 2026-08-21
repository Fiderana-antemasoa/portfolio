import './FallingFlowers.css'

const FLOWERS = Array.from({ length: 22 }, (_, index) => index)

export default function FallingFlowers() {
  return (
    <div className="falling-flowers" aria-hidden="true">
      {FLOWERS.map((flower) => (
        <span
          key={flower}
          className="falling-flower"
          style={{
            '--left': `${(flower * 17 + 3) % 100}%`,
            '--delay': `${(flower * 1.37) % 14}s`,
            '--duration': `${10 + ((flower * 1.83) % 8)}s`,
            '--size': `${7 + ((flower * 3) % 8)}px`,
            '--drift': `${-55 + ((flower * 29) % 110)}px`,
            '--rotation': `${(flower * 47) % 360}deg`,
          } as React.CSSProperties}
        >
          <span className="falling-flower__petal falling-flower__petal--1" />
          <span className="falling-flower__petal falling-flower__petal--2" />
          <span className="falling-flower__petal falling-flower__petal--3" />
          <span className="falling-flower__petal falling-flower__petal--4" />
          <span className="falling-flower__center" />
        </span>
      ))}
    </div>
  )
}
