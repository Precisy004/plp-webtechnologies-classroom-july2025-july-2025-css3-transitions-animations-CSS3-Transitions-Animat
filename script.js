document.addEventListener('DOMContentLoaded', function () {
   

  // global variable (accessible by any function in this file)
  const globalMessage = "Thank you for exploring The Formidable Tutoring Community.";

  /**
   * calculateArea
   * - parameters: width (number), height (number)
   * - returns: numeric area or null if invalid
   */
  function calculateArea(width, height) {
    // local variables are scoped to this function
    const w = Number(width);
    const h = Number(height);
    if (isNaN(w) || isNaN(h) || w < 0 || h < 0) {
      return null; // invalid input -> caller can decide what to do
    }
    return w * h;
  }

  /**
   * showGlobalMessage
   * - demonstrates access to global variable
   * - returns the message string
   */
  function showGlobalMessage() {
    return globalMessage; // reads the outer scoped variable
  }

  // Hook up calculator button (uses calculateArea)
  const calcBtn = document.getElementById('calcBtn');
  calcBtn.addEventListener('click', function () {
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const area = calculateArea(w, h);
    const resultEl = document.getElementById('calcResult');

    if (area === null) {
      resultEl.textContent = '❌ Please enter valid positive numbers for width and height.';
      resultEl.style.color = '#b63b3b';
      return;
    }

    resultEl.textContent = `✅ The area of your rectangle is: ${area}`;
    resultEl.style.color = '#0b3b2b';
    // Example use of the global-message function — not intrusive
    // (keeps UI focused on the calculation result)
    console.info(showGlobalMessage());
  });

  /* ============================
     PART 3: JS + CSS Integration (animation triggers)
     - animateBoxToggle toggles the 'move-box' class
     - toggleFloat pauses/resumes the floating animation
     ============================ */

  const animatedBox = document.getElementById('animatedLogo');
  const animateBtn = document.getElementById('animateBtn');
  const toggleFloatBtn = document.getElementById('toggleFloat');

  /**
   * animateBoxToggle
   * - toggles the move-box class that triggers a one-shot CSS animation
   * - returns boolean: true if animation class was added, false if removed
   */
  function animateBoxToggle() {
    if (!animatedBox) return false;
    const added = animatedBox.classList.toggle('move-box');
    // Ensure the element returns to original state after animation completes
    if (added) {
      // use animationend to remove the class (so it can be re-triggered cleanly)
      const onEnd = function () {
        animatedBox.classList.remove('move-box');
        animatedBox.removeEventListener('animationend', onEnd);
      };
      animatedBox.addEventListener('animationend', onEnd);
    }
    return added;
  }

  // Connect the button to the animation function
  if (animateBtn) {
    animateBtn.addEventListener('click', function () {
      const started = animateBoxToggle();
      // Update aria-pressed and label subtly for accessibility
      animateBtn.setAttribute('aria-pressed', started ? 'true' : 'false');
    });
  }

  /**
   * toggleFloatPause
   * - toggles the 'paused' helper class to pause/resume the float keyframe
   * - returns true if paused, false if running
   */
  function toggleFloatPause() {
    if (!animatedBox) return false;
    const paused = animatedBox.classList.toggle('paused');
    return paused;
  }

  // Connect pause/resume control
  if (toggleFloatBtn) {
    toggleFloatBtn.addEventListener('click', function () {
      const paused = toggleFloatPause();
      toggleFloatBtn.textContent = paused ? 'Resume Floating' : 'Pause Floating';
    });
  }

  
});
