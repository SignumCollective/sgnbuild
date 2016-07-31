import $ from 'jquery';

function timeout(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function test() {
  await timeout(5000);
  $('body').text('it works! so does timeout');
}

$(() => {
  $('body').text('it works!');
  test();
});
