/**
 * Sparkle Icon - 4-point star with circular border
 * Color is controlled via currentColor (inherits from parent)
 */
const SparkleIcon = ({ className, size = 28 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* 4-point star */}
    <path
      d="M13.7239 6.22762C13.7913 5.96254 14.2089 5.96249 14.2764 6.22756C15.3807 10.5663 17.4144 12.6116 21.7783 13.7244C22.0431 13.792 22.0431 14.2088 21.7783 14.2763C17.4132 15.3891 15.3795 17.4344 14.2761 21.7732C14.2087 22.0383 13.7911 22.0383 13.7236 21.7732C12.6194 17.4346 10.5859 15.3884 6.2225 14.2763C5.95764 14.2088 5.95761 13.7918 6.22246 13.7243C10.5869 12.6115 12.6206 10.5661 13.7239 6.22762Z"
      fill="currentColor"
    />
    {/* Circular border */}
    <path
      d="M0.499999 14.0004C0.5 6.54455 6.54415 0.500306 14 0.500202C21.4558 0.500099 27.5 6.54417 27.5 14C27.5 21.4559 21.4558 27.5001 14 27.5002C6.54416 27.5003 0.5 21.4562 0.499999 14.0004Z"
      stroke="currentColor"
      strokeOpacity="0.4"
    />
  </svg>
);

export default SparkleIcon;
