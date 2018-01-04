import Mixin from '@ember/object/mixin';

const distanceLimit = 50,
      timeToSwipe = 750;

export default Mixin.create({
  swipeStart: {},
  swipeTimer: 0,
  isScrolling({ x, y }) {
    let angle = Math.atan2(x, y) * 180 / Math.PI + 180,
        dirUp = angle < 45 || angle > 335,
        dirDown = angle > 135 && angle < 225;
    return dirUp || dirDown;
  },
  touchStart(event) {
    console.log('***') ;
    this.setProperties({
      swipeStart: {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      },
      swipeTimer: new Date().getTime()
    });
  },
  touchEnd(event) {
    let start = {
          x: this.get('swipeStart.x'),
          y: this.get('swipeStart.y')
        },
        end = {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY
        },
        distance = {
          x: end.x - start.x,
          y: end.y - start.y
        },
        swipeTime = new Date().getTime() - this.get('swipeTimer');

    if (this.isScrolling(distance)) { return; }

    if (Math.abs(distance.x) > distanceLimit && swipeTime < timeToSwipe) {
      if (end.x < start.x) {
        this.swipeLeft();
      } else if (end.x > start.x) {
        this.swipeRight();
      }
    }
  }
});
