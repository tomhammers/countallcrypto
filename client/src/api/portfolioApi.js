export default class portfolioApi {
  static addPortfolio(portfolio) {
    const request = new Request('/api/savePortfolio', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(portfolio),
    });

    return fetch(request)
      .then(res => {
        return res.json();
      })
      .catch(error => error);
  }

  static getPortfolio(portfolioId) {
    const request = new Request(`/api/getPortfolio/${portfolioId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static updatePortfolio(portfolio) {
    const request = new Request(`/api/updatePortfolio/${portfolio._id}`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(portfolio),
    });

    return fetch(request)
      .then(res => {
        return res.json();
      })
      .catch(error => error);
  }
}
