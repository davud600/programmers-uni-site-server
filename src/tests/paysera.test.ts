import md5 from 'md5';

const PAYSERA_PROJECT_ID = 'abc';
const PAYSERA_PROJECT_PASSWORD = 'abc';

test('paysera params', () => {
  const params = {
    email: 'davud@gmail.com',
  };

  const options = {
    projectid: PAYSERA_PROJECT_ID,
    amount: '10',
    currency: 'EUR',
    orderid: '123123',
    ...params,
  };

  const urlParams = new URLSearchParams(options).toString();

  const encodedParams = Buffer.from(urlParams).toString('base64url');

  const sign = md5(`${encodedParams}${PAYSERA_PROJECT_PASSWORD}`);

  console.log(`urlParams: ${urlParams}`);
  console.log(`sign: ${sign}`);
});
