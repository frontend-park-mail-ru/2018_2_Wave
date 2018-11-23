export default class EnemiesView {
  constructor(enemies) {
    this.enemies = enemies;
    this.letters = false;
  }

  render(canvas) {
    const font = 'Arial';
    const size = 15;
    const fillStyle = '##ff0099';

    this.enemies.enemies.forEach((enemie) => {
      enemie.segments.forEach((segment) => {
        segment.x += 1;
        if (this.letters) {
          canvas.drawLetter({
            font,
            size,
            fillStyle,
            x: segment.x,
            y: segment.y,
            letter: segment.letter,
          });
        } else {
          canvas.drawRect({
            fillStyle: '#cc0000',
            strokeStyle: '#fc7874',
            x: segment.x,
            y: segment.y,
            width: 1,
            height: 1,
          });
        }
      });
    });
  }
}
