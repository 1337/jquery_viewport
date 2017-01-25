var messages = {
  'title': {
    'above': {
      'right': 'Title is above the top',
      'wrong': "Title isn't above the top"
    },
    'below': {
      'right': 'Title is below the fold',
      'wrong': "Title isn't below the fold"
    },
    'viewport': {
      'right': 'Title is in viewport',
      'wrong': "Title isn't in viewport"
    }
  }
};

/**
 *  Simple test to define if principal functions works.
 *  Define an iframe (frames[0] which contain a title and an image.
 *  Scroll in this iframe and test jquery.viewport functions
 */
test("threshold", function () {
  var frame = frames[0];
  var img = frame.$("img"),
    $h1 = frame.$('h1');

  // Init test for title
  ok(!frame.$.aboveTheTop($h1, {threshold: 0}), messages.title.above.wrong);
  ok(!frame.$.belowTheFold($h1, {threshold: 0}), messages.title.below.wrong);
  ok(frame.$.inViewport($h1, {threshold: 0}), messages.title.viewport.right);

  // Init test for image
  ok(!frame.$.inViewport(img, {threshold: 0}), "left 0");
  ok(!frame.$.inViewport(img, {threshold: 50}), "left 50");
  ok(frame.$.inViewport(img, {threshold: 150}), "left 150");

  // Scroll frame to the right (1200)
  frame.scroll(1200, 0);

  // Test for title
  ok(!frame.$.aboveTheTop($h1, {threshold: 0}), messages.title.above.wrong);
  ok(!frame.$.belowTheFold($h1, {threshold: 0}), messages.title.below.wrong);
  ok(!frame.$.inViewport($h1, {threshold: 0}), messages.title.viewport.wrong);

  // Test for image
  ok(!frame.$.inViewport(img, {threshold: 0}), "right 0");
  ok(frame.$.inViewport(img, {threshold: 400}), "right 400");

  // Scroll frame to the bottom (600) and left (1200 => 300)
  frame.scroll(600, 300);

  // Test for title
  ok(frame.$.aboveTheTop($h1, {threshold: 0}), messages.title.above.right);
  ok(!frame.$.belowTheFold($h1, {threshold: 0}), messages.title.below.wrong);
  ok(!frame.$.inViewport($h1, {threshold: 0}), messages.title.viewport.wrong);

  // Test for image
  ok(frame.$.inViewport(img, {threshold: -100}), "middle -100");
});
