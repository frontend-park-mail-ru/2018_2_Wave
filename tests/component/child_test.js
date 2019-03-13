import Component from '../../src/applications/component';


it('Automatic addChild in constructor', () => {
  const markName = 'mark';

  const div = document.createElement('div');
  const mark = document.createElement(markName);
  div.appendChild(mark);

  const parentComponent = new Component('templateMock', div);
  const childComponent = new Component(
    'templateMock',
    parentComponent,
    markName,
  );

  const firstChild = parentComponent.children[markName];
  expect(firstChild).toBe(childComponent);
});
