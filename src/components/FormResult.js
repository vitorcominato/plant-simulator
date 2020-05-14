/**
   * FormResult component
   * Displays the result of method call in FormQuestion
  * */
const FormResult = {
  isDragging: false,
  touchAxis: {
    start: 0,
    end: 0,
  },

  /**
   * @method handleSwipe
   * Handle Swipe iteration for the cards
  * */
  handleSwipe: () => {
    const DOMResulCards = document.getElementById('result-cards');
    DOMResulCards.addEventListener('touchstart', (event) => {
      FormResult.isDragging = true;
      FormResult.touchAxis.start = event.touches[0].clientX;
    }, { passive: true });

    DOMResulCards.addEventListener('touchmove', (event) => {
      const moved = FormResult.touchAxis.start - event.touches[0].clientX;
      FormResult.touchAxis.start = event.touches[0].clientX;
      const widthResultCards = DOMResulCards.offsetWidth;
      const maxSwipe = document.querySelector('.box-card').offsetWidth - widthResultCards;

      const currentLeftPx = getComputedStyle(DOMResulCards).left;
      const currentLeft = Number(currentLeftPx.split('px')[0]);
      let newPosition = currentLeft - moved;
      newPosition = newPosition > 0 ? 0 : newPosition;
      newPosition = newPosition < maxSwipe ? maxSwipe : newPosition;

      DOMResulCards.style.left = `${newPosition}px`;
    }, { passive: true });

    DOMResulCards.addEventListener('touchend', () => {
      FormResult.isDragging = false;
    }, { passive: true });
  },

  /**
   * @method setWidthSwiper
   * @param numberOfCards Number of cards shown
   * Verify number of cards that is displaying and set the widget of the swiper
  * */
  setWidthSwiper: (numberOfCards) => {
    const DOMResulCards = document.getElementById('result-cards');
    const widthResult = (document.querySelector('.box-card').offsetWidth * numberOfCards) + 20;
    DOMResulCards.style.left = '0px';
    DOMResulCards.style.width = `${widthResult}px`;
  },

  render: async () => `
    <section class="form-result" id="result-section">
      <div class="data-empty" id="data-empty">
        <div class="box-data-empty">
          <h3>No results yet…</h3>
          <p>Use the filters above to find the plant that best fits your environment :)</p>
        </div>
        <div class="box-data-empty img-box">
          <img class="no-data" src="/assets/images/dataempty.png" alt="No Data">
        </div>
      </div>
      <div class="data-result hide" id="data-result">
        <img class="pick-image" src="/assets/images/pick.png" alt="Hand picking plant">
        <h3 class="title-result">Our picks for you</h3>
        <div class="list-results">
          <ul class="result-cards" id="result-cards"></ul>
        </div>
        <button class="btn" id="btn-back-to-top">
          <i class="icon-pointer-up"></i>
          back to the top
        </button>
      </div>
      <div class="loading-spinner hide" id="loading">
        <div class="spinner">
          <div></div>
        </div>
      </div>
    </section>
  `,

  componentDidMount: async () => {
    document.getElementById('btn-back-to-top').onclick = () => {
      document.getElementById('top-content').scrollIntoView();
    };
    FormResult.handleSwipe();
  },
};

export default FormResult;
