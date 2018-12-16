export default class SnakeModel {
  constructor() {
    this.segments  = [];
  }

  getSegments() {
    return this.segments;
  }

  popSegment() {
    this.segments.pop();
  }

  pushSegment(segment) {
    this.segments.push(segment);
  }

  unshiftSegment(segment) {
    this.segments.unshift(segment);
  }
}
