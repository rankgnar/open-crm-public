import Image from 'next/image'

export function Logo({ size = 28 }: { size?: number }) {
  // Wordmark aspect ratio: 472 / 116 ≈ 4.069
  const wordmarkHeight = Math.round(size * 0.78)
  const wordmarkWidth = Math.round(wordmarkHeight * (472 / 116))

  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/logo-icon.png"
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-md"
        style={{ width: size, height: size }}
      />
      {/* Wordmark — light variant for dark theme, dark variant for light theme */}
      <Image
        src="/logo-text-light.png"
        alt="OpenCRM"
        width={wordmarkWidth}
        height={wordmarkHeight}
        priority
        className="theme-dark-only block"
        style={{ width: wordmarkWidth, height: wordmarkHeight }}
      />
      <Image
        src="/logo-text-dark.png"
        alt="OpenCRM"
        width={wordmarkWidth}
        height={wordmarkHeight}
        priority
        className="theme-light-only block"
        style={{ width: wordmarkWidth, height: wordmarkHeight }}
      />
    </span>
  )
}
