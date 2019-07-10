import generator from 'generate-password';

export default () => generator.generate({
  length: 7,
  numbers: true
});
