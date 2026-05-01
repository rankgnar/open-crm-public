import Image from 'next/image'

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/logo-icon.png"
        alt="open-crm"
        width={size}
        height={size}
        priority
        className="rounded-md"
      />
      <span className="text-[15px] font-semibold tracking-tight text-fg-strong">
        open-crm
      </span>
    </span>
  )
}
