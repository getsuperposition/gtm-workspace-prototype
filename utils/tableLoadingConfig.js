/**
 * Table Loading Animation Configuration
 *
 * This file contains timing and behavior configurations for the data table loading animation.
 * Style-related values (colors, margins, etc.) are now defined in CSS for better separation of concerns.
 * Edit these values to customize the loading behavior and animation timing.
 */

export const tableLoadingConfig = {
  /**
   * Total duration of the simulated loading state (in milliseconds)
   * The table will show skeleton animation for this duration
   * @default 2400
   */
  loadingDuration: 2400,

  /**
   * Number of skeleton rows to display during loading
   * @default 10
   */
  skeletonRowCount: 10,

  /**
   * Number of skeleton columns to display during loading
   * @default 6
   */
  skeletonColumnCount: 6,

  /**
   * Interval between each pulse/sweep animation (in milliseconds)
   * A new pulse will start every X milliseconds
   * @default 1500
   */
  pulseInterval: 1500,

  /**
   * Duration of a single pulse animation (in milliseconds)
   * How long it takes for one pulse to complete its sweep
   * @default 2400
   */
  pulseDuration: 2400,

  /**
   * Row expansion animation settings
   * Controls the accordion-style unfolding effect
   */
  rowExpansion: {
    /**
     * Duration of each row's expansion animation (in milliseconds)
     * @default 200
     */
    duration: 200,

    /**
     * Delay between each row's animation start (in milliseconds)
     * Creates the cascading accordion effect
     * @default 60
     */
    staggerDelay: 60,
  },

  /**
   * Margin expansion animation settings
   * Controls the table growing from a smaller size to full size
   */
  marginExpansion: {
    /**
     * Duration of the margin expansion animation (in milliseconds)
     * @default 800
     */
    duration: 800,

    /**
     * Delay before starting the margin expansion (in milliseconds)
     * Starts after loading completes
     * @default 0
     */
    delay: 0,
  },
};
